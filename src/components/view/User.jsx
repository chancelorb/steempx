import React, { Component } from 'react';
import './User.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import steem from 'steem';
import ViewFollowers from './viewInfo/ViewFollowers';
import ViewFollowing from './viewInfo/ViewFollowing';
import ViewPosts from './viewInfo/ViewPosts';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: [],
      loading: true,
      noUser: false,
      userloaded: false,
      viewName: ''
    }
    this.fetchUser = this.fetchUser.bind(this);
    this.handleInfoSwitch = this.handleInfoSwitch.bind(this);
  }

  handleInfoSwitch() {
    this.setState({
      loading: true,
    })
  }

  fetchUser() {
    console.log("activated")
    steem.api.getAccountsAsync([this.props.match.params.id])
      .then(res => {
        console.log(res[0].posting)
        this.setState({
          loading: false,
          view: {...JSON.parse(res[0].json_metadata)},
          viewName: res[0].name,
          userloaded: true
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          loading: false,
          noUser: true
        })
      })

  };

  componentDidMount() {
    this.fetchUser()
  }

  render () {
    let loading = <div className='loader-container'><div className='loader'></div></div>;
    let noUser = this.state.noUser ? (<div className="loader-container">NOt found!</div>) : "";
    let view = this.state.userloaded ? (<div className='loader-container'><div className='Profile row'>
      <div className='col-2'></div>
      <div className='col-3 profile-image-container' >
        <img src={this.state.view.profile.profile_image} className='profile-image' />
      </div>
      <div className='profile-info-disc col-2'>
        <h3 >Name:  </h3>
        <h3 >Location: </h3>
        <h3 >About:</h3>
      </div>
      <div className='profile-info col-5'>
        <h3 >{this.state.view.profile.name}</h3>
        <h3 >{this.state.view.profile.location}</h3>
        <h3 >{this.state.view.profile.about}</h3>
      </div>
    </div><div className='profile-info-cat row bg-light'>
      <div className='col-1'></div>
      <Link onClick={() => {this.handleInfoSwitch()}} to={`/user/${this.state.viewName}/followers`} className='col-1'>Followers</Link>
      <Link onClick={() => {this.handleInfoSwitch()}} to={`/user/${this.state.viewName}/following`} className='col-1'>Following</Link>
      <Link onClick={() => {this.handleInfoSwitch()}} to={`/user/${this.state.viewName}/posts`} className='col-1'>Posts</Link>
    </div><div className='row'>
      <div className='col-2'></div>
      <Switch>

        <Route exact path={`/user/${this.state.viewName}/followers`} render={(props) => (<ViewFollowers {...props} user={this.state.viewName} /> )} />
        <Route exact path={`/user/${this.state.viewName}/following`} render={(props) => (<ViewFollowing {...props} user={this.state.viewName} /> )} />
        <Route exact path={`/user/${this.state.viewName}/posts`} render={(props) => (<ViewPosts {...props} curUser={this.state.viewName} me={this.props.curUser}/> )} />
        <Route exact path={`/user/${this.state.viewName}`} render={(props) => (<ViewPosts {...props} curUser={this.state.viewName} me={this.props.curUser}/> )} />


      </Switch>
      <div className='col-2'>Links
        <hr />
        <div className='side-tags'><Link to={`/`}> <div>Home</div></Link></div>
      </div>

    </div></div> ) : "";
    return (
      <div className='user-info'>
      {this.state.loading && loading}
      {this.state.noUser && noUser}
      {this.state.userloaded && view}

      </div>
    );
  };
}

export default User;
