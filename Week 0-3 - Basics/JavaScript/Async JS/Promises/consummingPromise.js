let promise = new Promise(function(resolve, reject){
    setTimeout(() => {
        resolve("Promise resolved!");
    }, 2000);
});

console.log(promise);


// promise.then(
//     result => console.log(result),
//     err => console.log(err)
// );


// promise
// .finally(() => "Finallyyy")
// .then(null, (err) => {console.log(err)})


// promise.then((val) => {
//     console.log(val);
// })
// .finally(() => {
//     console.log("I am finally i have no arguements i run always"); 
// })
// .catch((err) => {
//     console.log(err + "   ERROR");
// })


promise.then(() => {
    throw new Error("Errorrrr");
}).catch((err) => console.log(err.message))



