import chalk from "chalk";
// chalk is type module and uses export for syntax 'import'
// in order to require that had to be a different export synntax
// so read chalk nmp registry and use import 

console.log(chalk.blue('Hello, world!'));
console.log(chalk.red('This is an error message.'));