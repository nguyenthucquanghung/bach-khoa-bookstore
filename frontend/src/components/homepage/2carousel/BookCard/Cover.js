import React, { Component } from 'react';
import '../carouselStyle.css';

class Cover extends Component{
  render() {
    return (
      <div className='Cover'>
        <img src={this.props.img} />
      </div>
    );
  }
}

export default Cover;