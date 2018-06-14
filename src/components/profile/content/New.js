import React, { Component } from 'react';
import './New.css';
import { Link } from 'react-router-dom';
import steem from 'steem';
const BASE_URL = "https://mysterious-lowlands-62415.herokuapp.com/";

class New extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: true,
      sendLoading: false,
      failed: false,
      confirmation: false,
      block: {
        block: '',
        trx: '',
      },
      post: Object.assign({
        title: '',
        img_url: '',
        user_id: this.props.curUser,
        key: '',
        tag: ''
      }, props.post)
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSteemSubmit = this.handleSteemSubmit.bind(this);
    this.makePermaLink = this.makePermaLink.bind(this);
  }
  handleChange(e) {
		const { name, value } = e.target;
    this.setState((prevState, props) => ({
			post: {
				...prevState.post,
				[name]: value
			}
		}))
	}
  //neccessary for steemit to have a unique permalink
  makePermaLink(title) {
    var str = title + `-by ${this.props.curUser}`;
    str = str.replace(/\s+/g, '-').toLowerCase();
    return str
  }
  handleSteemSubmit(e) {
    e.preventDefault();
    this.setState({
      form: false,
      sendLoading: true,
      failed: false
    })
    steem.broadcast.comment(
      this.state.post.key,
      '',
      `steempx`,
      this.props.curUser,
      `${this.makePermaLink(this.state.post.title)}`,
      this.state.post.title,
      `![](${this.state.post.img_url}) <hr /> <a href="https://steempx.herokuapp.com/">Made With SteemPX</a> <br />![](https://steempx.herokuapp.com/static/media/spLogo.5bfbb7c0.png)`,
      { tags: ["steempx", "photography", `${this.state.post.tag}`], image:[`${this.state.post.img_url}`], app:'steempx' },
      (err, result) => {
        if (!err) {
          this.props.func(this.state.post);
          this.setState({
            sendLoading: false,
            confirmation: true,
            block: {
              block: result.block_num,
              trx: result.trx_num
            }
          });

        } else {
          this.setState({
            failed: true,
            sendLoading: false,
            form: true
          })
        console.log(err)
        }
      }
    )
  }


  render() {
    const { title, img_url, key, tag} = this.state.post
    const form = (<div><h1>Create a new post!</h1>
    <div>
    <form onSubmit={this.handleSteemSubmit}>
      <label>
        <h3>Title</h3>
        <textarea rows='2' cols ='70'
          name='title'
          value={title}
          placeholder='Title'
          onChange={this.handleChange}
          />
      </label><br/>
      <label>
        <h3>Image URL</h3>
        <textarea rows='1' cols ='70'
          name='img_url'
          value={img_url}
          placeholder='Image Url'
          onChange={this.handleChange}
         />
      </label><br/>
      <label>
        <h3>Tag<small>(just one for now)</small></h3>
        <textarea rows='1' cols ='70'
          name='tag'
          value={tag}
          placeholder='Tag'
          onChange={this.handleChange}
         />
      </label><br/>
      <label>
       <h3><strong>Posting</strong> (Private) Key</h3>
       <input className='input-key' rows='2' cols ='70'
         type="password"
         name='key'
         value={key}
         placeholder='Private Key'
         onChange={this.handleChange}
       />
      </label><br/>
      <button type='submit'>Post</button>
    </form></div></div>);
    const loading = (<div className='loader'></div>);
    const failed = (<div className="error-post-msg"><p>Username And Password Don't match</p></div>);
    const confirmation = (<div className="confirmation-box"><h1>Sent!</h1><hr />
      <h3>Block nr: {this.state.block.block}</h3>
      <h3>transaction nr: {this.state.block.trx}</h3>
    </div>)


    return (
      <div className='col-8'>
        {this.state.failed && failed}
        {this.state.form && form}
        {this.state.sendLoading && loading}
        {this.state.confirmation && confirmation}

			</div>
    )
  }
}

export default New;
