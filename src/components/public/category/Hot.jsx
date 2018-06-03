import React, { Component } from 'react';
import './Hot.css';
import { Link } from 'react-router-dom';
import steem from 'steem';

class Hot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hot: []
    }
    this.fetchHot = this.fetchHot.bind(this);
    this.addDefaultSrc = this.addDefaultSrc.bind(this)
  }

  fetchHot() {
    var query = {
      tag: `${this.props.theTag}`,
      limit: 100
    };
    steem.api.getDiscussionsByHotAsync(query)
      .then(res => {
        this.setState({
          hot: res
        });
      })
      .catch(err => {
        console.log('oopsie', err)
      });
  }
  addDefaultSrc(ev){
    ev.target.src = 'https://www.torbenrick.eu/blog/wp-content/uploads/2017/03/Broken-windows-theory-Applied-to-organizational-culture.jpg'
  }
  componentDidMount() {
    this.fetchHot()
  }
  componentWillReceiveProps() {
    this.fetchHot()
  }

  render() {
    let hot = (this.state.hot).length > 0 ? this.state.hot : ["not ready"] ;
    let check = (hot === this.state.hot) ? (hot.map(t => (
      <div className='post-container' key={t.id}>
        <img onError={this.addDefaultSrc} src={JSON.parse(t.json_metadata).image} alt="" className='home-pic'/>
        <p>@{t.author} | {t.title}</p>
      </div>
    ))) : (<h1 className='loader'></h1>)
    return (
      <div className='hot-container col-8'>

        <h1 className='hot-title'>HOT</h1>
        {check}
      </div>
    );
  }
}

export default Hot;
