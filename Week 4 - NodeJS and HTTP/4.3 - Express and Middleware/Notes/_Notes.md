# Express and Middleware

## Resources

- [**Express/Node introduction**](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction) - **Great Intro**
- [**What is Express.js?**](https://www.freecodecamp.org/news/the-express-handbook/#heading-express-middleware) - **Must Read**
- [**How to handle POST Requests in Express**](https://dev.to/naftalimurgor/how-to-make-post-requests-in-express-2be6)
- [**Connect frontend and backend**](https://medium.com/@anshmunjal/how-to-create-get-and-post-endpoints-in-nodejs-using-expressjs-77fd3953ec38)
- [**What are the prime differences between Node JS and Express JS**](https://web-and-mobile-development.medium.com/what-are-the-prime-differences-between-node-js-and-express-js-b560b19b8b33)
- [**Express JS HTTP Methods**](https://www.geeksforgeeks.org/express-js-http-methods/)
- [**Routing in Express**](https://expressjs.com/en/guide/routing.html) - Must
- [**Different Express Response Methods**](https://www.scaler.com/topics/expressjs-tutorial/express-res/)
- [**How to handle server responses in ExpressJS - The easy way!**](https://dev.to/imranabdulmalik/how-to-handle-server-responses-in-expressjs-the-easy-way-3lpm)
- [**HTTP response status codes**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [**Headers vs Body**](https://codeal.medium.com/headers-vs-body-1d3e754020b2)
- [**What is Postman?**](https://www.youtube.com/watch?v=4-DmsxM347k/)
- [**Middleware in Express.js**](https://dev.to/m__mdy__m/middleware-in-expressjs-4b4)
- [**Different types of middlewares**](https://dev.to/m__mdy__m/middleware-in-expressjs-4b4)
- [**Error Handling in Express.js**](https://expressjs.com/en/guide/error-handling.html)

## Videos Link

- [**What is Middleware in Express JS?**](https://www.youtube.com/watch?v=y18ubz7gOsQ)

# Express js Intro

[Read Docs express.com > guide](https://expressjs.com/en/guide/routing.html)

Express js simplifies the development of server-side applications by offering an easy-to-use API for routing, middleware, and handling HTTP requests and responses.

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

This app starts a server and listens on port 3000 for connections. The app responds with “Hello World!” for requests to the root URL (`/`) or **route**. For every other path, it will respond with a `404 Not Found.`

## Request Parameters

Request object holds all the HTTP request information.

| Property         | Description                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| `.app`           | holds a reference to the Express app object                                                                      |
| `.baseUrl`       | the base path on which the app responds                                                                          |
| `.body`          | contains the data submitted in the request body (must be parsed and populated manually before you can access it) |
| `.cookies`       | contains the cookies sent by the request (needs the cookie-parser middleware)                                    |
| `.hostname`      | the hostname as defined in the Host HTTP header value                                                            |
| `.ip`            | the client IP                                                                                                    |
| `.method`        | the HTTP method used                                                                                             |
| `.params`        | the route named parameters                                                                                       |
| `.path`          | the URL path                                                                                                     |
| `.protocol`      | the request protocol                                                                                             |
| `.query`         | an object containing all the query strings used in the request                                                   |
| `.secure`        | true if the request is secure (uses HTTPS)                                                                       |
| `.signedCookies` | contains the signed cookies sent by the request (needs the cookie-parser middleware)                             |
| `.xhr`           | true if the request is an XMLHttpRequest                                                                         |

# Learing

We can require .json file as object (or Array [..]), **Note**: we have to specify the path as relative ("./package.json") not like require('fs') - in this case it finds in node_modele folder

```js
const package = require("./package.json");

console.log(package.name);
console.log(package.version);
console.log(package.scripts);
```

## `req` and `res` Obejct

### `req.params` - Route parameters

req.params is used to retrieve route parameters from a URL in Express.js. These parameters are typically part of the URL path and are used to pass dynamic values.

```js
app.get("/user/:id", (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});
```

- `:id` is a route parameter.

- When a request is made to `/user/123`, `req.params.id` will be "123"

```
GET /user/123

/user - simply wont trigger any handler :id is a part of the route
```

**NOTE :** Route parameters are always strings.

```js
const num = Number(req.params.num);
```

### `req.query` – Query parameters (from URL)

Used to retrieve data from query strings (after `?` in the URL).

unlike route parameters it not a part of the route

```js
app.get("/search", (req, res) => {
  console.log(req.query.q); // e.g., "Express"
  res.send(`Searching for: ${req.query.q}`);
});
```

```
GET /search?q=Express
```

### `req.body` – Request body (for POST/PUT)

Used to get data sent in the request body. when a data is sent from a request it gets automatically availabale in req.body, but express doesnt know what type of data being sent thats why it Requires middleware (`express.json()`).

without middleware `req.body` is `undefined`

```js
const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());

app.post("/submit", (req, res) => {
  console.log("Received data:", req.body); // Logs { name: "John", age: 30 }
  res.json({ message: "Data received successfully!", receivedData: req.body });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

**Sending Data with fetch (Client-Side)**

```js
fetch("http://localhost:3000/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "John", age: 30 }),
})
  .then((response) => response.json())
  .then((data) => console.log("Response:", data))
  .catch((error) => console.error("Error:", error));
```

must use `JSON.stringify()` because the fetch API sends data as a string in the request body.

### `req.headers` – HTTP request headers

Used to access request headers.

```js
app.get("/headers", (req, res) => {
  console.log(req.headers["user-agent"]); // Get browser info
  res.send("Check console for headers.");
});
```

### `req.url` & `req.originalUrl` – Requested URL

- `req.url`: URL path without base path.
- `req.originalUrl`: Full URL including base path.

```js
app.use((req, res) => {
  console.log(req.url); // "/about"
  console.log(req.originalUrl); // "/about?name=John"
  res.send("Check the console.");
});
```

### `req.ip` – Client IP address

### `.req.cookies` – Access cookies (requires cookie-parser middleware)

```js
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/cookies", (req, res) => {
  console.log(req.cookies);
  res.send(`Cookies: ${JSON.stringify(req.cookies)}`);
});
```

## (Response) Object Properties & Methods

### `res.send()` – Send response data

Sends a response (can be a string, object, or buffer).

### `res.json()` – Send JSON response

### `res.status()` – Set HTTP status code

Used to set the response status.

```js
app.get("/notfound", (req, res) => {
  res.status(404).send("Page not found!");
});
```

### `res.redirect()` – Redirect to another URL

```js
app.get("/old-route", (req, res) => {
  res.redirect("/new-route");
});
```

### `res.set()` / `res.header()` – Set response headers

Used to set custom response headers.

```js
app.get("/headers", (req, res) => {
  res.set("X-Custom-Header", "Hello");
  res.send("Header set!");
});
```

### `res.cookie()` & `res.clearCookie()` – Set and clear cookies

Used for managing cookies.

```js
app.use(cookieParser());

app.get("/set-cookie", (req, res) => {
  res.cookie("username", "JohnDoe");
  res.send("Cookie set!");
});

app.get("/clear-cookie", (req, res) => {
  res.clearCookie("username");
  res.send("Cookie cleared!");
});
```

### `res.end()` – End response without sending data

```js
app.get("/end", (req, res) => {
  res.status(204).end(); // No Content response
});
```

## `next()`

More than one callback function can handle a route (make sure you specify the next object). For example:

```js
app.get(
  "/example/b",
  (req, res, next) => {
    console.log("the response will be sent by the next function ...");
    next();
  },
  (req, res) => {
    res.send("Hello from B!");
  }
);
```

### check `rest_api.js` js file in _*Code*_ dir for practical understanig

# Middleware

Middleware in Express.js is a function that runs between the request and the response in the request-response cycle. It has access to the request (req), response (res), and the next function that passes control to the next middleware.

**"An Express Application is Essentially a Series of Middleware Function Calls"**

- Every **request** in Express passes through multiple middleware functions before sending a **response**.

- Each middleware function can modify the request (`req`) and response (`res`) or call `next()` to pass control to the next middleware.

### Eg:

POST Request (with some body) `->` #1 Middleware(chanaged the persons name in req.body) `-next()->` #2 Middleware (changed parsons phoneNo. in req obj) `->` app.httpMETHOD() handles that modified req object

```js
const express = require("express");
const app = express();

app.use(express.json()); // Built-in middleware to parse JSON the received body

// 1️⃣ Middleware #1: Modify 'name' in req.body
app.use((req, res, next) => {
  if (req.body.name) {
    req.body.name = "Johnny"; // Changing name
  }
  next(); // Pass control to the next middleware
});

// 2️⃣ Middleware #2: Modify 'phoneNo' in req.body
app.use((req, res, next) => {
  if (req.body.phoneNo) {
    req.body.phoneNo = "9876543210"; // Changing phone number
  }
  next(); // Pass control to the final route handler
});

// 3️⃣ Final Route Handler: Respond with modified req.body
app.post("/submit", (req, res) => {
  res.json({ message: "Data received!", modifiedData: req.body });
});

// Start the Express server
app.listen(3000, () => console.log("Server running on port 3000"));
```

### **Why Use Middleware?**

Middleware is used to:

- ✅ Modify Requests/Responses – Add headers, parse data, etc.
- ✅ Authentication & Authorization – Validate users before processing requests.
- ✅ Logging & Debugging – Track requests and responses.
- ✅ Error Handling – Manage and format errors in a centralized way.
- ✅ Serving Static Files – Load CSS, images, and JavaScript files easily.

**check `middlewareEX.js` from Code dir**

## Types of middleware

Middleware is added using `app.use()` or directly in route handlers..

### Application-Level Middleware (Runs for all requests)

```js
const express = require("express");
const app = express();

// Middleware function
app.use((req, res, next) => {
  console.log("Middleware executed!");
  next(); // Pass control to the next middleware/route
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

### Route-Specific Middleware (Runs for specific routes)

```js
const checkAuth = (req, res, next) => {
  const authorized = true; // Example condition
  if (authorized) {
    next(); // Continue to the next function
  } else {
    res.status(403).send("Access Denied");
  }
};

app.get("/dashboard", checkAuth, (req, res) => {
  res.send("Welcome to the Dashboard");
});
```

### Built-in Middleware (Already available in Express)

Body Parsing Middleware:

- `express.json():` Parses incoming JSON data from requests.
- `express.urlencoded():` Parses incoming URL-encoded data from forms.

Static File Middleware:

- `express.static():` Serves static files such as HTML, CSS, and images.

Session Middleware:

- `express-session:` Enables session management in Express applications.

```js
const express = require("express");
const app = express();

// Internal middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example route handling parsed data
app.post("/example", (req, res) => {
  console.log(req.body); // Access parsed data
  res.send("Data received!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

### Error-Handling Middleware

Used to catch errors and respond properly.

✅ Error-handling middleware must have 4 parameters (err, req, res, next), or Express won’t recognize it as an error handler.

When an error is thrown, Express skips any remaining middleware and directly calls the error-handling middleware.

```js
const express = require("express");
const app = express();

// Route handler that throws an error
app.get("/error", (req, res) => {
  throw new Error("Something broke!"); // Automatically passed to error middleware
  res.send("This will never run"); // Never executes
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.log("Caught an error");
  res.status(500).json({ msg: err.message });
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

## sometimes we need `next(error)`..

**1️⃣ Asynchronous Errors (Inside `async` Functions)**

Express does NOT catch async errors automatically. You must use next(error).

```js
app.get("/async-error", async (req, res, next) => {
  try {
    throw new Error("Async error occurred!");
  } catch (error) {
    next(error); // MUST use next(error) for async errors
  }
});
```

**2️⃣ If Middleware Needs to Manually Pass an Error**

If an error occurs inside a **normal middleware function**, you must explicitly call next(error).

```js
app.use((req, res, next) => {
  const err = new Error("Something went wrong in middleware!");
  next(err); // Must be passed explicitly
});
```
