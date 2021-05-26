import * as React from "react";
import "./AdminPage.css";

export default class AdminPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (localStorage.getItem('AdminLoginStatus') !== "1") this.props.history.push("/signin/admin")
    }

    render() {
        return (
            <div className={`admin-page-container`}>
                <img className='logo' src={process.env.PUBLIC_URL + "/logo.png"} onClick={() => { this.props.history.push("/") }} />
                <button className={`NavButton`} onClick={() => { this.props.history.push("/admin/cart") }}>Quản lý đơn hàng</button>
                <button className={`NavButton`} onClick={() => { this.props.history.push("/admin/book") }}>Quản lý mặt hàng</button>
                <button className={`NavButton`} onClick={() => { this.props.history.push("/admin/user") }}>Quản lý tài khoản</button>
                <button className={`NavButton`} onClick={() => {
                    localStorage.setItem("AdminLoginStatus", 0);
                    this.props.history.push("/signin/admin");
                }}>Đăng xuất</button>
            </div>
        )
    };
}