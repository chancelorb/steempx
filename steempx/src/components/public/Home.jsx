import React, { Component } from 'react';
import './Home.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import New from './category/New';
import Hot from './category/Hot';
import Promoted from './category/Promoted';
import Trending from './category/Trending';

class Home extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     user
  //   }
  // }

  // handleChange(e) {
	// 	const value = e.target;
	// 	this.setState((prevState, props) => ({
	// 		event: {
	// 			...prevState.event,
	// 			[name]: value
	// 		}
	// 	}))
	// }

  handleKeyPress(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      console.log('do validate');
    }
  }
  render() {
    return (
      <div className='home-container'>
        <div className='home'>
          <div className='home-text'>
            <h1><span className='home-red'>Create,</span>  <span className='home-green'>Share,</span>   <span className='home-blue'>Get Steem</span></h1>
          </div>
          <div className="row">
            <div className="col-3" ></div>
            <div className="form-group col-6 user-box">
              <input placeholder='Type User Name' className="form-control" type="text" onKeyPress={this.handleKeyPress}></input>
            </div>
           </div>
        </div>
        <Switch>

          <Route exact path='/new' component={() => (<New /> )} />
          <Route exact path='/hot' component={() => (<Hot /> )} />
          <Route exact path='/promoted' component={() => (<Promoted /> )} />
          <Route exact path='/trending' component={() => (<Trending /> )} />
          <Route exact path='/' component={() => (<New /> )} />


        </Switch>
      </div>
    );
  }
}

export default Home;
