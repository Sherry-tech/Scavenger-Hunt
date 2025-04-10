const jwt = require('jsonwebtoken');
const queryDB = require("../../config/db");
const { sendSuccess, sendError } = require('../../utils/response');
const sendEmail = require('../../utils/sendEmail');
let { uploadImage, deleteImage } = require("../../utils/s3Functions");
var moment = require('moment-timezone');


const userSignup = async (req, res) => {

    const { email, password, signupType, userToken} = req.body;
    let SQL;

    if(signupType == 3000){

      var decodedJwt = jwt.decode(userToken);
      var userIdentifier = decodedJwt.sub;
      var userEmail = decodedJwt.email;
      
      if (userEmail == '' || userEmail == null) {
        SQL = "SELECT * FROM svgr.users where `userIdentifier`='" + userIdentifier + "'";
      }
      else {
        SQL = "SELECT * FROM svgr.users where email='" + userEmail + "' OR `userIdentifier`='" + userIdentifier + "'";
      }

    } else {
        SQL = "SELECT * FROM svgr.users where email='" + email + "'";
    }

    await queryDB.queryPromise(SQL, async (err, result, fields) => {

        if(err){

            sendError(res, "Unknown Error Occured!");
        
        } else if (result.length > 0) {

            if (result[0].appleToken != null) {

                return sendError(res, "Already Registered with Apple", 409, { signupType: 3000 });
            
            }
            else if (result[0].googleToken != null) {
            
                return sendError(res, "Already Registered with Google", 409, { signupType: 2000 });

            }
            else {
            
                return sendError(res, "Already Registered with email/password", 409, { signupType: 1000 });

            }

        } else {
            var cTime = moment().tz("America/New_York").format();

            var sql;

            if (req.body.signupType == 1000) {
                sql = "INSERT INTO svgr.`users` (`email`, `password`,`signupType`,`verificationStatus`,`creationDate`) VALUES ('" + email + "','" + password + "',1000, false,'" + cTime + "')"
            }
            else if (req.body.signupType == 2000) {
                sql = "INSERT INTO svgr.`users` (`email`, `googleToken`,`signupType`, `verificationStatus`, `creationDate`) VALUES ('" + email + "','" + userToken + "',2000, true,'" + cTime + "')"
            }
            else if (req.body.signupType == 3000) {

                var decodedJwt = jwt.decode(req.body.userToken);
                var userIdentifier = decodedJwt.sub;

                sql = "INSERT INTO svgr.`users` (`email`, `appleToken`,`signupType`,`userIdentifier`, `verificationStatus`, `creationDate`) VALUES ('" + email + "','" + userToken + "',3000, true,'" + userIdentifier + "','" + cTime + "')"

            }

            await queryDB.queryPromise (sql, async (err, result, fields) => {
                if (err) {
                    sendError(res, "Signup Failed!");
                }

                var userId = result.insertId;

                var expiresIn = req.body.signupType === 1000 || req.body.signupType === 2000 ? '183d' : '24h';
                var token = jwt.sign({
                    'userId': userId,
                    'email': email,
                }, 'secret', { expiresIn: expiresIn });
                var jwtdecodedNew = jwt.decode(token);
                var tokenExpiry = jwtdecodedNew.exp;

                await queryDB.queryPromise("UPDATE svgr.`users` SET `accessToken` ='" + token + "' WHERE (`id`='" + userId + "')");

                let status = signupType === 1000 ? false : true;

                var singleRecordArray = { 'userId': parseFloat(userId), 'email': email, 'signupType': signupType, 'token': token, 'tokenExpiry': tokenExpiry, 'isVerified':status, 'createdAt': cTime };

                sendSuccess(res, singleRecordArray, "User Signup Successfull!");

            });
        }

    });

};

const getOTP = async (req, res) => {

    const { email } = req.body;

    let SQL = "SELECT * FROM svgr.users where email='" + email + "'";

    await queryDB.queryPromise(SQL, async (err, result, fields) => {

        if(err){

            sendError(res, "Unknown Error Occured!");

        } else {

            if (result.length > 0) {

                if(result[0].signupType == 1000){

                    // Generate a 4-digit OTP
                    var otp = Math.floor(1000 + Math.random() * 9000);  // Generates a 4-digit OTP

                    // Send email with the OTP for account verification
                    const emailSubject = 'Account Verification or Password Reset Required';
                    const emailBody = `
                        <p>Hello ${email},</p>
                        <p>You are the member of our Scavenger Community. Please enter the OTP below to continue using the app:</p>
                        <h1><strong>${otp}</strong></h1>
                        <p>If you did not request this change, please ignore this email.</p>
                        <p>Thank you,</p>
                        <p>The Scavenger Team</p>
                    `;

                    await sendEmail(email, emailSubject, emailBody);

                    await queryDB.queryPromise("UPDATE svgr.users set otp='"+ otp +"', otpExpiration='"+ moment().tz("America/New_York").format() +"' where email='"+ email +"'");

                    sendSuccess(res, null, "Verification OTP has been sent to your email address!");

                } else {
                    sendError(res, "You are not eligible for requesting forgot password!");
                }

            } else {
                sendError(res, "Email doesn't Exist!");
            }

        }

    });

}

const verifyOTP = async (req, res) => {

    const { otp, email } = req.body;

    let SQL = "SELECT * FROM svgr.users where email='" + email + "' and otp='" + otp + "'";

    await queryDB.queryPromise(SQL, async (err, result, fields) => {

        if(err){

            sendError(res, "Unknown Error Occured!");

        } else {

            if (result.length > 0) {

                if (moment().tz("America/New_York").isAfter(moment(result[0].otpExpiration).add(1, 'minutes'))) {

                    sendError(res, "OTP Expired!");
                    
                }
                 else {

                    await queryDB.queryPromise("UPDATE svgr.users set verificationStatus=true where email='" + email + "'");

                    let decodedToken = jwt.decode(result[0].accessToken);
                    let tokenExpiry = decodedToken.exp;

                    var singleRecordArray = { 'userId': result[0].id, 'email': email, 'signupType': parseInt(result[0].signupType), 'token': result[0].accessToken, 'tokenExpiry': tokenExpiry, 'isVerified':true, 'createdAt': result[0].creationDate };
                    
                    sendSuccess(res, singleRecordArray, "OTP Verified!");

                }

            } else {

                sendError(res, "Invalid OTP!");

            }

        }

    });

}

const userOnboarding = async (req, res) => {
    const user = req.user;
    const {firstName, lastName, userProfilePicture} = req.body;
    const file = req.file;
    
    const useExistance = await queryDB.queryPromise("SELECT * from svgr.users where id='"+user.userId+"'");
    if(useExistance.length > 0) {

        //join firstName & lastName to make name
        let name = firstName + " " + lastName;

        // Update user profile picture
        let uploadedImageUrl = userProfilePicture || null;
        if (file) {
            try {
                uploadedImageUrl = await uploadImage(file, "userProfilePicture");
            } catch (err) {
                return sendError(res, "Failed to upload image");
            }
        }

        //Update the user
        let updateUser = await queryDB.queryPromise("UPDATE svgr.users SET name = '"+name+"', profilePicture = '"+uploadedImageUrl+"' WHERE id = '"+user.userId+"'");
        if(updateUser.affectedRows == 1) {
            sendSuccess(res, {id: user.userId}, "User updated successfully!");
        } else {
            sendError(res, "Failed to update user!");
        }

    } else {
        sendError(res, "User doesn't exists!");
    }
}

const updateUser = async (req, res) => {

    const user = req.user;
    const {firstName, lastName, userProfilePicture} = req.body;
    const file = req.file;

    if (!firstName && !lastName && !userProfilePicture && !file) {
        return sendError(res, "No body data found!");
    }
    
    const userExistence = await queryDB.queryPromise("SELECT * from svgr.users where id = ?", [user.userId]);
    if (userExistence.length === 0) {
        return sendError(res, "User doesn't exist!");
    }

    const existingUser = userExistence[0];
    const updatedFirstName = firstName || existingUser.firstName;
    const updatedLastName = lastName || existingUser.lastName;
    
    // Handle profile picture update
    let uploadedImageUrl = userProfilePicture;
    if (file) {
        try {
            // Delete existing profile picture if it exists
            if (existingUser.profilePicture) {
                await deleteImage(existingUser.profilePicture);
            }
            
            // Upload new profile picture
            uploadedImageUrl = await uploadImage(file, "userProfilePicture");
        } catch (err) {
            console.error("Image handling error:", err);
            return sendError(res, "Failed to handle profile picture update");
        }
    }

    // Join firstName & lastName to make name
    const name = `${updatedFirstName} ${updatedLastName}`;

    try {
        const updateProfile = await queryDB.queryPromise(
            "UPDATE svgr.users SET name = ?, profilePicture = ? WHERE id = ?",
            [name, uploadedImageUrl, user.userId]
        );

        if (updateProfile.affectedRows === 1) {
            return sendSuccess(res, {id: user.userId}, "Profile updated successfully!");
        } else {
            return sendError(res, "Failed to update profile!");
        }
    } catch (error) {
        console.error("Database error:", error);
        return sendError(res, "Failed to update profile!");
    }
}

const login = async (req, res) => {

    const { email, password, loginType, userToken } = req.body;

    let userIdentifier;

    if(loginType === 3000){
        
      let decodedJwt = jwt.decode(userToken);
      userIdentifier = decodedJwt.sub;

    }

    let SQL = `SELECT * FROM svgr.users WHERE ${loginType === 3000 ? `userIdentifier = '${userIdentifier}'` : `email = '${email}'`}`;


    await queryDB.queryPromise(SQL, async(err, result, fields)=>{
        if(err){
            sendError(res, "NO ACCOUNT FOUND WITH THAT EMAIL.");
        } else {

            var sql;
  
            if(loginType == 1000){
              //Used a Byte-by-Byte Comparison for password case sensitive comaprison
              sql = "SELECT * FROM svgr.users WHERE `email`='" + email + "' AND BINARY(`password`)='" + password + "'"
            }
            else if(loginType == 2000){
              sql = "SELECT * FROM svgr.users WHERE `email`= '"+ email +"' AND googleToken IS NOT NULL"
            }
            else if(loginType == 3000){

              let decodedJwt = jwt.decode(userToken);
              let userIdentifier = decodedJwt.sub;
              sql = "SELECT * FROM svgr.users WHERE userIdentifier = '"+ userIdentifier +"' AND appleToken IS NOT NULL" 
            
            }

            await queryDB.queryPromise(sql, async(err, result, fields)=>{

                if(err) {
                    sendError(res, "Unknown Error Occured!");
                }
                if (result == "" && loginType == 1000) {
                    sendError(res, 'INCORRECT PASSWORD OR EMAIL.');
                }
                else if(result == "" && (loginType == 2000 || loginType == 3000)) {
                    sendError(res, 'NO ACCOUNT FOUND WITH THAT EMAIL.');
                }
                else {

                    var expiresIn = req.body.loginType === 1000 || req.body.loginType === 2000 ? '183d' : '24h';
                    
                    var tokennew = jwt.sign({
                        'userId': result[0].id,
                        'email': result[0].email
                    }, 'secret', { expiresIn: expiresIn });
                    
                    var jwtdecodedNew = jwt.decode(tokennew);
                    var tokenExpiry = jwtdecodedNew.exp;

                    await queryDB.queryPromise("UPDATE svgr.`users` SET `accessToken` ='" + tokennew + "' WHERE (`id`='" + result[0].id + "')");

                    let status = result[0].verificationStatus == 1 ? true : false;

                    var singleRecordArray = { 'userId': result[0].id, 'email': result[0].email, 'signupType': parseInt(result[0].signupType), 'token': tokennew, 'tokenExpiry': tokenExpiry, 'isVerified':status, "createdAt":result[0].creationDate };

                    sendSuccess(res, singleRecordArray, "Login Successful!");

                }

            });

        }
    })

}

const resetPassword = async (req, res) => {

    let {email, password} = req.body;


    await queryDB.queryPromise(`SELECT * from svgr.users WHERE email='${email}'`, async (err, result, fields) => {
        if(err){
            sendError(res, 'Unknown Error Occured!');
        } else if (result == ''){
            sendError(res, "User do not exist!");
        } else {
            
            await queryDB.queryPromise(`UPDATE svgr.users SET password='${password}' WHERE email='${email}'`, async (err, result, fields) => {

                if(err){
                    sendError(res, 'Reset Password Failed!');
                } else {
                    sendSuccess(res, null, 'Your password has been successfully updated!');
                }

            });

        }
    });


}

const refreshToken = async (req, res) => {
    
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1] // Bearer <token>

    let jwtdecoded = jwt.decode(token);
    let userId = jwtdecoded.userId;

    var tokennew = jwt.sign({
        'userId': userId,
        'email': jwtdecoded.email
    }, 'secret', { expiresIn: '24h' });

    var jwtdecodedNew = jwt.decode(tokennew);
    var tokenExpiry = jwtdecodedNew.exp;

    await queryDB.queryPromise("UPDATE svgr.`users` SET `accessToken` ='" + tokennew + "' WHERE (`id`='" + userId + "')");

    sendSuccess(res, { 'token': tokennew, 'tokenExpiry': tokenExpiry }, "Login Successful!");

}

module.exports = { userSignup, getOTP, verifyOTP, userOnboarding, updateUser, login, resetPassword, refreshToken };