import React from 'react'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'

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

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]} />)}
          </ul>
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
      </div>
    )
  }
}

export default App;
