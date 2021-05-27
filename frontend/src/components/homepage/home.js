import React, { Component } from 'react';
import './home.css';
import Header from './1header/Header';
import Carousel from './2carousel/Carousel';
import Main from './3main/Main';
class home extends Component {
    render() {
      return (
          <div>
             {/* <Header></Header> */}
             {/* <Carousel></Carousel> */}
             <Main></Main>
          </div>
      );
    }
  }
  
  export default home;