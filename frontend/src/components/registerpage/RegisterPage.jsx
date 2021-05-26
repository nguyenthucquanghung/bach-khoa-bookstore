import * as React from "react";
import "./RegisterPage.css";

export default class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    }

    render() {
        const { name, email, password, confirmPassword } = this.state;
        return (
            <div className="register-page-container">
                <p>Đăng kí tài khoản</p>
                <p>Họ và tên </p>
                <input value={name} onChange={(e) => this.setState({ name: e.target.value })} />
                <p>Email</p>
                <input value={email} onChange={(e) => this.setState({ email: e.target.value })} />
                <p>Mật khẩu</p>
                <input value={password} type="password" onChange={(e) => this.setState({ password: e.target.value })} />
                <p>Nhập lại mật khẩu</p>
                <input value={confirmPassword} type="password" onChange={(e) => this.setState({ confirmPassword: e.target.value })} />
                <button onClick={this.onRegisterButtonClick.bind(this)}>Đăng kí</button>
                <a href="/login">Đã có tài khoản? Đăng nhập</a>
            </div>
        )
    }

    isValidEmail(mail) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
            return (true)
        return (false)
    }

    async onRegisterButtonClick() {
        const { password, confirmPassword, email } = this.state;
        if (!this.isValidEmail(email)) {
            alert("Email không hợp lệ!");
        } else if (password !== confirmPassword) {
            alert("Mật khẩu và mật khẩu xác nhận phải giống nhau")
        } else {
            const url = `http://localhost:3000/user`;
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                })
            });
            if (response.status === 200) {
                const res = await response.json()
                localStorage.setItem('username', res.data.newUser.name);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('cartqty', 0);
                this.props.history.push("/");
            } else {
                alert("Server error!");
            }
        }
    }
}