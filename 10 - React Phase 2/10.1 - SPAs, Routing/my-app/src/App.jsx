import { useRef, useState } from "react";



// Case 2: storing mutable value, that persists even after rerander 
function App() {
  // let count = 0;   re init to 0 in re rander 
  let count = useRef(0);
  let [render, setRender] = useState(true);

  function increase(){
    count.current++;
    console.log(count.current);
  }

  return (
    <>
      <h3>{count.current}</h3>
      <button onClick={increase}>Increase value +1</button>
      <button onClick={() => setRender(!render)}>Re-rander</button>
    </>
  )
}




// CASE 1: selecting a DOM element
// function App() {

//   let referencedElement = useRef(null); // dont need a init value, just ref a element

//   // we have to acces the element after mount, wo we may try to access it before it has rendered
//   // useEffect(() => {
//   //   console.log(referencedElement.current);
//   // }, []);

//   let [isSubmited, setSubmit] = useState(false);

//   return (    
//     <>
//       <input type="text" name="name" id="name" />
//       <label htmlFor="name">Name</label>
//       <br />
//       <br />
//       <input ref={referencedElement} type="password" name="pass" id="pass" />
//       <label htmlFor="pass">Password</label>
//       <br />
//       <br />
//       <button onClick={() => setSubmit(true)}>Submit</button>
//       {isSubmited ? <p> Exposing your password to the world :  {referencedElement.current.value}</p> : null}

//     </>
//   )
// }

export default App
