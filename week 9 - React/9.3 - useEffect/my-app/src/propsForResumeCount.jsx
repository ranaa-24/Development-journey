import React, { useState, useEffect } from 'react'


//lifecycle in funtional components
function App() {
    let [counter, setCounter] = useState(1);
    let [visible, setVisible] = useState(true);

    useEffect(() => {
        console.log("Visibility changed");

        // Cleanup every time `visible` changesm, if we dont specify anything dependecy arry, then unmount only happen when the comonent no more on the screen
        return () => {
            console.log("clean up for old visible");
        }
    }, [visible]);
    
    return (
        <>
            {/* stoping the interval when its hidden and maintaing its state, as App never unMount */}
            {visible && <Counter counter={counter} setCounter={setCounter} />}
            <button onClick={() => { setVisible(!visible) }}>Hide</button>
        </>
    )
}

function Counter({ counter, setCounter }) {
    useEffect(function () {
        let intervalId = setInterval(() => {
            setCounter((cnt) => {
                return cnt + 1;
            });
        }, 1000);

        // stop the timer when its removed/hidden 
        return () => {
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