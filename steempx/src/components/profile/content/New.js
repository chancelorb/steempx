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
        user_id: this.props.curUser
      }, props.post)
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

	handleSubmit(e) {
		e.preventDefault();
		this.props.func(this.state.post);
	}

  // <label> ----- for tags
  //   <h3>Tags</h3>
  //   <textarea rows='2' cols ='70'
  //     name='tags'
  //     // value={tag}
  //     placeholder='tags'
  //    />
  // </label><br/>

  render() {
    console.log(this.state.post)
    const { title, img_url} = this.state.post
    return (
      <div className='col-8'>
        <h1>Create a new post!</h1>
        <div>

				<form onSubmit={this.handleSubmit}>

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
              placeholder='img url'
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
