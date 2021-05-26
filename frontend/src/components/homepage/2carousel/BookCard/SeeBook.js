import React, { Component } from 'react';
import '../carouselStyle.css';

class SeeBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      loggedIn: false
    }
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ loggedIn: true, token: token });
    }
  }
  componentDidUpdate() {
    const token = localStorage.getItem("token");
    if (!token && this.state.loggedIn) {
      this.setState({ loggedIn: false });
    } 
  }
  async onButtonClick() {
    const url = `http://localhost:3000/user/cart`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        bookId: this.props.bookId
      })
    });
    if (response.status === 200) {
      this.props.onAddToCart();
    } else {
      alert("Error!");
    }
  }
  render() {
    return (

      this.state.loggedIn && <div onClick={this.onButtonClick.bind(this)} className='SeeBook' style={this.props.color}>
        <button style={this.props.color}>Add to cart</button>
      </div>

    );
  }
}

export default SeeBook;