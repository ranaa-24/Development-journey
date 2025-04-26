import React, {Component, useState} from 'react'
import Counter from './Counter.jsx'
import './App.css'
// class App extends Component{
//   render() {
//     return <h1>Hii I am a Class Component</h1>
//   }
// }

function App() {
  let [itemCount, setItemCount] = useState(10);

  return (
    <div id='hero'>
      <h1>Shoping Items - {itemCount} </h1>
      {/* as Prps */}
      <Counter itemCount = {itemCount}  setItemCount = {setItemCount} />
    </div>
  )
}

export default App
