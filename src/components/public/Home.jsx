import React, { Component } from 'react';
import './Home.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import New from './category/New';
import Hot from './category/Hot';
import Promoted from './category/Promoted';
import Trending from './category/Trending';
import steem from 'steem';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      trendingTags: [],
      theTag: 'steempx',
      user: "",
      redirect: false
    }
    this.submitFunc = this.submitFunc.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // fetchTags() {
  //   steem.api.getTrendingTagsAsync('', 100)
  //     .then(res => {
  //       this.setState({
  //         trendingTags: res
  //       });
  //     })
  //     .catch(err => {
  //       console.log('oopsie', err);
  //     })
  // }
  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  submitFunc(e) {
    e.preventDefault();
    this.setState({
      redirect: true
    })

  }

  render() {
    const tags = (this.state.trendingTags).length > 1 ? this.state.trendingTags : ["Loading..."]
    return (
      <div>
      {this.state.redirect && <Redirect to={`/user/${this.state.user}`} />}
      <div className='home-container'>
        <div className='home'>
          <div className='home-text'>
            <h1><span className='home-red'>Create,</span>  <span className='home-green'>Share,</span>   <span className='home-blue'>Get Steem</span></h1>
          </div>
          <div className="row">
            <div className="col-3" ></div>
            <form onSubmit={this.submitFunc} className="form-group col-6 user-box">
              <input placeholder='Search for friends' className="form-control" type="text" name='user' onKeyPress={this.handleInputChange}></input>
            </form>
           </div>
        </div>
        <div className='row home-render'>

          <Switch>

            <Route exact path='/new' render={(props) => (<New {...props} user={this.props.curUser} theTag={this.state.theTag} /> )} />
            <Route exact path='/hot' render={(props) => (<Hot {...props} user={this.props.curUser} theTag={this.state.theTag} /> )} />
            <Route exact path='/promoted' render={(props) => (<Promoted {...props} user={this.props.curUser} theTag={this.state.theTag}/> )} />
            <Route exact path='/trending' render={(props) => (<Trending {...props} user={this.props.curUser} theTag={this.state.theTag}/> )} />
            <Route path='/' render={(props) => (<New {...props} user={this.props.curUser} theTag={this.state.theTag} /> )} />


          </Switch>

        </div>
      </div>
      </div>
    );
  }
}

export default Home;
