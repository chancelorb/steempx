import React, { Component } from 'react';
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
import './AuthForm.css'

class AuthForm extends Component {
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

    this.handleLike = this.handleLike.bind(this);
    this.picForm = this.picForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  }
  //sent user props to this component
  handleLike(e) {
    console.log(this.props.t)
    e.preventDefault();
    if (!this.props.user) {
      this.setState({
        login: true,
        wifForm: !this.state.wifForm
      })
    } else {
      this.setState({
        wifForm: !this.state.wifForm
      })
    }
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
    steem.broadcast.vote(this.state.wif, this.props.user, this.props.t.author, this.props.t.permlink, 10000, (err, res) => {
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

  render() {
    console.log(this.props.t)
    let card = (<Card>
        <img onError={this.addDefaultSrc} src={JSON.parse(this.props.t.json_metadata).image} className='not-home-pic'/>

        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {this.props.t.title}
          </Typography>
        </CardContent>
        <div>

          <IconButton aria-label="Add to favorites">
            <FavoriteIcon onClick={this.handleLike}/>
          </IconButton>


          | ^{this.props.t.net_votes} |


            ${this.props.t.pending_payout_value}

        </div>

      </Card>)
    const wrongP = (<h3 className="rood">Password and Username don't match, please try again</h3>);
    const login = (<h1>PLEASE LOG IN FIRST</h1>);
    let form = this.state.loading ? (<div className='form-div col-12'><div className='loader'></div></div>) : (<div className='for-auth'><form onSubmit={this.picForm} className="form-group">
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
      <div className='card-container' key={this.props.t.id}>
        {this.state.wifForm && form}
        {card}
      </div>
    );
  }
}

export default AuthForm;
