import React, { Component } from 'react';
import './Index.css';
import { Link } from 'react-router-dom';
import Profile from './Profile';


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      loaded: this.props.loaded
    }
  }


  render() {
    console.log("User: ", this.state.user);
    console.log("loaded: ", this.state.user);
    let loaded = this.state.loaded ? (<Profile user={this.state.user} loaded={this.state.loaded}/>) : (<h1>Loading...</h1>)
    return (
      <div className='index'>

        <h1>Profile!!!</h1>
        {loaded}

      </div>
    );
  }
}

export default Index;
