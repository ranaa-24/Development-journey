import axios from 'axios'
const API = 'https://jsonplaceholder.typicode.com/posts/'

//using await at top lvl so define the package as "type" : "module", 
// and user import not the commonJS require()
let response = await axios.post(API, {  // as body
  headers : {auth : "yes"}, 
  name : "ran"
})

console.log(response.data);



