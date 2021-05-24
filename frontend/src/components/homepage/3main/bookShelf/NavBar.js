import React, { Component } from 'react';
import '../main.css';

class NavBar extends Component {
  state = {
    loading: true,
    bookInfo: null,
  }

  async componentDidMount() {
    const url = "https://my-json-server.typicode.com/ntquang1999/fakeAPI/db";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({bookInfo: data, loading: false});
  }
  
  onFilterSelect = (category) => {
    this.props.onFilterClick(category);
  }
  render() {
    let categories = null;
    if (!(this.state.loading || !this.state.bookInfo)) {
    categories = this.state.bookInfo.store.map((x, index) => {
      let categoryName = x.category.charAt(0).toUpperCase() + x.category.slice(1);
      let style = 'CategoryButton ' + (this.props.activeTab == x.category ? 'CategoryButtonActive' : '');
      return (
        <button key={index} onClick={() => this.onFilterSelect(x.category)} className={style}>{categoryName}</button>
      )
    });
  }
    return (
      <div className='NavBar'>
        {categories}
      </div>
    );
  }
}

export default NavBar;