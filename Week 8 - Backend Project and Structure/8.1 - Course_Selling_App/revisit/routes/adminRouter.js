const {Router} = require('express');
const { createCourse, getAllCreatedCourses } = require('../controller/adminController');
const { createUser, sigin } = require('../controller/userControllers');
const authenticate = require('../middlewares/auth.user');
const router = Router();


router.post('/signup', createUser)
router.post('/signin', sigin)


// app.use(adminMiddleware) --> we can add xtra restrictions
router.post('/course',authenticate,  createCourse)
router.get('/course/bulk', authenticate, getAllCreatedCourses)


module.exports = router;