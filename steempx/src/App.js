import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Index from './components/profile/Index';
import Home from './components/Home';
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
      console.log(err, resp)
    })
  };

  // steem.api.setOptions({ url: 'https://api.steemit.com' })
  // steem.api.getAccounts(['chanceb'], (err, result) => {
  //   this.result = {...JSON.parse(result[0].json_metadata)}
  //   console.log('touched', result)
  //   this.loaded = true
  // })

  // .then(resp => {
  //     if (!resp.ok) {
  //       throw Error('oops: ', resp.message);
  //     }
  //     return resp.json();
  //   }).then(data => this.setState ({
  //       user: data,
  //       loaded: true
  //   })).catch(err => console.log(`error: ${err}`))
  // })

  componentDidMount() {
    this.fetchUser()
  }

  render() {
    return (
      <div className="App">
        <Header />
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
