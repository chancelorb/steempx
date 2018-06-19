import React, { Component } from 'react';
import './Postinfo.css';
import { Link } from 'react-router-dom';
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
  }
  render() {
    console.log(this.props)
    const Style = {
      overflow: 'scroll',
    }
    return (
      <div className='zoom-pic' key={this.props.pic.all.id}>


          <Card style={Style} className='real-card'>
            <div className='zoom-info-bar'>
              <div className='exit-zoom'onClick={this.props.func}><h1>x</h1></div>
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
                <FavoriteIcon />
              </IconButton>

                | ^{this.props.pic.all.net_votes} |


                ${this.props.pic.all.pending_payout_value}

            </div>
          </Card>
      </div>
    );
  }

}


export default Postinfo;


/* <div className='zoom-info-bar'>
  <div className='zoom-auth-name' ><h1><Link to={`/user/${props.pic.author}`}><small>More From: @</small>{props.pic.author}</Link></h1></div>
  <div className='exit-zoom'onClick={props.func}><h1>x</h1></div>
</div>
<div className='zoom-pic-img'>
  <img src={props.pic.img_url}/>
</div> */
