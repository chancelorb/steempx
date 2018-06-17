import React, { Component } from 'react';
import './Profile.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';



class Profile extends Component {
  render() {
    return (
      <div>
      <div className='Profile row'>
        <div className='col-2'></div>
        <div className='col-md-3 profile-image-container' >
          <img src={this.props.user.profile.profile_image} className='profile-image' />
        </div>
        <div className='profile-info-disc col-md-2'>
          <h3 >Name:  </h3>
          <h3 >Location: </h3>
          <h3 >About:</h3>
        </div>
        <div className='profile-info col-md-5'>
          <h3 >{this.props.user.profile.name}</h3>
          <h3 >{this.props.user.profile.location}</h3>
          <h3 >{this.props.user.profile.about}</h3>
        </div>
      </div>
      </div>
    );
  }
}

export default Profile;
