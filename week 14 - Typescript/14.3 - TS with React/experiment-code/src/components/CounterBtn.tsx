import React, {useState} from "react";


const CounterBtn: React.FunctionComponent<{initialVal?: number}>= ({initialVal = 0}) => {
    const [count, setCount] = useState<number>(initialVal);

    // type handleClickType = (e: React.MouseEvent<HTMLButtonElement>) => void

    const handleClick = (): void => {
        setCount(pre => pre+1);
    } 

    return <button onClick={handleClick}>{count}</button>
}

export default CounterBtn;