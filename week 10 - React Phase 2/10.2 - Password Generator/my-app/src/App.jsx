import React, { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  let [currentLength, setCurrentLength] = useState(8);
  let [requiredSpecialChar, setRequiredSpecialChar] = useState(false);
  let [requiredNumber, setRequiredNumber] = useState(false);
  let [password, setPassword] = useState("");
  let input = useRef(null);


  let generatePass = useCallback(() => {
    let charMap = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (requiredSpecialChar) charMap += "!@#$%^&*()_+-=[]{}|:',.<>/?`~";
    if (requiredNumber) charMap += "0123456789";

    let pass = "";
    for (let i = 0; i < currentLength; i++) {
      let randomIdx = Math.floor(Math.random() * (charMap.length));  // if len : 20 will get 0-19 
      pass += charMap.charAt(randomIdx);
    }

    setPassword(pass);
  }, [currentLength, requiredSpecialChar, requiredNumber]); // w/o the dependencies the function will call with hard fixed value everytime, if we think about it, its no use a new funtion will create every time the depen. changes  


  useEffect(() => {
    generatePass();
  }, [currentLength, requiredSpecialChar, requiredNumber])
  //


  return (
    <div style={{
      height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',
      flexDirection: 'column'
    }}>
      <div style={{ width: '320px', padding: '20px', border: '1px solid black' }}>
        <input readOnly ref={input} value={password} type="text" name="genPass" id="input" style={{ width: "80%" }} />
        <button onClick={() => {
          navigator.clipboard.writeText(input.current.value)
          alert("Copied!");
        }}>Copy</button>
        <br />
        <br />
        <input type="checkbox" name="char" id="char" onChange={(e) => {
          e.target.checked ? setRequiredSpecialChar(true) : setRequiredSpecialChar(false);
        }} />
        <label htmlFor="char">Special Characters</label>
        <br />
        <input type="checkbox" name="num" id="num" onChange={(e) => {
          e.target.checked ? setRequiredNumber(true) : setRequiredNumber(false);
        }} />
        <label htmlFor="num">Numbers</label>
        <br />
        <label htmlFor="length">Password Length </label>
        <input type="range" name="length" id="lenght" min={"8"} max={22} value={currentLength} onChange={(e) => setCurrentLength(e.target.value)} />
        <span>{currentLength}</span>
      </div>
    </div>
  )
}

export default App

