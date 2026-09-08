import axios from "axios";

// fetch('http://localhost:3000/?name=rana').then((res) =>  res.json()).then((data) => console.log(data));

// axios.get('http://localhost:3000').then((res) => console.log(res.data))

// (async () => {
//     let res = await axios.get('http://localhost:3000/');
//     let data = res.data;
//     console.log(data.msg);
// })();



// sending pra
// (async () => {
//     let res = await axios.get('http://localhost:3000/', {
//         params: { id: 12434 }       // it a axios query
//     });

//     let data = res.data;

//     console.log(data);
// })();


// try{
//     const res = await axios.get('http://127.0.0.1:3000/', {
//     timeout: 2000,
//     params: {id: 12}        // query
//     });
//     console.log(res.data);
// }catch(err){
//     console.log(err.message);
// }



let body = {
    name : "rana", 
    age: 22, 
    sucess: "+1",
} 



// try{
//     const res = await axios.post('http://127.0.0.1:3000/data', body, {
//         headers: {"X-sex" : "Interested"}
//     });
//     console.log(res.data);
// }catch(err){
//     console.log(err.message);
// }

axios.defaults.baseURL = 'http://127.0.0.1:3000';

const localApi = axios.create({baseURL: "http://127.0.0.1:3000"})


let res = await localApi.get('/add', {
    params: {a:10, b:20}
});

console.log(res.data);

















