import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Index from './components/profile/Index';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>

          <Route exact path='/profile' component={() => (<Index /> )} />

          <Route path='/' component={() => (<Home /> )} />

        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
