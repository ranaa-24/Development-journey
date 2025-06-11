import {createBrowserRouter, RouterProvider, Link} from 'react-router-dom'
import Prediction from './components/Prediction';
import Home from './components/Home';

const  router = createBrowserRouter([
  {
    path : '/', 
    index : true,
    element : <Home/>
  }, 
  {
    path : '/prediction', 
    element : <Prediction />
  }
]);

function App() {
  return(
    <RouterProvider router={router} />
  )
}

export default App
