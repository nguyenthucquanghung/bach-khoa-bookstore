import * as React from "react";
import "./AdminCartPage.css";
import CartItem from "./../common/cartitem/CartItem";

export default class AdminCartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartList: []
        }
    }

    async componentDidMount() {
        const url = `http://localhost:3000/admin/cart`;
        const response = await fetch(url);
        if (response.status === 200) {
            const res = await response.json();
            this.setState({ cartList: res.data });
        }
    }

    render() {
        return (
            <div className={`admin-cart-page-container`}>
                {
                    this.state.cartList.slice(0).reverse().map((cartItem) => <CartItem isAdmin={true} data={cartItem} />)
                }
            </div>
        )
    };
}