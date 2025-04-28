import { Component } from 'react'

class App extends Component {
  constructor() {
    super(),
    this.state = { count: 10 }
  }

  //mount
  componentDidMount() {
    console.log("Mounted");
  }

  //re-render
  componentDidUpdate() {
    console.log("App Component re-rendered");
  }

  //unmount 
  componentWillUnmount(){
    console.log("Unmounted");
  }


  render() {
    return (
      <>
        <h1> Count {this.state.count} </h1>
        <button onClick={() => this.setState({ count: this.state.count + 1 })} >Add</button>
      </>
    )
  }
}

export default App
