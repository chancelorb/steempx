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
      user: [],
      loaded: false
    }

  }

  fetchUser() {
    steem.api.getAccounts(['chanceb'], (err, resp) => {
      this.setState ({
        user : {...JSON.parse(resp[0].json_metadata)},
        loaded : true
      })
    })
  };

  componentDidMount() {
    this.fetchUser()
  }

  render() {
    return (
      <div className="App">
        <Header
          user={this.state.user}
          loaded={this.state.loaded}
        />
        <Switch>

          <Route exact path='/profile' component={(props) => (
            <Index
              {...props}
              user={this.state.user}
              loaded={this.state.loaded}
            /> )} />

          <Route path='/' component={() => (<Home /> )} />

        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
