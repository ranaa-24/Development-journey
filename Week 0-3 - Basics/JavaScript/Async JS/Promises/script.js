// function fn(res){
//     res();
// }

// // promise takes a funtion and that function contains two args and each is a funtion, the first fintion is resposible for calling .then()
// let p = new Promise(fn);

// function callback(){
//     console.log("Promise Succeded");
// }

// p.then(callback);



// _________________________________________________
let cart = [];


//lets right createOrder()  -- The producer
function validateCart(cart) {
    if (cart.length) return true;
    return false;
}


function createOrder(cart) {     // suppose perfroms long running taks
    //Promise constructor takes a funtion and two paremeters (provided by Promise API), 
    let promise = new Promise(function (resolve, reject) {
        // after some logic the promise will either be resolve or reject
        if (!validateCart(cart)) {
            let err = new Error("Order rejected!");
            reject(err);
        }

        // if order is valid
        const orderId = "12323";   // by accsesing db calls.. or smtng
        if (orderId) {
            resolve("Order Successfully placed!");
        }
    });

    return promise;
}

//consumer
let promise = createOrder(cart); // an async opp, retruns a promise
// console.log(promise);


//once the promise is resolved or rejected, we will attach some task 
promise
    .then(function (msg) {
        console.log(msg);
    })
    .catch((err) => {
        console.log(err.message);
    });



console.log("end");     // will printed first coz promises are async and will make webAPI calls and stuffs

