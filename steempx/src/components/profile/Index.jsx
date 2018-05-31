import React, { Component } from 'react';
import './Index.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Profile from './Profile';
import Followers from './follow/Followers';
import Following from './follow/Following';
import Posts from './follow/Posts';
import New from './content/New';
import steem from 'steem';


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      loaded: this.props.loaded
    }
  }

  componentDidMount() {
  }
  render() {
    console.log("tester", this.props.curUser)
    let loaded = this.state.loaded ? (<Profile user={this.state.user} loaded={this.state.loaded} curUser={this.props.curUser}/>) : (<h1>Loading...</h1>)
    return (
      <div className='index'>

        {loaded}
        <div className='profile-info-cat row bg-light'>
          <div className='col-1'></div>
          <Link to={`/@${this.props.curUser}/followers`} className='col-1'>Followers</Link>
          <Link to={`/@${this.props.curUser}/following`} className='col-1'>Following</Link>
          <Link to={`/@${this.props.curUser}/posts`} className='col-1'>Posts</Link>
          <Link to={`/@${this.props.curUser}/new`} className='col-1'>New Post</Link>
        </div>
        <div className='row'>
          <div className='col-2'></div>
          <Switch>

            <Route exact path={`/@${this.props.curUser}/followers`} render={(props) => (<Followers {...props} user={this.props.curUser} /> )} />
            <Route exact path={`/@${this.props.curUser}/following`} render={(props) => (<Following {...props} user={this.props.curUser} /> )} />
            <Route exact path={`/@${this.props.curUser}/posts`} render={(props) => (<Posts {...props} curUser={this.props.curUser}/> )} />
            <Route exact path={`/@${this.props.curUser}/new`} render={(props) => (<New {...props} curUser={this.props.curUser} func={this.props.onSubmit}/> )} />
            <Route exact path={`/@${this.props.curUser}`} render={(props) => (<Posts {...props} curUser={this.props.curUser} /> )} />


          </Switch>
          <div className='col-2'>Links
            <hr />
            <Link to={`/`}> <div>Home</div></Link>
            <Link to={`/`}> <div>Home</div></Link>
            <Link to={`/`}> <div>Home</div></Link>
          </div>

        </div>

      </div>
    );
  }
}

export default Index;
