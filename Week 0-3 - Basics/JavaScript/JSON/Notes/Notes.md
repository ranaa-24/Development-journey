# Key Points About JSON

- JSON (JavaScript Object Notation) is a lightweight format that is used for data interchanging.
  It is based on a subset of JavaScript language (the way objects are built in JavaScript).
  As stated in the MDN, some JavaScript is not JSON, and some JSON is not JavaScript.

- keys should be in double quotes
- also comments arent permitted..
- JSON is a data format, not a programming language.
- .json extension

<br>

```json
{
  "name": "Rana",
  "age": 25,
  "city": "kolkata",
  "isAdult": true
}
```

<br>

- the value can be anything
- a single json file contain single json object

<br>

```json
{
  "user": {
    "name": "Rana",
    "age": 25,
    "city": "kolkata",
    "isAdult": true
  },

  "users": [
    {
      "name": "Rana",
      "age": 25,
      "city": "kolkata",
      "isAdult": true
    },
    {
      "name": "Rana",
      "age": 25,
      "city": "kolkata",
      "isAdult": true
    }
  ]
}
```

<br>

# JSON in JavaScript

**JSON (in JavaScript) is a string!**

```js
let user = `{
    "user" : "Rana",
    "age" : 21,
    "roles" : ["SWE", "SDE", "MLE"]
}`;
```

To turn this into a fully fledged JavaScript object you must first parse it `JSON.parse(user)`

```js
let obj = JSON.parse(user);

console.log(obj);
console.log(obj.roles);
```

> { user: 'Rana', age: 21, roles: [ 'SWE', 'SDE', 'MLE' ] }
> <br> > [ 'SWE', 'SDE', 'MLE' ]

The JSON parser also offers another very useful method, `stringify(obj)`. This method accepts a JavaScript object as a parameter, and outputs back a string with JSON format. This is useful for when you want to send data back to the server.

```js
let obj1 = { name: "Rana", age: 21, roles: ["SWE", "SDE"] };
let jsonString = JSON.stringify(obj1);

console.log(jsonString);
```

> {"name":"Rana","age":21,"roles":["SWE","SDE"]}

The third argument of `JSON.stringify(value, replacer, space)` is the number of spaces to use for pretty formatting.

```js
let obj1 = { name: "Rana", age: 21, roles: ["SWE", "SDE"] };
let jsonString = JSON.stringify(obj1, null, 2);

console.log(jsonString);
```

Output:

<pre>
{
 "name": "Rana",
 "age": 21,
 "roles": [
  "SWE",
  "SDE"
 ]
}
</pre>

**More Info [Here](https://javascript.info/json)**

### 🔹 Examples of valid JSON:

- **A string:**

  ```json
  "hello"
  ```

- **A number:**

  ```json
  123
  ```

- **A boolean:**

  ```json
  true
  ```

- **An object:**

  ```json
  { "name": "Alice" }
  ```

- **An array:**

  ```json
  [1, 2, 3]
  ```

- **null:**

  ```json
  null
  ```

---

### 🔸 Common confusion:

We often think JSON must be an object (`{}`) or array (`[]`), but **JSON can be any single valid value**, including a primitive like a string, number, boolean, or null — _as long as it follows JSON syntax_.

So this is valid:

```js
JSON.parse('"hello"'); // ✅ returns the string: "hello"
```

But this is invalid:

```js
JSON.parse("hello"); // ❌ throws error (not a quoted string)
```
