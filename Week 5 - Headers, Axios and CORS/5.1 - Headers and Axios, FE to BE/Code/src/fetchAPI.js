let url = "https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits";

// (async()=>{

//     let res = await fetch(url);
//     console.log(await res.json());
    
// })();



// fetch(url)
//     .then(function(response){
//         if(response.ok){
//             return response.json();
//         }
//         else{
//             return new Error("Network issue");
//         }
//     })
//     .then((val) => {
//         console.log(val);
        
//     })
//     .catch((err) => {
//         console.log(err);
//     })

//creating a resource to a end point 
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({      // create this body
      title: 'foo',
      body: 'bar',
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
  

