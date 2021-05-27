import React, { Component } from 'react';
import './../main.css';
import {FaSearch} from 'react-icons/lib/fa';

import { Link } from "react-router-dom";


class SearchButton extends Component {
      render() {

        return (
          <div className='SeachButton' style={this.props.color}>
            <FaSearch className='iconSearch' />
            <Link to = {'/search'}>
            <span onClick = {e => console.log(this.props.keyword)} >Search</span>
            </Link>
          </div>
        );
      }
}

export default SearchButton;