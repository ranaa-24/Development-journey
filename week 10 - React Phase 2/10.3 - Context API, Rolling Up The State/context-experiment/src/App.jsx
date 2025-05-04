import { createContext, useContext, useState } from 'react'
import './App.css'

const BulbContext = createContext();

//custom provider component
function BulbContextProvider({children}){
  let [isSwitchOn, setIsSwitchOn] = useState(false);

  return <BulbContext.Provider value={{isSwitchOn, setIsSwitchOn}}>
    {children}
  </BulbContext.Provider>
}


function App() {

  return (
    //context provider 
    // any child component of BulbContext will have access tp the obj  

    // <BulbContext.Provider value={{isSwitchOn : isSwitchOn, setIsSwitchOn : setIsSwitchOn}}>
    //   <LightBulb />
    // </BulbContext.Provider>

    // lets warp the ugly looking provider BulbContext.Provider
    <BulbContextProvider>
      <LightBulb/>  
    </BulbContextProvider>
  )
}

function LightBulb() {
  return <div>
    <Bulb/>
    <Switch/>
  </div>
}

function Bulb() {
  // consuming the context 
  const {isSwitchOn} = useContext(BulbContext);
  return (
    <>
      {
        isSwitchOn ? <img src="https://i.pinimg.com/736x/3b/d3/2e/3bd32eeb2cc3010f4652ccb615e4e6c2.jpg" alt="bulbOn" /> : 
        <img src="https://i.pinimg.com/736x/17/4d/99/174d993088368e03df99db16e2a86855.jpg" />
      }
    </>
  )
}
function Switch(){
    // consuming the context 
  const {setIsSwitchOn} = useContext(BulbContext);
  return <button onClick={() =>  {setIsSwitchOn(currState => !currState)}}>Switch</button>
}

export default App









//-------------------------

// Lifting up state

// import { useState } from 'react'
// import './App.css'

// function App() {
//   return (
//     <>
//       <LightBulb />
//     </>
//   )
// }

// function LightBulb() {
//   let [isSwitchOn, setIsSwitchOn] = useState(false);

//   return <div>
//     <Bulb isSwitchOn = {isSwitchOn}/>
//     <Switch setIsSwitchOn = {setIsSwitchOn} />
//   </div>
// }

// function Bulb({isSwitchOn}) {
//   return (
//     <>
//       {
//         isSwitchOn ? <img src="https://i.pinimg.com/736x/3b/d3/2e/3bd32eeb2cc3010f4652ccb615e4e6c2.jpg" alt="bulbOn" /> : 
//         <img src="https://i.pinimg.com/736x/17/4d/99/174d993088368e03df99db16e2a86855.jpg" />
//       }
//     </>
//   )
// }

// //every time we click on the button the button also re renders
// function Switch({setIsSwitchOn}){
//   return <button onClick={() =>  {setIsSwitchOn(currState => !currState)}}>Switch</button>
// }

// export default App
