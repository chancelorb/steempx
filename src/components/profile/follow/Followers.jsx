import React, { Component } from 'react';
import './Followers.css';
import { Link } from 'react-router-dom';
import steem from 'steem';

class Followers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: [{follower: "please wait"}, {follower: "loading..."}],
      user: this.props.user,
      r: ''
    }
    this.fetchFollowers = this.fetchFollowers.bind(this);
  }
  fetchFollowers() {
    steem.api.getFollowers(this.state.user, this.state.r, 'blog', 1000, (err, res) => {
      this.setState({
        followers: res
      })
    });
  }
  componentDidMount() {
    this.fetchFollowers()
  }

  render() {
    let check = (this.state.followers).length > 0 ? ((this.state.followers).length) : (<h1>Loading...</h1>);
    let followers = this.state.followers;
    return (
      <div className='followers-container col-8'>

        <h1 className='followers-title'>Followers({check})</h1>
        {followers.map(a => (
          <div className="folowers-display" key={a.follower}>{a.follower}</div>
        ))}

      </div>
    );
  }
}

export default Followers;
