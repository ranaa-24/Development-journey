import Home from './components/Home'
import About from './components/About'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/about',
      element: <About />
    }
  ])

  
  return (
    <>
      <h3 style={{ color: 'purple' }}>Xcin.dev</h3>
      {/* all the routers defiled under this */}
      <RouterProvider router={router} />
    </>
  )
}

export default App
