import * as React from "react";
import "./LoginPage.css";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
    }

    render() {
        const { email, password } = this.state;
        return (
            <div className="login-page-container">
                <p className="login-title">Đăng nhập</p>
                <p className="email">Email</p>
                <input value={email} onChange={(e) => this.setState({ email: e.target.value })} />
                <p className="password">Mật khẩu</p>
                <input type="password" value={password} onChange={(e) => this.setState({ password: e.target.value })} />
                <button onClick={this.onLogInButtonClick.bind(this)}>Đăng nhập</button>
                <a href="/register">Đăng kí tài khoản</a>
            </div>
        )
    }

    async onLogInButtonClick() {
        const url = `http://localhost:3000/user/login`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        });
        if (response.status === 200) {
            const res = await response.json()
            let count = 0;
            res.data.user.currentCart.forEach((item)=> count+=item.qty);
            localStorage.setItem('username', res.data.user.name);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('cartqty', count);
            this.props.history.push("/")
        } else {
            alert("Wrong password!");
        }
        
    }
}