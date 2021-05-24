import React, { Component } from 'react';
import './bookStyle.css';
import BookCover from './BookCover';
import BookInfo from './BookInfo';


class Book extends Component{
  constructor(props) {
		super(props);
	}

  render() {
    return (
      <div className='Book'>
        <BookCover img={this.props.img}></BookCover>
        <BookInfo name={this.props.name} author={this.props.author} price={this.props.price} description={this.props.description}></BookInfo>

      </div>
    );
  }
}

export default Book;