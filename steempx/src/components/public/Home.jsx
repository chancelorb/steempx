import React, { Component } from 'react';
import './Home.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import New from './category/New';
import Hot from './category/Hot';
import Promoted from './category/Promoted';
import Trending from './category/Trending';
import steem from 'steem';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      trendingTags: []
    }

    this.fetchTags = this.fetchTags.bind(this);
    this.tagfunc = this.tagfunc.bind(this);
  }

  fetchTags() {
    steem.api.getTrendingTagsAsync('', 100)
      .then(res => {
        this.setState({
          trendingTags: res
        });
      })
      .catch(err => {
        console.log('oopsie', err);
      })
  }

  handleKeyPress(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      console.log('do validate');
    }
  }
  tagfunc(num, type) {
    const arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(`${type} nr ${i}.`)
    }
    return arr
  }
  componentDidMount() {
    this.fetchTags();
  }
  render() {
    // const tags = this.tagfunc(25, 'tag');
    const ads = this.tagfunc(35, 'advertisement')
    const tags = (this.state.trendingTags).length > 1 ? this.state.trendingTags : ["Loading..."]
    return (
      <div className='home-container'>
        <div className='home'>
          <div className='home-text'>
            <h1><span className='home-red'>Create,</span>  <span className='home-green'>Share,</span>   <span className='home-blue'>Get Steem</span></h1>
          </div>
          <div className="row">
            <div className="col-3" ></div>
            <div className="form-group col-6 user-box">
              <input placeholder='What tag are you looking for?' className="form-control" type="text" onKeyPress={this.handleKeyPress}></input>
            </div>
           </div>
        </div>
        <div className='row home-render'>
          <div className='col-2 home-side-render'>trending tags
            <hr />
            {tags.map(t => (
              <div>{t.name}</div>
            ))}
          </div>
          <Switch>

            <Route exact path='/new' component={() => (<New /> )} />
            <Route exact path='/hot' component={() => (<Hot /> )} />
            <Route exact path='/promoted' component={() => (<Promoted /> )} />
            <Route exact path='/trending' component={() => (<Trending /> )} />
            <Route path='/' component={() => (<New /> )} />


          </Switch>
          <div className='col-2 home-side-render'>ads
            <hr />
            {ads.map(a => (
              <div>{a}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
