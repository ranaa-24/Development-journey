## **Recoil - 2**

## Articles/Blogs Link:

- [**Recoil**](https://recoiljs.org/docs/basic-tutorial/intro/)
- [**Atoms and Selectors**](https://recoiljs.org/docs/introduction/core-concepts/#:~:text=Recoil%20lets%20you%20create%20a,state%20either%20synchronously%20or%20asynchronously.)
- [**useRecoilValue(State)**](https://recoiljs.org/docs/api-reference/core/useRecoilValue/)
- [**useRecoilState(state)**](https://recoiljs.org/docs/api-reference/core/useRecoilState/)
- [**Asynchronous Data Queries**](https://recoiljs.org/docs/guides/asynchronous-data-queries/) +1

- [**atomFamily(options)**](https://recoiljs.org/docs/api-reference/utils/atomFamily/)
- [**selectorFamily(options)**](https://recoiljs.org/docs/api-reference/utils/selectorFamily/)
- [**What is the use case of atomFamily in recoil?**](https://stackoverflow.com/questions/72371057/what-is-the-use-case-of-atomfamily-in-recoil)

- [**Writeable Selectors**](http://recoiljs.org/docs/api-reference/core/selector#writeable-selectors)
- [**class Loadable**](https://recoiljs.org/docs/api-reference/core/Loadable)
- [**useRecoilValueLoadable(state)**](https://recoiljs.org/docs/api-reference/core/useRecoilValueLoadable)
- [**useRecoilStateLoadable(state)**](https://recoiljs.org/docs/api-reference/core/useRecoilStateLoadable)
- [**Maximizing React State Efficiency: A Deep Dive into Recoil Selectors vs. useMemo for Optimal Performance**](https://medium.com/@dashakashkumar636/maximizing-react-state-efficiency-a-deep-dive-into-recoil-selectors-vs-4f63ab3edc37)
- [**Suspense Hook in React**](https://react.dev/reference/react/Suspense)
- [**How to Use React Suspense to Improve your React Projects**](https://www.freecodecamp.org/news/react-suspense/)
- [**Error Boundaries**](https://legacy.reactjs.org/docs/error-boundaries.html)
- [**Error Boundaries in React - Handling Errors Gracefully**](https://refine.dev/blog/react-error-boundaries/#introduction)

---

# Writable Selectors:

In Recoil, a writable selector (also called a selector with `set`) allows both reading and writing derived state. This is useful when you want a computed value that can also be updated, which in turn updates the underlying atom.

### ex:

```js
import { atom, selector } from "recoil";

// Basic atom
const countState = atom({
  key: "countState",
  default: 0,
});

// Writable selector
const doubleCountSelector = selector({
  key: "doubleCountSelector",
  get: ({ get }) => get(countState) * 2,
  set: ({ set }, newValue) => {
    set(countState, newValue / 2); // Updating the atom via selector
  },
});
```

### Usage in component

```js
import { useRecoilState } from "recoil";
import { doubleCountSelector } from "./store";

function Counter() {
  const [doubleCount, setDoubleCount] = useRecoilState(doubleCountSelector);

  return (
    <div>
      <p>Double Count: {doubleCount}</p>
      <button onClick={() => setDoubleCount(doubleCount + 2)}>
        Increase Double Count
      </button>
    </div>
  );
}
```

## Asynchronous Data Queries in Recoil?

In Recoil, asynchronous data queries are handled using selectors that perform async operations — typically to fetch remote data (like from an API). These are called asynchronous selectors, and they're used to manage derived state that comes from async operations.

### Key idea

You define an async function inside a Recoil selector, and Recoil will automatically handle the loading, error, and **caching states** for you.

- The results are cached, so the query will only execute once per unique input. EI, if we query a async task for inputId : 1, the network req only goes once next time for inputId: 1 there is no loading..

### ✅ Example of an Async Selector

```js
import { selector } from "recoil";

const userDataQuery = selector({
  key: "userDataQuery",
  get: async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    if (!response.ok) throw new Error("Failed to fetch");
    return await response.json();
  },
});
```

### 🧪 Using It in a Component

```jsx
import { useRecoilValueLoadable } from "recoil";
import { userDataQuery } from "./store";

function UserComponent() {
  const user = useRecoilValueLoadable(userDataQuery);

  if (userLoadable.state === "loading") return <p>Loading...</p>;
  if (userLoadable.state === "hasError") return <p>Error loading data</p>;

  const user = userLoadable.contents;
  return <div>{user.name}</div>;
}
```

| Hook                     | Behavior                                                                     |
| ------------------------ | ---------------------------------------------------------------------------- |
| `useRecoilValue`         | Suspends the component while loading (works well with React Suspense)        |
| `useRecoilValueLoadable` | Gives you `.state` and `.contents`, useful for manual loading/error handling |

## Use Suspense in React with Recoil (for Async Selectors)

### 1. Create an async selector

```js
import { selector } from "recoil";

export const userDataSelector = selector({
  key: "userDataSelector",
  get: async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    if (!response.ok) throw new Error("Failed to fetch");
    return await response.json();
  },
});
```

### 2. Use it in a component with `useRecoilValue`

```js
import { useRecoilValue } from "recoil";
import { userDataSelector } from "./store";

function UserComponent() {
  const user = useRecoilValue(userDataSelector);
  return <div>{user.name}</div>;
}
```

### 3. Wrap your component tree with `<Suspense>`

```js
import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";
import UserComponent from "./UserComponent";

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<p>Loading user data...</p>}>
        <UserComponent />
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
```

## NOTE : 🔥 `Suspense` only works with suspending resources — like those created by Recoil, React Relay, React Query, or manually thrown Promises (like with `React.lazy()` or experimental `use()` in React 18+ server components).

---

## 🔍 Difference Between Normal and Async Selectors

| Feature             | 🔹 Normal Selector | 🔸 Async Selector              |
| ------------------- | ------------------ | ------------------------------ |
| Function Type       | Synchronous        | Asynchronous                   |
| Return Type         | Value              | Promise                        |
| Use Case            | Local calculations | Remote API calls               |
| React Integration   | Works instantly    | Needs `Suspense` or `Loadable` |
| Error/Loading State | Not applicable     | Managed via `Loadable`         |

### 🔹 Normal Selector Example

```js
const priceAtom = atom({ key: "priceAtom", default: 100 });

const taxSelector = selector({
  key: "taxSelector",
  get: ({ get }) => get(priceAtom) * 0.18,
});
```

### 🔸 Async Selector Example

```js
const userDataSelector = selector({
  key: "userDataSelector",
  get: async () => {
    const res = await fetch("https://api.example.com/user");
    return res.json();
  },
});
```

---

## ⚛️ React Hooks for Async Selectors

- `useRecoilValue`: Suspends rendering until data is ready (requires React Suspense)
- `useRecoilValueLoadable`: Gives `.state` and `.contents` to handle loading and error manually

# Recalling JS Promises, Async/Await, and the Event Loop

## 📌 Table of Contents

- What is an `async` function?
- Does `async` block the main thread?
- What happens if you don't use `async`?
- Where does a Promise "wait"?
- What if a Promise does heavy work (like a loop)?
- What happens during `await new Promise(r => setTimeout(r, 5000))`?
- Where exactly does an `async` function wait when it encounters `await`?

---

## ✅ What is an `async` Function?

An `async` function is **syntactic sugar** over Promises. It allows you to write asynchronous code that looks synchronous using the `await` keyword.

### Example:

```js
// Using Promises
function fetchUser() {
  return fetch("/api/user").then((res) => res.json());
}

// Using async/await
async function fetchUser() {
  const res = await fetch("/api/user");
  return res.json();
}
```

---

## ✅ Does `async` Block the Main Thread?

No. `async`/`await` does **not block** the main thread.

- The `await` keyword **pauses the execution of the async function**, but not the entire program.
- The remaining code continues to run while the async task completes.

### Example:

```js
console.log("1");

async function foo() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("2");
}

foo();
console.log("3");
```

**Output:**

```
1
3
2
```

---

## ✅ What Happens If You Don’t Use `async`?

You can still write asynchronous code with `.then()` chaining:

### Without async/await:

```js
fetch("/api/user")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

### With async/await:

```js
try {
  const res = await fetch("/api/user");
  const data = await res.json();
  console.log(data);
} catch (err) {
  console.error(err);
}
```

Both approaches work — `async/await` is just cleaner and more readable, especially in complex flows.

---

## ✅ Where Does a Promise "Wait"?

It depends on **what the Promise is doing**:

### Summary Table:

| What You're Awaiting      | Who Handles It   | Where It Resumes                                |
| ------------------------- | ---------------- | ----------------------------------------------- |
| `fetch()`, `setTimeout()` | Browser Web APIs | Macrotask queue (setTimeout), Microtask (fetch) |
| `Promise.resolve()`       | JS engine        | Microtask queue                                 |
| `.then()` callback        | JS engine        | Microtask queue                                 |

---

## ✅ Heavy Work in Promises — Do They Block?

### Example:

```js
const p = new Promise((resolve) => {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += 1;
  }
  resolve(sum);
});

p.then(console.log);
```

- This loop is **synchronous and CPU-heavy**.
- Even though it's inside a Promise, it **blocks the main thread** until complete.

> ✅ **Important:** A `Promise` itself does not make code asynchronous. Only the APIs or constructs you use inside the Promise determine that.

### To avoid blocking:

```js
setTimeout(() => {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += 1;
  }
  resolve(sum);
}, 0);
```

This delays the loop until the current call stack clears.

For true non-blocking performance on heavy computation: use **Web Workers** or **Node.js worker threads**.

---

## ✅ `await new Promise(r => setTimeout(r, 5000))`

This line:

```js
await new Promise((r) => setTimeout(r, 5000));
```

- Registers a 5-second timer with the Web API.
- Pauses the async function.
- After 5s, callback goes to the **macrotask queue**.
- Then the async function resumes.

### Example:

```js
console.log("Start");
await new Promise((r) => setTimeout(r, 5000));
console.log("End");
```

**Output:**

```
Start
(wait 5 seconds)
End
```

> Note: the main thread is free to do other things while the timer runs.

---

## ✅ Where Exactly Does an Async Function Wait When It Encounters `await`?

### What Happens Internally:

1. `await` is encountered.
2. JS engine pauses the function at that line.
3. The rest of the function is stored as a **continuation**.
4. The Promise is allowed to resolve (e.g. through a Web API or a microtask).
5. Once ready, the continuation is put in the **microtask queue**.
6. When the call stack is empty, the event loop resumes the function.

### It's NOT waiting:

- In the **main thread** — it’s free.
- Inside the **Promise** — Promises don’t “hold” code.
- But rather in the **JS engine’s scheduler**, queued as a **microtask**.

### Final Example:

```js
async function run() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}

run();
console.log("C");
```

**Output:**

```
A
C
B
```

---

## 🧠 Final Notes

- Promises represent future values.
- `await` pauses async functions, not the whole app.
- Async work is scheduled in either **microtasks** or **macrotasks**.
- Heavy computation inside a Promise still blocks unless deferred.
- Use async/await for readability, but know how it works under the hood.

Let me know if you'd like a diagram or interactive demo version of this!

# atomFamily()

An Atom Family represents a collection of atoms. When you call `atomFamily()` it will return a function which provides the `RecoilState` atom based on the parameters you pass in.

It's perfect when you want multiple atoms with similar behavior but identified by a unique key or ID.

Suppose you're building a to-do app and want a separate atom for each to-do item, based on its ID. Instead of manually creating `todo1Atom`, `todo2Atom`, etc., you can use `atomFamily` to **dynamically generate and manage them** using id.

### How It Works

- `atomFamily(param)` returns an atom uniquely tied to that parameter.

- Internally, Recoil caches these atom instances — so asking for `atomFamily(1)` always gives you the same atom instance for `1`

## Ex:

### `todosAtoms.js`

```js
import { atomFamily } from "recoil";

const todoItemAtomFamily = atomFamily({
  key: "todoItemAtom",
  default: (param) => ({
    id: param,
    text: "",
    completed: false,
  }),
});
```

Then you can use it like this in a component:

```js
import { useRecoilState } from "recoil";

function TodoItem({ id }) {
  const [todo, setTodo] = useRecoilState(todoItemAtomFamily(id));

  return (
    <input
      value={todo.text}
      onChange={(e) =>
        // we'hv gotten an atom with a id, we gonna set the atom
        setTodo({ ...todo, text: e.target.value })
      }
    />
  );
}
```

## Ex 2

- Fetch user data using their id
- Store each user's data in a Recoil atomFamily
- Display a user card based on their ID

### `UserAtom.js`

```js
import { atomFamily } from "recoil";

export const userAtomFamily = atomFamily({
  key: "userAtom",
  default: async (userId) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    if (!response.ok) {
      throw new Error("User not found");
    }
    return await response.json();
  },
});
```

### `UserCard.js`

```js
import React from "react";
import { useRecoilValueLoadable } from "recoil";
import { userAtomFamily } from "./UserAtom";

export default function UserCard({ userId }) {
  // we are creating an atom (if not previously defonded and subsribing to that atom)
  const user = useRecoilValue(userAtomFamily(userId));

  return (
    <div style={{ border: "1px solid #ccc", margin: "1rem", padding: "1rem" }}>
      <h3>{user.name}</h3>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
    </div>
  );
}
```

### Note : As the default value depends on a async task so we must wrap the componnet (the subsriber of the atom) inside a `<Suspense></Suspense>` or `useRecoilValueLoadable`

### `App.js`

```js
import React from "react";
import { RecoilRoot } from "recoil";
import UserCard from "./UserCard";

function App() {
  return (
    <RecoilRoot>
      <h1>Users</h1>
      <Suspense fallback={<h2>Loading..</h2>}>
        <UserCard userId = {1}/>
        <UserCard userId = {2}/>
        <UserCard userId = {3}/>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
```

## 🔍 What is `selectorFamily`?

`selectorFamily` is a utility provided by Recoil to create a **parameterized selector**. It allows you to compute or fetch derived state based on a dynamic input (like an ID).

It's the dynamic version of `selector` — just like `atomFamily` is a dynamic version of `atom`.

---

## ✅ Why Use `selectorFamily`

* When you want to **compute or fetch** data based on parameters.
* When you want **derived state per key** (like userId, postId, etc).
* When you want to **avoid duplicating selector logic**.

---

## 🧠 Syntax Breakdown

```js
selectorFamily({
  key: 'uniqueKey',
  get: (param) => ({ get }) => {
    // logic using param
    return ...;
  }
});
```

### Explanation:

* `get: (param) =>` : Outer function receives the dynamic parameter (e.g., userId).
* `({ get }) => {}` : Inner function has access to the Recoil API and is executed by Recoil.

---

## ✅ Async Support

Yes! You can make the `get` function async:

```js
const userPostsSelector = selectorFamily({
  key: 'userPostsSelector',
  get: (userId) => async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return await res.json();
  }
});
```

### 📦 React Suspense:

If you use this selector in a component, it will suspend the UI until the data is available.

---

## 🆚 atomFamily vs selectorFamily

| Feature             | `atomFamily`                     | `selectorFamily`                     |
| ------------------- | -------------------------------- | ------------------------------------ |
| Stores state?       | ✅ Yes                            | ❌ No (computed only)                 |
| Can be async?       | ✅ Yes (`default` can be Promise) | ✅ Yes (`get` can be async)           |
| Accepts parameters? | ✅ Yes                            | ✅ Yes                                |
| React Suspense?     | ✅ Yes                            | ✅ Yes                                |
| Read/write?         | ✅ Yes                            | 🔁 Read-only unless `set` is defined |

---

## 🧪 Example: Posts by User

```js
const userPostsSelector = selectorFamily({
  key: 'userPostsSelector',
  get: (userId) => async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return await res.json();
  }
});
```

### In a Component:

```jsx
function UserPosts({ userId }) {
  const posts = useRecoilValue(userPostsSelector(userId));

  return (
    <div>
      <h2>Posts by User {userId}</h2>
      {posts.map(post => (
        <div key={post.id}>
          <strong>{post.title}</strong>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 🧩 Real-World Use Case

You can combine `atomFamily` and `selectorFamily`:

```js
const userAtomFamily = atomFamily({
  key: 'userAtomFamily',
  default: async (id) => {
    const res = await fetch(`/users/${id}`);
    return await res.json();
  }
});

const userNameSelector = selectorFamily({
  key: 'userNameSelector',
  get: (id) => ({ get }) => {
    const user = get(userAtomFamily(id));
    return user.name;
  }
});
```

---

## 🎯 Summary

* `selectorFamily` = dynamic/computed state per key.
* Supports async and React Suspense.
* Accepts a parameter, and returns a getter function.
* Often used with `atomFamily` to derive state.

Use `selectorFamily` when you want **on-demand, derived state with parameters**, especially in apps with multiple similar entities (like users, products, posts).


#  Writable Selectors in Recoil

In Recoil, selectors can be either **read-only** (getter-only) or **writable** (getter + setter). A **writable selector** allows you to compute derived state and also update base state — usually by writing to an atom.

---

## 🧠 Syntax for a Writable Selector

```js
const doubleCounterSelector = selector({
  key: 'doubleCounterSelector',
  get: ({ get }) => {
    return get(counterAtom) * 2;
  },
  set: ({ set }, newValue) => {
    set(counterAtom, newValue / 2);
  }
});
```

### ✅ Explanation:
- `get`: Reads a value from an atom or another selector.
- `set`: Accepts a new value and updates atom(s) accordingly.

---

## ✅ Usage in Component
If your selector is writable, you **can** use `useRecoilState()` on it:

```jsx
const [value, setValue] = useRecoilState(doubleCounterSelector);
```

---

## ⚠️ Important Annotation

> ❌ You **cannot** use `useRecoilState()` with a selector that is **read-only** (has only `get` and no `set`).

```js
const readOnlySelector = selector({
  key: 'readOnly',
  get: ({ get }) => get(myAtom),
});
```

```jsx
const [val, setVal] = useRecoilState(readOnlySelector); // ❗️Will throw error
```

### 🗯 Error:
```
❗️ Attempted to set a read-only selector
```

Use `useRecoilValue()` or `useRecoilValueLoadable()` instead if you only want to read.

---

