// const bcrypt = require('bcrypt');
import bcrypt from 'bcrypt';
let mypass = "lina@12";

// (async () => )();

//directly 
// let hashed = bcrypt.hash(mypass, 10);


let salt = await bcrypt.genSalt(10);
console.log(salt);
let hashed = await bcrypt.hash(mypass, salt);
console.log(hashed);

let isSame = await bcrypt.compare("iloveher", hashed);
console.log(isSame);

