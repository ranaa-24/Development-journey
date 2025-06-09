# React TanStack Query (React Query) - In-Depth Guide

## Introduction

TanStack Query, formerly known as **React Query**, is a powerful data-fetching and state management library for React applications. It simplifies fetching, caching, synchronizing, and updating server state in your UI.

Unlike local state (UI state), server state is data that lives outside the app (in a backend, cloud, or remote DB). TanStack Query efficiently bridges the gap between UI and server state, allowing better performance, caching, and automatic synchronization.

---

## Why Use TanStack Query?

### Problems with Manual Fetching:

- Redundant API calls
- Manual loading/error states
- Stale data handling
- Cache management complexity

### Benefits of TanStack Query:

- Background data fetching
- Cache and automatic updates
- Pagination and infinite scrolling support
- Built-in support for retries, polling, and query invalidation
- DevTools for debugging

---

## Installation

```bash
npm install @tanstack/react-query
```

For older versions, use `react-query`, but it is now recommended to use `@tanstack/react-query`.

---

## Basic Setup

### Step 1: Add QueryClientProvider

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  );
}
```

---

## Basic Usage Example

### Step 2: Use `useQuery` Hook

```jsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Users() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## Core Concepts

### 1. Query Keys

A unique identifier for queries, helps TanStack track and manage data.

```js
["users"], ["posts", postId];
```

### 2. Query Functions

Asynchronous functions to fetch data from an API.

### 3. useQuery

Hook to fetch data, cache it, and handle loading/error states.

### 4. QueryClient

Manages the cache, updates, invalidations.

### 5. DevTools

Helpful UI to debug queries.

```bash
npm install @tanstack/react-query-devtools
```

```jsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>;
```

---

## Mutation Handling

### useMutation

Used for POST, PUT, DELETE actions (modifying data).

```jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

function AddUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser) => axios.post("/api/users", newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleAdd = () => {
    mutation.mutate({ name: "John Doe" });
  };

  return <button onClick={handleAdd}>Add User</button>;
}
```

---

## Advanced Features

### Query Invalidation

For refetching data on mutations.

```js
queryClient.invalidateQueries({ queryKey: ["users"] });
```

### Query Prefetching

Preloads data before navigation.

```js
queryClient.prefetchQuery({ queryKey: ["users"], queryFn: fetchUsers });
```

### Query Caching & Timeouts

```js
useQuery({
  queryKey: ["data"],
  queryFn: fetchData,
  staleTime: 1000 * 60, // 1 min
  cacheTime: 1000 * 300, // 5 min
});
```

### Background Fetching & Refetching

```js
refetchInterval: 5000; // refetch every 5s
```

---

## Error Handling

```js
useQuery({
  queryKey: ["data"],
  queryFn: fetchData,
  retry: 3, // retry 3 times
  onError: (error) => {
    console.error("Error fetching data", error);
  },
});
```

---

## Pagination and Infinite Scrolling

### useInfiniteQuery

For loading paginated data.

```jsx
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
  });
```

---

## Hydration (SSR Support)

TanStack Query supports Next.js and other SSR frameworks.

```js
import { Hydrate, dehydrate, QueryClient } from "@tanstack/react-query";
```

---

## DevTools Integration

Shows all queries, cache, status, retry count, etc.

```jsx
<ReactQueryDevtools />
```

---

## Comparison With Other Tools

| Feature            | TanStack Query | Redux Toolkit | Apollo Client |
| ------------------ | -------------- | ------------- | ------------- |
| Data Fetching      | ✅             | ❌ (manual)   | ✅            |
| Caching            | ✅             | ❌            | ✅            |
| Pagination Support | ✅             | ❌            | ✅            |
| SSR Support        | ✅             | ✅            | ✅            |
| GraphQL Support    | ❌             | ❌            | ✅            |

---

## Best Practices

- Always use meaningful `queryKey`
- Use `staleTime` and `cacheTime` wisely
- Use `mutation` for data-changing actions
- Prefetch on hover/linking
- Invalidate queries after mutation

---

## Conclusion

TanStack Query greatly simplifies server state handling in React. With minimal code, you can fetch, cache, update, and sync data — all while improving UX and performance.

For real-world apps with frequent server interactions, TanStack Query is a go-to solution for efficient, scalable, and maintainable state management.


----

# For my stupid curious mind

## 🔁 What is a Query?
In TanStack Query, a **query** is a request to fetch data from a remote source like an API. It includes:
- `queryKey`: A unique identifier for the query.
- `queryFn`: An async function that performs the actual API call.

TanStack Query handles caching, tracking, refetching, and synchronization for you.

```js
useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId)
});
```

---

## 🔑 What is `queryKey`?
`queryKey` is the **name** or **unique ID** for the query.

### Purpose of `queryKey`:
- Tells TanStack Query **what data is being fetched**
- Acts as a **cache key** to store and retrieve data
- Allows **automatic deduplication** of requests
- Enables **targeted invalidation and refetching**

```js
useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId)
});
```

If you use the same `queryKey` again elsewhere, it **returns cached data** (if available) instead of calling the API again.

---

## 🔄 What Happens If the User Changes?
If `userId` changes, the `queryKey` changes too:
```js
queryKey: ['user', userId]
```

TanStack Query sees this as a **new query** and **fetches fresh data**. For example:

| userId | queryKey       | Cached? | API Called? |
|--------|----------------|---------|--------------|
| 1      | ['user', 1]    | No      | ✅           |
| 2      | ['user', 2]    | No      | ✅           |
| 1 again| ['user', 1]    | ✅      | ❌ (from cache) |

---

## ❗ What If Cached Data Becomes Outdated?
If the server data changes (e.g., user is updated), and the cache still holds the old data, you'll get **stale data** unless:

### ✅ You Use One of These:
1. **Manual Refetch**
```js
const { refetch } = useQuery({...});
refetch(); // manually re-calls the API
```

2. **Invalidate After Mutation**
```js
queryClient.invalidateQueries({ queryKey: ['user', userId] });
```

3. **Use a Short `staleTime`**
```js
useQuery({
  queryKey: ['user', userId],
  queryFn: fetchUser,
  staleTime: 0 // always stale
});
```

---

## ⏱ What is `staleTime`?
`staleTime` controls how long fetched data is considered **fresh**.

- `staleTime: 0` → Data becomes stale **immediately**
- `staleTime: 5 * 60 * 1000` → Data is fresh for 5 minutes

### Why It Matters:
Fresh data = No auto refetch.  
Stale data = TanStack Query may refetch on re-render or refocus.

```js
useQuery({
  queryKey: ['user', 1],
  queryFn: fetchUser,
  staleTime: 1000 * 60 // 1 minute freshness
});
```

---

## 🔃 What is `refetch()`?
`refetch` is a function returned by `useQuery()` that **manually triggers the queryFn again** — i.e., **calls the API again**.

### Example:
```js
const { data, refetch } = useQuery({
  queryKey: ['user', 1],
  queryFn: () => axios.get('/api/user/1').then(res => res.data),
});

<button onClick={() => refetch()}>Refresh</button>
```

- Re-calls the API
- Updates the cache
- Updates the UI

---

## ✅ Summary

| Concept       | Description |
|---------------|-------------|
| `queryKey`    | Unique ID for caching, tracking, invalidating queries |
| `queryFn`     | The async function that fetches the data |
| `staleTime`   | Duration data is considered "fresh" |
| `refetch()`   | Manually re-calls the API for fresh data |
| `invalidateQueries` | Flags specific queries as stale and triggers refetch |
| Cache Behavior | Uses key to return cached data if available |

---

## 📌 Best Practices
- Use unique and consistent `queryKey`s.
- Invalidate queries after mutations.
- Use `staleTime` to reduce over-fetching.
- Use `refetch` when real-time freshness is critical.
