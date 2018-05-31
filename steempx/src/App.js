import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Index from './components/profile/Index';
import Home from './components/public/Home';
import steem from 'steem';

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
      this.setState ({
        user : {...JSON.parse(resp[0].json_metadata)},
        loaded : true
      })
    })) : "";
  };

  // fetchHot() {
  //   steem.api.getDiscussionsByHot(['hot'], function(err, result) {
  //     console.log("this is the hot fetch", err, result);
  //   });
  // }

  fetchDevinfo() {
    // let query = { limit : 3, tag : "steem" };
    // steem.api.getTrendingTags("steem", 3, (err, data) => {
    // 	console.log(err, data);
    // })
    steem.api.getStateAsync('trending/steemdev')
      .then(r => console.log(JSON.stringify(r,null,2)))
      .catch(console.log)
  };

  // fetchTrending() { ---------------This is in trending!
  //   steem.api.getStateAsync('trending')
  //     .then(data => console.log(JSON.stringify(data)))
  //     .catch(console.log)
  // }

  handleLogin(name) {
    // console.log(name.profile.name)
    this.setState({
      curUser: name.profile.name
    });
    this.fetchUser();
  }
  createPost(post) {
    fetch('http://localhost:3001/api/pic/new', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'content-type': 'application/json'
      }
    })
  }

  componentDidMount() {
    this.fetchUser()
    // this.fetchHot()
    // this.fetchTrending()
  }

  render() {
    let curUser = (this.state.curUser).length > 1 ? this.state.curUser : "";
    console.log("ik ben curUser: ", curUser)
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

          <Route exact path='/' component={(props) => (<Home  {...props} curUser={this.state.curUser}/> )} />
          <Route exact path='/:id' component={(props) => (<Home {...props} curUser={this.state.curUser} /> )} />

        </Switch>

      </div>
    );
  }
}

export default App;
