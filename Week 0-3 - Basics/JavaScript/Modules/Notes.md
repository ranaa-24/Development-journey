# Modules
A module is just a file. One script is one module.

Modules can load each other and use special directives `export` and `import` to interchange functionality

- `export` keyword labels class, variables and functions that should be accessible from outside the current module.

- `import` allows the import of functionality from other modules.

For instance, if we have a file `sayHi.js` exporting a function:

```js
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

…Then another file may import and use it:

```js
// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // Hello, John!
```

**As modules support special keywords and features, we must tell the browser that a script should be treated as a module, by using the attribute `js <script type="module">`**

any script containing `import` or `export` has to be link using `type = 'module'` 


```html
<!doctype html>
<script type="module">
  import {sayHi} from './say.js';

  document.body.innerHTML = sayHi('John');
</script>
```

>NOTE : Must need to specify the file path as relative path [./, /, ../] or some cdn url etc

we can also export afte defining func or variables 

```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

export {sayHi};
```

## export default

In practice, there are mainly two kinds of modules.

- Modules that contain a library, pack of functions,
- Modules that declare a single entity, e.g. a module `Person.js` exports only class Person.

Modules provide a special `export default`, can be only one default module in a script

```js
// Person.js
export default class Person{
    constructor(name, role){
        this.name = name;
        this.role = role;
    }

    info() {
        console.log(this.name + " " + this.role);
    }
}

export let normalExport = true;
```
…And then import it without curly braces:

```js
//user.js

//default exports can be named anything
import Per, {normalExport} from "./Person.js";

export let user = new Per("Xcin", "Senior SWE");
```


### More on Default export : [Read](https://javascript.info/import-export#export-default)

> "import {x, y, z}" - called named imports and "import Person" called default import

<br>

## To import all named modules and default module

importing everything `*` as an `object`, and the `default` property of the object is exactly the default export module

```js
import * as imports from "./stupidModules/sayHi.js";

let sayHi = imports.default;
sayHi();

console.log(imports.x);
console.log(imports.y);
```

```js
//sayHi.js
import { user } from "./users.js"
default function sayHi() {
    user.info();
}

let x = 1000;
let y = 99999;

export {x, y};
```