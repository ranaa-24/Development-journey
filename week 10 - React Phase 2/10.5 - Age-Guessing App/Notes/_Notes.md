# Passing Data Between Routes in React Router

## 📌 Scenario

You have an input field in the `Home` component and want to send its value to a `Prediction` component on a different route.

---

## ✅ Option: Using `navigate()` with `state` (Recommended for internal navigation)

### 1. Sending data from `Home.jsx`

```jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/prediction", {
      state: {
        query: inputValue,
        userId: 123,
        extraData: { foo: "bar", time: Date.now() },
      },
    });
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter something"
      />
      <button onClick={handleSubmit}>Go to Prediction</button>
    </div>
  );
}

export default Home;
```

---

### 2. Receiving data in `Prediction.jsx`

```jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Prediction() {
  const location = useLocation();
  const query = location.state?.query || "";
  const userId = location.state?.userId;
  const extraData = location.state?.extraData;

  useEffect(() => {
    if (query) {
      console.log("API call with:", query);
    }
  }, [query]);

  return <div>Prediction result for: {query}</div>;
}

export default Prediction;
```

---

## ⚠️ Important Notes

- `state` is **not visible in the URL**.
- It is **not persistent** — it is lost on **page reload or direct URL access**.
- Use optional chaining (`?.`) to avoid errors when accessing `location.state`.

---

## 🧠 When to Use This

- Ideal for **internal navigation** between routes.
- If you need data persistence across reloads, use **query strings**, **context**, or **global state** (Redux, Zustand).

---

## 🌐 Alternative: Using Query Strings

```js
navigate(`/prediction?query=${encodeURIComponent(inputValue)}`);
```

And access it with:

```js
import { useSearchParams } from "react-router-dom";
const [searchParams] = useSearchParams();
const query = searchParams.get("query");
```

---

# 🖼️ Importing Local Images in React

## ❓ Why Can't We Use `src="assets/image.png"` Directly?

In React (with Webpack, Vite, etc.), you can't directly reference local image files using a plain HTML `src` path because:

- The image file isn't served as-is — it's processed by a bundler.
- Paths like `src="assets/image.png"` are not resolved relative to the project's file structure at runtime.

```html
<!-- ❌ This will not work in React -->
<img src="assets/image.png" alt="Broken image" />
```

---

## ✅ Correct Way: Import and Use the Image

```jsx
import myImage from "./assets/image.png";

function App() {
  return <img src={myImage} alt="My local image" />;
}
```

### What Does `import myImage from './assets/image.png'` Return?

It returns the **compiled path** to the image file, like:

```
/static/media/image.abc123.png
```

Handled by Webpack or Vite, depending on your setup.

---

## 🗂️ Alternative: Using the `public/` Folder

If you want to use a static reference without import, place the image inside the `public/` directory and reference it like this:

```jsx
<img src="/my-image.png" alt="Public image" />
```

✅ Works because everything in `public/` is copied directly to the root of the build output.

---

## ✅ Summary

| Method                                 | Works in React? | Notes                                    |
| -------------------------------------- | --------------- | ---------------------------------------- |
| `<img src="assets/img.png" />`         | ❌              | Won’t work unless image is in `public/`  |
| `import img from './assets/img.png'`   | ✅              | Standard and safe way to bundle images   |
| `<img src="/img.png" />` (from public) | ✅              | Requires image to be in `public/` folder |

---

# How to set bg image :

[visit](https://www.freecodecamp.org/news/react-background-image-tutorial-how-to-set-backgroundimage-with-inline-css-style/ )