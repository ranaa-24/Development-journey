// we keep our router halder funtions here
const Admin = require('../models/adminModel');
const Course = require('../models/coursesModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
require('dotenv').config()
const JWT_SECRET = process.env.JWT_ADMIN_SECRET || "allToday";


async function handleSignup(req, res) {
    let requiredObject = z.object({
        email: z.string().email().refine((val) => val.endsWith('@gmail.com'), "Please provide a valid gmail."),
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
        let admin = await Admin.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });
        console.log("Admin Added \n" + JSON.stringify(admin));
        return res.status(200).json({ message: "Account Created Successfully" })
    } catch (err) {
        return res.status(503).json({ message: err.message })
    }
}

async function handleSignin(req, res) {
    const { email, password } = req.body;

    let admin = await Admin.findOne({
        email: email
    });

    if (!admin) return res.status(407).json({ message: "User doesnt exists" });

    let isValid = await bcrypt.compare(password, admin.password);
    if (isValid) {
        const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1d' });
        res.header('Authorization', token);
        return res.status(200).json({ message: "Loged in Successfully" })
    }
    else {
        return res.status(403).json({ message: "Incorrect Credentials" })
    }

}

async function createCourse(req, res) {
    let adminId = req.userId;
    
    const requiredInputs = z.object({
        title: z.string(),
        description: z.string().min(10, "Please write a descriptive message containing atleast 10 characters"),
        price: z.number(),
        imgUrl: z.string(),
    })

    const isvalid = requiredInputs.safeParse(req.body);
    if (!isvalid) return res.status(400).json({ message: isvalid.error.errors });

    const { title, description, price, imgUrl } = req.body;
    try {
        let created = await Course.create({
            title,
            description,
            price,
            imgUrl,
            creatorId: adminId
        })
        return res.status(200).json({ 
            message: `course Title : ${created.title } added`, 
            courseId : created._id
         })
    } catch (err) {
        return res.status(503).json({ message: err.message })
    }
}

async function updateCourse(req, res) {
    const courseId = req.params.id;
    let adminId = req.userId;
    const requiredInputs = z.object({
        title: z.string(),
        description: z.string().min(10, "Please write a descriptive message containing atleast 10 characters"),
        price: z.number(),
        imgUrl: z.string(),
    })

    const isvalid = requiredInputs.safeParse(req.body);
    if (!isvalid) return res.status(400).json({ message: isvalid.error.errors });

    const { title, description, price, imgUrl } = req.body;
    try {
        let updatedCourse = await Course.findOneAndUpdate({
                _id: courseId,        // filter, only the creator can updated their corrosponding courses 
                creatorId : adminId
            },
            {                           // data to update
                title,
                description,
                price,
                imgUrl,
                creatorId: adminId
            }, 
            {
            new: true,             // return updated doc
            runValidators: true    // validate the update, mongo Schema validation
        })

        if(!updatedCourse) return res.status(403).json({message : "You are restricted from updating others course"})

        return res.status(200).json({ message: `course Title : ${updatedCourse.title} Updated` })
    } catch (err) {
        return res.status(503).json({ message: err.message })
    }
}

async function deleteCourse(req, res){
    const courseId = req.params.id;
    const adminId = req.userId;
    try{
        const deletedCourse = await Course.findOneAndDelete({_id : courseId, creatorId : adminId}); // be delete to the by the creator
        if(!deletedCourse) return res.status(400).json({message : "Course doesnt found"});
        res.status(200).json({ message: `Deleted course: ${deletedCourse.title}` });
    } catch(err){
        return res.status(500).json({message : err.message});
    }
}

async function getAllCourses(req, res){
    const adminId = req.userId;
    try{
        const courses = await Course.find({creatorId : adminId})
        // if(courses.length == 0) return res.status(404).json({message : 'No courses Found for this admin.'})
        // return res.status(200).json({ courses : courses });
        return res.render('createdCourses', {courses : courses});
    } catch(err){
        return res.status(500).json({message : err.message})
    }
}

module.exports = {
    handleSignup,
    handleSignin,
    createCourse, 
    updateCourse, 
    deleteCourse, 
    getAllCourses
}