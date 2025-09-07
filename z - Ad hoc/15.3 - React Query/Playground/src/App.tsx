// import useFetch from "./hooks/useFetch"

// function App() {
//   const userData = useFetch(1);
//   return (
//     <div>
//       {
//         userData.isLoading ? <h1>Loading...</h1>
//           :
//           <div>
//             <h1>Name : {userData.user?.name} </h1>
//             <h2>Gamil : {userData.user?.email} </h2>
//           </div>
//       }
//     </div>
//   )
// }

// export default App


// Na na today we’re doing it the hard way but make it effortless

// import { useQuery } from "@tanstack/react-query"


// function App() {

//   const info = useQuery({
//     queryKey: ['user', 2],
//     staleTime: 1000,  // for 1s data will consider fress and no auto refetch, but after 1s the data consider stale and when ever we switch tag and comeback it will refetch, means when ever windiw gains focus it fetchs data again
//     queryFn: async () => {
//       await new Promise((p) => setTimeout(p, 2000))
//       const res = await fetch("https://jsonplaceholder.typicode.com/users/2");
//       return await res.json();
//     }
//   })

//   console.log(info.status);

//   if(info.error) alert("something went wrong")

//   return (
//     <div>
//       {info.isPending ? (
//         <h1>Loading...</h1>
//       ) : info.isError ? (
//         <h1>Error: {info.error.message}</h1>
//       ) : (
//         <div>
//           {info.isFetching && <p>Refreshing...</p>}
//           <h1>Name: {info.data.name}</h1>
//           <h2>Email: {info.data.email}</h2>
//         </div>
//       )}

//       <button onClick={() => info.refetch()}>refetch</button>
//     </div>

//   )
// }




import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import createUserQueryOptions from "./queryOptions/userQueryOptions";

function App() {
  const [id, setId] = useState(1);


  // const {data, isPending, isFetching, isError, error, refetch} = useQuery({
  //   queryKey: ['user', id],     /// will create a different queryy for different ids
  //   queryFn: async () => {
  //     // await new Promise(p => setTimeout(p, 2000));
  //     const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  //     return await res.json();
  //   }, 
  //   staleTime: 0,  // default
  // })

  
  // using queryOptions

  const {data, isPending, isFetching, isError, error, refetch} = useQuery(createUserQueryOptions(id))


  return (
    <div>
       {isPending ? (
        <h1>Loading...</h1>
      ) : isError ? (
        <h1>Error: {error.message}</h1>
      ) : (
        <div>
          {isFetching && <p>Refreshing...</p>}
          <h1>Name: {data.name}</h1>
          <h2>Email: {data.email}</h2>
        </div>
      )}

      <button onClick={() => refetch()}>refetch</button>
      <button onClick={() => {
        if(id > 9) return;
        setId(p => p+1);
      }}>next user</button>
    </div>
  )
}

export default App