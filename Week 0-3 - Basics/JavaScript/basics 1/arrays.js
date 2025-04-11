let xinTeam = ["Rana", "Stirx", "Isha", "cizOn"];
let arr2 = ["rana", 19, 8.5];

// for(let i=0; i<xinTeam.length; i++){
//     console.log(xinTeam[i]);
// }
// for(let i of xinTeam){
//     console.log(i);
// }

let arr1 = [1, 2, 3, 4, 1];

arr1.push(10);
arr1.pop();
console.log(arr1);

arr1.unshift(100);          // push at bigining
console.log(arr1);
let deleted = arr1.shift(100);          // remove from bigining
console.log(arr1);

console.log(arr1.includes(10));     // if array includes 9 or not

console.log(arr1.indexOf(1));     // idx of a certain element

console.log(arr1.toString());     // convert array in to string

console.log(arr1.concat(xinTeam));

console.log(xinTeam.slice(0, 3));       // first 3 ele slice 

// str.splice(inWhichPos, howManyTObeDeleted, whatToaddIndelettedPlace);

console.log(xinTeam);
xinTeam.splice(2, 1, "Matron");
console.log(xinTeam);


let a = [1,2] , b = [3, 4, 2,2];

a = b;

console.log(a);