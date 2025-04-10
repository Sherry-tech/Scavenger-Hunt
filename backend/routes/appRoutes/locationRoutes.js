const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../../middleware/authMiddleware')
const { getHuntLocations, locationStatus, saveUnsaveLocation, locationClueStatus } = require('../../controllers/app/location');


//Locations
router.route('/getHuntLocations').get(authenticateJWT, getHuntLocations);
router.route('/locationStatus').post(authenticateJWT, locationStatus);
router.route('/saveUnsaveLocation').post(authenticateJWT, saveUnsaveLocation);
router.route('/locationClueStatus').post(authenticateJWT, locationClueStatus);


module.exports = router