import React, { Component } from 'react';
import './Trending.css';
import { Link } from 'react-router-dom';
import steem from 'steem';

class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trending: []
    }
    this.fetchDiscTrending = this.fetchDiscTrending.bind(this);
    this.addDefaultSrc = this.addDefaultSrc.bind(this)
  }

  fetchDiscTrending() {
    var query = {
      tag: '',
      limit: 100
    };
    steem.api.getDiscussionsByTrendingAsync(query)
      .then(res => {
        this.setState({
          trending: res
        });
        console.log("trending res: ", res)
      })
      .catch(err => {
        console.log('oopsie', err)
      })
  }

  addDefaultSrc(ev){
    ev.target.src = 'https://www.torbenrick.eu/blog/wp-content/uploads/2017/03/Broken-windows-theory-Applied-to-organizational-culture.jpg'
  }

  componentDidMount() {
    this.fetchDiscTrending();
  }
  componentWillReceiveProps() {
    this.fetchDiscTrending()
  }

  render() {
    let trends = (this.state.trending).length > 0 ? this.state.trending : ["not the same"] ;
    let check = (trends === this.state.trending) ? (trends.map(t => (
      <div className='post-container' key={t.id}>
        <img onError={this.addDefaultSrc} src={JSON.parse(t.json_metadata).image} alt="" className='home-pic'/>
        <p>@<Link to={`/user/${t.author}`}>{t.author}</Link> | {t.title}</p>
      </div>
    ))) : (<h1 className='loader'></h1>)

    return (
      <div className='trending-container col-8'>

        <h1 className='trending-title'>TRENDING</h1>
        {check}

      </div>
    );
  }
}

export default Trending;
