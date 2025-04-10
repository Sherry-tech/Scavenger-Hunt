const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../../middleware/authMiddleware');
const multer = require('multer');
const upload = multer();
const { createHunt, huntList, editHunt, addRemoveLocation, deleteHunt, huntLocationList } = require('../../controllers/dashboard/dashboardHunt');




//Hunt
router.route('/createHunt').post(authenticateJWT, upload.single('huntImage'), createHunt);
router.route('/dashboardhuntList').get(authenticateJWT, huntList);
router.route('/editHunt').patch(authenticateJWT, upload.single('huntImage'), editHunt);
router.route('/addRemoveLocation').post(authenticateJWT, addRemoveLocation);
router.route('/deleteHunt').delete(authenticateJWT, deleteHunt);
router.route('/huntLocationListDropdown').get(authenticateJWT, huntLocationList);



module.exports = router