import React, { Component } from "react";
class Products extends Component {
  state = {
    name: this.props.name,
    price: this.props.price,
    amount: this.props.count,
    total: this.props.total,
  };


  render() {
    
    return (
      <>
        <tr>
          <td>{this.state.name}</td>
          <td>{this.state.price}€</td>
          <td>{this.state.amount}</td>
          <td>{this.state.total}€</td>
        </tr>
      </>
    );
  }
}

export default Products;
