import React, { Component } from 'react';
import '../main.css';
import Book from './book/Book';


class Books extends Component {
	render(){
		let bookCards = [];
		for (let i = 0; i < this.props.books.length; i++) {
			bookCards.push(<Book key={i} name={this.props.books[i].name} img={this.props.books[i].images[0].thumbnail_url}
				author={this.props.books[i].authors.length > 0 ? this.props.books[i].authors[0].name : ""}
				price={this.props.books[i].discount_price} description={this.props.books[i].short_description} ></Book>);
		}
		return (
			<div className='Books'>
				<div className='BookContainer'>
					{bookCards}
					{/* {
						this.props.books.map((book, i) => {
							<Book
								key={i}
								name={book.name}
								img={book.images[0].medium_url}
								author={book.authors.length > 0 ? book.authors[0].name : ""}
								price={book.discount_price}
								description={book.short_description}
							/>
						})
					} */}
				</div>

			</div>
		);
	}
}

export default Books;
