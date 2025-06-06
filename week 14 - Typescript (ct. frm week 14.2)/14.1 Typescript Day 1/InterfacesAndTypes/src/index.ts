// import { Love } from "./temp/tempLife";
// Love();
// console.log("hello");


// let x : (a: number, b: number) => string = (a: number, b:  number) => {
//     return "" + a + b;
// }

// console.log(x(2, 4));

// obj type

// let user : {name : string, age: number, isAdmin?: boolean};

// user = {
//     name : 'kia', 
//     age: 12
// }

// console.log(Array(20).fill(1));
// type Direction = 'up' | 'down' | 'left' | 'right';
// type Theme = 'light' | 'dark';
// type Size = 'small' | 'medium' | 'large';

// let theme: Theme = 'light';
// theme = "dark";
// theme = "not possible"

// interface Simpleuser{
//     name: string,
//     age: number 
// }

// let jon:Simpleuser = {name : 'jon', age: 12};

// const greet = (user: Simpleuser) => console.log(`hello ${user.name}`);



// greet(jon)

// type ArgTypes = number | string;

// function fn(a : ArgTypes, b: ArgTypes){
//     if (typeof a === "number" && typeof b === "number") {
//         return a + b;  
//     }
//     return String(a) + String(b);
// }

// console.log(fn(2, "3"))


// interface User{
//     readonly id: number,
//     name: string, 
//     age?: number
// }

// type UserSi = {readonly id: number, name : string};

// const jou: UserSi = {id : 1, name: 'joy'};

// console.log(jou.name)

// jou.id = 12

