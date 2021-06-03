import "./BookItem.css";
import * as React from "react";

export default class BookItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {data} = this.props;
        return(
            <div className="book-item-container">
                <img className="thumbnail" src={data.book.images? data.book.images[0].thumbnail_url:""} />
                <div className="book-detail">
                    <p className="name">{data.book.name}</p>
                    <p className="author">{data.book.authors.length>0?data.book.authors[0].name:""}</p>
                    <p className="real-price" style={{ visibility: data.book.real_price != data.book.discount_price ? 'visible' : 'hidden' }}>{data.book.real_price}</p>
                    <p className="discount-price">{data.book.discount_price}</p>
                    <p className="qty">{data.qty}</p>
                    <p className="total">{data.book.discount_price * data.qty}</p>
                </div>
            </div>
        )
    }
}