import * as React from "react";
import "./CartItem.css";

export default class CartItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: 1,
        }
    }

    componentDidMount() {
        this.setState({ qty: this.props.qty })
    }
    render() {
        const {
            thumbnailSrc,
            name,
            author,
            realPrice,
            discountPrice,
        } = this.props;
        const { qty } = this.state;
        return (
            <div className="cart-item-container">
                <img className="thumbnail" src={thumbnailSrc} />
                <div className="book-detail">
                    <p className="name">{name}</p>
                    <p className="author">{author}</p>
                    <p className="real-price" style={{ visibility: realPrice != discountPrice ? 'visible' : 'hidden' }}>{realPrice}</p>
                    <p className="discount-price">{discountPrice}</p>
                    <button className="minus-button" onClick={this.onMinus.bind(this)}>-</button>
                    <p className="qty">{qty}</p>
                    <button className="plus-button" onClick={this.onPlus.bind(this)}>+</button>
                    <p className="total">{discountPrice * qty}</p>
                    <button onClick={this.onDel.bind(this)} className="delete-button">X</button>
                </div>

            </div>
        )
    }

    async onDel() {
        const url = `http://localhost:3000/user/cart/item?bookId=${this.props.bookId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });
        if (response.status === 200) {
            const curQty = this.state.qty;
            this.setState({ qty: 0 });
            const currentQty = parseInt(localStorage.getItem('cartqty'))
            localStorage.setItem('cartqty', currentQty - curQty);
            window.location.reload(); 
        } else {
            alert("Error!");
        }
    }
    async onMinus() {
        const url = `http://localhost:3000/user/cart?bookId=${this.props.bookId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });
        if (response.status === 200) {
            
            const curQty = this.state.qty;
            this.setState({ qty: this.state.qty - 1 });
            const currentQty = parseInt(localStorage.getItem('cartqty'))
            localStorage.setItem('cartqty', currentQty - 1);
            this.props.reduceTotal(this.props.discountPrice)
            if (curQty === 1) { window.location.reload(); }
            
        } else {
            alert("Error!");
        }
    }

    async onPlus() {
        const url = `http://localhost:3000/user/cart`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                bookId: this.props.bookId
            })
        });
        if (response.status === 200) {
            this.setState({ qty: this.state.qty + 1 });
            const currentQty = parseInt(localStorage.getItem('cartqty'))
            localStorage.setItem('cartqty', currentQty + 1);
            this.props.addTotal(this.props.discountPrice)
        } else {
            alert("Error!");
        }
    }
}