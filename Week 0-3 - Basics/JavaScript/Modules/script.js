// import { sayHi } from "./stupidModules/sayHi.js";
import * as imports from "./stupidModules/sayHi.js";

let sayHi = imports.default;
sayHi();

console.log(imports.x);
console.log(imports.y);
