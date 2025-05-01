import { Component, Fragment, useState } from 'react'

//Topic Covered in this code : children, Error Boundaries, Fragments (<> </>)

function App() {
  let random = Math.floor(Math.random() * 2);   // 0 or 1, will generate a error sometimes 
  let random2 = Math.floor(Math.random() * 2);   // 0 or 1, will generate a error sometimes 

  return (
    <Fragment>

      {/* Error boundary starts for card 1  */}
      <ErrorBoundary>
        <Card throwError={random === 1 ? true : false} >
          <h1>Card 1</h1>
          <p>This is some random card yet - 1</p>
        </Card>
      </ErrorBoundary>
      {/* Error boundary ends for card 1  */}

      <ErrorBoundary>
        <Card throwError={random2 === 1 ? true : false}>
          <h1>Card 2</h1>
          <p>This is some random card yet - 2 </p>
        </Card>
      </ErrorBoundary>

    </Fragment>
  )
}

function Card({ children, throwError }) {
  if (throwError) {
    throw new Error();
  }

  return (
    <div style={{ backgroundColor: "#BBD8A3", padding: "8px", border: "1.3px solid gray", margin: '10px', borderRadius: '6px' }}>
      {children}
    </div>
  )
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        // making error looks like a card too
        <Card>
          <p style={{ color: 'red' }}>Something went wrong</p>
          <button onClick={() => location.reload()}>refresh</button>
        </Card>
      )
    }

    return this.props.children;
  }
}

export default App
