# Video

## [Tutorial](https://www.youtube.com/watch?v=h7MTWLv3xvw)

## [CURD App using React Roter](https://www.youtube.com/watch?v=waI5CDisiuM)

## [Build a React Router V7 Countries App](https://youtu.be/JMn_yIVl8eo?si=ExMaNRyq5g1xokpn)

# Articles

## [Notes](https://dev.to/pedrotech/react-router-v7-a-crash-course-2m86)

## [React Router 7: The Ultimate Guide to the New Features and Framework Capabilities](https://medium.com/@nomannayeem/react-router-7-the-ultimate-guide-to-the-new-features-and-framework-capabilities-06e7f06981f6)

# 📘 React Router v7 - Complete Guide

React Router is a standard routing library for React. Version 7 builds upon the new data APIs introduced in v6.4+, making routing more declarative, nested, and data-aware.

---

## 🚀 Key Concepts of React Router v7

### 1. Declarative Routing

- Define your routes using `<Route>` elements inside a `<Router>`.
- Uses component-based route definitions instead of a centralized route object.

### 2. File-Based Routing (with React Router Data APIs)

- Now possible through frameworks like **Remix** or **Vite + React Router Data APIs**.

### 3. Data APIs Support

- `loader`, `action`, `useLoaderData()`, `useActionData()` for route-level data fetching and mutations.
- Error handling per route via `errorElement`.

### 4. Nested Routes and Layouts

- Easily create deeply nested views.
- Use `Outlet` to render child routes inside parent layout.

---

## ⚙️ Installation

```bash
npm install react-router-dom@latest
```

---

## 🧩 Basic Setup

### App.jsx

```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

---

## 📦 New Features in v7

### 1. `createBrowserRouter`

Creates a modern router with support for data APIs.

### 2. `RouterProvider`

Replaces `<BrowserRouter>`, now used with data routers.

### 3. Loaders and Actions

```jsx
{
  path: "/dashboard",
  element: <Dashboard />,
  loader: async () => fetch('/api/data'),
  action: async ({ request }) => handleForm(request),
}
```

### 4. `useLoaderData()` and `useActionData()`

Access data returned from route `loader` and `action`.

### 5. Error Boundaries Per Route

```jsx
{
  path: "/error-prone",
  element: <Component />,
  errorElement: <ErrorPage />,
}
```

---

## 🧭 Nested Routing Example

```jsx
{
  path: '/dashboard',
  element: <DashboardLayout />, // contains <Outlet />
  children: [
    { path: 'profile', element: <Profile /> },
    { path: 'settings', element: <Settings /> },
  ],
}
```

Use `<Outlet />` in `DashboardLayout` to render child routes.

---

## ⏳ Loader Example

```jsx
{
  path: "/user/:id",
  element: <UserProfile />,
  loader: async ({ params }) => {
    return fetch(`/api/user/${params.id}`);
  },
}

// In UserProfile.jsx
import { useLoaderData } from 'react-router-dom';

function UserProfile() {
  const user = useLoaderData();
  return <div>{user.name}</div>;
}
```

---

## 📥 Form Actions

- Used with `<Form>` from `react-router-dom`.
- Makes forms declarative and progressive-enhancement-friendly.

```jsx
{
  path: '/contact',
  action: async ({ request }) => {
    const formData = await request.formData();
    return submitContactForm(formData);
  },
  element: <ContactForm />,
}

// In ContactForm.jsx
import { Form } from 'react-router-dom';

<Form method="post">
  <input name="name" />
  <button type="submit">Send</button>
</Form>
```

---

## 🧠 Hooks Summary

| Hook              | Purpose                        |
| ----------------- | ------------------------------ |
| `useNavigate()`   | Imperative navigation          |
| `useParams()`     | Access URL parameters          |
| `useLoaderData()` | Access data loaded by loader   |
| `useActionData()` | Access result from form action |
| `useRouteError()` | Catch route-level errors       |

---

## 📄 Route Object Schema (v7 style)

```js
{
  path: '/some-path',
  element: <Component />,
  loader,      // optional
  action,      // optional
  errorElement,// optional
  children: [],// nested routes
}
```

---

## 🌐 Comparison to v6

| Feature        | React Router v6         | React Router v7           |
| -------------- | ----------------------- | ------------------------- |
| Routing        | JSX-based               | Still JSX-based           |
| Data fetching  | Manual with `useEffect` | Built-in Loaders          |
| Forms          | Manual                  | Declarative with `<Form>` |
| Error Handling | Global                  | Per-route `errorElement`  |
| SSR Support    | Partial                 | Improved                  |

---

## 🧪 Testing Routes

Use `MemoryRouter` for unit testing components:

```jsx
import { MemoryRouter } from "react-router-dom";

render(
  <MemoryRouter initialEntries={["/dashboard"]}>
    <App />
  </MemoryRouter>
);
```

---

## 🧵 Final Thoughts

- React Router v7 is focused on **data-aware routing**, enabling full-stack capabilities in React apps.
- Ideal for both SPAs and SSR (via Remix or Vite).

---

# 📘 React Router Dom

React Router is a standard routing library for React. Version 7 builds upon the new data APIs introduced in v6.4+, making routing more declarative, nested, and data-aware.

---

## 🚀 Key Concepts of React Router v7

### 1. Declarative Routing

- Define your routes using `<Route>` elements inside a `<Router>`.
- Uses component-based route definitions instead of a centralized route object.

### 2. File-Based Routing (with React Router Data APIs)

- Now possible through frameworks like **Remix** or **Vite + React Router Data APIs**.

### 3. Data APIs Support

- `loader`, `action`, `useLoaderData()`, `useActionData()` for route-level data fetching and mutations.
- Error handling per route via `errorElement`.

### 4. Nested Routes and Layouts

- Easily create deeply nested views.
- Use `Outlet` to render child routes inside parent layout.

---

## ⚙️ Installation

```bash
npm install react-router-dom@latest
```

---

## 🧩 Basic Setup

### App.jsx

```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

---

## 📦 New Features in v7

### 1. `createBrowserRouter`

Creates a modern router with support for data APIs.

### 2. `RouterProvider`

Replaces `<BrowserRouter>`, now used with data routers.

### 3. Loaders and Actions

```jsx
{
  path: "/dashboard",
  element: <Dashboard />,
  loader: async () => fetch('/api/data'),
  action: async ({ request }) => handleForm(request),
}
```

### 4. `useLoaderData()` and `useActionData()`

Access data returned from route `loader` and `action`.

### 5. Error Boundaries Per Route

```jsx
{
  path: "/error-prone",
  element: <Component />,
  errorElement: <ErrorPage />,
}
```

---

## 🧭 Nested Routing Example

```jsx
{
  path: '/dashboard',
  element: <DashboardLayout />, // contains <Outlet />
  children: [
    { path: 'profile', element: <Profile /> },
    { path: 'settings', element: <Settings /> },
  ],
}
```

Use `<Outlet />` in `DashboardLayout` to render child routes.

---

## ⏳ Loader Example

```jsx
{
  path: "/user/:id",
  element: <UserProfile />,
  loader: async ({ params }) => {
    return fetch(`/api/user/${params.id}`);
  },
}

// In UserProfile.jsx
import { useLoaderData } from 'react-router-dom';

function UserProfile() {
  const user = useLoaderData();
  return <div>{user.name}</div>;
}
```

---

## 📥 Form Actions

- Used with `<Form>` from `react-router-dom`.
- Makes forms declarative and progressive-enhancement-friendly.

```jsx
{
  path: '/contact',
  action: async ({ request }) => {
    const formData = await request.formData();
    return submitContactForm(formData);
  },
  element: <ContactForm />,
}

// In ContactForm.jsx
import { Form } from 'react-router-dom';

<Form method="post">
  <input name="name" />
  <button type="submit">Send</button>
</Form>
```

---

## 🧠 Hooks Summary

| Hook              | Purpose                        |
| ----------------- | ------------------------------ |
| `useNavigate()`   | Imperative navigation          |
| `useParams()`     | Access URL parameters          |
| `useLoaderData()` | Access data loaded by loader   |
| `useActionData()` | Access result from form action |
| `useRouteError()` | Catch route-level errors       |

---

## 📄 Route Object Schema (v7 style)

```js
{
  path: '/some-path',
  element: <Component />,
  loader,      // optional
  action,      // optional
  errorElement,// optional
  children: [],// nested routes
}
```

---

## 🌐 Comparison to v6

| Feature        | React Router v6         | React Router v7           |
| -------------- | ----------------------- | ------------------------- |
| Routing        | JSX-based               | Still JSX-based           |
| Data fetching  | Manual with `useEffect` | Built-in Loaders          |
| Forms          | Manual                  | Declarative with `<Form>` |
| Error Handling | Global                  | Per-route `errorElement`  |
| SSR Support    | Partial                 | Improved                  |

---

## 🧪 Testing Routes

Use `MemoryRouter` for unit testing components:

```jsx
import { MemoryRouter } from "react-router-dom";

render(
  <MemoryRouter initialEntries={["/dashboard"]}>
    <App />
  </MemoryRouter>
);
```

---

## 🧵 Final Thoughts

- React Router v7 is focused on **data-aware routing**, enabling full-stack capabilities in React apps.
- Ideal for both SPAs and SSR (via Remix or Vite).

---

## 📚 Resources

- [React Router Docs](https://reactrouter.com/en/main)
- [Remix](https://remix.run/)
- [React Router GitHub](https://github.com/remix-run/react-router)
