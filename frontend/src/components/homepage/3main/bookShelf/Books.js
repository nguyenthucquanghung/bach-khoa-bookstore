import React, { Component } from 'react';
import '../main.css';
import Book from './book/Book';


class Books extends Component {
  render() {
    let bookCards = [];
    for (let i=0; i<this.props.books.length; i++) {
      bookCards.push(<Book key={i} name={this.props.books[i].name} img={this.props.books[i].image} 
        author={this.props.books[i].author} price ={this.props.books[i].price} description={this.props.books[i].description} ></Book>);
    }
    return (
      <div className='Books'>
        {bookCards}
      </div>
    );
  }
}

export default Books;