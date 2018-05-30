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
    this.fetchTrending = this.fetchTrending.bind(this);
  }

  fetchTrending() {
    steem.api.getStateAsync('trending')
      .then(data => console.log(data))
      .catch(console.log)
  }

  componentDidMount() {
    this.fetchTrending()
  }

  render() {
    return (
      <div className='trending-container col-8'>

        <h1 className='trending-title'>TRENDING</h1>

      </div>
    );
  }
}

export default Trending;
