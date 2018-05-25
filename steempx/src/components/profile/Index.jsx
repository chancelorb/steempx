import React, { Component } from 'react';
import './Index.css';
import { Link } from 'react-router-dom';
import Profile from './Profile';


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    }
  }


  render() {
    console.log(this.state.user);
    return (
      <div className='index'>

        <h1>Profile!!!</h1>
        <Profile />

      </div>
    );
  }
}

export default Index;
