const queryDB = require("../../config/db");
const { sendSuccess, sendError } = require('../../utils/response');
const { uploadImage, deleteImage } = require("../../utils/s3Functions");
var moment = require('moment-timezone');


const userRonaldRequestList = async (req, res) => {

    const user = req.user;

    let query = `SELECT * from svgr.ronaldrequest`;

    let result = await queryDB.queryPromise(query);
    
    if(result.length > 0) {
    
        let ronaldRequestList = await Promise.all(result.map(async (r) => {

            let isSubmitted;
            let submittedCheck = await queryDB.queryPromise("SELECT * from svgr.userronaldrequest where userId='"+user.userId+"'AND ronaldRequestId='"+r.id+"'");

            if(submittedCheck.length > 0) {
                isSubmitted = true;
            } else {
                isSubmitted = false;
            }

            return {
                id: r.id,
                title: r.title,
                description: r.description,
                status: r.status,
                points: r.points,
                ronaldRequestImage: r.ronaldRequestImage,
                taskTodo: r.taskToDo,
                isSubmitted: isSubmitted,
                requestImage: submittedCheck.length > 0 ? submittedCheck[0].requestImage : null,
                requestStatus: submittedCheck.length > 0 ? submittedCheck[0].requestStatus : null,
                rejectionNote: submittedCheck.length > 0 ? submittedCheck[0].rejectionNote : null,
                createdAt: submittedCheck.length > 0 ? submittedCheck[0].createdAt : null,
                updatedAt: submittedCheck.length > 0 ? submittedCheck[0].updatedAt : null
            }
        }));

        return sendSuccess(res, ronaldRequestList, "Ronald Request fetched successfully!");

    } else {
        return sendSuccess(res, [], "Ronald Request fetched successfully!");
    }

}


const submitRonaldRequest = async (req, res) => {

    const user = req.user;
    let ronaldRequestId = req.body.ronaldRequestId;
    let file = req.file;

    let userExisted = await queryDB.queryPromise("SELECT * from svgr.adminuser where id='"+user.userId+"'");
    if(userExisted == '') {
        return sendError(res, "User doesn't exist");
    }

    let ronaldRequestExisted = await queryDB.queryPromise("SELECT * from svgr.ronaldrequest where id='"+ronaldRequestId+"'");
    if(ronaldRequestExisted == '') {
        return sendError(res, "Ronald Request doesn't exist");
    }

    //upload image
    let imageURL = null;
    if(file){
        try{
            imageURL = await uploadImage(file, "submitRequestImage");
        }catch (err){
            return sendError(res, "Failed to upload image");
        }
    }

    let userRequestSubmitted = await queryDB.queryPromise("SELECT * from svgr.userronaldrequest where userId='"+user.userId+"' AND ronaldRequestId='"+ronaldRequestId+"'");
    if(userRequestSubmitted.length > 0) {
    
        //delete old image
        let imageKey = userRequestSubmitted[0].requestImage.split('/').pop();
        imageKey = `submitRequestImage/${imageKey}`;
        await deleteImage(imageKey);

        //update with new image
        let updateSubmitRequest = await queryDB.queryPromise("UPDATE svgr.userronaldrequest SET requestImage='"+imageURL+"', rejectionNote=null, requestStatus=null, updatedAt='"+moment().tz("America/New_York").format()+"' WHERE userId='"+user.userId+"' AND ronaldRequestId='"+ronaldRequestId+"'");
        if(updateSubmitRequest.affectedRows == 1) {
            return sendSuccess(res, null, "Submit ronald request successfully");
        } else {
            return sendError(res, "Failed to submit ronald request");
        }

    } else {

        let addSubmitRequest = await queryDB.queryPromise("INSERT INTO svgr.userronaldrequest (userId, ronaldRequestId, requestImage, createdAt, updatedAt) VALUES ('"+user.userId+"', '"+ronaldRequestId+"', '"+imageURL+"', '"+moment().tz("America/New_York").format()+"', '"+moment().tz("America/New_York").format()+"')");
        if(addSubmitRequest.affectedRows == 1) {
            return sendSuccess(res, null, "Submit ronald request successfully");
        } else {
            return sendError(res, "Failed to submit ronald request");
        }

    }

}


module.exports = { userRonaldRequestList, submitRonaldRequest }