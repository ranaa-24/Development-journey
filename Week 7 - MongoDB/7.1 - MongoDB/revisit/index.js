const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());

const userSchema = new mongoose.Schema({
    name: String
})

const User = mongoose.model('user', userSchema);

const goalSchema = new mongoose.Schema({
    goal: {
        type: String,
        required: true
    }, 
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user"
    }
});
const Goal = mongoose.model('goal', goalSchema);


const MONGODB_URI = ""

mongoose.connect(MONGODB_URI)
    .then(() => console.log('DB Connected..'))
    .catch((error) => console.error('Database connection failed:', error));


app.post('/user', async(req, res) => {
    const user = await User.create(req.body);
    return res.send({msg: `welcome ${user.name}`, id: user._id})
});


app.post('/goal', async (req, res) => {
    const { goal, userId } = req.body;
    const newGoal = await Goal.create({ goal, user: userId});

    return res.send({ msg: "goal added", goal: newGoal.goal })
});

app.put('/goal/:id', async (req, res) => {
    const id = req.params.id
    const goal = await Goal.findOneAndUpdate({_id: id},
        { goal: req.body.goal },
        { returnDocument: 'after', runValidators: true }
    )

    console.log(goal);

    if (!goal) return res.status(404).send({ msg: 'Goal not found' });

    return res.send({ msg: `${goal.goal} updated` })
});

app.get('/goals', async (req, res) => {
    const goals = await Goal.find().populate('user');
    const modires = goals.map(goal => ({
        goal: goal.goal,
        user: goal.user?.name || "unknown"
    }));

    return res.send({ goals: modires })
});


app.listen(3000, () => console.log('server up..'));

