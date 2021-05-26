import * as React from "react";
import "./AdminLoginPage.css";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }

    render() {
        const { username, password } = this.state;
        return (
            <div className="login-page-container">
                <p className="login-title">Đăng nhập</p>
                <p className="email">Username</p>
                <input value={username} onChange={(e) => this.setState({ username: e.target.value })} />
                <p className="password">Mật khẩu</p>
                <input type="password" value={password} onChange={(e) => this.setState({ password: e.target.value })} />
                <button onClick={this.onLogInButtonClick.bind(this)}>Đăng nhập</button>
            </div>
        )
    }

    async onLogInButtonClick() {
        const { username, password } = this.state;
        if (username==="admin" && password==="123456") {
            localStorage.setItem('AdminLoginStatus', 1);
            this.props.history.push("/admin/cart")
        } else {
            alert("Wrong password!");
        }
        
    }
}