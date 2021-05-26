import * as React from "react";
import CartItem from "./CartItem";
import "./CartPage.css";

export default class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            total: 0,
            token: "",
            username: "",
            hasNoItem: true,
        }
    }

    async componentDidMount() {
        const url = `http://localhost:3000/user/profile`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        });
        if (response.status === 200) {
            const data = await response.json();
            let totalCost = 0;
            for (let i = 0; i < data.data.currentCart.length; ++i) {
                totalCost += data.data.currentCart[i].qty * data.data.currentCart[i].book.discount_price;
            }
            this.setState({ items: data.data.currentCart, total: totalCost });
        }
        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");
        const noOfItemsInCart = localStorage.getItem("cartqty");
        if (noOfItemsInCart !== 0) this.setState({ hasNoItem: false });
        if (token && username && noOfItemsInCart) {
            this.setState({ username: username, token: token });
        }
    }

    componentDidUpdate() {
        if (!this.state.hasNoItem && localStorage.getItem("cartqty") == 0) this.setState({ hasNoItem: true });
    }

    async onLogoutButtonClicked() {
        const url = `http://localhost:3000/user/logout`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.state.token}`,
            }
        });
        if (response.status === 200) {
            this.setState({
                username: "Anonymous",
                loggedIn: false,
                token: "",
            })
            localStorage.clear();
            this.props.history.push("/")
        } else {
            alert("failed");
        }
    }

    onHomeClicked() {
        this.props.history.push("/");
    }

    async onBuyClicked() {
        const url = `http://localhost:3000/user/cart/buy`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        });
        if (response.status === 200) {
            alert("Đặt mua thành công, Bachkhoa  Bookstore cám ơn bạn!");
            this.setState({hasNoItem: true});
            localStorage.setItem('cartqty', 0);
            window.location.reload();
        }
    }

    render() {
        const { username, total, hasNoItem } = this.state;
        return (
            <div className="cart-page-container">
                <div className='SearchBar'>
                    <img onClick={this.onHomeClicked.bind(this)} className='logo' src={process.env.PUBLIC_URL + "/logo.png"} />
                    <h1 className="cart-title">Giỏ hàng </h1>
                    <div className="Sign">
                        <button className='SignButton'>
                            <img className="Avatar" src="data:image/jpeg;base64,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" />
                            <span className="UserNameBox"><p>{username}</p></span>
                        </button>
                        <button onClick={this.onLogoutButtonClicked.bind(this)} className='SignButton'>Đăng xuất</button>
                    </div>
                </div>
                {
                    this.state.items.map((item, i) => {
                        return (
                            <CartItem
                                key={i}
                                name={item.book.name}
                                bookId={item.book._id}
                                qty={item.qty}
                                thumbnailSrc={(item.book.images && item.book.images.length > 0) ? item.book.images[0].thumbnail_url : ""}
                                author={(item.book.authors && item.book.authors.length > 0) ? item.book.authors[0].name : ""}
                                realPrice={item.book.real_price}
                                discountPrice={item.book.discount_price}
                            />
                        )
                    })
                }
                {!hasNoItem && <div className="total-cost">
                    <div>
                        <h4 className="total-title">Tổng cộng: </h4>
                        <span>{total}</span>
                    </div>
                    <button onClick={this.onBuyClicked.bind(this)} className="buy">Đặt mua</button>

                </div>}
                {hasNoItem && <h1 className="empty-message">Giỏ hàng trống!</h1>}
            </div>
        )
    }
}