const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../../middleware/authMiddleware');
const multer = require('multer');
const upload = multer();
const { createRonaldRequest, editRonaldRequest, deleteRonaldRequest, ronaldRequestList } = require('../../controllers/dashboard/dashboardRonaldRequest');



router.route('/createRonaldRequest').post(authenticateJWT, upload.single('ronaldRequestImage'), createRonaldRequest);
router.route('/editRonaldRequest').patch(authenticateJWT, upload.single('ronaldRequestImage'), editRonaldRequest);
router.route('/deleteRonaldRequest').delete(authenticateJWT, deleteRonaldRequest);
router.route('/ronaldRequestList').get(authenticateJWT, ronaldRequestList);

module.exports = router

