import React, { type Dispatch, type SetStateAction } from 'react'

type Prop = {
    setCount: Dispatch<SetStateAction<number>>
}

export const Increment: React.FC<Prop> = ({setCount}) => {
    return <button onClick={() => setCount(pre => pre+1)}>+1</button>
}   

export const Decrement: React.FC<Prop> = ({setCount}) => {
    return <button onClick={() => setCount(pre => pre-1)}>-1</button>
}   

