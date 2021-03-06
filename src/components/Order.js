import React from 'react';
import {formatPrice} from '../helpers'

class Order extends React.Component {
  renderOrder = (key) => {
    const fish = this.props.fishes[key]
    const count = this.props.order[key]
    const isAvailable = fish && fish.status === 'available'
    if (!fish) return null
    if (!isAvailable) {
      return (
        <li key={key}>
          Sorry {fish ? fish.name : 'fish'} is no longer available
        </li>
      )
    }
    return (
      <li key={key}>
        {count} lbs {fish.name}
        {formatPrice(count * fish.price)}
        <button onClick={() => this.props.deleteFromOrder(key)}>&times;</button>
      </li>
    )
  }
  render() {
    const orderIds = Object.keys(this.props.order)
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key]
      const count = this.props.order[key]
      const isAvailable = fish && fish.status === 'available'
      if (isAvailable) {
        return prevTotal + (count * fish.price)
      }
      return prevTotal
    }, 0)
    return (
      <div className="order-wrap">
        <h2>ORDER!!!!</h2>
        {orderIds.map(key => this.renderOrder(key))}
        <div className="total">
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>

    )
  }
}

export default Order;
