import { useId, useInsertionEffect, useState } from "react";
import useFetch from "./hooks/useFetch"

function App() {
  const [userId, setUserId] = useState(1);
  let {data, loading} = useFetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
 
  return <>
    <button onClick={() => setUserId(1)}>User 1</button>
    <button onClick={() => setUserId(2)}>User 2</button>
    <button onClick={() => setUserId(3)}>User 3</button>

    <br />
    <br />

    <div>
      {loading ? 'Loading..' : data.name}
    </div>

  </>

}

export default App
