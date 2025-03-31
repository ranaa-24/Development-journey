// Your task is to create a global middleware (app.use) which will rate limit the requests from a user to only 5 request per second
//     - If a user sends more than 5 requests in a single second, the server should block them with a 404.
//     - User will be sending in their user id in the header as 'user-id'   ****
//     - You have been given a numberOfRequestsForUser object to start off with which clears every one second

const express = require('express');
const app = express();

let numberOfRequestsForUser = {};
// clear the numberOfRequestsForUser object every one second
setInterval(() => {
    numberOfRequestsForUser = {};
}, 5000);

app.use((req, res, next) => {
    //given user id
    const userId = req.headers["user-id"]
    if (numberOfRequestsForUser[userId]) { // if user present already
        numberOfRequestsForUser[userId]++;
        if (numberOfRequestsForUser[userId] > 5) {
            return res.status(404).send("Get out~")
        }
        else {
            next()
        }
    }
    else {       //if user not present in numberOfRequestsForUser, numberOfRequestsForUserv[userId] will be undefined 
        numberOfRequestsForUser[userId] = 1;  // the first count 
        next();
    }
})



app.get('/users', (req, res) => {
    console.log(numberOfRequestsForUser);       // will be {undefined : 1} coz we arent sending any data to the header for now..
    return res.json({ fname: "jane", lastname: "doe" })
})


app.listen(3000, () => {
    console.log("Server running..");
})