import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../assets/spLogo.png';

class Header extends Component {
  render() {
    let user = this.props.loaded ? this.props.user.profile : "";
    let curUser = (this.props.curUser).length > 1 ? this.props.curUser : "";
    console.log(curUser);
    return (
      <div className='nav-bar'>

        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand logo" to="/"><img src={logo} className='logo-pic' /></Link>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-item nav-link left active" to="/trending">Trending <span className="sr-only">(current)</span></Link>
              <Link className="nav-item nav-link left active" to="/new">New</Link>
              <Link className="nav-item nav-link right active" to="/hot">Hot</Link>
              <Link className="nav-item nav-link right active" to="/promoted">Promoted</Link>
            </div>
          </div>
          <Link to={`/@${curUser}`}> <img src={user.profile_image} alt="" className='nav-pic'/></Link>
        </nav>

      </div>
    );
  }
}

export default Header;
