import React, { useState } from 'react'
import {Increment, Decrement} from '../utils/TwoButtoms'

function Counter():React.ReactElement {
    const [count, setCount] = useState<number>(0);

  return <>
    <h1>{count}</h1>
    <Increment setCount={setCount}/>
    <Decrement setCount={setCount}/>
  </>
}

export default Counter