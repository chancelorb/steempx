import React, { Component } from 'react';
import './New.css';
import { Link } from 'react-router-dom';
import steem from 'steem';
import Postinfo from '../../show/Postinfo';
const BASE_URL = "https://mysterious-lowlands-62415.herokuapp.com/";



class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onPic: "false",
      newPosts: [],
      zoomPic: false,
      curImg: '',
      count: 0
    }
    this.fetchDiscNew = this.fetchDiscNew.bind(this);
    this.addDefaultSrc = this.addDefaultSrc.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
    this.handleDeZoom = this.handleDeZoom.bind(this);
  }
  //steemit

  checkApp(app) {
    let res = [];
    app.map(i => {
      if (JSON.parse(i.json_metadata).app === "steempx") {
        res.push(i);
      }
    })
    return res
  }

  fetchDiscNew() {
    var query = {
      tag: 'steempx',
      limit: 100
    };
    steem.api.getDiscussionsByCreatedAsync(query)
      .then(res => {
        this.setState({
          newPosts: this.checkApp(res)
        });

      })
      .catch(err => {
        console.log('oopsie', err)
      })
  }
  addDefaultSrc(ev){
    ev.target.src = 'https://www.torbenrick.eu/blog/wp-content/uploads/2017/03/Broken-windows-theory-Applied-to-organizational-culture.jpg'
  }
  handleZoom(img, maker, t) {
    this.setState({
      zoomPic: true,
      curImg: {
        img_url: img,
        author: maker,
        all: t
      }
    });
    // steem.broadcast.vote("5K7JTWwThhpC1R3TVzakYZQGnZzgYKb4bqgi3962w1szREP16Su", "chanceb", "chanceb", "super-long-pic-by-chanceb", 10000, function(err, result) {
    // 	console.log(err, result);
    // });
  }
  handleDeZoom() {
    this.setState({
      zoomPic: false
    })

  }
  checkImgSize(img) {
    console.log(img[0])
  }


  componentDidMount() {
    this.fetchDiscNew();
  }
  componentWillReceiveProps() {
    this.fetchDiscNew();
  }

  render() {
    //steempx
    // let onPic = (this.state.onPic) ? "show" : "hide";
    // let thisPosts = (this.state.thisPosts).length > 0 ? this.state.thisPosts : ["not the same"] ;
    // let checkSteempx = (thisPosts === this.state.thisPosts) ? (thisPosts.map(t => (
    //   <div className='post-container' key={t.id}>
    //     <img onClick={() => {this.handleZoom(t.img_url, t.user_id)}} onError={this.addDefaultSrc} src={t.img_url} alt="" className='home-pic'/>
    //     <div className='row post-container-text'><Link className='col-md-6' to={`/user/${t.user_id}`}>@{t.user_id}</Link><div onClick='' className='col-md-6 like-button' >Like</div></div>
    //   </div>
    // ))) : (<h1 className='loader'></h1>)
    //steemit
    let news = (this.state.newPosts).length > 0 ? this.state.newPosts : ["not the same"] ;
    let check = (news === this.state.newPosts) ? (news.map(t => (
      <div className='post-container' key={t.id}>
        <img onClick={() => {this.handleZoom(JSON.parse(t.json_metadata).image, t.author, t)}} onError={this.addDefaultSrc} src={JSON.parse(t.json_metadata).image} alt="" className='home-pic'/>
        <div className='row post-container-text'><Link  to={`/user/${t.author}`} >@{t.author}</Link></div>{this.checkImgSize(JSON.parse(t.json_metadata).image)}
      </div>
    ))) : (<h1 className='loader'></h1>)
    return (
      <div className='new-container col-12'>
        <div className='steempx-posts' >
          <h1 className='muted-title'>NEW</h1>
          <hr />

          {check}
        </div>


        {this.state.zoomPic && (<Postinfo func={this.handleDeZoom} pic={this.state.curImg}/>) }
      </div>
    );
  }
}

export default New;
