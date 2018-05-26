import React, { Component } from 'react';
import './Home.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import New from './New';

class Home extends Component {
  render() {
    return (
      <div className='home-container'>
        <div className='home'>
          <div className='home-text'>
            <h1><span className='home-red'>Create,</span>  <span className='home-green'>Share,</span>   <span className='home-blue'>Get Steem</span></h1>
          </div>
        </div>
        <New />
      </div>
    );
  }
}

export default Home;
