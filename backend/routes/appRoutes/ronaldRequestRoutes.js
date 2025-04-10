const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../../middleware/authMiddleware');
const multer = require('multer');
const upload = multer();
const { userRonaldRequestList, submitRonaldRequest } = require('../../controllers/app/ronaldRequest');


router.route('/userRonaldRequestList').get(authenticateJWT, userRonaldRequestList);
router.route('/submitRonaldRequest').post(authenticateJWT, upload.single('submitRequestImage'), submitRonaldRequest);


module.exports = router