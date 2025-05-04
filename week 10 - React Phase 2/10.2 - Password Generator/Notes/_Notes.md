# React `useCallback` Hook - Notes

## 📌 What is `useCallback`?

`useCallback` is a React Hook that returns a **memoized version of a callback function**, which only changes if one of its dependencies has changed.

```js
const memoizedCallback = useCallback(() => {
  // your logic here
}, [dependencies]);
```

---

## ✅ Why use `useCallback`?

- Prevents **unnecessary re-creation** of functions on every render.
- Helps maintain **stable references** to functions when passing to child components.
- Useful when passing callbacks to **memoized components** (`React.memo`) or using inside `useEffect`, `useMemo`, etc.

---

## ❌ When NOT to use `useCallback`

- If the function is not passed as a prop or used in a dependency array.
- If you're only calling the function locally and it's cheap to re-create.
- Overuse can **add unnecessary complexity** and memory overhead.

---

## ⚠️ Example: Misuse of `useCallback`

```js
const passGen = useCallback(() => {
  let charMap = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (requiredSpecialChar) charMap += "!@#$%^&*()_+-=[]{}|:',.<>/?`~";
  if (requiredNumber) charMap += "0123456789";

  let pass = "";
  for (let i = 0; i < currentLength; i++) {
    const randomIdx = Math.floor(Math.random() * charMap.length);
    pass += charMap.charAt(randomIdx);
  }

  setPassword(pass);
}, [currentLength, requiredSpecialChar, requiredNumber]);
```

### ❌ Problem:

- This function is used internally and not passed to a memoized child.
- So `useCallback` offers **no benefit** and adds **unnecessary complexity**.

### ✅ Better:

```js
const passGen = () => {
  let charMap = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (requiredSpecialChar) charMap += "!@#$%^&*()_+-=[]{}|:',.<>/?`~";
  if (requiredNumber) charMap += "0123456789";

  let pass = "";
  for (let i = 0; i < currentLength; i++) {
    const randomIdx = Math.floor(Math.random() * charMap.length);
    pass += charMap.charAt(randomIdx);
  }

  setPassword(pass);
};
```

---

## ✅ Summary

| Use Case                              | Should You Use `useCallback`? |
| ------------------------------------- | ----------------------------- |
| Function passed to memoized child?    | ✅ Yes                        |
| Used in `useEffect`/dependency array? | ✅ Yes                        |
| Just used in current component?       | ❌ No                         |
| Function is cheap and simple?         | ❌ No                         |

---

## 🧠 Remember

> "Don’t optimize prematurely. Only memoize when there’s a clear performance benefit."

---

## 📚 Resources

- [React Docs - useCallback](https://react.dev/reference/react/useCallback)
- [React Docs - Memoization](https://react.dev/learn/reusing-logic-with-custom-hooks#memoization)
