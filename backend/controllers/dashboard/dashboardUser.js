const queryDB = require("../../config/db");
const { sendSuccess, sendError } = require('../../utils/response');
const sendEmail = require('../../utils/sendEmail');
var moment = require('moment-timezone');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//Login

// Helper function to handle SQL queries with parameters
const query = (sql, params = []) => queryDB.queryPromise(sql, params);

const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    // Retrieve user by email
    const userExistance = await query(
        "SELECT * FROM svgr.adminuser WHERE email = ?",
        [email]
    );

    if (!userExistance.length) return sendError(res, "User does not exist");

    if(userExistance[0].isActive == 0) return sendError(res, "User account is deactivated!");

    const user = userExistance[0];

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        await handleFailedAttempt(user, res);
        return;
    }

    // Check if 5-minute cooldown is active
    if (user.attemptedAt) {
        const lastAttempt = moment(user.attemptedAt).tz("America/New_York");
        const currentTime = moment().tz("America/New_York");
        const minutesDifference = currentTime.diff(lastAttempt, 'minutes');

        if (user.attempts >= 2 && minutesDifference < 5) {
            return sendError(res, "Your account is blocked. Try again after 5 minutes.");
        }
    }

    // If password is correct and no cooldown, proceed with login
    await resetLoginAttempts(user.id);
    await updateEmailStatus(user.id, false);

    return handleSuccessfulLogin(user, res);
};

// Handle failed login attempts
const handleFailedAttempt = async (user, res) => {
    const lastAttempt = moment(user.attemptedAt).tz("America/New_York");
    const currentTime = moment().tz("America/New_York");
    const minutesDifference = currentTime.diff(lastAttempt, 'minutes');

    if (user.attempts === 2 && minutesDifference < 5) {
        if (user.emailStatus) {
            return sendError(res, "Too many attempts. Try again after 5 minutes.");
        } else {
            await sendBlockedEmail(user.email);
            await updateEmailStatus(user.id, true);
            return sendError(res, "Too many attempts. Try again after 5 minutes.");
        }
    }

    // Increment attempts if within the limit
    await incrementLoginAttempts(user.id);
    return sendError(res, "Incorrect Password");
};

// Send blocked account email
const sendBlockedEmail = async (email) => {
    const subject = 'Account Temporarily Blocked';
    const body = `
        <p>Hello ${email},</p>
        <p>Your account has been temporarily blocked for security reasons.</p>
        <p>Please try logging in again after 5 minutes.</p>
        <p>Thank you,</p>
        <p>The Scavenger Team</p>
    `;
    await sendEmail(email, subject, body);
};

// Reset login attempts
const resetLoginAttempts = async (userId) => {
    await query(
        `UPDATE svgr.adminuser SET attempts = 0, attemptedAt = NULL WHERE id = ?`,
        [userId]
    );
};

// Increment login attempts
const incrementLoginAttempts = async (userId) => {
    await query(
        `UPDATE svgr.adminuser SET attempts = attempts + 1, attemptedAt = ? WHERE id = ?`,
        [moment().tz("America/New_York").format(), userId]
    );
};

// Update email status
const updateEmailStatus = async (userId, status) => {
    await query(
        `UPDATE svgr.adminuser SET emailStatus = ? WHERE id = ?`,
        [status, userId]
    );
};

// Handle successful login
const handleSuccessfulLogin = async (user, res) => {
    const newToken = jwt.sign(
        { userId: user.id, email: user.email, roleId: user.roleId },
        'secret',
        { expiresIn: '24h' }
    );

    const tokenExpiry = jwt.decode(newToken).exp;

    await query(
        `UPDATE svgr.adminuser SET accessToken = ?, attempts = 0, attemptedAt = NULL WHERE id = ?`,
        [newToken, user.id]
    );

    let userRole = await queryDB.queryPromise("SELECT * from svgr.adminrole where id = '"+user.roleId+"'");

    const resObj = {
        id: user.id,
        userName: user.userName,
        accessToken: newToken,
        roleId: user.roleId,
        role: userRole[0].role,
        email: user.email,
        bio: user.bio,
        permissions: user.permissions,
        tokenExpiry,
        createdAt: user.createdAt,
    };

    return sendSuccess(res, resObj, "Login Successful");
};


//Forgot Password
const getAdminOTP = async (req, res) => {

    const { email } = req.body;

    let SQL = "SELECT * FROM svgr.adminuser where email='" + email + "'";

    await queryDB.queryPromise(SQL, async (err, result, fields) => {

        if(err){

            sendError(res, "Unknown Error Occured!");

        } else {

            if (result.length > 0) {

                // Generate a 4-digit OTP
                var otp = Math.floor(1000 + Math.random() * 9000);  // Generates a 4-digit OTP

                // Send email with the OTP for account verification
                const emailSubject = 'Dashboard Password Reset';
                const emailBody = `
                    <p>Hello ${email},</p>
                    <p>You are the member of our Scavenger Community. Please enter the OTP below to continue using the Dashboard:</p>
                    <h1><strong>${otp}</strong></h1>
                    <p>If you did not request this change, please ignore this email.</p>
                    <p>Thank you,</p>
                    <p>The Scavenger Team</p>
                `;

                await sendEmail(email, emailSubject, emailBody);

                await queryDB.queryPromise("UPDATE svgr.adminuser set otp='"+ otp +"', otpExpiration='"+ moment().tz("America/New_York").format() +"' where email='"+ email +"'");

                sendSuccess(res, null, "Verification OTP has been sent to your email address!");


            } else {
                sendError(res, "Email doesn't Exist!");
            }

        }

    });

}


const verifyAdminOTP = async (req, res) => {

    const { otp, email } = req.body;

    let SQL = "SELECT * FROM svgr.adminuser where email='" + email + "' and otp='" + otp + "'";

    await queryDB.queryPromise(SQL, async (err, result, fields) => {

        if(err){

            sendError(res, "Unknown Error Occured!");

        } else {

            if (result.length > 0) {

                if (moment().tz("America/New_York").isAfter(moment(result[0].otpExpiration).add(1, 'minutes'))) {

                    sendError(res, "OTP Expired!");

                }
                 else {

                    var singleRecordArray = { 'userId': result[0].id, 'email': email, 'signupType': result[0].signupType, 'token': result[0].accessToken, 'tokenExpiry': result[0].tokenExpiry, 'createdAt': result[0].creationDate };
 
                    sendSuccess(res, singleRecordArray, "OTP Verified!");

                }

            } else {

                sendError(res, "Invalid OTP!");

            }

        }

    });

}

//Reset Password
const resetAdminPassword = async (req, res) => {

    let {email, password} = req.body;


    await queryDB.queryPromise(`SELECT * from svgr.adminuser WHERE email='${email}'`, async (err, result, fields) => {
        if(err){
            sendError(res, 'Unknown Error Occured!');
        } else if (result == ''){
            sendError(res, "User do not exist!");
        } else {
            var hashedPassword = await bcrypt.hash(password, 10);
            await queryDB.queryPromise(`UPDATE svgr.adminuser SET password='${hashedPassword}' WHERE email='${email}'`, async (err, result, fields) => {

                if(err){
                    sendError(res, 'Reset Password Failed!');
                } else {
                    sendSuccess(res, null, 'Your password has been successfully updated!');
                }

            });

        }
    });


}

//Account Setup
const accountSetup = async (req, res) => {

    const user = req.user;
    const {userName, password, confirmPassword} = req.body;

    let userExistance = await queryDB.queryPromise("SELECT * from svgr.adminuser where email = '"+user.email+"' AND id = '"+user.userId+"'");
    if(userExistance == ''){
        return sendError(res, "User do not exist!");
    }

    if(password !== confirmPassword){
        return sendError(res, "Passwords don't match");
    }

    // hash the password
    var hashedPassword = await bcrypt.hash(password, 10);

    await queryDB.queryPromise("UPDATE svgr.adminuser set userName='"+userName+"', password='"+hashedPassword+"' where id = '"+user.userId+"'",async (err, result, fields) => {
        if(err){
            sendError(res, "Unknown Error Occured!");
        } else {
            sendSuccess(res, null, "Account is successfully setup!");
        }
    });


}



//User Management
const addUser = async (req, res) => {

    let {userName, email, roleId, permissions, bio} = req.body;


    let userExistance = await queryDB.queryPromise("SELECT * from svgr.adminuser where email = '"+ email +"'");
    if(userExistance.length > 0){
        return sendError(res, "User already exists");
    }

    //empty or not existed checks on values
    bio == '' || !bio ? bio = "" : bio
    permissions == '' || !permissions ? permissions = "" : permissions

    await queryDB.queryPromise(`INSERT into svgr.adminuser (userName, roleId, email, bio, permissions, isActive, createdAt, updatedAt) VALUES ('${userName}', '${roleId}', '${email}', '${bio}', '${permissions}', ${true},'${moment().tz("America/New_York").format()}', '${moment().tz("America/New_York").format()}')`, async (err, result, fields) => {

        if(err){
            return sendError(res, "Add User Failed!");
        } else {

            const newToken = jwt.sign(
                { userId: result.insertId, email: email, roleId: roleId },
                'secret',
                { expiresIn: '24h' }
            );

            let userRole = await queryDB.queryPromise("SELECT role from svgr.adminrole where id = '"+roleId+"'");

            let emailSubject = 'Welcome to the Dashboard Panel';
            let emailBody = `
                    <p>Hello ${email},</p>
                    <p>You are the member of our Scavenger Community now. Please join the platform as a ${userRole[0].role}, Click the following link to Setup your Account:</p>
                    </br>
                    <h3><strong>${`http://localhost:3000/firstLogin?accessToken=${newToken}`}</strong></h3>
                    </br>
                    <p>Thank you,</p>
                    <p>The Scavenger Team</p>
                `;

            await sendEmail(email, emailSubject, emailBody);

            return sendSuccess(res, null, "User Added Successfully!");

        }

    });


}

const usersList = async (req, res) => {

    let user = req.user;
    let { roleId, searchByName, page, limit} = req.query;
    const offset = (page - 1) * limit;
    const limitValue = limit || 10;

    let userExistance = await queryDB.queryPromise("SELECT * from svgr.adminuser where id = '"+user.userId+"'");
    if(userExistance == ''){
        return sendError(res, "User do not exist!");
    }

    let usersList = await queryDB.queryPromise(`SELECT * from svgr.adminuser where roleId = '${roleId}' AND userName LIKE '%${searchByName}%' ORDER BY id DESC LIMIT ${limitValue} OFFSET ${offset}`);
    if(usersList.length == 0){
        return sendSuccess(res, null, "No users found!");
    }else {

        let finalUserList = Promise.all(
            usersList.map(async (user) => {
                try{
                    let userRole = await queryDB.queryPromise("SELECT * from svgr.adminrole where id = '"+user.roleId+"'");
                    return {
                        id : user.id,
                        userName : user.userName,
                        email : user.email,
                        roleId : user.roleId,
                        role : userRole[0].role,
                        bio : user.bio,
                        permissions : user.permissions,
                        isActive : user.isActive == 0 ? false : true,
                        createdAt : user.createdAt,
                        updatedAt : user.updatedAt
                    }
                } catch (error){
                    return null
                }

            })
        );

        // Filter out null values
        const filteredUserList = await finalUserList;

        let roles = await queryDB.queryPromise("SELECT * from svgr.adminrole");

        return sendSuccess(res, {roles, users:filteredUserList}, "Users list fetched successfully!");
    }

}

const editUser = async (req, res) => {

    let user = req.user;
    let { userName, email, bio, permissions } = req.body;

    let userExistance = await queryDB.queryPromise("SELECT * from svgr.adminuser where id = '"+user.userId+"'");
    if(userExistance == ''){
        return sendError(res, "User do not exist!");
    }

    await queryDB.queryPromise("UPDATE svgr.adminuser set userName='"+userName+"', email='"+email+"', bio='"+bio+"', permissions='"+permissions+"' where id = '"+user.userId+"'",async (err, result, fields) => {
        if(err){
            return sendError(res, "Update User Failed!");
        } else {
            return sendSuccess(res, null, "User Updated Successfully!");
        }
    });

}

const deleteUser = async (req, res) => {

    let user = req.user;

    let userExistance = await queryDB.queryPromise("SELECT * from svgr.adminuser where id = '"+user.userId+"'");
    if(userExistance == ''){
        return sendError(res, "User do not exist!");
    }

    await queryDB.queryPromise("DELETE from svgr.adminuser where id = '"+user.userId+"'",async (err, result, fields) => {
        if(err){
            return sendError(res, "Delete User Failed!");
        } else {
        return sendSuccess(res, null, "User Deleted Successfully!");
        }
    });

}

const deactivateUser = async (req, res) => {

    let user = req.user;

    let userExistance = await queryDB.queryPromise("SELECT * from svgr.adminuser where id = '"+user.userId+"'");
    if(userExistance == ''){
        return sendError(res, "User do not exist!");
    }

    if(userExistance[0].isActive == 0){
        await queryDB.queryPromise("UPDATE svgr.adminuser set isActive=true where id = '"+user.userId+"'",async (err, result, fields) => {
            if(err){
                return sendError(res, "Activate User Account Failed!");
            } else {
                return sendSuccess(res, null, "Activated User Account Successfully!");
            }
        });
    } else {
        await queryDB.queryPromise("UPDATE svgr.adminuser set isActive=false where id = '"+user.userId+"'",async (err, result, fields) => {
            if(err){
                return sendError(res, "Deactivate User Failed!");
            } else {
                return sendSuccess(res, null, "User Deactivated Successfully!");
            }
        });
    }

}



module.exports = { addUser, usersList, editUser, deleteUser, deactivateUser, adminLogin, getAdminOTP, verifyAdminOTP, resetAdminPassword, accountSetup };