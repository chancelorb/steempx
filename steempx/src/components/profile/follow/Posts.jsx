import React, { Component } from 'react';
import './Posts.css';
import { Link } from 'react-router-dom';
import steem from 'steem';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      curUser: this.props.curUser
    }
    this.fetchPosts = this.fetchPosts.bind(this);
    this.addDefaultSrc = this.addDefaultSrc.bind(this)
  }
  fetchPosts() {
    console.log(this.state.curUser)
    var query = {
      tag: this.state.curUser,
      limit: 100
    };
    steem.api.getDiscussionsByBlogAsync(query)
      .then(res => {
        this.setState({
          posts: res
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  addDefaultSrc(ev){
    ev.target.src = 'https://www.torbenrick.eu/blog/wp-content/uploads/2017/03/Broken-windows-theory-Applied-to-organizational-culture.jpg'
  }
  componentDidMount() {
    this.fetchPosts()
  }
  render() {
    let posts = (this.state.posts).length > 0 ? this.state.posts : ["not the same"] ;
    let check = (posts === this.state.posts) ? (posts.map(t => (
      <div className='post-container' key={t.id}>
        <img onError={this.addDefaultSrc} src={JSON.parse(t.json_metadata).image} alt="" className='home-pic'/>
        <p>@{t.author} | {t.title}</p>
      </div>
    ))) : (<h1>Loading...</h1>)
    console.log(posts)
    return (
      <div className='muted-container col-8'>

        <h1 className='muted-title'>My Posts</h1>
        {check}
      </div>
    );
  }
}

export default Posts;
