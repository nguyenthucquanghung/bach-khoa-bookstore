import React, { Component } from 'react';
import './headerStyle.css';
import {FaSearch} from 'react-icons/lib/fa';
import SeachButton from './SearchButton';

class SearchBook extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }
  myChangeHandler = (event) => {
    this.setState({username: event.target.value});
  }
  render() {
    return (
      <div className='SearchBook'>
        <FaSearch className='iconSearch'/>
        <input type='text' onChange={this.myChangeHandler} placeholder = "Seach books"/>
        <SeachButton keyword = {this.state.username}/>
      </div>
      
    );
  }
}

export default SearchBook;