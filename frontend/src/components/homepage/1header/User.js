import React, { Component } from 'react';
import './headerStyle.css';
import UserImg from './girl.png';
import {Link} from 'react-router-dom';

class User extends Component {
  render() {
    return (
      <div className='User'>
        <div className='UserPictire'>
          <img src={UserImg}/>
        </div>
        <div>
          <p><Link to={"/login"}>Login</Link></p>
        </div>
      </div>
    );
  }
}

export default User;