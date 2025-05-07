import { useDebugValue, useState } from "react";

function useCounter(initialVal = 0){
    const [counter, setCounter] = useState(initialVal);

    const increment = () => setCounter(prev => prev+1);
    const decrement = () => setCounter(prev => prev-1);
    const reset = () => setCounter(initialVal)

    return {counter, increment, decrement, reset};
}

export default useCounter;