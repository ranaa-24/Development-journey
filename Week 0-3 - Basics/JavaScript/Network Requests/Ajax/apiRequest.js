let url = 'https://jsonplaceholder.typicode.com/posts';
// url = 'https://developer.mozilla.org/';
let xhr = new XMLHttpRequest();

console.log(xhr.readyState);    // 0
xhr.open("GET", url);
console.log(xhr.readyState);    // 1

xhr.send();

// xhr.onload =function(){
//     if(xhr.status != 200){
//         console.log(`Error ${xhr.status} : ${xhr.statusText}`);
//     }
//     else{
//         console.log(`Done, got ${xhr.response.length} bytes`);
//     }
// }

xhr.onerror = () => {
    console.log("An error occurred during the transaction");
}


