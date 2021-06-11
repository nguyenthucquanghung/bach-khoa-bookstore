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
                <p>Tên khách hàng:</p>
                <p>{this.props.data.username},</p>
                <p>Email:</p>
                <p>{this.props.data.email},</p>
                <p>Trạng thái đơn hàng:</p>
                <p>{
                    this.props.data.status === 0 ? "Chưa xác nhận" : this.props.data.status === 1 ? "Đã xác nhận" : this.props.data.status === 2 ? "Đã hoàn thành" : "Đã hủy"
                },</p>
                <p>Ngày mua: </p><p>{(new Date(this.props.data.time)).toString()}</p>
                {(this.props.isAdmin && this.props.data.status !== 2 && this.props.data.status !== 3) && <button onClick={async () => {
                    await this.updateCart(this.props.data._id, 3);
                }}>Hủy đơn hàng</button>}
                {this.props.isAdmin && this.props.data.status === 0 && <button onClick={async () => {
                    await this.updateCart(this.props.data._id, 1);
                }}>Xác nhận</button>}
                {this.props.isAdmin && this.props.data.status === 1 && <button onClick={async () => {
                    await this.updateCart(this.props.data._id, 2);
                }}>Hoàn thành</button>}
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