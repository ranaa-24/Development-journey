


import { useEffect, useState } from "react"


// will retuen the value after a centain delay
function useDebounce(value, delay) {
    const [debouncedVal, setDebouncedVal] = useState(value);  // the initial value ie: ""
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedVal(value);
        }, delay);

        return () => clearTimeout(timer);  // Clean up timer if value changes before delay ends

    }, [value, delay]);         // every time value changes we set a new timer 

    return debouncedVal;        // will return the old debouncedVal, fisrt then after delay it gets updated 
}

export default useDebounce