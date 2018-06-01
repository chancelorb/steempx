import React, { Component } from 'react';
import './New.css';
import { Link } from 'react-router-dom';
import steem from 'steem';

class New extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: Object.assign({
        title: '',
        img_url: '',
        user_id: this.props.curUser,
        key: '',
        tag: ''
      }, props.post)
    }
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSteemSubmit = this.handleSteemSubmit.bind(this);
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
  handleSteemSubmit(e) {
    e.preventDefault();
    console.log("steemSubmit activated!!!!!")
    steem.broadcast.comment(
      this.state.post.key,
      '',
      'steempx',
      this.props.curUser,
      `this-is-a-steempx-post`,
      this.state.post.title,
      `![](${this.state.post.img_url}) Made With SteemPX`,
      { tags: [`${this.state.post.tag}`] },
      (err, result) => {
        if (!err) {
          console.log('Result', result)
          this.props.func(this.state.post);
        } else {
          console.log('ERROR', err)
        }
      }
    )
  }

	// handleSubmit(e) {
	// 	e.preventDefault();
	// 	this.props.func(this.state.post);
	// }




  render() {
    console.log(JSON.stringify(this.state.post.key), "string")
    const { title, img_url, key, tag} = this.state.post
    return (
      <div className='col-8'>
        <h1>Create a new post!</h1>
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
           <h3>Posting Private Key</h3>
           <input className='input-key' rows='2' cols ='70'
             type="password"
             name='key'
             value={key}
             placeholder='Private Key'
             onChange={this.handleChange}
           />
          </label><br/>



					<button type='submit'>Post</button>

				</form>
			</div>
      </div>


    )
  }
}

export default New;
