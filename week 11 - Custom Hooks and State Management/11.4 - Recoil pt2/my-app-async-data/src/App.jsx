import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import userId from './store/atoms/userId.js';
import currentUserName from './store/selectors/currentUserName.js';
import { Suspense } from 'react';

function App(){
  return <RecoilRoot>
  <Suspense fallback = {<h1>Loading..</h1>}>
    <User />
  </Suspense>
    <Navigation/>
  </RecoilRoot>
}


function User() {
  // auto cached, onece loaded second time the reponse served from cache
  const user = useRecoilValue(currentUserName);
  return <h1>Name: {user.name}</h1>
}

function getWrappedIndex(current, max = 10) {
  return ((current - 1 + max) % max) + 1;
}


function Navigation() {
  const setUserId = useSetRecoilState(userId);
  return (
    <>
      <button onClick={() => setUserId(pre => getWrappedIndex(pre-1))}>Prev</button>
      <button onClick={() => setUserId(pre => getWrappedIndex(pre+1))}>Next</button>
    </>
  )
}


export default App






// Fetching data using fetch, everytime uid changges.. upper exaple solves that 

// function App() {
//   return <RecoilRoot>
//     <Users />
//     <Navigation/>
//   </RecoilRoot>
// }

// export default App