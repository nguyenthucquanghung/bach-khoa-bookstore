import "./OldCart.css";
import * as React from "react";
import BookItem from "./BookItem";

export default class OldCart extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="old-cart-container">
                <span className="date">Ngày mua: </span><span>{(new Date(this.props.cartData.time)).toString()}</span>
                {
                    this.props.cartData.books && this.props.cartData.books.map((book, i) => 
                            <BookItem key={i} data={book}/>
                    )
                }
            </div>

        )
    }
}