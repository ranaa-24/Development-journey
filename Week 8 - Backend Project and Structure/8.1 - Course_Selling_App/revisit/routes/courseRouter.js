const { Router } = require('express');
const { purchaseCourse, getAllCourses } = require('../controller/courseController');
const router = Router();


router.get('/', getAllCourses);
router.post('/purchase', purchaseCourse);



module.exports = router;