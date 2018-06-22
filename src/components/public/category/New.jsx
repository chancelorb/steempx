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
      count: 0,
      fetch: false,
    }
    this.fetchDiscNew = this.fetchDiscNew.bind(this);
    this.addDefaultSrc = this.addDefaultSrc.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
    this.handleDeZoom = this.handleDeZoom.bind(this);
    this.handleLike = this.handleLike.bind(this);
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
          newPosts: this.checkApp(res),
          fetch: true
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
    console.log(this.props.user);
    this.setState({
      zoomPic: true,
      curImg: {
        img_url: img,
        author: maker,
        all: t,
        user: this.props.user
      }
    });

  }
  handleDeZoom() {
    this.setState({
      zoomPic: false
    })
    this.fetchDiscNew();
  }

  handleLike() {
    this.setState({
      fetch: false
    })
  }


  componentDidMount() {
    this.fetchDiscNew();
  }
  componentWillReceiveProps() {
    this.fetchDiscNew();
  }



  render() {
    //steemit
    let news = (this.state.newPosts).length > 0 ? this.state.newPosts : ["not the same"] ;
    let check = (news === this.state.newPosts) ? (news.map(t => (
      <div className='post-container' key={t.id}>
        <img onClick={() => {this.handleZoom(JSON.parse(t.json_metadata).image, t.author, t)}} onError={this.addDefaultSrc} src={JSON.parse(t.json_metadata).image} alt="" className='home-pic'/>
        <div className='row post-container-text'><Link  to={`/user/${t.author}`} >@{t.author}</Link></div>
      </div>
    ))) : (<h1 className='loader'></h1>)
    return (
      <div className='new-container col-12'>
        <div className='steempx-posts' >
          <h1 className='muted-title'>NEW</h1>
          <hr />
          <div className = 'checkbox'>
            {check}
          </div>
        </div>


        {this.state.zoomPic && (<Postinfo func={this.handleDeZoom} likeFunc={this.handleLike} pic={this.state.curImg}/>) }
      </div>
    );
  }
}

export default New;
