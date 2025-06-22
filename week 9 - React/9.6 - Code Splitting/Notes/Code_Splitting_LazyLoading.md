
# 🚀 React Lazy Loading, Code Splitting & Tree Shaking Guide

This guide covers how to improve your app's performance by using React's lazy loading and bundler features like code splitting and tree shaking.

---

## ✅ 1. What is Code Splitting?

**Definition:** Breaking your JavaScript into smaller chunks so the browser only loads what it needs right now.

### Example:
```js
const Product = React.lazy(() => import("./Product")); // Creates a separate JS chunk
```

---

## ✅ 2. What is Tree Shaking?

**Definition:** Removing unused code from your final bundle.

### Example:
```js
// utils.js
export function used() {}
export function unused() {}

// main.js
import { used } from "./utils"; // 'unused' will be tree-shaken
```

> Requires ES Modules + modern bundler (Webpack, Vite, Rollup)

---

## ✅ 3. Using React Router (Data Router Mode) for Lazy Loading

```js
// App.jsx
import { createBrowserRouter, RouterProvider, defer } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("./routes/Home"));
const Product = lazy(() => import("./routes/Product"));

const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => ({
      Component: Home,
      loader: async () => defer({ products: fetch("/api/featured") }),
    }),
  },
  {
    path: "/product",
    lazy: async () => ({
      Component: Product,
      loader: async () => defer({ productList: fetch("/api/all-products") }),
    }),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

---

## ✅ 4. Enable Code Splitting in Build

- Use `React.lazy(() => import('./Component'))`
- Don’t use static `import` for lazy-loaded routes
- Make sure your tool (Vite, CRA) supports dynamic import()

---

## ✅ 5. Verify Splitting Works

Use DevTools or bundle analyzers:

### Source Map Explorer
```bash
npm install -D source-map-explorer
npx source-map-explorer build/static/js/*.js
```

### You should see:
```
build/static/js/
  main.js
  Product.chunk.js
  Home.chunk.js
```

---

## ✅ Summary

| Concept         | Use                              |
|----------------|-----------------------------------|
| Code Splitting | Break app into smaller chunks     |
| Tree Shaking   | Remove unused code from final bundle |
| React.lazy     | Load components only when needed  |
| Dynamic import | Required to enable splitting      |

---

✨ Use these patterns to keep your React app fast and responsive!
