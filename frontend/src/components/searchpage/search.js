import React, { Component } from 'react';
import '../homepage/home.css';
import Header from '../homepage/1header/Header';
import Main from '../homepage/3main/Main';

class search extends Component {
    render() {
        return (
            <div>
               <Header></Header>
               <Main></Main>
            </div>
        );
      }
}

export default search;