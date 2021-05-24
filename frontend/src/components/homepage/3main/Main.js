import React, { Component } from 'react';
import BookShelf from './bookShelf/BookShelf';

class Main extends Component {
  render() {
    return (
      <div className='Main'>
        <BookShelf></BookShelf>
      </div>
    );
  }
}

export default Main;