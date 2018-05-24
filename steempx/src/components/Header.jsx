import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className='nav-bar'>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-item nav-link left" to="/">Home <span className="sr-only">(current)</span></Link>
              <Link className="nav-item nav-link left" to="#">Skils</Link>
              <Link className="navbar-brand logo" to="/">LOGO</Link>
              <Link className="nav-item nav-link right" to="/profile">Profile</Link>
              <Link className="nav-item nav-link right" to="#">Contact</Link>
            </div>
          </div>
        </nav>

      </div>
    );
  }
}

export default Header;
