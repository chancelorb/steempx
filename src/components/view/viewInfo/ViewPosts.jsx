import React, { Component } from 'react';
import './ViewPosts.css';
import { Link } from 'react-router-dom';
import steem from 'steem';
import Postinfo from '../../show/Postinfo';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AuthForm from "../../authFrom/AuthForm";

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

  fetchThisPosts(t) {
    if (t.category === "steempx") {
      console.log(t.pending_payout_value)
      return <AuthForm t={t} user={this.props.me} likeFunc={this.fetchPosts}/>
    }
  }

  handleZoom(img, maker, t) {

    console.log("pressed")
  }
  handleDeZoom() {

  }

  addDefaultSrc(ev){
    ev.target.src = 'https://www.torbenrick.eu/blog/wp-content/uploads/2017/03/Broken-windows-theory-Applied-to-organizational-culture.jpg'
  }
  componentDidMount() {
    this.fetchPosts()
    this.fetchThisPosts(this.props.curUser)
  }
  render() {

    let thisPosts = (this.state.posts).length > 0 ? this.state.posts : ["not the same"] ;
    let checkThis = (thisPosts === this.state.posts) ? (thisPosts.map(t => (
      this.fetchThisPosts(t)))) : (<h1>No Posts Yet</h1>)
    let pxLoaded = this.state.loaded ? checkThis : (<h1 className='loader'></h1>)

    return (
      <div className='muted-container col-8'>
        <div className='steempx-posts' >
          <h1 className='muted-title'>SteemPX Posts</h1>
          <hr />
          {pxLoaded}
        </div>
      </div>
    );
  }
}

export default ViewPosts;
