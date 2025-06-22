import { lazy, Suspense, useState } from 'react';   // tree shaking will only include useState 
// import Home from './sections/Home';
// import About from './sections/About';

// Compare the /dist for both lazy loading has each component its own build

const Home = lazy(() => import("./sections/Home"));
const About = lazy(() => import("./sections/About"));

function App() {
  const [section, setSetsection] = useState("home");
  return (
    <main style={{height: "100vh", width: "100%", backgroundColor: "black", color: "white"}}>
        <nav style={{width: "100%", padding: "8px"}}>
          <button onClick={() => setSetsection("home")}>Home</button>
          <button onClick={() => setSetsection("about")}>About</button>
        </nav>

        <Suspense fallback="Loading...">
          {(section === "home") && <Home/>}
          {(section === "about") && <About/>}
        </Suspense>
    </main>
  )
}

export default App