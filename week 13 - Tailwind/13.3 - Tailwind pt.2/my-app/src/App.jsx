import Home from "./components/Home/Home"
import { DarkModeProvider } from "./context/darkMode.context"


function App() {  
  return (
    <DarkModeProvider>
      <Home />
    </DarkModeProvider>
  )
}

export default App 