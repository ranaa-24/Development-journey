import express from 'express'
const app = express();
app.use(express.json())


let users = [
    {
        name: "Rati",
        mistakes: [{ falut: true }, { falut: true }, { false: false }],
    }
]

// return number mistakes, number of userFaults, number of times user was innocent but still blamed 

app.get('/', (req, res) => {
    let mistakes = users[0].mistakes.length;
    let userFaults = users[0].mistakes.filter((user) => user.falut === true).length
    let userInnocent = mistakes - userFaults

    res.status(200).json({
        mistakes,
        userFaults,
        userInnocent
    })
})

// add kidneys 
app.post('/', (req, res) => {
    let isFalut = req.body.isFalut
    users[0].mistakes.push({ falut: isFalut })
    let mistakes = users[0].mistakes
    res.json({ mistakes })
})


app.put('/', (req, res) => {
    users[0].mistakes.forEach((mis) => mis.falut = true)
    res.json({ messge: "done!" })
})

app.delete('/', (req, res) => {
    const innocentMistakes = users[0].mistakes.filter((obj) => obj.falut === false)
    if (innocentMistakes.length === 0) {
        return res.json({ msg: "no inno" })
    }

    users[0].mistakes = users[0].mistakes.filter((obj) => obj.falut === true)
    res.json({ messge: "done" })
})
app.listen(3000, () => console.log("runnign..."))

