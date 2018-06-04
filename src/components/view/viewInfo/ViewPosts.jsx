import React, { Component } from 'react';
import './ViewPosts.css';
import { Link } from 'react-router-dom';
import steem from 'steem';
import Postinfo from '../../show/Postinfo';
const BASE_URL = "https://mysterious-lowlands-62415.herokuapp.com/";

class ViewPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thisPosts: [],
      posts: [],
      curUser: this.props.curUser,
      loaded: false,
      pxLoaded: false,
      zoomPic: false,
      curImg: ''
    }
    this.fetchPosts = this.fetchPosts.bind(this);
    this.addDefaultSrc = this.addDefaultSrc.bind(this);
    this.fetchThisPosts = this.fetchThisPosts.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
    this.handleDeZoom = this.handleDeZoom.bind(this);
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
          posts: res,
          loaded: true
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  fetchThisPosts(user) {
    fetch(`${BASE_URL}api/pic/user/${user}`)
      .then(resp => {
        if (!resp.ok) {
          throw Error('oops: ', resp.message);
        }
        return resp.json();
      }).then(data => this.setState ({
          thisPosts: data.data,
          pxLoaded: true
      })).catch(err => console.log(`error: ${err}`))
  }

  handleZoom(img, maker) {
    this.setState({
      zoomPic: true,
      curImg: {
        img_url: img,
        author: maker
      }
    })
  }
  handleDeZoom() {
    this.setState({
      zoomPic: false
    })
  }

  addDefaultSrc(ev){
    ev.target.src = 'https://www.torbenrick.eu/blog/wp-content/uploads/2017/03/Broken-windows-theory-Applied-to-organizational-culture.jpg'
  }
  componentDidMount() {
    this.fetchPosts()
    this.fetchThisPosts(this.props.curUser)
  }
  render() {
    //steempx
    let thisPosts = (this.state.thisPosts).length > 0 ? this.state.thisPosts : ["not the same"] ;
    let checkSteempx = (thisPosts === this.state.thisPosts) ? (thisPosts.map(t => (
      <div className='post-container' key={t.id}>
        <img onClick={() => {this.handleZoom(t.img_url, t.user_id)}} onError={this.addDefaultSrc} src={t.img_url} alt="" className='home-pic'/>
        <p>@{t.user_id} | {t.title}</p>
      </div>
    ))) : (<h1>No Posts Yet</h1>)
    let pxLoaded = this.state.pxLoaded ? checkSteempx : (<h1 className='loader'></h1>)
    //steemit
    let posts = (this.state.posts).length > 0 ? this.state.posts : ["not the same"] ;
    let check = (posts === this.state.posts) ? (posts.map(t => (
      <div className='post-container' key={t.id}>
        <img onError={this.addDefaultSrc} src={JSON.parse(t.json_metadata).image} alt="" className='home-pic'/>
        <p>@{t.author} | {t.title}</p>
      </div>
    ))) : (<h1>No Posts Yet</h1>)
    let loaded = this.state.loaded ? check : (<h1 className='loader'></h1>)
    return (
      <div className='muted-container col-8'>
        <div className='steempx-posts' >
          <h1 className='muted-title'>SteemPX Posts</h1>
          <hr />
          {pxLoaded}
        </div>
        <div className='steemit-posts'>
          <h1 className='muted-title'>SteemIt Posts</h1>
          <hr />
          {check}

        </div>
        {this.state.zoomPic && (<Postinfo func={this.handleDeZoom} pic={this.state.curImg}/>) }
      </div>
    );
  }
}

export default ViewPosts;
