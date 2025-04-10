const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../../middleware/authMiddleware');
const multer = require('multer');
const upload = multer();
const { addExperience, editExperience, experienceList, deleteExperience, experienceLocationsDropDown } = require('../../controllers/dashboard/dashboardExperience');


router.route('/addExperience').post(authenticateJWT, upload.single('experienceImage'), addExperience);
router.route('/editExperience').post(authenticateJWT, upload.single('experienceImage'), editExperience);
router.route('/experienceList').get(authenticateJWT, experienceList);
router.route('/deleteExperience').delete(authenticateJWT, deleteExperience);
router.route('/experienceLocationsDropDown').get(authenticateJWT, experienceLocationsDropDown);


module.exports = router