import React, { Component } from 'react';
import './headerStyle.css';
import { Link } from "react-router-dom";


class SearchButton extends Component {
      render() {

        return (
          <div className='SeachButton' style={this.props.color}>
            <Link to = {'/search'}>
            <button type="button" onClick = {e => console.log(this.props.keyword)} >Search</button>
            </Link>
          </div>
        );
      }
}

export default SearchButton;