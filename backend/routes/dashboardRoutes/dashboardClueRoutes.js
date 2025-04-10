const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../../middleware/authMiddleware');
const { cluesList, addClue, editClue, clueLocationsDropDown } = require('../../controllers/dashboard/dashboardClue');


router.route('/cluesList').get(authenticateJWT, cluesList);
router.route('/addClue').post(authenticateJWT, addClue);
router.route('/editClue').patch(authenticateJWT, editClue);
router.route('/clueLocationsDropDown').get(authenticateJWT, clueLocationsDropDown);


module.exports = router