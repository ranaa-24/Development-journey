import React from 'react'
import {useNavigate} from 'react-router-dom'

function About() {
  const navigate = useNavigate();
  return (
    <section style={{backgroundColor : '#FAD59A', height : '70vh', width : '100%', padding : '20px'}}>
        <h1 style={{textAlign : 'center', fontSize : '50px'}}>About Me!</h1>
        <button onClick={() => {navigate('/')}}>Home</button>
    </section>
  )
}

export default About