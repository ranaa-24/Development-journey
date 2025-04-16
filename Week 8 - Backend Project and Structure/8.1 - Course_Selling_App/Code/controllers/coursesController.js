const Purchases = require('../models/purchasesModel');
const Courses = require('../models/coursesModel');
const Users = require('../models/userModel');

async function handlePurchaseCourse(req, res) {
    const courseId = req.params.id;
    const userId = req.userId;
    const requiredCourse = await Courses.findOne({_id : courseId});

    if(!requiredCourse) return res.status(404).json({message : "Course is unavailable"})

    try{
        const purchased = await Purchases.create({
            courseId, 
            userId
        })
        return res.status(200).json({message : `${requiredCourse.title} Purchased Successfully.. `});
    } catch(err){
        return res.status(500).json({message : err.message});
    }
}
async function showPurchaseCourse(req, res) {
    const userId = req.userId;
    try{
        const user = await Users.findOne({_id : userId});
         // Step 1: Get purchases
        const purchasesOfTheCurrentUser = await Purchases.find({userId : userId})
        // Step 2: Extract course IDs
        const courseIDs = purchasesOfTheCurrentUser.map(course => course.courseId)
          // Step 3: Use $in to find all matching courses
        const courses = await Courses.find({_id : { $in : courseIDs}});
        //OR :   const courses = await Courses.find({ _id: { $in: courseIds } }, 'title'); // array of titles
 
        return res.render('purchasedCourses', {name : user.firstName, courses : courses})
    } catch(err){
        return res.status(500).json({message : err.message})
    }
}

async function showAllCourses(req, res){
    const allCourses = await Courses.find({});
    return res.render('allCourses', {courses : allCourses});
}

module.exports = {
    handlePurchaseCourse, 
    showPurchaseCourse,
    showAllCourses
}