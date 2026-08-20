// import express from 'express'
// const app = express();
// app.use(express.json())


// let users = [
//     {
//         name: "Rati",
//         mistakes: [{ falut: true }, { falut: true }, { false: false }],
//     }
// ]

// // return number mistakes, number of userFaults, number of times user was innocent but still blamed 

// app.get('/', (req, res) => {
//     let mistakes = users[0].mistakes.length;
//     let userFaults = users[0].mistakes.filter((user) => user.falut === true).length
//     let userInnocent = mistakes - userFaults

//     res.status(200).json({
//         mistakes,
//         userFaults,
//         userInnocent
//     })
// })

// // add kidneys 
// app.post('/', (req, res) => {
//     let isFalut = req.body.isFalut
//     users[0].mistakes.push({ falut: isFalut })
//     let mistakes = users[0].mistakes
//     res.json({ mistakes })
// })


// app.put('/', (req, res) => {
//     users[0].mistakes.forEach((mis) => mis.falut = true)
//     res.json({ messge: "done!" })
// })

// app.delete('/', (req, res) => {
//     const innocentMistakes = users[0].mistakes.filter((obj) => obj.falut === false)
//     if (innocentMistakes.length === 0) {
//         return res.json({ msg: "no inno" })
//     }

//     users[0].mistakes = users[0].mistakes.filter((obj) => obj.falut === true)
//     res.json({ messge: "done" })
// })
// app.listen(3000, () => console.log("runnign..."))

// import express, { urlencoded } from 'express'
// import morgan from 'morgan';
// import usersData from './userDB.json' with {type: 'json'}
// import fs from 'fs'


// // import makes it const make it a diff varuable to update
// let users = usersData;

// const app = express();
// app.use(morgan('dev'))
// app.use(express.urlencoded({extended: false}))

// app.get('/', (req, res) => {
//     return res.send('<h1>Visit /user to get all users</h1>')
// })

// app.get('/users', (req, res) => {
//     const html = `
//         <ul>
//             ${users.map(user => `<li>${user.first_name + " " + user.last_name}</li>`).join("")}
//         </ul>
//     `

//     return res.send(html)
// })

// app.get("/api/users", (req, res) => {
//     return res.send(users)
// })


// app.post("/api/users", (req, res) => {
//     let body = req.body

//     users.push({
//      id: users.length+1, ...body  
//     })

//     fs.writeFile('./userDB.json', JSON.stringify(users), (err, data) => {
//         if(err){
//              console.log(err);
//              return res.status(500).json({Message: "Somthing went wrong"})
//         }
//         return res.json({Message: "Success", id: users.length})
//     })
// })

// app.route('/api/users/:id').get((req, res) => {
//     let id = req.params.id;       // gives a string
//     id = Number.parseInt(id)
//     let user = users.find(user => user.id === id)
//     return res.json(user)
// }).patch((req, res) => {
//         //user name edit given id
//         let id = Number.parseInt(req.params.id);

//         if(!id || !users.find(user => user.id === id)) return res.json({Message: "User not found"});

//         // *****************
//         users = users.map(user => user.id === id ? {...user, ...req.body} : user)
//         // *****************
        
//         fs.writeFile('./userDB.json', JSON.stringify(users), (err) => {
//             if(err){
//                 console.log(err);
//                 return res.status(500).json({Message: "somthing went wrong"})
//             }

//             return res.send({Message: "Succcess", user: users.find(user => user.id === id)});
//         })

// }).delete((req, res) => {
//     const id = Number.parseInt(req.params.id);
//     let deletedUser = users.find(user => user.id === id);
//     users = users.filter(user => user.id !== id);
//     return res.json({message: "success", deletedUser});
// })


// app.listen(3000, () => console.log("Started.."))


import express from 'express'
const app = express();

function myLogger(req, res, next){
    console.log(req.method + " " + req.path);
    next()
} 

app.use(myLogger)

app.get("/", (req, res) => {
    return res.send({msg: "sucess"})
})

app.get('/user', (req, res) => {
    return res.send({msg: "updated"})
})

app.use((req, res, next) => {
    let err = new Error("created error")
    next(err)
})

app.get('/error', (req, res) => {
    // throw new Error("Somthing went wrong")
    return res.send({msg:"error"})
})

app.use((err, req, res, next) => {
    console.log(err.message)
    return res.send({msg: err.message})
})




app.listen(3000, () => console.log("Running.."))