// Your task is to create a global middleware (app.use) which will rate limit the requests from a user to only 5 request per second
//     - If a user sends more than 5 requests in a single second, the server should block them with a 404.
//     - User will be sending in their user id in the header as 'user-id'   ****
//     - You have been given a numberOfRequestsForUser object to start off with which clears every one second

const express = require('express');
const app = express();


app.get('/error', (req, res) => {
    // throw new Error("Somthing broke");  // handled by error middleware
    res.send("Hii");        // never runs
})

//error handling middleware
app.use((err, req, res, next) => {
    console.log("caught an error");
    res.status(501).json({msg : err.message});
})

app.listen(3000, () => {
    console.log("Server running..");
})