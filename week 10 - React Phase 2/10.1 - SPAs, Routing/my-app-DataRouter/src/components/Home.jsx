import React from 'react'
import {useNavigate} from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  return (
    <section style={{backgroundColor : '#DDEB9D', height : '70vh', width : '100%', padding : '20px'}}>
        <h1 style={{textAlign : 'center', fontSize : '50px'}}>Welcome Home!</h1>
        <button onClick={() => {navigate('/about')}}>About</button>
    </section>
  )
}

export default Home