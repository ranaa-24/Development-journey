const { Command } = require('commander');
const fs = require('fs');

const program = new Command();

// .. as we defined only one argument so, it will take a arguemnt which is a file input
program.command('countWords')
    .argument('<file>', 'Input File') 
    .action((file) => {
        let data = fs.readFileSync(file, 'utf-8');
        console.log("There are " + countWords(data) + " Words");

    });

program.command('countLines')
    .argument('<file>', 'Input File')
    .action((file) => {
        let data = fs.readFileSync(file, 'utf-8');
        console.log("There are " + countLines(data) + " Lines");

    });

// commmand : node CLIusingCommander.js countWords ./a.txt
// commmand : node CLIusingCommander.js countLines ./a.txt


function countWords(data) {
    return data.trim().split(/\s+/).length;
}

function countLines(data) {
    return data.trim().split(/\n/).length;
}

program.parse();
