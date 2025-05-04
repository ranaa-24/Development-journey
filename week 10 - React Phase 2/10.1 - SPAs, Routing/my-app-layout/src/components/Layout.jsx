import React, { useLayoutEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'


function Layout() {
    let location = useLocation();
    return (
        <div>
            <nav style={{backgroundColor : '#f3f3f3', padding : 8}}>
                <Link to='/' > Home </Link> | <Link to='/about'>About</Link> | <Link to='/projects'>Projects</Link>
            </nav>
            <hr />

            <h3>{location.pathname}</h3>

            <Outlet/>

            <footer>
                <p>2025 @xcin all copyright reserved</p>
            </footer>
        </div>
    )
}

export default Layout