import React, { Component } from 'react';
import '../main.css';
import Book from './book/Book';


class Books extends Component {
	constructor(props) {
		super(props);
	}
	onAddToCart() {
		this.props.onAddToCart();
	  }
	render() {
		let bookCards = [];
		for (let i = 0; i < this.props.books.length; i++) {
			bookCards.push(<Book onAddToCart={this.onAddToCart.bind(this)}
				key={i} name={this.props.books[i].name} img={this.props.books[i].images[0].thumbnail_url}
				author={this.props.books[i].authors.length > 0 ? this.props.books[i].authors[0].name : ""}
				price={this.props.books[i].discount_price} description={this.props.books[i].short_description}
				bookId={this.props.books[i]._id} ></Book>);
		}
		return (
			<div className='Books'>
				<div className='BookContainer'>
					{bookCards}
				</div>

			</div>
		);
	}
}

export default Books;