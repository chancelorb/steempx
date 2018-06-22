import React, { Component } from 'react';
import './Postinfo.css';
import { Link } from 'react-router-dom';
import steem from 'steem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

class Postinfo extends Component  {
  constructor(props) {
    super(props)
    this.state = {
      wif: '',
      wifForm: false,
      loading: false,
      loaded: false,
      login: false,
      wrongP: false,
    }
    this.likePic = this.likePic.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.picForm = this.picForm.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
			[name]: value
		})
  }


  picForm(e) {
    e.preventDefault();
    this.setState({
      loading: true,
      wrongP: false
    })
    steem.broadcast.vote(this.state.wif, this.props.pic.user, this.props.pic.author, this.props.pic.all.permlink, 10000, (err, res) => {
    	if (!err) {
        this.setState({
            wifForm: false,
            loading: false
        })
        this.props.likeFunc();
      }
      if (err) {
        if (err.name === "AssertionError") {
          this.setState({
            loading: false,
            wrongP: true
          })
        } else if (err.cause === "Error") {
          console.log("You already liked this")

        }
      }

    });

  }


  likePic(e) {
    e.preventDefault();
    if (!this.props.pic.user) {
      this.setState({
        login: true,
        wifForm: true
      })
    } else {
      this.setState({
        wifForm: true
      })
    }

  }




  render() {
    console.log(this.state.wif)
    const wrongP = (<h3 className="rood">Password and Username don't match, please try again</h3>);
    const login = (<h1>PLEASE LOG IN FIRST</h1>);
    const Style = {
      overflow: 'scroll',
    }
    let card = (<Card style={Style} className='real-card'>
      <div className='zoom-info-bar'>
        <div className='exit-zoom' onClick={this.props.func}><h1>x</h1></div>
      </div>

      <img onError={this.addDefaultSrc} src={this.props.pic.img_url} className='zoom-not-home-pic'/>

      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          <small>More From: </small><Link to={`/user/${this.props.pic.author}`}>@{this.props.pic.author}</Link>
        </Typography>
        <Typography component="p">
          {this.props.pic.all.title}
        </Typography>
      </CardContent>
      <div>
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon onClick={this.likePic} />
        </IconButton>

          | ^{this.props.pic.all.net_votes} |


          ${this.props.pic.all.pending_payout_value}

      </div>
    </Card>);
    let form = this.state.loading ? (<div className='form-div col-12'><div className='loader'></div></div>) : (<div className='form-div col-12'><form onSubmit={this.picForm} className="form-group">
      {this.state.login && login}
      {this.state.wrongP && wrongP}
      <label>
        Posting Key
      <input placeholder='Posting Key' className="form-control" type="password" name='wif' onChange={this.handleInputChange}></input>
      </label>
      <br />

      <button type='submit'>Like</button>
    </form></div>)
    return (
      <div className='zoom-pic' key={this.props.pic.all.id}>
          {this.state.wifForm && form}
          {card}
      </div>
    );
  }

}


export default Postinfo;
