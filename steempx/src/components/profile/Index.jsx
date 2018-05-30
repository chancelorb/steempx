import React, { Component } from 'react';
import './Index.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Profile from './Profile';
import Followers from './follow/Followers';
import Following from './follow/Following';
import Muted from './follow/Muted';
import steem from 'steem';


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      loaded: this.props.loaded,
      trendingTags: []
    }
    this.tagfunc = this.tagfunc.bind(this);
    this.fetchTags = this.fetchTags.bind(this);
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
    const tags = (this.state.trendingTags).length > 1 ? this.state.trendingTags : ["Loading..."];
    const ads = this.tagfunc(35, 'advertisement');
    console.log("tester", this.props.curUser)
    let loaded = this.state.loaded ? (<Profile user={this.state.user} loaded={this.state.loaded} curUser={this.props.curUser}/>) : (<h1>Loading...</h1>)
    return (
      <div className='index'>

        {loaded}
        <div className='profile-info-cat row bg-light'>
          <div className='col-1'></div>
          <Link to={`/@${this.props.curUser}/followers`} className='col-1'>Followers</Link>
          <Link to={`/@${this.props.curUser}/following`} className='col-1'>Following</Link>
          <Link to={`/@${this.props.curUser}/muted`} className='col-1'>Muted</Link>
        </div>
        <div className='row'>
          <div className='col-2'>tags
            <hr />
            {tags.map(t => (
              <div>{t.name}</div>
            ))}
          </div>
          <Switch>

            <Route exact path={`/@${this.props.curUser}/followers`} render={(props) => (<Followers {...props} user={this.props.curUser} /> )} />
            <Route exact path={`/@${this.props.curUser}/following`} render={(props) => (<Following {...props} user={this.props.curUser} /> )} />
            <Route exact path={`/@${this.props.curUser}/muted`} component={() => (<Muted /> )} />
            <Route exact path={`/@${this.props.curUser}`} render={(props) => (<Followers {...props} user={this.props.curUser} /> )} />

          </Switch>
          <div className='col-2'>ads
            <hr />
            <Link to={`/@${this.props.curUser}`}> <div>Blog</div></Link>
            <Link to={`/@${this.props.curUser}`}> <div>Blog</div></Link>
            <Link to={`/@${this.props.curUser}`}> <div>Blog</div></Link>
          </div>

        </div>

      </div>
    );
  }
}

export default Index;
