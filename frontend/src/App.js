import React, { Component } from 'react';
import './App.css';
import LoginPage from './components/loginpage/LoginPage';
import RegisterPage from './components/registerpage/RegisterPage';
import CartPage from './components/cartpage/CartPage'
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
            <Route path = "/login" component={LoginPage}/>
            <Route path = "/register" component={RegisterPage}/>
            <Route path = "/cart" component={CartPage}/>
            <Route path = "/search" exact component={Search}/>
            <Route path = "/test" exact component={testAPI}/>
        </div>
      </Router>
    );
  }
}
   
export default App;
