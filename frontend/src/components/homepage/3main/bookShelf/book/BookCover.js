import React, { Component } from 'react';
import './bookStyle.css';

class BookCover extends Component{
  render() {
    return (
      <div className='BookCover'>
        <img src={this.props.img} />
      </div>
    );
  }
}

export default BookCover;