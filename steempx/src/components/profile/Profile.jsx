import React, { Component } from 'react';
import './Profile.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';



class Profile extends Component {
  render() {
    return (
      <div>
      <div className='Profile row'>
        <div className='col-3'></div>
        <div className='col-3 profile-image-container' >
          <img src={this.props.user.profile.profile_image} className='profile-image' />
        </div>
        <div className='profile-info col-6'>
          <h3>Name: {this.props.user.profile.name}</h3>
          <h3>Location: {this.props.user.profile.location}</h3>
          <h3>About: {this.props.user.profile.about}</h3>
        </div>
      </div>
      </div>
    );
  }
}

export default Profile;
