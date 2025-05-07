import React, { useState } from 'react'
import usePrev from './hooks/usePrev';

function App() {
  let [count, setCount] = useState(1);
  let preVal = usePrev(count);
  
  return <>
    <h2>Prev : {preVal} Curr : {count}</h2>
    <button onClick={() => {setCount(p => p+1)}}>+1</button>
  </>
}

export default App