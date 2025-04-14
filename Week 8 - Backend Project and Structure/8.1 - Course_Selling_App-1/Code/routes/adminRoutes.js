const express = require('express');
const { handleSignup, handleSignin, createCourse, updateCourse, deleteCourse, getAllCourses } = require('../controllers/adminController');
const authenticateJWT = require('../middlewares/authenticateToken')
require('dotenv').config()

const router = express.Router();
const JWT_SECRET = process.env.JWT_ADMIN_SECRET || "allToday";

router.post('/signup', handleSignup);
router.post('/signin', handleSignin);

// create new course : POST admin/course 
router.post('/course', authenticateJWT(JWT_SECRET), createCourse); 
// update exixting one
router.put('/course/:id', authenticateJWT(JWT_SECRET), updateCourse);
// delete exixting one
router.delete('/course/:id', authenticateJWT(JWT_SECRET), deleteCourse);
// show created courses by current (req.adminId) admin
router.get('/', authenticateJWT(JWT_SECRET), getAllCourses);

module.exports = router;    