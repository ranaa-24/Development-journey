// import chalk from 'chalk';

// console.log(chalk.bgRed('hello'));

// import fs from 'fs'

// fs.readFile('package.json', 'utf-8', (err, data) => {
//     console.log(data);
// })

// fs.writeFile('text.txt', "hello from node", (err)=>console.log('sucess'))

// function add(a,b){
//     return a+b;
// }

// console.log(process.argv[0])


const { log } = require('console');
const fs = require('fs');
const path = require('path');

filename = path.join(__dirname, process.argv[2])
console.log(filename);


fs.readFile(filename, "utf-8", (err, data) => {
    if(err) throw new Error('error');

    let numberIfWords = data.trim().split(" ").length

    console.log(numberIfWords);
})
