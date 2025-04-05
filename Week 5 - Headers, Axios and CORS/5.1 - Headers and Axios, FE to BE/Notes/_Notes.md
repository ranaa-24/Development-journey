# Headers, Query params and Express

## Article/Blogs Link:

- [**HTTP Headers**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers) - give a read
- [**Headers vs Body**](https://codeal.medium.com/headers-vs-body-1d3e754020b2)
- [**HTTP response status codes**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [**How to Fetch Data from an API Using the Fetch API in JavaScript**](https://javascript.info/fetch)
- [**How to fetch an api using axios?**](https://www.npmjs.com/package/axios)
- [**Axios vs. Fetch API: Selecting the Right Tool for HTTP Requests**](https://medium.com/@johnnyJK/axios-vs-fetch-api-selecting-the-right-tool-for-http-requests-ecb14e39e285)

# Headers

A req header..

![alt text](image.png)

## Types of HTTP Headers and Their Use Cases

**General Headers (Applicable to both requests & responses)**

- `Connection`: Controls whether the connection stays open after the request.

  - 🛠 Example: `Connection: keep-alive`

- `Cache-Control`: Defines caching rules.

  - 🛠 Example: `Cache-Control: no-cache, no-store, must-revalidate`

### Request Headers (Sent by the client to the server)

- **`Host`**: Specifies the domain name of the server.

  - 🛠 Example: `Host: www.example.com`

- **`User-Agent`**: Identifies the client (browser, device).

  - 🛠 Example: `User-Agent: Mozilla/5.0`

- **`Accept`**: Defines what types of responses the client can handle.

  - 🛠 Example: `Accept: application/json`, `*/*` (any type)

- **`Authorization`**: Carries credentials (JWT, Basic Auth, OAuth tokens).

  - 🛠 Example: `Authorization: Bearer <token>`

- **`Referer`**: Specifies the previous page the request came from.

  - 🛠 Example: `Referer: https://google.com`

- **`Content-Type`**: Tells the server what format the request body is in.

  - 🛠 Example: `Content-Type: application/json`

- **`Origin`**: Identifies the source domain making the request.
  - 🛠 Example: `Origin: https://example.com`

---

### Response Headers (Sent by the server to the client)

- **`Content-Type`**: Specifies the format of the response body.

  - 🛠 Example: `Content-Type: text/html; charset=UTF-8`

- **`Content-Length`**: Specifies the response size in bytes.

  - 🛠 Example: `Content-Length: 1024`

- **`Access-Control-Allow-Origin`**: Defines which domains can access the resource (CORS).

  - 🛠 Example: `Access-Control-Allow-Origin: *`

- **`Set-Cookie`**: Sends cookies to the client.

  - 🛠 Example: `Set-Cookie: sessionId=abc123; HttpOnly`

- **`WWW-Authenticate`**: Requests authentication from the client.

  - 🛠 Example: `WWW-Authenticate: Basic realm="Secure Area"`

- **`Location`**: Used in redirections to specify the new URL.
  - 🛠 Example: `Location: https://new-website.com`

### Reading Headers in Express.js

```js
app.get("/", (req, res) => {
  console.log(req.headers); // Logs all headers
  console.log(req.headers["user-agent"]); // Logs User-Agent
  res.send("Check server logs for headers!");
});
```

### Setting Response Headers in Express.js

```js
app.get("/", (req, res) => {
  res.set("X-Custom-Header", "MyValue"); // Custom header
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify({ message: "Hello World" }));
});
```

### Ex:

**Using Headers for Authentication**

```js
app.get("/secure", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Unauthorized");

  // Verify the token (JWT Example)
  res.send("Access Granted");
});
```

# FetchAPI

Node.js includes the Fetch API as a built-in feature starting with version 18.0.0,

**First, the `promise`, returned by `fetch`, resolves with an object of the built-in `Response` class as soon as the server responds with headers.**

At this stage we can check HTTP status, to see whether it is successful or not, check headers, but don’t have the body yet.

The promise rejects if the fetch was unable to make HTTP-request, e.g. network problems, or there’s no such site. Abnormal HTTP-statuses, such as **404 or 500 do not cause an error** these are resolved promise

```js
let promise = fetch(url, [options]);
```

Without `options`, this is a simple GET request, downloading the contents of the url.

We can see HTTP-status in response properties:

`status` – HTTP status code, e.g. 200.

`ok` – boolean, true if the HTTP status code is 200-299.

```js
let response = await fetch(url);

if (response.ok) {
  // if HTTP-status is 200-299
  // get the response body (the method explained below)
  let json = await response.json();
} else {
  alert("HTTP-Error: " + response.status);
}
```

**Second, to get the response body, we need to use an additional method call.**

`Response` provides multiple `promise-based` methods (these methods also returns a promise) to access the body in various formats:

`response.text()` – read the response and return as text,
`response.json()` – parse the response as JSON,

additionally, `response.body` is a ReadableStream object, it allows you to read the body chunk-by-chunk, we’ll see an example later.

> fetch() -resolves-> response -> response.json() -resolves-> JSON

```js
(async () => {
  let response = await fetch(url);
  console.log(response);
  let data = await response.json();
  console.log(data);
})();
```

```js
fetch(url)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      return new Error("Network issue");
    }
  })
  .then((val) => {
    console.log(val);
  })
  .catch((err) => {
    console.log(err);
  });
```

### POST Request (Sending Data)

Used to send data to a server.

```js
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "New Post",
    body: "This is the post content",
    userId: 1,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

✅ Use case: Submitting forms, creating new resources.

### PUT Request (Updating Data)

```js
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "Updated Post",
    body: "Updated content",
    userId: 1,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### DELETE Request (Removing Data)

```js
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "DELETE",
})
  .then((response) => console.log("Deleted:", response.status))
  .catch((error) => console.error("Error:", error));
```

> A Good read on CORs

### [Fetch: Cross-Origin Requests](https://javascript.info/fetch-crossorigin)

## Axios (Alternative to Fetch)

Axios is a promise-based HTTP client for the browser and Node.js, making API requests simpler compared to the Fetch API.

## 1. Installing Axios

If you're using **Node.js**, install Axios with:

```sh
npm install axios
```

For **CDN (Frontend use)**, add this in your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

---

## 2. Making Requests with Axios

### **GET Request (Fetching Data)**

```javascript
axios
  .get("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => console.log(response.data))
  .catch((error) => console.error("Error:", error));
```

**Breaking it Down:**

`axios.get(URL)` → Sends a GET request to fetch data from the specified URL, and returns a promise

`.then(response => console.log(response.data))` → If the request is successful, it processes the response object

`response.data` contains the actual data returned from the server.

`.catch(error => console.error('Error:', error))` → If the request fails, it catches the error and logs it.

✅ **Benefits over Fetch**: Automatically parses JSON (no `response.json()` needed).

---

### **POST Request (Sending Data)**

```javascript
axios
  .post("https://jsonplaceholder.typicode.com/posts", {
    title: "New Post",
    body: "This is the post content",
    userId: 1,
  })
  .then((response) => console.log(response.data))
  .catch((error) => console.error("Error:", error));
```

✅ **Benefit**: You don’t need to manually stringify `body` like in Fetch.

---

### **PUT Request (Updating Data)**

```javascript
axios
  .put("https://jsonplaceholder.typicode.com/posts/1", {
    title: "Updated Post",
    body: "Updated content",
    userId: 1,
  })
  .then((response) => console.log(response.data))
  .catch((error) => console.error("Error:", error));
```

---

### **DELETE Request (Removing Data)**

```javascript
axios
  .delete("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => console.log("Deleted:", response.status))
  .catch((error) => console.error("Error:", error));
```

---

## 3. Setting Headers in Axios

You can send custom headers like authentication tokens:

```javascript
axios
  .get("https://api.example.com/data", {
    headers: { Authorization: "Bearer my-token" },
  })
  .then((response) => console.log(response.data))
  .catch((error) => console.error("Error:", error));
```

---

## 4. Global Axios Defaults

Instead of passing headers every time, set them globally:

```javascript
axios.defaults.headers.common["Authorization"] = "Bearer my-token";
axios.defaults.baseURL = "https://api.example.com";
```

---

## 5. Using Axios with Async/Await

Instead of `.then()`, use `async/await` for cleaner code:

```javascript
async function fetchData() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchData();
```

---

### **Why Use Axios Over Fetch?**

| Feature                       | Fetch API                      | Axios  |
| ----------------------------- | ------------------------------ | ------ |
| Automatic JSON Parsing        | ❌ No (need `response.json()`) | ✅ Yes |
| Request/Response Interceptors | ❌ No                          | ✅ Yes |
| Automatic Timeouts            | ❌ No                          | ✅ Yes |
| Easy Error Handling           | ❌ No                          | ✅ Yes |
| Supports Older Browsers       | ❌ No                          | ✅ Yes |

### 🔹 What does Axios return?

When you make a request with Axios, the response you get looks like this:

```js
{
  data, // The response body (what the server sent back)
    status, // HTTP status code (e.g., 200, 404)
    statusText, // Status text (e.g., "OK", "Not Found")
    headers, // Response headers
    config, // The Axios config object for the request
    request; // The actual request object
}
```

So when you access `response.data`, you're getting the actual **response body** from the server.

---

### 🔹 Is `response.data` always JSON?

**No, not always.** It depends on what the server sends and the `Content-Type` header.

---

#### ✅ If the server sends JSON:

```js
res.json({ message: "Hello" });
```

Then `response.data` is automatically parsed as a JS object:

```js
{
  message: "Hello";
}
```

---

#### ⚠️ If the server sends plain text:

```js
res.send("Hello");
```

Then `response.data` will just be:

```js
"Hello"; // a string
```

---

Axios does **not** force JSON — it checks the `Content-Type` of the response:

- If `Content-Type` is `application/json`, it parses it into a JS object.
- If `Content-Type` is `text/plain`, `text/html`, etc., it leaves it as a string.

### 🔍 Handling Errors with `fetch()` in JavaScript

When you're using `fetch` in JavaScript and the server responds with a **404 status code** but still returns a **JSON body**, the `fetch()` call itself **does NOT throw an error**.

Instead, it resolves the `Response` object — you’ll handle the error manually based on `response.ok` or `response.status`.

So in this case, the **JSON data will be available in the `try` block**, not in the `catch`.

---

### ✅ Example:

```js
async function fetchData() {
  try {
    const response = await fetch("https://example.com/data");

    if (!response.ok) {
      // response.status is 404 or another error
      const errorData = await response.json(); // you can still read the JSON body
      console.error("Server error:", response.status, errorData);
      return;
    }

    const data = await response.json();
    console.log("Data:", data);
  } catch (err) {
    // Only network errors or bad URL, CORS failure, etc. will end up here
    console.error("Fetch failed:", err);
  }
}
```

---

### 📌 Key Points:

- `fetch()` **doesn't reject** on HTTP error status (like 404 or 500).
- You need to check `response.ok` (true for status 200–299).
- If `response.ok` is false, you can still await `response.json()` or `.text()` to read the body.
- `catch(err)` only catches **network errors or exceptions** like invalid JSON parsing, DNS failure, no internet, CORS errors, etc.

---

## 📥 How to Get Response Headers in `fetch`

To get response headers in a `fetch()` request, use the `.headers` property of the `Response` object. It's an instance of the `Headers` interface.

### ✅ Example:

```js
async function fetchData() {
  try {
    const response = await fetch("https://example.com/data");

    // Access a specific header
    const contentType = response.headers.get("content-type");
    console.log("Content-Type:", contentType);

    // Loop through all headers
    response.headers.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    const data = await response.json();
    console.log("Data:", data);
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}
```

### 🔐 Note on CORS:

If you're requesting data from a different origin, the server must expose the headers explicitly using:

```
Access-Control-Expose-Headers: Content-Type, X-Custom-Header
```

Otherwise, you won’t be able to read custom headers or anything beyond a limited safe list (like `Content-Type`, `Content-Length`, etc.).

---

## 📤 How to Send a Body in `fetch()`

To send a **body** with a `fetch()` request (typically for `POST`, `PUT`, `PATCH`), include a `body` field in the options object, along with the appropriate `method` and `headers`.

### ✅ Example – Sending JSON in a POST request

```js
async function sendData() {
  const payload = {
    name: "John",
    age: 25,
  };

  const response = await fetch("https://example.com/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload), // convert JS object to JSON string
  });

  const result = await response.json();
  console.log("Server Response:", result);
}
```

---

### 📝 Important Notes:

- The `body` must be a **string** when you're sending JSON, so use `JSON.stringify(payload)`.
- Always set the `Content-Type` header to `'application/json'` for JSON data.
- If you're sending **form data** (like a file or form submission), use `FormData` instead — **no need to manually set `Content-Type`**.

---

### ✅ Example – Sending `FormData`:

```js
const formData = new FormData();
formData.append("username", "john");
formData.append("profilePic", fileInput.files[0]); // assuming a file input

fetch("https://example.com/upload", {
  method: "POST",
  body: formData, // headers will be set automatically
});
```

---

Let me know which type you're working with — **JSON**, **form**, **files** — and I can tailor the example further!

### ✅ Example: Axios with try-catch (getting error data)

```js
import axios from "axios";

async function fetchUser() {
  try {
    const response = await axios.get("https://example.com/api/user");
    console.log("Success:", response.data);
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Error status:", error.response.status);
      console.error("Error data:", error.response.data); // 👈 this is the actual error message/data
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
    } else {
      // Something else caused the error
      console.error("Error:", error.message);
    }
  }
}
```

---

### 🧠 Summary

| Source of error           | Where to access it      |
| ------------------------- | ----------------------- |
| Server's error response   | `error.response.data`   |
| Status code               | `error.response.status` |
| No response (network etc) | `error.request`         |
| Generic issue             | `error.message`         |
