// let num = prompt("How many times");
let num = 5;
for(let i=0; i<num; i++){
    console.log("rana" + (i + 1));
}

// i has no scope out of the loop,
// using var we can do this

let n = "rana";
// for(let i=0; i<n.length; i++){
//     console.log(n[i]);
// }

//we can do ther same thing using iterator
for(let i of n){
    console.log(i);
}


// for objects we use for-in loop
// it iterates through keys
let me = {
    name : "Rana",
    age : 19, 
    sex : 'M', 
    Course : "BCA"
};

for(let key in me){
    console.log(key = me[key]);
//             key    value
}

// all even numbers 0 - 100
// for(let i=0; i<100; i++){
//     if(i%2 == 0)
//         console.log(i);
// }