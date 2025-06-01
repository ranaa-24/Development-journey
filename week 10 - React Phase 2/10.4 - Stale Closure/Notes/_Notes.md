## Stale closures can be a tricky and hard-to-find issue when using React hooks.

### [Video](https://www.youtube.com/watch?v=7yw_D3h4xSo)

### [Stale closures and React hooks](https://medium.com/@anandsimmy7/stale-closures-and-react-hooks-ea60689a3544)

### [React Stale Closure: Common Problems and Easy Solutions](https://www.dhiwise.com/post/react-stale-closure-common-problems-and-easy-solutions)


---


## 📌 What is a Closure?

A **closure** is a JavaScript feature where a function "remembers" the variables from the scope in which it was created — even if it's executed in a different scope.

Example:

```js
function outer() {
    let count = 0;
    return function inner() {
        console.log(count); // remembers `count`
    }
}
const fn = outer();
fn(); // logs 0
```

Closures are powerful, but can lead to **stale closures** in React.

---

## 🚨 What is a Stale Closure?

A **stale closure** occurs when a function used inside a React component **captures outdated (stale) values** of props or state **because it was created during a previous render**.

This is common in:

- Event listeners
- `setTimeout`, `setInterval`
- `useEffect`, `useCallback`

---

## 🧪 Basic Example

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setTimeout(() => {
      alert(count); // ❌ stale value
    }, 2000);
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

Even if `count` updates before the timeout ends, the `alert(count)` still shows the old value.

---

## 🧰 Why Does It Happen?

- Functions in React are **re-created every render**.
- When you use a function that refers to a state variable, that function "captures" the **current value at that moment**.
- If that function is used **later** (e.g. inside a timeout or event), it **does not know** about future changes.

---

## 🛠️ How to Fix It

### ✅ Solution 1: Use Functional Updates

```jsx
setCount(prev => {
  console.log(prev); // always latest value
  return prev + 1;
});
```

### ✅ Solution 2: Use Refs

```jsx
const countRef = useRef(count);
useEffect(() => {
  countRef.current = count;
}, [count]);
```

Then access `countRef.current` instead of `count` in your closures.

---

## 🎧 Real-World Example (Music Player)

```tsx
function Music() {
    const audioRef = useRef(new Audio(song));
    const [isPlaying, setIsPlaying] = useState(false);
    const isPlayingRef = useRef(isPlaying);

    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    const handlePlay = () => {
        const audio = audioRef.current;
        const currentlyPlaying = isPlayingRef.current;

        if (currentlyPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(prev => !prev);
    };

    const handleKeypress = (event: KeyboardEvent) => {
        if (event.altKey && event.key.toLowerCase() === 'm') {
            handlePlay(); // ✅ gets latest state via ref
        }
    };

    useEffect(() => {
        document.body.addEventListener('keydown', handleKeypress);
        return () => document.body.removeEventListener('keydown', handleKeypress);
    }, []);

    return (
        <div onClick={handlePlay}>
            {isPlaying ? "🔊 On" : "🔇 Off"}
        </div>
    );
}
```

Without the `isPlayingRef`, `handlePlay` inside `handleKeypress` would use stale state.

---

## 🧭 Summary

| Issue | Cause | Fix |
|------|-------|-----|
| Stale Closure | Function uses outdated state/props | Use refs or functional updates |
| Common in | `setTimeout`, `useEffect`, event handlers | Attach listeners inside hooks with caution |
| Best Practice | Use `useRef` for mutable values you don’t want to trigger re-renders |

---