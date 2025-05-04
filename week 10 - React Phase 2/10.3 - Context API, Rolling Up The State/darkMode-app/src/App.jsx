import { ThemeProvider } from "./ThemeContext"
import Page from "./Page"

function App() {
  return(
    <ThemeProvider>
      <Page/>
    </ThemeProvider>
  )
}

export default App
