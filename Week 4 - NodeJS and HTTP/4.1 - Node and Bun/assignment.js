const fs = require('fs');

function main(filename){
    let data = fs.readFileSync(filename, "utf-8");
    let words = countWords(data);
    console.log(words);
}


function countWords(data){
    return data.trim().split(/\s+/).length;
}

// console.log(process.argv[2]); // node assignment.js <this comes in 3rd arg>

main(process.argv[2]);


// node assignment.js ./a.txt 