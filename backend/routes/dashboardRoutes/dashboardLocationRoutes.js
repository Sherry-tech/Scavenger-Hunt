const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../../middleware/authMiddleware');
const { createLocation, huntsDropdown, locationList, editLocation, editLocationHunt, deleteLocation } = require('../../controllers/dashboard/dashboardLocation');


//Locations
router.route('/createLocation').post(authenticateJWT, createLocation);
router.route('/huntsDropdown').get(authenticateJWT, huntsDropdown);
router.route('/locationList').get(authenticateJWT, locationList);
router.route('/editLocation').post(authenticateJWT, editLocation);
router.route('/editLocationHunt').post(authenticateJWT, editLocationHunt);
router.route('/deleteLocation').delete(authenticateJWT, deleteLocation);


module.exports = router