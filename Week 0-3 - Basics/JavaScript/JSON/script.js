let user = `{
    "user" : "Rana", 
    "age" : 21, 
    "roles" : ["SWE", "SDE", "MLE"] 
}`

let obj = JSON.parse(user);

// console.log(user);

// console.log(obj);
// console.log(obj.roles[0]);

let obj1 = {name : "Rana", age : 21, roles : ["SWE", "SDE"]} 
let jsonString = JSON.stringify(obj1, null, 1);

// console.log(jsonString);

