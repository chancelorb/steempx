import React, { Component } from 'react';
import './Posts.css';
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

class Posts extends Component {
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
    this.deleteThisPost = this.deleteThisPost.bind(this);
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
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
  //terug tot dat de text hier weg is
  fetchThisPosts(t) {

    console.log(t, "this is from SteemIt")

    if (t.category === "steempx") {
      console.log(t.pending_payout_value)
      return <div className='card-container' key={t.id}>
        <Card>
        <img onClick={() => {this.handleZoom(JSON.parse(t.json_metadata).image, t.author, t)}} onError={this.addDefaultSrc} src={JSON.parse(t.json_metadata).image} className='not-home-pic'/>

        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {t.title}
          </Typography>
        </CardContent>
        <div>

          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>


          | ^{t.net_votes} |


            ${t.pending_payout_value}

        </div>

      </Card>
      </div>
    }
  }
  // deleteThisPost(id) {
  //   fetch(`${BASE_URL}api/pic/${id}`, {
  //     method: 'DELETE'
  //   })
  //   .then(resp => {
  //     if (!resp.ok) throw new Error(resp.statusMessage);
  //     return resp.json();
  //   })
  //   .then(respBody => {
  //     this.setState((prevState, props) => {
  //       return {
  //         thisPosts: prevState.thisPosts.filter(post => post.id !== id)
  //       }
  //     })
  //   })
  // }
  handleZoom(img, maker, t) {
    // this.setState({
    //   zoomPic: true,
    //   curImg: {
    //     img_url: img,
    //     author: maker,
    //     all: t
    //   }
    // })
    console.log("pressed")
  }
  handleDeZoom() {
    this.setState({
      zoomPic: false
    })
  }
  // wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, function
  // wif, author, permlink, function

  addDefaultSrc(ev){
    ev.target.src = 'https://www.torbenrick.eu/blog/wp-content/uploads/2017/03/Broken-windows-theory-Applied-to-organizational-culture.jpg'
  }
  componentDidMount() {
    this.fetchPosts()

  }
  render() {
    //steempx
    // let thisPosts = (this.state.thisPosts).length > 0 ? this.state.thisPosts : ["not the same"] ;
    // let checkSteempx = (thisPosts === this.state.thisPosts) ? (thisPosts.map(t => (
    //   <div className='post-container' key={t.id}>
    //     <img onClick={() => {this.handleZoom(t.img_url, t.user_id)}} onError={this.addDefaultSrc} src={t.img_url} alt="" className='home-pic'/>
    //     <p>@{t.user_id} | {t.title}<button onClick={() => this.deleteThisPost(t.id)}>delete</button></p>
    //   </div>
    // ))) : (<h1>No Posts Yet</h1>)
    // let pxLoaded = this.state.pxLoaded ? checkSteempx : (<h1 className='loader'></h1>)

    let thisPosts = (this.state.posts).length > 0 ? this.state.posts : ["not the same"] ;
    let checkThis = (thisPosts === this.state.posts) ? (thisPosts.map(t => (
      this.fetchThisPosts(t)))) : (<h1>No Posts Yet</h1>)
    let pxLoaded = this.state.loaded ? checkThis : (<h1 className='loader'></h1>)
    //steemit
    // let posts = (this.state.posts).length > 0 ? this.state.posts : ["not the same"] ;
    // let check = (posts === this.state.posts) ? (posts.map(t => (
    //   <div className='post-container' key={t.id}>
    //     <img onError={this.addDefaultSrc} src={JSON.parse(t.json_metadata).image} alt="" className='home-pic'/>
    //     <p>@{t.author} | {t.title}</p>
    //   </div>
    // ))) : (<h1>No Posts Yet</h1>)
    // let loaded = this.state.loaded ? check : (<h1 className='loader'></h1>)
    return (
      <div className='muted-container col-8'>
        <div className='steempx-posts' >
          <h1 className='muted-title'>SteemPX Posts</h1>
          <hr />
          {pxLoaded}
        </div>

        {this.state.zoomPic && (<Postinfo func={this.handleDeZoom} pic={this.state.curImg}/>) }
      </div>
    );
  }
}

export default Posts;
