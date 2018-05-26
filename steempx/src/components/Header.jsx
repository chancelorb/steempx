import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../assets/spLogo.png';

class Header extends Component {
  render() {
    let userImage = this.props.loaded ? this.props.user.profile.profile_image : "";
    console.log(userImage);
    return (
      <div className='nav-bar'>

        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand logo" to="/"><img src={logo} className='logo-pic' /></Link>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-item nav-link left active" to="/">Trending <span className="sr-only">(current)</span></Link>
              <Link className="nav-item nav-link left" to="#">New</Link>
              <Link className="nav-item nav-link right" to="/profile">Hot</Link>
              <Link className="nav-item nav-link right" to="#">Promoted</Link>
            </div>
          </div>
          <Link to='/profile'> <img src={userImage} alt="" className='nav-pic'/></Link>
        </nav>

      </div>
    );
  }
}

export default Header;
