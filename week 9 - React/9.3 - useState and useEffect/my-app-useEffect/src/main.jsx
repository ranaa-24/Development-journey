import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './propsForResumeCount.jsx'

createRoot(document.getElementById('root')).render(
  // with strictMode it render componets twice which may cause weird behaviour in setTimeout
  <>  
    <App />
  </>,
)
