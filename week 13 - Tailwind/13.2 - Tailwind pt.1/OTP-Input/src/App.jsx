import {useRef, useState } from "react"

function App() {
  return <>
    <GetOTP numberOfInputs={5}/>
  </>
}

function GetOTP({numberOfInputs}){
   // will store input elements here
  const inputRef = useRef([]);

  return (
    <div className="h-screen bg-black text-white flex justify-center items-center">
      <div className="size-1/2 bg-gray-100/20 rounded-xl flex justify-center items-center gap-2">

        {/* "reference" became a arrow funtion and will run in Inputbox ref={reference} */}

        {[...Array(numberOfInputs)].map((_, index) => (

          <InputBox key={index} reference={(ele) => inputRef.current[index] = ele} onDone={() => {
            if (index < inputRef.current.length - 1) {
              inputRef.current[index + 1].focus();
            }
          }} onBack={() => {
            if(index > 0){
              inputRef.current[index-1].focus();
            }
          }}/>

        ))}

      </div>

    </div>
  )
}


function InputBox({ reference, onDone, onBack }) {
  const [val, setVal] = useState("");
  return <>
    <input ref={reference}

      onChange={(e) => {
        let val = e.target.value;
        if (val && isNaN(val)) {
          return;
        }
        setVal(val);
        if (val && onDone) {
          onDone();
        }

      }} onKeyDown={(e) => {
        if (e.key === 'Backspace' && !val && onBack) {
          onBack();
        }
      }} type="text" value={val} maxLength={1} className="size-10 bg-amber-200/40 rounded-xl text-center focus:bg-green-100/40 outline-none font-bold" />
  </>
}
export default App