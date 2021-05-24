import React, { Component } from 'react';
import '../carouselStyle.css';
import Cover from './Cover';
import Info from './Info';


class BookCard extends Component {
  render() {
    return (
      <div className='BookCard' style={this.props.style}>
        <Cover img={this.props.bookInfo.image}></Cover>
        <Info titel={this.props.bookInfo.name} author={this.props.bookInfo.author} price={this.props.bookInfo.price} description={this.props.bookInfo.description}></Info>
      </div>
    );
  }
}

export default BookCard;