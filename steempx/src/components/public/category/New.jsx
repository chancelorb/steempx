import React, { Component } from 'react';
import './New.css';
import { Link } from 'react-router-dom';
import steem from 'steem';

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thisPosts: [],
      newPosts: []
    }
    this.fetchDiscNew = this.fetchDiscNew.bind(this);
    this.addDefaultSrc = this.addDefaultSrc.bind(this);
  }
  // steempx
  fetchThisPosts() {
    fetch('http://localhost:3001/api/pic')
      .then(resp => {
        if (!resp.ok) {
          throw Error('oops: ', resp.message);
        }
        return resp.json();
      }).then(data => this.setState ({
          thisPosts: data.data
      })).catch(err => console.log(`error: ${err}`))
  }
  //steemit
  fetchDiscNew() {
    var query = {
      tag: `${this.props.theTag}`,
      limit: 100
    };
    steem.api.getDiscussionsByCreatedAsync(query)
      .then(res => {
        this.setState({
          newPosts: res
        });
        console.log(res)
      })
      .catch(err => {
        console.log('oopsie', err)
      })
  }
  addDefaultSrc(ev){
    ev.target.src = 'https://www.torbenrick.eu/blog/wp-content/uploads/2017/03/Broken-windows-theory-Applied-to-organizational-culture.jpg'
  }

  componentDidMount() {
    this.fetchDiscNew();
    this.fetchThisPosts();
  }
  componentWillReceiveProps() {
    this.fetchDiscNew()
  }

  render() {
    //steempx
    let thisPosts = (this.state.thisPosts).length > 0 ? this.state.thisPosts : ["not the same"] ;
    let checkSteempx = (thisPosts === this.state.thisPosts) ? (thisPosts.map(t => (
      <div className='post-container' key={t.id}>
        <img onError={this.addDefaultSrc} src={t.img_url} alt="" className='home-pic'/>
        <p>@{t.user_id} | {t.title}</p>
      </div>
    ))) : (<h1>Loading...</h1>)
    //steemit
    let news = (this.state.newPosts).length > 0 ? this.state.newPosts : ["not the same"] ;
    let check = (news === this.state.newPosts) ? (news.map(t => (
      <div className='post-container' key={t.id}>
        <img onError={this.addDefaultSrc} src={JSON.parse(t.json_metadata).image} alt="" className='home-pic'/>
        <p>@{t.author} | {t.title}</p>
      </div>
    ))) : (<h1>Loading...</h1>)
    console.log(news)
    return (
      <div className='new-container col-8'>
        <div className='steempx-posts' >
          <h1 className='muted-title'>SteemPX Posts</h1>
          <hr />
          {checkSteempx}
        </div>
        <div className='steemit-posts'>
          <h1 className='muted-title'>SteemIt Posts</h1>
          <hr />
          {check}

        </div>
      </div>
    );
  }
}

export default New;
