import React, { Component } from 'react';
import '../main.css';
import NavigationPanel from './NavigationPanel';
import Books from './Books';

class BookShelf extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeFilter: 'business',
			loading: true,
			books: null,
		};
	}

	onFilterChange = (filter) => {
		this.setState({ activeFilter: filter });
	}

	async componentDidMount() {
		const url = "https://localhost:3000/books?categoryId=316&page=2&pageSize=2";
		let headers = new Headers();

		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');

		headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
		headers.append('Access-Control-Allow-Credentials', 'true');
		fetch(url, {
			method: "GET",
			headers: headers
		}).then(response => response.json())
			.then(data => { console.log(data); })

		// const response = await fetch(url);
		// const data = await response.json();
		// console.log(data);

	}


	render() {
		// let currentBooks = [];
		// if (!(this.state.loading || !this.state.bookInfo)) {
		// 	for (let i = 0; i < this.state.bookInfo.store.length; i++) {
		// 		if (this.state.bookInfo.store[i].category === this.state.activeFilter) {
		// 			currentBooks = this.state.bookInfo.store[i].books;
		// 			break;
		// 		}
		// 	}
		// }
		return (
			<div className='BookShelf'>
				{/* <NavigationPanel onMainFilterClick={this.onFilterChange} activeTab={this.state.activeFilter}></NavigationPanel> */}
				{!this.state.loading && <Books books={this.state.books} />}
			</div>
		);
	}
}

export default BookShelf;