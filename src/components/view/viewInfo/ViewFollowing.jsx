import React, { Component } from 'react';
import './ViewFollowing.css';
import { Link } from 'react-router-dom';
import steem from 'steem';

class ViewFollowing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: [{follower: "please wait"}, {follower: "loading..."}],
      user: this.props.user,
      r: ''
    }
    this.fetchFollowing = this.fetchFollowing.bind(this);
  }

  fetchFollowing() {
    steem.api.getFollowing(this.state.user, this.state.r, 'blog', 1000, (err, res) => {

      this.setState({
        followers: res
      })
    });
  }
  componentDidMount() {
    this.fetchFollowing()
  }

  render() {
    let check = (this.state.followers).length > 0 ? ((this.state.followers).length) : (<h1 className='loader'>Loading...</h1>);
    let followers = this.state.followers;
    return (
      <div className='following-container col-8'>

        <h1 className='following-title'>Following({check})</h1>
        {followers.map(a => (
          <div className="folowers-display" key={a.following}>{a.following}</div>
        ))}

      </div>
    );
  }
}

export default ViewFollowing;
