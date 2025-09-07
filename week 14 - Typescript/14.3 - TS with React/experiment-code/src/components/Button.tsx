// import type {FC} from 'react';
// import type {FunctionComponent} from 'react';

import React from "react";

interface propsType {
    // text?:string    -- optional providing 
    text: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<propsType> = ({ text, onClick }) => {
    return <button onClick={onClick}> {text} </button>
}

// SAME AS..
// const Button = ({text} : {text: string}): React.JSX.Element => {
//     return <button>{text}</button>
// }


// This is not allowed!!!
// const Button: React.FC = ({text}: {text : string}) => {
//     return <button>{text}!</button>
// }

export default Button;