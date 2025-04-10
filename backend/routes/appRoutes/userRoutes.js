const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../../middleware/authMiddleware')
const multer = require('multer');
const upload = multer();
const { userSignup, getOTP, verifyOTP, login, resetPassword, userOnboarding, updateUser, refreshToken } = require('../../controllers/app/user');


//Create User
router.route('/signUp').post( userSignup );
router.route('/getOTP').post( getOTP );
router.route('/verifyOTP').post( verifyOTP );
router.route('/login').post( login );
router.route('/resetPassword').post( resetPassword );
router.route('/refreshToken').patch( refreshToken );
router.route('/onboarding').post( authenticateJWT, upload.single('userProfilePicture'), userOnboarding );
router.route('/updateUser').patch( authenticateJWT, upload.single('userProfilePicture'), updateUser );


module.exports = router