## Async functions
The word `async` before a function means one simple thing: **a function always returns a promise.** Other values are wrapped in a **resolved** promise automatically.

```js
async function f() {
  return 1;
}

f().then((val) => console.log(val)); // 1
```

…We could explicitly return a promise, which would be the same:

```js
async function myFunc() {
    return Promise.resolve(100); // dont use new, its not a constructor, returns a resolved promise
}  

f().then((val) => console.log(val)); // 100
```
So, `async` ensures that the function returns a promise, and wraps non-promises in it, Promises does'nt again warpped in promise

>**NOTE** &nbsp; async/await use to handle promises..

## Await
**`await`, that works only inside `async` functions, and it’s pretty cool.**

_An example of handling promise w/o `async/await`_

```js
let p = new Promise((resolve, reject) => {
    resolve("Resolved!");
});
```
```js
function fn(){
    p.then(val => console.log(val));
}

fn();   //Resolved!
```

_With `async/await`_

```js
async function fn(){
    let x = await p;
    console.log(x);
}

fn();   //Resolved!
```

The keyword `await` makes JavaScript wait until that promise settles and returns its result

```js
let value = await promise;
```
### example
```js
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  let result = await promise; // wait until the promise resolves (*)

  alert(result); // "done!"
}

f();
```

unlike normal funtion handling promises, **`await` literally suspends the function execution until the promise settles, and then resumes it with the promise result.** That doesn’t cost any CPU resources, because the JavaScript engine can do other jobs in the meantime: execute other scripts, handle events, etc.

```js
async function fn(){
    let p = new Promise((resolve, reject) => {
        setTimeout(() =>  resolve("Resolved!"), 3000);
     });

    let x = await p;
    console.log(x);     // after 3s
    console.log("Funtion end"); // after 3s
}

fn();
console.log("End");
```
<pre>
End
..after 3s..
Resolved!
Function End
</pre>


Now see, 
```js
async function fn(){
    let p = new Promise((resolve, reject) => {
        setTimeout(() =>  resolve("Resolved!"), 3000);
     });

    let x = await p;
    console.log("first await end"); // after 3s

    let y = await p;
    console.log("second await end"); // after 3s
}

fn();
```
after 3s both will be printed at the same time, that means both await runs Parallelly

**One More Mind Fuck**
```js
async function fn(){
    let p1 = new Promise((resolve, reject) => {
        setTimeout(() =>  resolve("Resolved!"), 10000);
     });
    let p2 = new Promise((resolve, reject) => {
        setTimeout(() =>  resolve("Resolved!"), 5000);
     });

    let x = await p1;       // will take 10s to resolve, while running the other await parallally, but stops execution of the code, thats why nothing was printed untill 10s then both printed

    console.log("first await end"); // after 10s

    let y = await p2;       // it reslolved in 5s
    console.log("second await end"); // but waited to come execution to this line, printed after 10s

}

fn();
```

<pre>
..after 10s..
first await end
second await end
</pre>

## Top lvl Await
In modern browsers, await on top level works just fine, when we’re inside a module. 

set "type" : "module" in package.json 

or save the js file as `.mjs`

We’ll cover modules in article [Modules, introduction](https://javascript.info/modules-intro).
```js
// we assume this code runs at top level, inside a module
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

console.log(user);
```

OR Normally,
```js
//fetch returns a promise and when resolved it gives a Response obj, which is a readstream.. 
// then this respons obj coverted to .json(), which return a promise and the result is a JSON object
(async () => {
    const API = "https://api.github.com/users/rana-24";
    let response = await fetch(API);
    let res = await response.json();
    console.log(res);
})();   //IIF
```

## Error Handling 
If a promise resolves normally, then `await` promise returns the result. But in the case of a rejection, it **throws** the error, just as if there were a `throw` statement at that line.

This code:
```js
async function f() {
  await Promise.reject(new Error("Whoops!"));
}
```
same as
```js
async funtion f(){
    throw new Error("Whoops!");
}
```
**We can catch that error using `try..catch`, the same way as a regular `throw`:**

```js
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
    alert(err); // TypeError: failed to fetch
  }
}

f();
```
## Resources / Readings
[OG Concept Clearification YT](https://www.youtube.com/watch?v=6nv3qy3oNkc&list=PLlasXeu85E9eWOpw9jxHOQyGMRiBZ60aX&index=8)
<br>
[Article](https://javascript.info/async-await)