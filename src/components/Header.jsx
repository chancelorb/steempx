import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../assets/spLogo.png';
import steem from 'steem';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
    this.checkUser = this.checkUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  checkUser(e) {
    e.preventDefault();
    steem.api.getAccountsAsync([this.state.name], (err, res) => {
      let check = res[0] ? true : false;
      check ? (this.props.subFunc(JSON.parse(res[0].json_metadata))) : (console.log('oepsie...'))
    })
  };

  render() {
    let user = this.props.loaded ? this.props.user.profile : "";
    let curUser = (this.props.curUser).length > 1 ?
    (<Link to={`/@${this.props.curUser}`}> <img src={user.profile_image} alt="" className='nav-pic'/></Link>)
    :
    (<div class="dropdown">
      <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Log in
      </button>
      <div class="dropdown-menu dropdown-menu-right"  aria-labelledby="dropdownMenuButton">
        <form onSubmit={this.checkUser} className="form-group col-2 user-box dropdown-item">
        <input placeholder='username' className="form-control" type="text" name='name' onChange={this.handleInputChange}></input>
      </form>
      </div>
    </div>);
    return (
      <div className='nav-bar'>

        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand logo" to="/"><img src={logo} className='logo-pic' /></Link>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-item nav-link left disabled" to="/new">Trending <span className="sr-only">(current)</span></Link>
              <Link className="nav-item nav-link left active" to="/new">New</Link>
              <Link className="nav-item nav-link right disabled" to="/new">Hot</Link>
              <Link className="nav-item nav-link right disabled" to="/new">Promoted</Link>
            </div>
          </div>
          {curUser}
        </nav>

      </div>
    );
  }
}

export default Header;
