const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../../middleware/authMiddleware')
const { addUser, usersList, editUser, deleteUser, deactivateUser, adminLogin, getAdminOTP, verifyAdminOTP, resetAdminPassword, accountSetup } = require('../../controllers/dashboard/dashboardUser');



//Admin Users
router.route('/adminLogin').post(adminLogin);
router.route('/getAdminOTP').post(getAdminOTP);
router.route('/verifyAdminOTP').post(verifyAdminOTP);
router.route('/accountSetup').post(authenticateJWT, accountSetup);
router.route('/resetAdminPassword').post(resetAdminPassword);


//User Management
router.route('/addAdminUser').post(addUser);
router.route('/usersList').get(authenticateJWT, usersList);
router.route('/editUser').patch(authenticateJWT, editUser);
router.route('/deleteUser').delete(authenticateJWT, deleteUser);
router.route('/deactivateUser').patch(authenticateJWT, deactivateUser);

module.exports = router