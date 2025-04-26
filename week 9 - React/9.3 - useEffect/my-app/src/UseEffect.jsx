import React, { useState, useEffect } from 'react'


//lifecycle in funtional components
function App() {
    let [visible, setVisible] = useState(true);
    return (
        <>
            {/* conditional rendering */}
            {/* it will re render a new component with new state */}
            {visible && <Counter />}        

            {/* here we are just hiding the component not removing */}
            {/* <div style={{visibility : visible ? 'visible' : 'hidden'}}>
                <Counter />
            </div> */}
            <button onClick={() => { setVisible(!visible) }}>Hide</button>
        </>
    )
}

function Counter() {
    let [counter, setCounter] = useState(1);

    useEffect(function () {
        console.log("interval");
        let intervalId = setInterval(() => {
            console.log("Inside Interval");

            setCounter(counter => counter + 1);
        }, 1000);

        // stop the timer when its removed/hidden 
        return () => {
            console.log("Timmer Stopped");
            clearInterval(intervalId);
        }
    }, []); // empty dependency array ensures it runs only on mount

    return (
        <>
            <h1>Counter : {counter} </h1>
        </>
    )
}

export default App