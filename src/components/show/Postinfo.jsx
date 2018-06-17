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

const Postinfo = (props) =>  {
  console.log(props.pic.all)
  const Style = {
    overflow: 'scroll',
  }
  return (
    <div className='zoom-pic' key={props.pic.all.id}>


        <Card style={Style} className='real-card'>
          <div className='zoom-info-bar'>
            <div className='exit-zoom'onClick={props.func}><h1>x</h1></div>
          </div>

          <img onError={this.addDefaultSrc} src={props.pic.img_url} className='zoom-not-home-pic'/>

          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              <small>More From: </small><Link to={`/user/${props.pic.author}`}>@{props.pic.author}</Link>
            </Typography>
            <Typography component="p">
              {props.pic.all.title}
            </Typography>
          </CardContent>
          <div>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>

              | ^{props.pic.all.net_votes} |


              ${props.pic.all.pending_payout_value}

          </div>
        </Card>
    </div>
  );
}


export default Postinfo;


/* <div className='zoom-info-bar'>
  <div className='zoom-auth-name' ><h1><Link to={`/user/${props.pic.author}`}><small>More From: @</small>{props.pic.author}</Link></h1></div>
  <div className='exit-zoom'onClick={props.func}><h1>x</h1></div>
</div>
<div className='zoom-pic-img'>
  <img src={props.pic.img_url}/>
</div> */
