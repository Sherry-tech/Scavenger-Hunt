const queryDB = require("../../config/db");
const { sendSuccess, sendError } = require('../../utils/response');
let { uploadImage, deleteImage } = require("../../utils/s3Functions");
var moment = require('moment-timezone');


const createRonaldRequest = async (req, res) => {
    const user = req.user;
    const {title, description, status, points, locationId, taskTodo } = req.body;
    let file = req.file;

    let userExisted = await queryDB.queryPromise("SELECT * from svgr.adminuser where id='"+user.userId+"'");
    if(userExisted == '') {
        return sendError(res, "User doesn't exist");
    }

    let imageURL = null;
    if(file) {
        try{
            imageURL = await uploadImage(file, "ronaldRequestImages");
        } catch(err) {
            return sendError(res, "Failed to upload image");
        }
    }

    let createRonaldRequest = await queryDB.queryPromise("INSERT into svgr.ronaldrequest (title, description, status, points, ronaldRequestImage, locationId, taskToDo, createdAt, updatedAt) VALUES ('"+title+"', '"+description+"', '"+status+"', '"+points+"', '"+imageURL+"', '"+locationId+"', '"+taskTodo+"', '"+moment().tz("America/New_York").format()+"', '"+moment().tz("America/New_York").format()+"')");
    if(createRonaldRequest.affectedRows == 1) {

        let locations = await queryDB.queryPromise(`SELECT id,name from svgr.location where id IN (${locationId})`);

        let id = createRonaldRequest.insertId;
        return sendSuccess(res, {id, title, description, status: parseInt(status), points: parseInt(points), ronaldRequestImage: imageURL, locations, taskTodo }, "Create Ronald Request Successfully!");
    } else {
        return sendError(res, "Failed to create Ronald Request");
    }

}


const editRonaldRequest = async (req, res) => {

    const user = req.user;
    const {id, title, description, status, points, locationId, taskTodo } = req.body;
    let file = req.file;

    let userExisted = await queryDB.queryPromise("SELECT * from svgr.adminuser where id='"+user.userId+"'");
    if(userExisted == '') {
        return sendError(res, "User doesn't exist");
    }

    let ronalRequestCheck = await queryDB.queryPromise("SELECT * from svgr.ronaldrequest where id='"+id+"'");
    if(ronalRequestCheck == '') {
        return sendError(res, "Ronald Request doesn't exist");
    }

    let imageURL = ronalRequestCheck[0].ronaldRequestImage || null;
    if(file){

        try{
            let imageKey = ronalRequestCheck[0].ronaldRequestImage.split('/').pop();
            imageKey = `ronaldRequestImages/${imageKey}`;
            await deleteImage(imageKey);

            imageURL = await uploadImage(file, "ronaldRequestImages");
        } catch (error) {
            return sendError(res, "Failed to upload image");
        }

    }

    let updateRonaldRequest = await queryDB.queryPromise("UPDATE svgr.ronaldrequest set title=?, description=?, status=?, points=?, ronaldRequestImage=?, locationId=?, taskToDo=? where id=?",[title, description, status, points, imageURL, locationId, taskTodo, id]);
    
    if(updateRonaldRequest.affectedRows == 1) {

        let locations = await queryDB.queryPromise(`SELECT id,name from svgr.location where id IN (${locationId})`);
        return sendSuccess(res, {id: parseInt(id), title, description, status: parseInt(status), points: parseInt(points), ronaldRequestImage: imageURL, locations, taskTodo }, "Update Ronald Request Successfully!");
    
    } else {

        return sendError(res, "Failed to update Ronald Request");
    
    }

}


const deleteRonaldRequest = async (req, res) => {

    const user = req.user;
    const {id} = req.query;

    let userExisted = await queryDB.queryPromise("SELECT * from svgr.adminuser where id='"+user.userId+"'");
    if(userExisted == '') {
        return sendError(res, "User doesn't exist");
    }

    let ronalRequestCheck = await queryDB.queryPromise("SELECT * from svgr.ronaldrequest where id='"+id+"'");
    if(ronalRequestCheck == '') {
        return sendError(res, "Ronald Request doesn't exist");
    }

    if(ronalRequestCheck[0].ronaldRequestImage) {
        let imageKey = ronalRequestCheck[0].ronaldRequestImage.split('/').pop();
        imageKey = `ronaldRequestImages/${imageKey}`;
        await deleteImage(imageKey);
    }

    let deleteRonaldRequest = await queryDB.queryPromise("DELETE from svgr.ronaldrequest where id=?",[id]);
    if(deleteRonaldRequest.affectedRows == 1) {
        return sendSuccess(res, {id: parseInt(id)}, "Delete Ronald Request Successfully!");
    } else {
        return sendError(res, "Failed to delete Ronald Request");
    }

}


const ronaldRequestList = async (req, res) => {

    const user = req.user;
    const {page, limit, title} = req.query;
    const offset = (page - 1) * limit;
    const limitValue = limit || 10;

    let userExisted = await queryDB.queryPromise("SELECT * from svgr.adminuser where id='"+user.userId+"'");
    if(userExisted == '') {
        return sendError(res, "User doesn't exist");    
    }

    let titleSearch = title ? `and ronaldrequest.title like '%${title}%'` : ``;

    let query = `SELECT * from svgr.ronaldrequest where 1=1 ${titleSearch} order by id desc limit ${limitValue} offset ${offset}`;

    let result = await queryDB.queryPromise(query);

    if(result.length > 0) {
    
        // let totalPage = Math.ceil(totalRonaldRequest / limitValue);

        let ronaldRequestList = await Promise.all(result.map(async (r) => {
            let locationNames = await queryDB.queryPromise(`SELECT id, name FROM svgr.location WHERE id IN (${r.locationId})`);
            return {
                id: r.id,
                title: r.title,
                description: r.description,
                status: r.status,
                points: r.points,
                ronaldRequestImage: r.ronaldRequestImage,
                taskTodo: r.taskToDo,
                locations: locationNames,
                createdAt: r.createdAt,
                updatedAt: r.updatedAt
            };
        }));
        
        
        return sendSuccess(res, ronaldRequestList, "Ronald Request fetched Successfully!");
    
    } else {
        return sendSuccess(res, [], "Ronald Request fetched Successfully!");
    }

}

module.exports = { createRonaldRequest, editRonaldRequest, deleteRonaldRequest, ronaldRequestList }

