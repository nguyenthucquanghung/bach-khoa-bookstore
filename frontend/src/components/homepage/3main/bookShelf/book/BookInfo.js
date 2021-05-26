import React, { Component } from 'react';
import './bookStyle.css';
import SeeBook from '../../../2carousel/BookCard/SeeBook';

class BookInfo extends Component{
  onAddToCart(){
    this.props.onAddToCart();
  }
  render() {
    return (
      <div className='BookInfo'>
        <h1>{this.props.name.length > 83?this.props.name.slice(0,83):this.props.name}</h1>
        <p className='AuthorMain'>Tác giả: {this.props.author}</p>
        <p className='PriceMain'>Giá: {this.props.price}</p>
        <p className='DescriptionMain'>{this.props.description}</p>
        <SeeBook onAddToCart={this.onAddToCart.bind(this)} bookId={this.props.bookId}/>
      </div>
    );
  }
}

export default BookInfo;
