import {useEffect, useRef}  from 'react'

// takig the curr value just so we can return on the next render 
function usePrev(value) {
    const prevValue = useRef();
    useEffect(() => {
        prevValue.current = value;
    }, [value])

    return prevValue.current;
}

export default usePrev