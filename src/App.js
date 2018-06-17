import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Index from './components/profile/Index';
import Home from './components/public/Home';
import User from './components/view/User'
import steem from 'steem';
const BASE_URL = "https://mysterious-lowlands-62415.herokuapp.com/"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curUser: '',
      user: [],
      loaded: false
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  fetchUser() {
    let curUser = (this.state.curUser).length > 1 ? (
    steem.api.getAccounts([this.state.curUser], (err, resp) => {
      console.log(resp, "ik ben de ingelogde")
      this.setState ({
        user : {...JSON.parse(resp[0].json_metadata)},
        loaded : true
      })
    })) : "";
  };

  handleLogin(name) {
    this.setState({
      curUser: name.profile.name
    });
    this.fetchUser();
  }
  createPost(post) {
    fetch(`${BASE_URL}api/pic/new`, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'content-type': 'application/json'
      }
    })
  }

  componentDidMount() {
    this.fetchUser()
  }

  render() {
    let curUser = (this.state.curUser).length > 1 ? this.state.curUser : "";
    return (
      <div className="App">
        <Header
          user={this.state.user}
          loaded={this.state.loaded}
          curUser={this.state.curUser}
          subFunc={this.handleLogin}
        />
        <Switch>

          <Route exact path={`/@${curUser}`} component={(props) => (
            <Index
              {...props}
              user={this.state.user}
              loaded={this.state.loaded}
              curUser={this.state.curUser}
            /> )} />
          <Route exact path={`/@${curUser}/:id`} component={(props) => (
            <Index
              {...props}
              user={this.state.user}
              loaded={this.state.loaded}
              curUser={this.state.curUser}
              onSubmit={this.createPost}
            /> )} />
          <Route exact path='/user/:id/:sel' component={(props) => (
            <User  {...props}
              curUser={this.state.curUser}
            /> )} />
          <Route exact path='/user/:id' component={(props) => (
            <User  {...props}
              curUser={this.state.curUser}
            /> )} />

          <Route exact path='/' component={(props) => (<Home  {...props} curUser={this.state.curUser}/> )} />
          <Route exact path='/:id' component={(props) => (<Home {...props} curUser={this.state.curUser} /> )} />

        </Switch>

      </div>
    );
  }
}

export default App;
