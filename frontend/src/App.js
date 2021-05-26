import React, { Component } from 'react';
import './App.css';
import LoginPage from './components/loginpage/LoginPage';
import RegisterPage from './components/registerpage/RegisterPage';
import CartPage from './components/cartpage/CartPage'
import AdminPage from'./components/adminpage/AdminPage';
import AdminLoginPage from'./components/adminpage/AdminLoginPage';
import AdminBookPage from'./components/adminpage/AdminBookPage';
import AdminCartPage from'./components/adminpage/AdminCartPage';
import AdminUserPage from'./components/adminpage/AdminUserPage';
import Search from './components/searchpage/search'
import BuyHistoryPage from './components/buyhistorypage/BuyHistoryPage'
import {useHistory, Route, BrowserRouter as Router} from 'react-router-dom';
import Home from './components/homepage/home';
class App extends Component {
  render() {
    return (
      <Router>   
        <div>
            <Route path = "/" exact component={Home}/>
            <Route path = "/login" component={LoginPage}/>
            <Route path = "/register" component={RegisterPage}/>
            <Route path = "/cart" component={CartPage}/>
            <Route path = "/history" component={BuyHistoryPage}/>
            <Route path = "/admin" component={AdminPage}/>
            <Route path = "/signin/admin" component={AdminLoginPage}/>
            <Route path = "/admin/book" component={AdminBookPage}/>
            <Route path = "/admin/cart" component={AdminCartPage}/>
            <Route path = "/admin/user" component={AdminUserPage}/>
        </div>
      </Router>
    );
  }
}
   
export default App;
