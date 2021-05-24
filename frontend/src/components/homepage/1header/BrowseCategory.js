import React, { Component } from 'react';
import './headerStyle.css';

class BrowseCategory extends Component {
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

  render() {
    let categories = null;
    if (!(this.state.loading || !this.state.bookInfo)) {
    categories = this.state.bookInfo.store.map((x, index) => {
      return (
        <option key={index}>{x.category}</option>
      )
    })
  }
    return (
      <div className='BrowseCategory'>
        <select>
          <option value="" disabled selected>Browse Category</option>
          {categories}
        </select>
      </div>
    );
  }
}

export default BrowseCategory;