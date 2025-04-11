function fun(x) {
    console.log(x)
    console.log("Hiii re");
}

// let x = prompt("enter : ");
fun(10);


// add using arrow function
const arrowAdd = (a, b) => {
    return a + b;
}


console.log(arrowAdd(10, 12));

console.log(typeof arrowAdd)


// methods : function associated eith other data structure / objects are called methods
// only associated objects can use this functions 

// like:

// arr.forEach(callBackFunction);

//call back function is the function to execute for each element in the array

//what is call back function> A callback function is a function passed into another function as an argument, 
// which is then invoked inside the outer function to complete some kind of routine or action.

let arr = new Array(1, 2, 3, 4, 5, 6);

// arr.forEach(function (val){     // passinf a norma function
//     console.log(val*10);
// })

// passing arroww function

arr.forEach((val) => {
    console.log(val * 10); 
})


//Higher order function ?? the func which takes other function as parametere, or returns other function 
//in this case forEach()

/* apne cllg L5*/
let arr1 = [89, 71, 19, 90, 98, 93, 78];

let cheters = arr1.filter((val) => {
    return val > 80;
})

let maxi = arr1.reduce((ans, curr) => {
    return ans > curr ? ans : curr;
})

console.log(cheters);
console.log(maxi);