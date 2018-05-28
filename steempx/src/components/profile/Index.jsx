import React, { Component } from 'react';
import './Index.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Profile from './Profile';
import Followers from './follow/Followers';
import Following from './follow/Following';
import Muted from './follow/Muted';


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      loaded: this.props.loaded
    }
    this.tagfunc = this.tagfunc.bind(this);
  }

  tagfunc(num, type) {
    const arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(`${type} nr ${i}.`)
    }
    return arr
  }
  render() {
    const tags = this.tagfunc(25, 'tag');
    const ads = this.tagfunc(35, 'advertisement')
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
              <div>{t}</div>
            ))}
          </div>
          <Switch>

            <Route exact path={`/@${this.props.curUser}/followers`} component={() => (<Followers /> )} />
            <Route exact path={`/@${this.props.curUser}/following`} component={() => (<Following /> )} />
            <Route exact path={`/@${this.props.curUser}/muted`} component={() => (<Muted /> )} />
            <Route exact path={`/@${this.props.curUser}`} component={() => (<Followers /> )} />

          </Switch>
          <div className='col-2'>ads
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

export default Index;
