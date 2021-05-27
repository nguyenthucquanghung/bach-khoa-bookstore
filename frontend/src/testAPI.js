import React, { Component } from 'react';


class testAPI extends Component {
  state = {
    loading: true,
    bookInfo: null,
  }
   
  async componentDidMount() {
    const url = "https://my-json-server.typicode.com/ntquang1999/fakeAPI/db";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({bookInfo: data.store[0], loading: false});
    console.log(this.state.bookInfo.books[0].name);
  }

  render() {
      return(
          <div>
              {this.state.loading || !this.state.bookInfo? (
                  <div>Loading...</div>
              ) : (
                  <div>
                      <div>{this.state.bookInfo.books[0].name}</div>
                  </div>
              )}
          </div>
      );
  }
}

export default testAPI;
