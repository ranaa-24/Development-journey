const Course = require('../models/Course');
const Purchases = require('../models/Purchases');
const Purchase = require('../models/Purchases');

async function purchaseCourse(req, res){
    const courseId = req.query.id || req.body?.id;
    if(!courseId) return res.send({err: "Course ID required"});
    try{
        const course = await Course.findById(courseId);
        if(!course) return res.send({err: "No course found"});

        const alreadyPurchased = await Purchase.findOne({user: req.user.id, courseId})

        if(alreadyPurchased) return res.send({err: "Course already purchased!"});

        await Purchases.create({
            user: req.user.id, 
            courseId: courseId
        });

        return res.send({msg: "Purchased Successfull", course: course.title})

    }catch(err){
        console.log("err courseController", err.message);
        return res.send({err: 'Internal Server error'});
    }

}

async function getAllCourses(req, res) {
    try {
        const courses = await Course.find({}).lean().populate('creator', 'username email');

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