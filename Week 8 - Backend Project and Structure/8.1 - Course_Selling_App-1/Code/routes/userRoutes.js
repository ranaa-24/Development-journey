// const express = require('express')
// const router = express.Router();

const {Router} = require('express')
const router = Router();
const {handleSignup, handleSignin} = require('../controllers/userController')

//GET /user/signup
router.post('/signup', handleSignup);
router.post('/signin', handleSignin);

module.exports = router;