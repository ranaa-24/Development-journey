[Watch This](https://www.youtube.com/watch?v=kAOuj6o7Kxs&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&index=5)

## `{}` in JSX = Only Expressions Allowed, not a full statement.

```js
<div>{/* only expressions here */}</div>
```

Valid expressions:

- ✅ Variables → `{name}`
- ✅ Function calls → `{getGreeting()}`
- ✅ Ternaries → `{isLoggedIn ? 'Hi' : 'Login'}`
- ✅ Objects (only for debugging, not for rendering) → `{JSON.stringify(obj)}`
- ✅ Arrays → `{[<li>One</li>, <li>Two</li>]}`

Invalid (⛔ Not allowed directly):

- ❌ Full statements → if, for, while, switch, objects.



### 💡 So what do you do if you need `if` or `for`?

- **Use logic outside JSX**:
```js
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}

return <div>{content}</div>;
```
- **Use `map()` for loops:**

```js
<ul>
  {items.map(item => <li key={item.id}>{item.name}</li>)}
</ul>
```



----
<br>
<br>

## React does **not** use `document.createElement`

React has its own way of building UI elements using a **virtual DOM**, not the browser’s native DOM APIs.

When you write something like:

```jsx
<h1>Hello</h1>
```
It gets compiled by Babel into:
```js
React.createElement('h1', null, 'Hello');
```

🧠 React uses its own virtual DOM. `ReactDOM.render()` (or `createRoot().render()` in React 18+) knows how to take that `React.createElement` output and efficiently update the real DOM.

That’s why `document.createElement` cant be rendered by `.render()`

###  What does `React.createElement` do?

```js
React.createElement(
  type,      // 'div', 'p', or a React component
  props,     // any attributes, e.g., { className: 'box' }
  ...children // content inside the element
)
```

It returns an object like this:

```js
{
  type: 'p',
  props: {
    style: { color: 'red' },
    children: 'Child'
  }
}
```

### 🧪 Example – Manual React Elements

```js
let name = React.createElement('p', { style: { color: 'red' } }, 'Child');

let reactEle = React.createElement('div', null, 'Parent', name);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {reactEle}
  </StrictMode>
);
```

