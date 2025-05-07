import React from 'react'
import { useState, useEffect } from 'react';
import useDebounce from './hooks/useDebounce.js'

function SearchComponent() {
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 1000);

  useEffect(() => {
    if (debouncedInput) {     // only fetch if the input has some value
      console.log("Fetching results for:", debouncedInput);
      // Call your API here
    }
  }, [debouncedInput]);

  return (
    <input
      type="text"
      value={input}
      onChange={e => setInput(e.target.value)}
      placeholder="Search..."
    />
  );
}


function App() {
  return (
    <SearchComponent />
  )
}

export default App





















// // // ----------------------------------------------
// // // Debouncing 
// // // ----------------------------------------------

// // function getDebounce(fn, delay) {
// //   let timer;
// //   return function (...args) {      // the returned funtion will take a array of args
// //     clearTimeout(timer);
// //     timer = setTimeout(() => {        // accessing the timer at clouser 
// //       fn.apply(this, args);           // .apply(context, [arg1, arg2..])
// //     }, delay);
// //   }
// // }

// // function App() {

// //   // lets warp this a debounce fn that will return a fuuntion with de bounce logic
// //   // let timer;
// //   // function debounce() {
// //   //   clearTimeout(timer);
// //   //   timer = setTimeout(() => {
// //   //     console.log("Hit a backend api..");
// //   //   }, 500);
// //   // }

// //   const backendReq = () => {
// //     console.log("Hit a backend api..");
// //   }

// //   const debouncedBackendReq = getDebounce(backendReq, 1000);    // returns a fnn

// //   return <>
// //     <button onClick={debouncedBackendReq}>fetch backend</button>
// //   </>
// // }

// // export default App
