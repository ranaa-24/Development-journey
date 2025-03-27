const fs = require('fs');
const path = require('path');

fs.writeFile("text.txt", "I am rana", (err) => {
   if(err) throw err;
   console.log("Done");
});

fs.readFile('text.txt', "utf-8", (err, data) => {
    if(err) throw err;
    console.log(data); 
});

console.log(__dirname);

// will normalize according to OS and file ../ prev means 4.1 folder so file.txt will attach to 4.1-nodejs
const filePath = path.join(__dirname, 'folder', '../file.txt');
console.log(filePath);




