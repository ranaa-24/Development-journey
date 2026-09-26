const Course = require('../models/Course');

async function purchaseCourse(req, res){

}

async function getAllCourses(req, res) {
    try {
        const courses = await Course.find({}).lean().populate('creator', 'username email');

        // const formattedCourses = courses.map((course) => ({
        //     ...course.toObject(),
        //     creator: course.creator
        //         ? {
        //             _id: course.creator._id,
        //             name: course.creator.username,
        //             email: course.creator.email
        //         }
        //         : null
        // }));

        return res.send({courses});
    } catch (err) {
        console.log("err courseController", err.message);
        return res.send({ err: "Internal Server Error" });
    }
}

module.exports = {
    purchaseCourse, 
    getAllCourses
}