import React, { Component } from 'react';
import './Promoted.css';
import { Link } from 'react-router-dom';
import steem from 'steem';

class Promoted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promoted: []
    }
    this.fetchPromoted = this.fetchPromoted.bind(this);
    this.addDefaultSrc = this.addDefaultSrc.bind(this)
  }

fetchPromoted() {
  var query = {
    tag: 'photography',
    limit: 100,
    start_author: 'lada94',
    start_permlink: 'introduce-youself-steemit'
  };
  steem.api.getDiscussionsByPromotedAsync(query)
    .then(res => {
      this.setState({
        promoted: res
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
    this.fetchPromoted()
  }
  render() {
    let promoted = (this.state.promoted).length > 0 ? this.state.promoted : ["not the same"] ;
    let check = (promoted === this.state.promoted) ? (promoted.map(t => (
      <div className='post-container' key={t.id}>
        <img onError={this.addDefaultSrc} src={JSON.parse(t.json_metadata).image} alt="" className='home-pic'/>
        <p>@{t.author} | {t.title}</p>
      </div>
    ))) : (<h1>Loading...</h1>)
    console.log(promoted)
    return (
      <div className='promoted-container col-8'>

        <h1 className='promoted-title'>PROMOTED</h1>
        {check}
      </div>
    );
  }
}

export default Promoted;
