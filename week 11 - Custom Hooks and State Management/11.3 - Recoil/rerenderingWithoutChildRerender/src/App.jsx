import React from 'react'
import { useState, memo } from 'react'



function App() {

  return <>
    <Parent />
  </>
}



function Parent() {
  const [counter, setCounter] = useState(0);
  return <>
    <h1>Count : {counter}</h1>
    {/* this part will remain same during the re render so, the child wont get rerender 
    { children }  */}
    <MemoisedChild setCounter={setCounter} />
    <Child />
  </>
}
const MemoisedChild = memo(function ({ setCounter }) {
  console.log("memoized child rendered")
  return <>
    <button onClick={() => setCounter(p => p + 1)}>+1</button>
    <h1>Im just a static memised child</h1>
  </>
});

function Child() {
  console.log("Normal child rendered");
  return <h1> just a static normal child</h1>

}
export default App