const Course = require('../models/Course')
const User = require('../models/User')

async function createCourse(req, res) {
    const { title } = req.body;
    if (typeof title !== 'string' || !title.trim()) {
        return res.status(400).send({ err: "Title required!" });
    }

    try {
        const course = await Course.create({ ...req.body, title: title.trim(), creator: req.user.id });
        return res.status(201).send({ msg: "Course Created!", course });
    } catch (err) {
        console.error("Error creating course:", err);
        return res.status(500).send({ err: "Internal server error" });
    }
}

async function getAllCreatedCourses(req, res) {
    try {
        const courses = await Course.find({ creator: req.user.id }).lean();
        return res.status(200).send({ courses });
    } catch (err) {
        console.error("Error fetching created courses:", err);
        return res.status(500).send({ err: "Internal server error" });
    }
}

module.exports = {
    createCourse,
    getAllCreatedCourses
}