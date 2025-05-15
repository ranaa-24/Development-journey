import { Suspense } from 'react';
import { useSetRecoilState, RecoilRoot, useRecoilValueLoadable } from 'recoil'

import { usersAtomFamily } from './store/atoms/userAtomsFamily';
import { userNameSelector } from './store/selectors/userNameSelector';

function App() {
  return <RecoilRoot>
    <Suspense fallback={<h1>Loading..</h1>}>
      <UserInfo uid={1} />
      <UserInfo uid={3} />
      <UserInfo uid={3} />
      {/* {Might show some error, thats HMR fault.. try disable it in vite.config} or always keep atoms and selectors in a diff .js file */}
    </Suspense>
  </RecoilRoot>
}


function UserInfo({ uid }) {
  // getting the name directlu coz of the selector 
  const userNameLoadable = useRecoilValueLoadable(userNameSelector(uid));
  if(userNameLoadable.state == 'loading') return <h2>Loading..</h2>

  // userNameLoadable.state == 'hasValue'
  return <>
    <h1>Name : {userNameLoadable.contents}</h1>
    <Buttons uid={uid} />
  </>
}

function Buttons({uid}) {
  const setUser = useSetRecoilState(usersAtomFamily(uid));
  return <> 
    <button onClick={() => setUser(p => ({ ...p, name: " - " + p.name }))}>add space</button>
  </>
}

export default App
