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
      bookInfo: null,
		};
	}
  
  onFilterChange = (filter) => {
    this.setState({activeFilter: filter});
  }
  
  async componentDidMount() {
    const url = "https://my-json-server.typicode.com/ntquang1999/fakeAPI/db";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({bookInfo: data, loading: false});
  }


  render() {
    let currentBooks = [];
    if (!(this.state.loading || !this.state.bookInfo)) {
    for (let i=0; i<this.state.bookInfo.store.length; i++) {
      if (this.state.bookInfo.store[i].category === this.state.activeFilter) {
        currentBooks = this.state.bookInfo.store[i].books;
        break;
      }
    }
  }
    return (
      <div className='BookShelf'>
        <NavigationPanel onMainFilterClick={this.onFilterChange} activeTab={this.state.activeFilter}></NavigationPanel>
        <Books books={currentBooks}></Books>
      </div>
    );
  }
}

export default BookShelf;