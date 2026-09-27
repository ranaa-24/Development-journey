const User = require('../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Purchase = require('../models/Purchases');



async function createUser(req, res) {
    const { username, password } = req.body;
    if (!username || !password) return res.send({ err: "username and password is required" });
    try {
        const user = await User.create(req.body);
        return res.send({ msg: `welcome ${user.username}` });
    } catch (err) {
        console.log("Error userController" + err.message);
        return res.send({ err: "Username already taken" })
    }
}

async function sigin(req, res) {
    const { username, password } = req.body;
    if (!username || !password) return res.send({ err: "username and password is required" });

    try {
        const user = await User.findOne({ username });
        if (!user) return res.send({ err: "user not found" });
        const result = await bcrypt.compare(password, user.password);
        if (!result) return res.send({ err: "Incorrect password" });

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
        return res.send({ msg: `welcome ${user.username}`, token });


    } catch (err) {
        console.log("sigin cntr error" + err.message);
        return res.status(500).send({ err: "internal server error" })
    }
}

async function getPurchasedCourses(req, res) {
    try {
        const purchases = await Purchase.find({ user: req.user.id })
            .populate('courseId', 'title description')
            .lean();

        if (!purchases || purchases.length === 0) {
            return res.status(200).send({ msg: "Empty Inventory", purchases: [] });
        }

        const mod = purchases
            .filter((purchase) => purchase.courseId)
            .map((purchase) => ({
                title: purchase.courseId.title,
                description: purchase.courseId.description
            }));

        return res.send({ purchases: mod });
    } catch (err) {
        console.log("err userController", err.message);
        return res.status(500).send({ err: "Internal Server error!" });
    }
}


module.exports = {
    createUser,
    sigin,
    getPurchasedCourses
}
