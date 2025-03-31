import axios from 'axios'

// make sure to run the server.js

const api = 'http://localhost:3000/add?a=1&b=10';

//toggle /add /sub /mul   and /add?a=x&b=x


//using js
// let res = await fetch(api);
// let data = await res.json()


let res = await axios.get(api, {
    headers: {name : "rana"}, // this will be available in req.headers['name'] in server.js /add
    name : "wlkenc"   // for get req body may me rejected so, req.body will be undefined in sever.js
})

console.log("answer : ", res.data.answer);
