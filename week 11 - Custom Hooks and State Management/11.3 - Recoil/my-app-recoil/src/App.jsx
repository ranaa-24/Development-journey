import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { counterAtom } from "./store/atoms/counter";
import { isEvenState } from "./store/selectors/counter.selector";

function App() {
  return (
    <RecoilRoot>
      <Counter />
      <IsEven/>
      <Increase />
    </RecoilRoot>
  )
}

function Counter() {
  let count = useRecoilValue(counterAtom);
  return <>
    <h1>Current Count : {count}</h1>
  </>
}

function Increase() {
  const setCount = useSetRecoilState(counterAtom);
  return <> 
    <button onClick={() => setCount(p => p + 1)}>+1</button>
    <button onClick={() => setCount(p => p + 2)}>+2</button>
  </>
}
function IsEven() {
  const isEven = useRecoilValue(isEvenState);
  return <h2>{isEven ? "Current Count is Even" : "Current Count is Odd"}</h2>
}
export default App
