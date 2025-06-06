// let age: number = 12;



// function greet(name: string): number{
//     console.log('Hello, '+name);
//     return 1;
// }

// greet("Lina")
// greet("Youta")


// const hobbies : string[] = ["reading", "coding"]

// const touple: [string, number] = ["12", 112];

// let x:any = 13;
// x = true;

// const a = () => 110;
// const b = () => 2;


// /// alias, instead of fn1: () => number for each
// type funtionType = () => number;

// function sumFuntion(fn1: funtionType, fn2: funtionType){
//     return () => fn1() + fn2();
// }

// console.log((sumFuntion(a, b))())




// -----------------------
// function sum(a:number, b:number){
//     return "" + a + b;
// }

// let x = 13;

// // this a funtion type, this variable will hold a funtion 
// let fnVariable: (a:number, b:number) => string;

// fnVariable = sum;

// console.log(fnVariable(2, 5));

// ----------------------------


// union type

// let age: number | string = 21;
// age = "21" 



// let jsEnum = Object.freeze({
//     RED : 1, 
//     BLUE : 2, 
//     GREEN : 3
// });

// // jsEnum.RED = 123;
// console.log(jsEnum.RED);

// enum tsEnum{
// RED, //0
// GREEN,  //1 
//     BLUE = 12, // 12
//     PINK,   //13
// }

// console.log(tsEnum.RED);

// let denger: tsEnum = tsEnum.RED;
// let success: tsEnum = tsEnum.GREEN;


// make sure the type in package.json is commonJS, coz the js file will be as commonJS after transpilation
// import {image1} from './Images/image1'
// image1();

