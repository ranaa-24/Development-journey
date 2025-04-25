import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)


// React vs ReactDOM
// let h1 = React.createElement('h1', null, "Helloo im created with react");
// let rootEle = document.getElementById('root');

// let root = createRoot(rootEle); //ReactDOM.createRoot(rootEle)
// root.render(h1);
