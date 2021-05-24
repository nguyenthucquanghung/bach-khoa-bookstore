import React, { Component } from 'react';
import '../carouselStyle.css';
import SeeBook from './SeeBook';

class BookInfo extends Component {
  render() {
    const textColor = '#FFFFFF';
    return (
      <div className='Info'>
        <h1>{this.props.titel}</h1>
        <p className='Author'>Tác giả: {this.props.author}</p>
        <p className='Price'> Giá: {this.props.price}</p>
        <p className='Description'>{this.props.description}</p>
        <SeeBook color={this.props.color}></SeeBook>
      </div>
    );
  }
}

export default BookInfo;