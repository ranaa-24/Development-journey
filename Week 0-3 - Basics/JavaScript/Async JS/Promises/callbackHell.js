setTimeout(() => {
    console.log("one");
    setTimeout(() => {
        console.log("two");
        setTimeout(() => {
            console.log("Three")
        }, 3000);
    }, 2000)
}, 1000);


// promise