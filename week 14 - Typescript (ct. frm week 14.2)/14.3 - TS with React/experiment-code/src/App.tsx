import Button from "./components/Button"
import React from "react";
import CounterBtn from "./components/CounterBtn";
import Counter from "./components/Counter";
import InputName from "./components/InputName";

//generics 

// import React, { type JSX } from "react"

  // function identity<Type>(arg: Type): Type {
  //   return arg;
  // }

  // console.log(identity<JSX.Element>(<div></div>)); //--- 1
  // console.log(identity<React.ReactElement>(<div></div>)); //--- 2
  // ==== 1 and 2 same

  // console.log(identity<number>(12));
  // console.log(identity<string>("12"));



const App: React.FC = () => {
  return (
    <div>
      <Button text="I do something" onClick={() => alert("Hello")}/>
        <br />
      <Button text="I dont do anything"/>
      <br />
      <CounterBtn/>
      <br />
      <CounterBtn initialVal={20}/>

      <br />
      <Counter/>

      <br />
      <InputName/>
    </div>
  );
};

// function App(): React.JSX.Element{
//    return (
//     <div> 
//       <Button text={"Click Me"} />
//     </div>
//   );
// } 

export default App