# **React From Basic Part 2**

## Articles/Blogs Link:

-   [**Lists and Keys in ReactJS**](https://medium.com/@shivamjha2436/lists-and-keys-in-reactjs-9a237b98818c)
-   [**Why keys are important in ReactJS**](https://meganslo.medium.com/why-is-reacts-key-prop-important-b6bd51124270);
-   [**React inline styles**](https://medium.com/@ttennant/react-inline-styles-and-media-queries-using-a-custom-react-hook-e76fa9ec89f6)
-   [**React.js inline style best practices**](https://stackoverflow.com/questions/26882177/react-js-inline-style-best-practices)
-   [**Function Components vs Class Components in React – With Examples**](https://www.freecodecamp.org/news/function-component-vs-class-component-in-react/)
-   [**Error Boundaries**](https://legacy.reactjs.org/docs/error-boundaries.html)
-   [**Error Boundaries in React - Handling Errors Gracefully**](https://refine.dev/blog/react-error-boundaries/#introduction)
-   [**How to use React Fragments?**](https://refine.dev/blog/how-react-fragments-is-works/#3-keyed-fragments)
-   [**Fragment**](https://react.dev/reference/react/Fragment)


# Notes -  
-   [**slides**](https://react.dev/reference/react/Fragment)


## 🔑 Why `key` is Important in React

React uses the `key` prop to identify which elements have changed, been added, or removed. This is critical when rendering lists.

### Without `key`
- React can't accurately track list item identity.
- It may re-render unnecessarily or incorrectly.
- Problematic during reordering or deletion.

### With `key`
- React matches old and new virtual DOM nodes more accurately.
- Enables efficient DOM updates.
- Reduces performance overhead.

#### Example
```jsx
// Bad: Using index as key (can cause bugs)
items.map((item, index) => <li key={index}>{item}</li>)

// Good: Using unique ID as key
items.map(item => <li key={item.id}>{item.name}</li>)
```

---

## 🔁 Reconciliation vs Fiber

### Reconciliation
- The process by which React updates the DOM.
- Compares new virtual DOM with the previous one (diffing).
- Applies only the necessary changes.
- `key` plays a key role in improving diffing accuracy.

### Fiber
- Fiber is React's **new reconciliation engine** (since v16).
- Designed to fix limitations of the old, synchronous renderer.
- Allows:
  - Interruptible rendering
  - Prioritized updates
  - Split work into chunks for better scheduling

### Analogy
- **Reconciliation** = What changed?
- **Fiber** = How to process and apply changes efficiently

## `{children}`

Whenever you nest JSX inside a component, that nested cntent is passed to the component as `props.children`.

```js
function Box(props) {
  return <div className="box">{props.children}</div>;
}

// Usage
<Box>
  <p>Hello inside the box!</p>
</Box>
```


## What is an Error Boundary?
By default, if your application throws an error during rendering, React will remove its UI from the screen. To prevent this, you can wrap a part of your UI into an error boundary. An error boundary is a special component that lets you display some fallback UI instead of the part that crashed—for example, an error message.

An **Error Boundary** is a special type of React component that catches JavaScript errors in its **child component tree**, logs them, and displays a fallback UI instead of crashing the whole app.

---

## ⚠️ Why Use Error Boundaries?

Normally, if a component throws during rendering or lifecycle, the **entire app can crash**. Error boundaries help:

- Improve **user experience** with graceful fallbacks
- **Isolate component errors**
- **Log and debug** efficiently

---

## 🔧 Creating an Error Boundary

Error boundaries are **class components** that implement:
- `static getDerivedStateFromError(error)`
- `componentDidCatch(error, info)`

### Example:
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

---

## ❗ Limitations

Error boundaries **do not catch**:
- Errors in event handlers (must handle manually)
- Errors in `setTimeout`, `async` callbacks
- Server-side rendering errors
- Errors thrown outside the React tree

---

## ✅ Summary

| Feature             | Description                                                        |
|---------------------|--------------------------------------------------------------------|
| Error Boundary      | Catches render-time errors in child components                     |
| Key Methods         | `getDerivedStateFromError`, `componentDidCatch`                    |
| Fallback UI         | Shown when an error is caught                                      |
| Limitation          | Only works with class components (currently)                       |

---

