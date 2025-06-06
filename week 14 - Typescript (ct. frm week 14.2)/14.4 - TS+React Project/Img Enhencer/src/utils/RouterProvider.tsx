import {createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../Components/Home';
import Upload from '../Components/Upload';
import Main from '../Components/Main';

const router = createBrowserRouter([
    {
        path: '/', 
        element: <Home />,
    },
    {
        path: '/home', 
        element: <Main />,
    },
    {
        path: '/upload', 
        element: <Upload/>
    },
    {
        path: "*", 
        element: <Navigate to={'/'} replace />
    }
])


export default router;