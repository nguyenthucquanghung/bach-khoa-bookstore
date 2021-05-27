import React, { Component } from 'react';
import './bookStyle.css';
import SeeBook from '../../../2carousel/BookCard/SeeBook';

class BookInfo extends Component{
  render(){
    return (
      <div className='BookInfo'>
        <h1>{this.props.name}</h1>
        <p className='AuthorMain'>Tác giả: {this.props.author}</p>
        <p className='PriceMain'>Giá: {this.props.price}</p>
        <p className='DescriptionMain'>{this.props.description}</p>
        <SeeBook/>
      </div>
    );
  }
}

export default BookInfo;
