import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

//use React.createElement to render, its obvious right.. .render() is empleted such way it can only render react ele not document.createElement
let name = React.createElement('p', {style : {color : 'red'}}, "Clild")
let reactEle = React.createElement('div', null , "parent", name);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {reactEle}
  </StrictMode>,
)