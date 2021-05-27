import React, { Component } from 'react';
import '../main.css';
import Books from './Books';
import Pagination from "react-js-pagination";
import NavigationPanel from "./NavigationPanel";

class BookShelf extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryId: 316,
			loading: true,
			books: null,
			activePage: 1,
			pageSize: 48,
			noOfBooks: 0
		};
	}

	async onCategoryChange(category) {
		this.setState({ categoryId: category.cid });
		const { activePage, pageSize, categoryId } = this.state;
		const url = `http://localhost:3000/books?categoryId=${categoryId}&page=${activePage}&pageSize=${pageSize}`;
		const response = await fetch(url);
		const data = await response.json();
		this.setState({ books: data.data, loading: false });
	}

	async componentDidMount() {
		const url = "http://localhost:3000/books?categoryId=316&page=1&pageSize=48";
		const response = await fetch(url);
		const data = await response.json();
		this.setState({ noOfBooks: data.meta.total, books: data.data, loading: false });
		console.log(data)
	}

	async handlePageChange(pageNumber) {
		this.setState({ activePage: pageNumber });
		const { activePage, pageSize, categoryId } = this.state;
		const url = `http://localhost:3000/books?categoryId=${categoryId}&page=${activePage}&pageSize=${pageSize}`;
		const response = await fetch(url);
		const data = await response.json();
		this.setState({ books: data.data, loading: false });
	}
	render() {
		const { activePage, pageSize, noOfBooks } = this.state;
		return (
			<div className='BookShelf'>
				<NavigationPanel onCategoryChange={this.onCategoryChange.bind(this)} activeCatId={this.state.categoryId} />
				{!this.state.loading && <Books books={this.state.books} />}
				<Pagination
					activePage={activePage}
					itemsCountPerPage={pageSize}
					totalItemsCount={noOfBooks}
					pageRangeDisplayed={5}
					onChange={this.handlePageChange.bind(this)}
				/>
			</div>
		);
	}
}

export default BookShelf;