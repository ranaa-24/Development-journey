import useFetchWithRefetch from "./hooks/useFetchWithRefetch"

function App() {
    const {data, loading, refetch} = useFetchWithRefetch("https://jsonplaceholder.typicode.com/posts/1");
    
    return <>
        <h1>{loading ? 'Loading..' : data.title}</h1>
        <button onClick={refetch}>refetch</button>
    </>

}

export default App
