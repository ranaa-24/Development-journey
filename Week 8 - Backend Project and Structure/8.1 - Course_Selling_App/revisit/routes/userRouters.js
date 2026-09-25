const express = require('express');
const { createUser, sigin, getPurchasedCourses } = require('../controller/userControllers');
const authenticate = require('../middlewares/auth.user');
const router = express.Router();


router.post('/signup', createUser)
router.post('/signin', sigin)
router.get('/purchases', authenticate, getPurchasedCourses)



module.exports = router;
