const express = require('express');
const {handlePurchaseCourse, showPurchaseCourse, showAllCourses } = require('../controllers/coursesController');
const authenticateJWT = require('../middlewares/authenticateToken')
const route = express.Router();
require('dotenv').config();

const JWT_USER_SECRET = process.env.JWT_USER_SECRET || "notTodayBabe";

//POST /courses/purchase/:id  : purchase course
route.post('/purchase/:id', authenticateJWT(JWT_USER_SECRET), handlePurchaseCourse);

//GET /courses/ : show all purchased courses
route.get('/purchased', authenticateJWT(JWT_USER_SECRET), showPurchaseCourse);

// show all available courses 
route.get('/', showAllCourses);

module.exports = route;