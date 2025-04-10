const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../../middleware/authMiddleware')
const { huntList, addHuntToFavourite } = require('../../controllers/app/hunt');


//Hunt
router.route('/huntList').get(authenticateJWT, huntList);
router.route('/addHuntToFavourite').post(authenticateJWT, addHuntToFavourite);


module.exports = router