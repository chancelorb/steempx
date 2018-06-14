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
      trendingTags: [],
      theTag: 'steempx'
    }
    this.submitFunc = this.submitFunc.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  submitFunc(e) {
    e.preventDefault();
    this.fetchTags();

  }
  tagFunc(tag) {
    this.setState({
      theTag: tag
    })
  }

  componentDidMount() {
    this.fetchTags();
  }
  // <div className='col-2 home-side-render'>Trending Tags
  //   <hr />
  //   {tags.map(t => (
  //     <div className='side-tags'onClick={() => this.tagFunc(t.name)}>{t.name}</div>
  //   ))}
  // </div>

  // <div className='col-2 home-side-render'>Links
  //   <hr />
  //   <div className='side-tags' ><Link to={`/@${this.props.curUser}/followers`}> <div>Followers</div></Link></div>
  //   <div className='side-tags' ><Link to={`/@${this.props.curUser}/following`}> <div>Following</div></Link></div>
  //   <div className='side-tags' ><Link to={`/@${this.props.curUser}/posts`}> <div>My Posts</div></Link></div>
  //   <div className='side-tags' ><Link to={`/@${this.props.curUser}/new`}> <div>New Post</div></Link></div>
  // </div>
  render() {
    const tags = (this.state.trendingTags).length > 1 ? this.state.trendingTags : ["Loading..."]
    return (
      <div className='home-container'>
        <div className='home'>
          <div className='home-text'>
            <h1><span className='home-red'>Create,</span>  <span className='home-green'>Share,</span>   <span className='home-blue'>Get Steem</span></h1>
          </div>
          <div className="row">
            <div className="col-3" ></div>
            <form onSubmit={this.submitFunc} className="form-group col-6 user-box">
              <input placeholder='What tag are you looking for?' className="form-control" type="text" name='theTag' onKeyPress={this.handleInputChange}></input>
            </form>
           </div>
        </div>
        <div className='row home-render'>

          <Switch>

            <Route exact path='/new' render={(props) => (<New {...props} theTag={this.state.theTag} /> )} />
            <Route exact path='/hot' render={(props) => (<Hot {...props} theTag={this.state.theTag} /> )} />
            <Route exact path='/promoted' render={(props) => (<Promoted {...props} theTag={this.state.theTag}/> )} />
            <Route exact path='/trending' render={(props) => (<Trending {...props} theTag={this.state.theTag}/> )} />
            <Route path='/' render={(props) => (<New {...props} theTag={this.state.theTag} /> )} />


          </Switch>

        </div>
      </div>
    );
  }
}

export default Home;
