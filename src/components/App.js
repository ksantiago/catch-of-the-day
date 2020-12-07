import React from 'react'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'

class App extends React.Component {
  // constructor() {
  //   super()
  //   this.state = {

  //   }
  // }
  state = {
    fishes: {},
    order: {}
  }

  componentDidMount() {
    const {params} = this.props.match
    // first reinstate our local storage
    const localStorageRef = localStorage.getItem(params.storeId)
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })
  }

  componentDidUpdate() {
    console.log(this.state.order)
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))

  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  addFish = (fish) => {
    // take a copy of the existing state, you don't want to actually mutate state
    const fishes = { ...this.state.fishes }
    // add new fish to the fishes state variable
    fishes[`fish${Date.now()}`] = fish;
    // set new fishes object to state
    // this.setState({
    //   fishes: fishes
    // })
    // line 27 is same as lines 22-25 because youre name renaming the var
    this.setState({ fishes })
  }

  updateFish = (key, updatedFish) => {
    // take a copy of curr state
    const fishes = { ...this.state.fishes }
    // update that state
    fishes[key] = updatedFish
    // set that to state
    this.setState({ fishes })
  }

  deleteFish = key => {
    // take a copy of state
    const fishes = { ...this.state.fishes }
    // update the state
    fishes[key] = null
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder = (key) => {
    // take a copy of state
    const order = { ...this.state.order }
    // either add to the order or update number in our order
    order[key] = order[key] + 1 || 1
    // call setSTate to update our state object
    this.setState({ order })
  }

  deleteFromOrder = (key) => {
    // copy order from state
    const order = { ...this.state.order }
    // remove item from order
    delete order[key]
    this.setState({ order })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
                index={key}
              />
            ))}
          </ul>
        </div>
        <Order f
          fishes={this.state.fishes}
          order={this.state.order}
          deleteFromOrder={this.deleteFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
        />
      </div>
    )
  }
}

export default App;
