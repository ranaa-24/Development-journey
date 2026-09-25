const express = require('express');
const mongoose = require('mongoose');
const app = express();

// connect 
mongoose.connect()
.then(() => console.log('mongoDB conected..'))
.catch((err) => console.log("MongoDB err", err));

// schema
wifySchema = mongoose.Schema({
    name: {
        type: String, 
        required:  true
    }
});

// model -- to interact with db
const Wify = mongoose.model('wify', wifySchema);

app.get('/create/:name', async(req, res) => {
    let name = req.params?.name;
    const waify = await Wify.create({name: name});
    console.log(name, " created ");
    return res.send({msg: "done", name})
})

app.get('/waifies', async (req, res) => {
    let waifies = await Wify.find({});
    let html = `<ul>
        ${waifies.map(waify => `<li>${waify.name}</li>`).join(" ")}
    </ul>`
    res.send(html);
})

app.listen(3000, () => console.log('server running'));





