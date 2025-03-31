const API = 'https://jsonplaceholder.typicode.com/todos'

// /todo/1...

let i = 1;
setInterval(async() => {
    let res = await fetch(API + `/${i++}`);
    let bodyData = await res.json();

    console.log(bodyData);
}, 1000*2)

