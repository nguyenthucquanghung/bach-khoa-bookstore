import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class account extends Component {
    render() {
        return(
            <div className = 'Login'>
                <h1>Login</h1>
                Username: <input name = "username" type = "text" /> <br/>
                Password:  <input name = "pass" type = "password" /> <br/>
                <Link to = '/'><button type = "submit">Login</button></Link>
            </div>
        )
    }
}

export default account;