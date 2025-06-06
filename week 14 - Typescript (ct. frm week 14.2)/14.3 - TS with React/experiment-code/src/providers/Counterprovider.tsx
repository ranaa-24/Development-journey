import React, { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";


// the type, what are we providing
type CounterContextType = {
    counter: number,
    setCounter: Dispatch<SetStateAction<number>>
}

const CounterContext = createContext<CounterContextType>({} as CounterContextType);

export function useCounter() {
    return useContext(CounterContext);
}
// {count, setCount} = useCounter(); 
// as the context can be a empty {} so we should always use conditional chaining and we cant destructure for same reason

// props = useCounter()
//props?.counter   and    props?.setCounter

interface CounterProviderProps {
    children: React.ReactNode
}

export const CounterProvider: React.FC<CounterProviderProps> = ({ children }) => {
    const [counter, setCounter] = useState<number>(0);

    return <CounterContext.Provider value={{ counter, setCounter }}>
        {children}
    </CounterContext.Provider>
} 