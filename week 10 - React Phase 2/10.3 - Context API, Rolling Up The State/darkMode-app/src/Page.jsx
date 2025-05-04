import React from 'react'
import { ThemeContext } from './ThemeContext'
import { useContext } from 'react'

function Page() {
    const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <div style={{minHeight : '100vh', backgroundColor : theme === 'light' ? 'white' : 'black', 
    color : theme == 'light'  ? 'black' : 'white', 
    transition : '0.3s', 
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center'
    }}>
        <nav style={{display : 'flex', 
            borderBottom : '1px solid #e1e1e1', 
            justifyContent : 'space-evenly',
            alignItems : 'center',
            height : '50px', 
            width : '100%',
            position : 'absolute', 
            top : 0
        }}>
            <h1>Logo</h1>
            <div>Home</div>
            <div>About</div>
            <div>Projects</div>
            <button style={{padding : 10, background : 'transparent', cursor : 'pointer', color : '#169976', outline : 'none', border : '1px solid gray', borderRadius : '8px'}} onClick={() => {toggleTheme()}}> {theme === 'light' ? 'Dark Mode' : 'Light Mode'}</button>
        </nav>

        <h1>Hello!</h1>

    </div>
  )
}

export default Page