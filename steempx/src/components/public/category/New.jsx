import React, { Component } from 'react';
import './New.css';
import { Link } from 'react-router-dom';
import steem from 'steem';

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPosts: []
    }
    this.fetchDiscNew = this.fetchDiscNew.bind(this);
    this.addDefaultSrc = this.addDefaultSrc.bind(this);
  }

  fetchDiscNew() {
    var query = {
      tag: 'photography',
      limit: 100,
      start_author: 'lada94',
      start_permlink: 'introduce-youself-steemit'
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
  }
  render() {
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

        <h1 className='new-title'>NEW</h1>
        {check}
      </div>
    );
  }
}

export default New;
