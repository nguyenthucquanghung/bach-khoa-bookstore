import React, { Component } from 'react';
import '../main.css';

class NavBar extends Component {
	state = {
		currentCategory: 0,
	}

	onCategorySelect = (category) =>{
		this.props.onCategorySelect(category);
	}
	render() {
		let categories = [
			{
				name: "Sách tiếng Việt",
				cid: 316
			},
			{
				name: "Sách văn học",
				cid: 839
			},
			{
				name: "English Books",
				cid: 320
			},
			{
				name: "Fiction - Literature",
				cid: 9
			},
			{
				name: "How-to - Self Help",
				cid: 614
			},
		];
		let renderCats = [];
		renderCats = categories.map((x, index) => {
			let categoryName = x.name;
			let style = 'CategoryButton ' + (this.props.activeCatId == x.cid ? 'CategoryButtonActive' : '');
			return (
				<button key={index} onClick={() => this.onCategorySelect(x)} className={style}>{categoryName}</button>
			)
		});
		return (
			<div className='NavBar'>
				{renderCats}
			</div>
		);
	}
}

export default NavBar;
