"use strict";
// import { Love } from "./temp/tempLife";
// Love();
// console.log("hello");
function fn(a, b) {
    if (typeof a === "number" && typeof b === "number") {
        return a + b;
    }
    return String(a) + String(b);
}
console.log(fn(2, "3"));
