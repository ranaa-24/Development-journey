import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'

function App() {
  return (
    <Routes>

    {/* layout Route */}
    {/* all the nested route will follow a specific layout */}
      <Route path='/' element = {<Layout/>}>  
        {/* index page ie. root path */}
        <Route index element = {<Home/>}/>
        <Route path='/home' element = {<Home/>}/>
        <Route path='/about' element = {<About/>}/>
        <Route path='/projects' element = {<Projects/>}/>
      </Route>

      {/* Other layout */}
      <Route path='*' element = {<NoPage/>}/>
    </Routes>
  )
}


// function App() {
//   return (
//     <div>
//       {/* we have used wrapper <BrowserRouter> in main.js */}

//       <Link to='/'> Hello |</Link>
//       <Link to='/Courses'> Courses </Link>

//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/courses' element={<Courses />} />
//         <Route path='*' element={<NoPage />} />
//       </Routes>

//       <footer>
//         <h1>Footer</h1>
//       </footer>
//     </div>
//   )
// }

// function Home() {
//   return <h1>Wellcome</h1>
// }

// function Courses() {
//   let navigate = useNavigate();

//   function navigateUser(){
//     navigate('/')
//   }

//   return <>
//     <ul>
//       <li key={1}>Data Science</li>
//       <li key={2}>FullStack MERN</li>
//       <li key={3}>Java FullStack</li>
//       <li key={4}>System Design</li>
//     </ul>

//     <button onClick={navigateUser}>Go back to Home</button>
//   </>
// }

function NoPage() {
  let loc = useLocation();
  return <p>{loc.pathname} Not Found</p>
}


//  LAZY LOADING
// import { useState, Suspense, lazy} from 'react'
// const LazyComponent = lazy(() => import('./components/LazyLoadingEx'));
// ---------------------
// function App() {
//   return (
//     <>
//       <h1>Heloo</h1>
//       <Suspense fallback={<p>Loading...</p>}>
//         <LazyComponent />
//       </Suspense>
//     </>
//   )
// }

export default App
