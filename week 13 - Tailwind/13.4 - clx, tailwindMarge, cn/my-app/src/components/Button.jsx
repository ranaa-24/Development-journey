import React from 'react'
import cn from '../utils/cn';
function Button(props) {

    // the default color is yellow, then the classes for props.className the the final 
    // conditional styling
    
    let className = cn('px-4 py-2 bg-yellow-300',  props.className, 
    {
        "bg-red-400": props.varient == 'denger', 
        "bg-green-400": props.varient == 'success', 
    });

  return (
    <button className={className}>Click For Nothing</button>
  )
}

export default Button