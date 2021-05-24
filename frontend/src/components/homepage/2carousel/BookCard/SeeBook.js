import React, { Component } from 'react';
import '../carouselStyle.css';

class SeeBook extends Component{
  onButtonClick() {
    console.log("Not yet developed")
  }
  render() {
    return (
      <div onClick={this.onButtonClick} className='SeeBook' style={this.props.color}>
        <button style={this.props.color}>Add to cart</button>
      </div>
    );
  }
}

export default SeeBook;