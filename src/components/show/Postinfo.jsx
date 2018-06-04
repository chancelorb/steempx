import React, { Component } from 'react';
import './Postinfo.css';
import { Link } from 'react-router-dom';

const Postinfo = (props) =>  {
  return (
    <div className='zoom-pic'>
      <div className='zoom-info-bar'>
        <div className='zoom-auth-name' ><h1><Link to={`/user/${props.pic.author}`}><small>More From: @</small>{props.pic.author}</Link></h1></div>
        <div className='exit-zoom'onClick={props.func}><h1>x</h1></div>
      </div>
      <div className='zoom-pic-img'>
        <img src={props.pic.img_url}/>
      </div>
    </div>
  );
}


export default Postinfo;
