import * as React from "react";
import "./CartItem.css";
export default class CartItem extends React.Component {
    constructor(props) {
        super(props);
    }

    updateCart = async (cartId, paramStatus) => {
        const url = `http://localhost:3000/admin/cart/${cartId}`;
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({
                status: paramStatus
            })
        });
        if (response.status === 200) {
            window.location.reload();
        }
    }

    render() {
        return (
            <div className="cart-item-container">
                <span>Customer:</span>
                <span>{this.props.data.username},</span>
                <span>Email:</span>
                <span>{this.props.data.email},</span>
                <span>Status:</span>
                <span>{
                    this.props.data.status === 0 ? "New" : this.props.data.status === 1 ? "Accepted" : this.props.data.status === 2 ? "Finished" : "Canceled"
                },</span>
                <span className="date">Ngày mua: </span><span>{(new Date(this.props.data.time)).toString()}</span>
                {(this.props.isAdmin && this.props.data.status !== 2 && this.props.data.status !== 3) && <button onClick={async () => {
                    await this.updateCart(this.props.data._id, 3);
                }}>Cancel</button>}
                {this.props.isAdmin && this.props.data.status === 0 && <button onClick={async () => {
                    await this.updateCart(this.props.data._id, 1);
                }}>Accept</button>}
                {this.props.isAdmin && this.props.data.status === 1 && <button onClick={async () => {
                    await this.updateCart(this.props.data._id, 2);
                }}>Finish</button>}
                <table>
                    <tr>
                        <th>Cover</th>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                    {
                        this.props.data.books.map(
                            (data) =>
                                <tr>
                                    <td><img src={data.book.images ? data.book.images[0].thumbnail_url : ""} /></td>
                                    <td>{data.book.name}</td>
                                    <td>{data.book.authors.length > 0 ? data.book.authors[0].name : ""}</td>
                                    <td>{data.book.discount_price}</td>
                                    <td>{data.qty}</td>
                                    <td>{data.book.discount_price * data.qty}</td>
                                </tr>
                        )
                    }
                </table>
            </div>
        )
    }
}