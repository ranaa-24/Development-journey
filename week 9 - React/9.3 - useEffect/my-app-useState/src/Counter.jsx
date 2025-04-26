import React, { useState } from 'react'
                                //destructured
export default function Counter({itemCount, setItemCount}) {

    const addItem = () => {
        setItemCount(itemCount + 1);
    }
    const removeItem = () => {
        if(itemCount == 0) return;          // never -ve, retain its state in 0
        setItemCount(itemCount - 1);
    }

    return (
        <>
            <h1>Items : {itemCount} </h1>
            <button onClick={addItem}>Add</button>
            <button onClick={removeItem}>Remove</button>
        </>
    )
}
