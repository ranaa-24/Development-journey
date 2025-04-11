let obj = {
    item : "Pen", 
    price: 10
};

//we can print it using small stings and val of varables
// console.log("The cost of ", obj.item, "is", obj.price);

// using Template literals
// var(if needed) = `I am ${nameVar} and i like thic thighs`;
// we define variable or expression(1+3) in ${varName/expression}; 

let output = `The cost of ${obj.pen} is ${obj.price}`;
console.log(output);
console.log(`type of output is ${typeof output}`);

// console.log(`The cost of ${obj.pen} is ${obj.price}`);

// creating a string by substitunig of palceholders/expression, called
//string interpolation
//eg : `string text ${placeHolder} string`;


console.log("String Methods");
// string methods
// str.length

//charAt():
console.log("cat"[1]);
console.log("cat".charAt(1));

// string comparation:
// any logical and comparation operator can be used 

const str1 = "cat";
const str2 = "rat";
str1 < str2 ? console.log(`${str1} is smaller`) : console.log(`${str2} is smaller`);

// str.toUpperCase()
// str.toLowerCase()


//str.trim(): removes white space from beginning and end
let str = "   rana   ";
console.log(str.trim());


// str.slice(strtIdx, endIdx);      it returns till before the endIdx (endIdx isnt include)

let str3 = "rana dey";
console.log(str3.slice(5, 9));

//  str1.concat(str2);

//str.replace(searchVal, newVal);

let str5 = "Isha Dutta";
// str5.replace("dutta", "dey");
console.log(str5.replace("Dutta", "Dey"));