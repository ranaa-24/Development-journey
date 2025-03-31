// Complete REST API
// ----------------------
// GET /     -> nothingToSee
// GET /users      -> prints the users list 
// GET /api/users  -> return json data 
// GET /api/users/:name  -> get the spcific user 


// POST /api/users     -> add user 
// PATCH /api/users/:name    -> modify the user 
// DELETE /api/users/:name       -> deleted specific user 

const express = require('express');
const users = require('./user_data.json');
const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, 'user_data.json');


const app = express();

// to let the express know, the body willbe in form of json
app.use(express.json());

app.get("/", (req, res) => {
    // console.log("Request from ", req.ip);
    let nothingToSee = true;
    res.json({ nothingToSee });
})

app.get('/users', (req, res) => {
    //                  coverters to a array of <li>'s              .join to remove the comma's
    let userArr = users.map(user => `<li>${user["first_name"]}</li>`).join("");

    let html = `
        <ol>
            ${userArr}
        </ol>
    `
    return res.send(html);
})

app.get('/api/users', (req, res) => {
    return res.json(users);
})

app.route('/api/users/:name')
    .get((req, res) => {    // GET /api/users/Mureil
        let name = req.params.name
        let user = users.find((user) => user["first_name"] === name);
        console.log(user);

        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ error: "user not found" });
        }
    })
    .patch((req, res) => { // patch coz partial change
        //edit a user 
        let name = req.params.name;
        let userIndex = users.findIndex((user) => user["first_name"] === name);

        if (userIndex !== -1) {
            // a obj cant have duplicate value so, entries will get updated with new req.body, and also new entries can be added
            let updatedUser = { ...users[userIndex], ...req.body };
            users[userIndex] = updatedUser;

            try {
                fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
                return res.json({ message: "User updated successfully", user: updatedUser });
            } catch {
                return res.status(500).json({ error: "Failed to update user data" });
            }
        } else {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json({ status: "Pending" })
    })
    .delete((req, res) => {
        //delete a user from users array object 
        let name = req.params.name;
        let userIndex = users.findIndex((user) => user["first_name"] === name);

        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            try {
                fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
                return res.send("user deleted successfully..");
            } catch {
                return res.status(500).json({ error: "Failed to update user data" });
            }
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    })

app.post('/api/users', (req, res) => {   // must respose with somthing ow client coudnt know.. and keeps waiting 
    const body = req.body;
    if (!isEmpty(body)) {
        users.push(body);
        try {
            fs.writeFileSync(usersPath, JSON.stringify(users, null, 1));
            return res.send("user added successfully..");
        } catch {
            return res.status(500).json({ error: "Failed to update user data" });
        }
    }
    else {
        return res.json({ error: "no data given.." })
    }
})


app.listen(3000, () => console.log("Server runnning.."))

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}