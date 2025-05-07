# **Custom Hooks**

## [Notes/Slides Link](https://petal-estimate-4e9.notion.site/19-Custom-hooks-11d7dfd107358002a165e23cf79d67d2)

## Articles/Blogs Link:

- [**Re using logic with custom hooks**](https://react.dev/learn/reusing-logic-with-custom-hooks) - must read
- [**How to create your own custom React Hooks**](https://blog.logrocket.com/create-your-own-custom-react-hooks/)
- [**React Custom Hooks With Real-Life Examples**](https://betterprogramming.pub/react-custom-hooks-with-real-life-examples-c259139c3d71)
- [**A Guide to React Custom Hooks**](https://dev.to/rasaf_ibrahim/a-guide-to-react-custom-hooks-2b4h)
- [**React Custom Hooks**](https://github.com/sergeyleschev/react-custom-hooks?tab=readme-ov-file)
- [**SWR**](https://swr.vercel.app/)
- [**SWR vs React Query**](https://medium.com/@ignatovich.dm/using-swr-and-react-query-for-efficient-data-fetching-in-react-87f4256910f0)
- [**React Custom Hook - useFetch**](https://dev.to/techcheck/custom-react-hook-usefetch-eid)
- [**Building Your Own Hooks**](https://legacy.reactjs.org/docs/hooks-custom.html)
- [**React Custom Hooks fetch data globally and share across components?**](https://stackoverflow.com/questions/57602715/react-custom-hooks-fetch-data-globally-and-share-across-components)
- [**15 Useful React Custom Hooks That You Can Use In Any Project**](https://dev.to/arafat4693/15-useful-react-custom-hooks-that-you-can-use-in-any-project-2ll8)
- [**Life and death of the usePrevious hook**](https://giacomocerquone.com/blog/life-death-useprevious-hook/) +1
- [**Implementing advanced usePrevious hook with React useRef**](https://www.developerway.com/posts/implementing-advanced-use-previous-hook) +1
- [**Supercharging your React Components with the usePrevious Hooks**](https://www.dhiwise.com/post/supercharging-your-react-components-with-the-useprevious-hooks)
- [**Create a custom debounce Hook in React**](https://blog.logrocket.com/create-custom-debounce-hook-react/)
- [**How to use debounce hooks in React**](https://stackoverflow.com/questions/75556418/how-to-use-debounce-hooks-in-react)
- [**React Custom Hook: useOnlineStatus**](https://habr.com/en/articles/752810/)
- [**Understanding React Query**](https://medium.com/bina-nusantara-it-division/understanding-react-query-11e56960e90c)
- [**Beginner's Guide to React Query**](https://refine.dev/blog/react-query-guide/#article-objective)

## Custom hooks

Sometimes, you’ll wish that there was a Hook for some more specific purpose: for example, to fetch data, to keep track of whether the user is online, or to connect to a chat room. You might not find these Hooks in React, but you can create your own Hooks for your application’s needs.

custom hooks are JavaScript functions that start with the word `use` and allow you to reuse logic across multiple components. They're a way to extract and share stateful logic (like fetching data, managing form inputs, etc.) outside of a component.

### Why Use Custom Hooks?

- Reusability – Avoid code duplication.
- Clean Code – Keep components focused on rendering.
- Separation of Concerns – Logic lives outside the UI.

### Basic Structure

A custom hook is just a regular function that may use other hooks (`useState`, `useEffect`, etc.).

```js
// useCounter.js
import { useState } from "react";

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

export default useCounter;
```

in component

```js
import React from "react";
import useCounter from "./useCounter";

function CounterComponent() {
  const { count, increment, decrement, reset } = useCounter(5);

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>−</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Note :

In React, only **components** re-render, not custom hooks.

So when `useState` is used inside a custom hook, the component that uses the hook will re-render when that state changes.

the hook defines a `count` state internally, but the state is actually tied to the component that uses this hook.

When you write this in your component:

```
const { count, increment } = useCounter(5);
```

we're calling `useCounter(5)` on every render of the component, just like calling a function inside a component.

BUT — that doesn't mean `useState(5)` inside the hook resets on every render.

```js
function useCounter(initialValue = 5) {
  const [count, setCount] = useState(initialValue); // only uses `initialValue` once (on first render)
  ...
}
```

`useState` inside a custom hook works exactly like normal `useState` inside a component.

only when a component unmounts, its state (including any inside a custom hook) is destroyed/reset.

### What happens if we skip the `use` prefix?

```js
function counterHook() {
  const [count, setCount] = useState(0);
  return { count, setCount };
}
```

```vbnet
React has detected a call to useState() outside of a function component or custom hook
```

## custom `useFetch()'

### `useFetch.js` – The Hook

```js
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null); // stores fetched data
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state

  useEffect(() => {
    const abortController = new AbortController(); // for cancelling fetch if needed

    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) throw new Error("Network response was not ok");
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => abortController.abort(); // clean up on unmount
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
```

component

```js
import useFetch from "./useFetch";

function UserList() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### NOTE: React renders component before the fetch completes.

First Render:

- data is null.
- React runs JSX.
- It hits data.title — ❌ boom, error: "Cannot read property 'title' of null".

Later (after fetch):

- setData() is called with the real data.
- React re-renders.
- Now data.title would work — ✅

so `null` on the `data` init state causes an error, Use guard clauses or conditional rendering to wait until data is ready:

```js
if (!data) return <p>Loading...</p>;

return <h1>{data.title}</h1>;
```

## What is `AbortController`?

`AbortController` is a built-in browser API that allows you to cancel an ongoing `fetch()` request. It's useful in React for preventing memory leaks and unnecessary updates when a component unmounts or the request becomes irrelevant.

---

## Why Use `AbortController` in React?

In `useEffect`, a fetch might be running when:

- The component unmounts before the fetch finishes.
- The `url` dependency changes, triggering a new fetch.

If the old fetch completes after unmounting or being replaced, it can cause:

- Memory leaks.
- React warnings like: **"Can't perform a React state update on an unmounted component."**

---

## Example in `useFetch()`

```js
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) throw new Error("Network response was not ok");
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => abortController.abort(); // cleanup on unmount or url change
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
```

---

## ⛔ What Happens When Aborted?

- `abortController.abort()` cancels the request.
- The `fetch()` promise rejects with an error of name `'AbortError'`.
- We **check for `AbortError`** in the `catch` block to avoid false error messages.

```js
if (err.name !== "AbortError") {
  setError(err.message);
  setData(null);
}
```

## `useFetchWithRefetch()`:
`useFetch` hook with manual `refetch()` support — meaning you can trigger a re-fetch whenever you want (like after a button click or mutation):


```js
import { useState, useEffect, useCallback } from 'react';

function useFetchWithRefetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(0); // used to force refetch

  const refetch = useCallback(() => {
    setTrigger(prev => prev + 1); // changes the effect dependency
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) throw new Error("Network response was not ok");
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => abortController.abort(); // cleanup
  }, [url, trigger]);

  return { data, loading, error, refetch };
}

export default useFetchWithRefetch;
```

Example Usage

```js
import useFetchWithRefetch from './useFetchWithRefetch';

function UserInfo() {
  const { data, loading, error, refetch } = useFetchWithRefetch('https://jsonplaceholder.typicode.com/users/1');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>{data.name}</h1>
      <button onClick={refetch}>Refetch</button>
    </>
  );
}
```


## `usePrev()` - [Read](https://blog.logrocket.com/accessing-previous-props-state-react-hooks/)


The `usePrev` (or `usePrevious`) hook is a custom React hook used to **track the previous value** of a prop or state variable across renders.

---

## ✅ Hook Code

```js
import { useEffect, useRef } from 'react';

/**
 * Custom hook to store and return the previous value of a variable.
 *
 * @param {any} value - The current value to track.
 * @returns {any} - The previous value from the last render.
 */
function usePrev(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrev;
```

---

## 📦 Example Usage

```jsx
import { useState } from 'react';
import usePrev from './usePrev';

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrev(count);

  return (
    <div>
      <p>Now: {count}</p>
      <p>Before: {prevCount}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}
```

---

## ⚙️ Why `undefined` on First Render?

### 🔄 React's Render Phases

1. **Component function runs** – JSX and hooks run (`useState`, `useEffect`, etc.)
2. **React paints the UI** – based on the return of the component function.
3. **Effects run after paint** – `useEffect()` fires after the DOM is updated.

### 🧠 In `usePrev`:

```js
const ref = useRef(); // Step 1: ref.current === undefined initially

useEffect(() => {
  ref.current = value; // Step 3: Runs AFTER the first render
}, [value]);

return ref.current; // Step 2: Still undefined on first render
```

So during the **first render**:

- `ref.current` is `undefined`.
- `useEffect` hasn’t run yet to set it.
- Thus, `usePrev()` returns `undefined`.

### ✅ On second render:

- `ref.current` now holds the value from the first render.
- You get the correct "previous" value.

---

## `useDebounce()` [Debounce and Throttling](https://www.youtube.com/watch?v=3o47TTtF2u0)

### What is Debouncing?
Debouncing ensures that a function is not called again until a certain amount of time has passed since the last time it was invoked.

if it does, it starts a new clock from 'now'

It’s super useful for performance when reacting to fast, repeated events — like typing, scrolling, resizing, etc. (thats why returns a function form debounce so that it can be called)

js code 

```js
<input type="text" id="search" placeholder="Type to search..." />
<div id="results"></div>

<script>
  function fetchResults(query) {
    document.getElementById('results').innerText = `Searching for "${query}"...`;
    // Simulate API call delay
    setTimeout(() => {
      document.getElementById('results').innerText = `Results for "${query}"`;
    }, 300);
  }

  const debouncedSearch = debounce(fetchResults, 500);

  document.getElementById('search').addEventListener('input', function (e) {
    debouncedSearch(e.target.value);
  });

  // Debounce function definition (same as above)
  function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);     // the old timer has the access of old timeer coz of clouse
      timer = setTimeout(() => {
        func.apply(this, args);    // 'this' so that the the current context of the caller, eg an event handler called this on a element 
      }, delay);
    };
  }
</script>
```



## 🧠 What is `this`?

In JavaScript, `this` refers to the **object that is calling the function**.

### Example:
```js
const person = {
  name: "Alice",
  greet() {
    console.log("Hello, my name is " + this.name);
  }
};

person.greet(); // Hello, my name is Alice
```

## 💥 What Happens If We Lose `this`?
```js
const person = {
  name: "Alice",
  greet() {
    setTimeout(function () {
      console.log("Hello, my name is " + this.name);
    }, 1000);
  }
};

person.greet(); // ❌ Hello, my name is undefined
```
Here, `this` inside `setTimeout` is not `person` anymore — it's the global window object.

## ✅ How to Fix It with `.apply(this, args)`

We can preserve `this` from the outer context:

### Using `.apply()`:
```js
const person = {
  name: "Alice",
  greet() {
    setTimeout(function () {
      console.log("Hello, my name is " + this.name);
    }.apply(this), 1000); // now 'this' is still 'person'
  }
};

person.greet(); // ✅ Hello, my name is Alice
```

## ✅ How It Applies to Debounce

When we write a debounce function like this:
```js
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
```

It means:
> Call `func` and treat `this` as whatever called `debouncedSearch` — usually the DOM element or component — to avoid bugs when `func` depends on `this`.

### ❓ Does the `useEffect` run on initial render?

✅ Yes. Since `value` is in the dependency array, `useEffect` runs on the initial render with the initial value.

---

### ❓ Will the callback inside `setTimeout` run immediately?

❌ No. It will only run after the specified `delay` (e.g., 500ms) has passed without the `value` changing.

---

### ❓ What is returned before the delay finishes?

Until the delay finishes, the hook continues returning the **last debounced value**. It does **not** instantly reflect the current input value.

---

### ❓ If the user types "aab" quickly, what happens?

Each time:
- A new timer is created for the current value
- The old timer is cleared
- Only the final value after typing (e.g., "aab") gets committed after the delay

---

### ❓ Does it run `console.log(...)` or API on initial render if the input is `""`?

✅ Only if you do **not** guard with:
```js
if (debouncedInput) {
  // avoid running for empty input
}
```
`""`, `null`, and `undefined` are all falsy and will prevent execution of the block.

---

### ❓ Common Mistake

```js
return () => clearInterval(timer);  // ❌ incorrect
```
You should use:
```js
return () => clearTimeout(timer);   // ✅ correct
```
Because `setTimeout` was used, not `setInterval`.

---

## ✅ Summary

- `useDebounce` is essential for handling controlled input without unnecessary effects or API calls.
- Always clear the timer on cleanup.
- Use a `truthy` check before triggering side effects like API calls on debounced values.
