// //async funtion always return a promise, so we can use .then() to get the result
// // we can explicitly return a promise also  
// async function myFunc() {
//     return Promise.reject("nooo"); // dont use new, its not a constructor
// }   

// myFunc().catch(err => console.log(err));

// // pr.then((val) => console.log(val));


// // An example of handling promise w/o async/await
// let p = new Promise((resolve, reject) => {
//    resolve(100);
// });

// // function fn(){
// //     p.then(val => console.log(val));
    
// // }



// // with async/await
// async function fn(){
//     let p = new Promise((resolve, reject) => {
//         setTimeout(() =>  resolve("Resolved!"), 3000);
//      });

//     let x = await p;
//     console.log(x);     // after 3s
//     console.log("Funtion end"); // after 3s
// }

// fn();
// console.log("End");     //immediatly

// // mind fvck

// async function fn1(){
//     let p1 = new Promise((resolve, reject) => {
//         setTimeout(() =>  resolve("Resolved!"), 10000);
//      });
//     let p2 = new Promise((resolve, reject) => {
//         setTimeout(() =>  resolve("Resolved!"), 5000);
//      });

//     let x = await p1;       // will take 10s to resolve, while running the other await parallally, but stops execution of the code, thats why nothing was printed untill 10s then both printed

//     console.log("first await end"); // after 10s

//     let y = await p2;       // it reslolved in 5s
//     console.log("second await end"); // but waited to come execution to this line, printed after 10s

// }

// fn1();

// //fetch returns a promise and when resolved it gives a Response obj, which is a readstream.. 
// // then this respons obj coverted to .json(), which return a promise and the result is a JSON object
(async() => {
    const API = "https://pi.github.com/users/rana-24";
    try{
        let response = await fetch(API);
        let res = await response.json();
        console.log(res);
    }
    catch(err){
        console.log("There is a error");
    }
})();
