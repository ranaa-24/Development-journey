// we keep our router halder funtions here
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
require('dotenv').config()
const JWT_SECRET = process.env.JWT_USER_SECRET || "notTodayBabe";


async function handleSignup(req, res) {
    let requiredObject = z.object({
        email: z.string().email().refine((val) => val.endsWith('@gmail.com'), { message: "Please provide a valid gmail." }),
        password: z.string().min(8, "Password must be atleast 8 characters long"),
        firstName: z.string().max(20),
        lastName: z.string().max(20)
    });
    let isValidInputs = requiredObject.safeParse(req.body);
    if (!isValidInputs.success) {
        return res.status(410).json({ message: isValidInputs.error.errors });
    }
    const { email, password, firstName, lastName } = req.body;

    let hashedPassword = await bcrypt.hash(password, 10);
    try {
        let user = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });
        console.log("User Added \n" + JSON.stringify(user));
        return res.status(200).json({ message: "Account Created Successfully" })
    } catch (err) {
        return res.status(503).json({ message: err.message })
    }
}

// we have pass stored hashed, now sigin with email(unique) and pass(compare) and generate a jwt tokon

async function handleSignin(req, res) {
    const { email, password } = req.body;

    let user = await User.findOne({
        email: email
    });

    if (!user) return res.status(407).json({ message: "User doesnt exists" });

    let isValid = await bcrypt.compare(password, user.password);
    if(isValid){
        const token =  jwt.sign({id : user._id}, JWT_SECRET, {expiresIn : '1d'});
        res.header('Authorization', token);
        return res.status(200).json({message : "Loged in Successfully"})    
    }
    else{
        return res.status(403).json({message : "Incorrect Credentials"})
    }

}

module.exports = {
    handleSignup,
    handleSignin,
}