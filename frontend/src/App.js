import React, { Component } from 'react';
import './App.css';
import Account from './components/loginpage/account';
import Search from './components/searchpage/search'
import {useHistory, Route, BrowserRouter as Router} from 'react-router-dom';
import Home from './components/homepage/home';
import testAPI from './testAPI';
class App extends Component {
  render() {
    return (
      <Router>   
        <div>
            <Route path = "/" exact component={Home}/>
            <Route path = "/login" component={Account}/>
            <Route path = "/search" exact component={Search}/>
            <Route path = "/test" exact component={testAPI}/>
        </div>
      </Router>
    );
  }
}
   
export default App;
