import useCounter from "./hooks/useCounter"
import useOnlineStatus from "./hooks/useOnlineStatus"


function App(){
    return(
        <>
            <p>Try turing network conn off..</p>
            <StatusBar/>
            <SayHi />
        </>
    )
}


function StatusBar(){
    const isOnline = useOnlineStatus();
    return <h1>
        {isOnline ? '✅ Online' : '❌ Disconnected'}
    </h1>
}

function SayHi(){
    const isOnline = useOnlineStatus();
    const handleEvent = () => {
        if(!isOnline) return;
        alert('Hii');
    }
    return <button onClick={handleEvent}>
        {isOnline ? 'Say Hi' : 'Reconnecting..'}
    </button>
}


// counter custom hook

// function App() {
//     const {counter, increment, decrement, reset} = useCounter(3);

//     return(
//         <>
//             <h1> Counter : {counter}</h1>
//             <button onClick={() => increment()}>increment</button>
//             <button onClick={() => decrement()}>decrement</button>
//             <button onClick={() => reset()}>reset</button>
//         </>
//     )
// }   

export default App
