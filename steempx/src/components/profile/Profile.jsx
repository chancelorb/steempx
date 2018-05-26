import React, { Component } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';


class Profile extends Component {
  render() {
    return (
      <div className='Profile'>

        <img src={this.props.user.profile.profile_image} className='profile-image' />
        <h3>Name: {this.props.user.profile.name}</h3>
        <h3>Location: {this.props.user.profile.location}</h3>
        <h3>About: {this.props.user.profile.about}</h3>

      </div>
    );
  }
}

export default Profile;
