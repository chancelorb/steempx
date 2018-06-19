import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../assets/spLogo.png';
import steem from 'steem';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      userGood: false,
      userWrong: false,
      loading: false,
      goodName: false,
      wrongName: false,
      error: false
    }
    this.checkUser = this.checkUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
			[name]: value
		})
  }

  checkUser(e) {
    e.preventDefault();
    this.setState({
      loading: true
    })
    steem.api.getAccountsAsync([this.state.user], (err, res) => {
      if (err) {
        console.log("oepsie, server error try again later");
        this.setState({
          loader: false
        })
      }
      if (res.length === 1) {
        this.props.subFunc(res)
        this.setState({
          loader: false,
          userGood: true
        })
      } else {
        this.setState({
          loader: false,
          userWrong: true
        })
      }
    })
  };


  render() {
    let user = this.props.loaded ? this.props.user.profile : "";
    let loader = (<div className='loader'></div>);
    let wrongUser = (<div><p>wrong username</p></div>)
    let form = (<form onSubmit={this.checkUser} className="form-group col-3 user-box dropdown-item">
      {this.state.userWrong && wrongUser}
      <label>
        name
      <input placeholder='Username' className="form-control" type="text" name='user' onChange={this.handleInputChange}></input>
      </label>
      <br />

      <button type='submit'>login</button>
    </form>)


    let curUser = this.state.userGood ?
    (<Link to={`/@${this.props.curUser}`}> <img src={user.profile_image} alt="" className='nav-pic'/></Link>)
    :
    (<div class="dropdown">
      <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Log in
      </button>
      <div class="dropdown-menu dropdown-menu-right"  aria-labelledby="dropdownMenuButton">
        {this.state.loader && loader}
        {!this.state.loader && form}
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
