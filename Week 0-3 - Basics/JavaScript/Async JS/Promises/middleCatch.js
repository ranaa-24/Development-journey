// how can we continue thw promise chain even if we get an error..
function fn(val) {
    return new Promise(function (resolve, reject) {
        resolve(val);
    })
}

fn(100)
    .then((val) => {
        console.log(val);
        return val + 100;
    })
    .then((val) => {
        console.log(val);
        return new Promise((resolve, reject) => reject("Error"));       // an error occurred 
    })
    .catch((err) => {
        console.log(err);
        return "Value sending from err";
    })
    .then((val) => {                        // promise continues, even after error 
        console.log(val + " After error");
    });