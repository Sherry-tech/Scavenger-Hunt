const queryDB = require("../../config/db");
const { sendSuccess, sendError } = require('../../utils/response');
const sendEmail = require('../../utils/sendEmail');
const { uploadImage, deleteImage } = require("../../utils/s3Functions");
var moment = require('moment-timezone');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const createHunt = async (req, res) => {

    const user = req.user;
    let {title, description, startDate, endDate, county, huntImage, mode, status, locationIds, accessCode, accessCodeDescription, gameType, huntType} = req.body;
    let file = req.file;

    accessCode == '' || !accessCode ? accessCode = null : accessCode
    accessCodeDescription == '' || !accessCodeDescription ? accessCodeDescription = "" : accessCodeDescription
    gameType == '' || !gameType ? gameType = "" : gameType

    let imageURL = huntImage || null;
    if(file){
        try{
            imageURL = await uploadImage(file, "huntImages");
        }catch (err){
            return sendError(res, "Failed to upload image");
        }
    }

    await queryDB.queryPromise("INSERT into svgr.hunt (title, description, startDate, endDate, county, huntImage, mode, status, accessCode, accessCodeDescription, gameType, huntType, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [title, description, startDate, endDate, county, imageURL, mode, status, accessCode, accessCodeDescription, gameType, huntType, moment().tz("America/New_York").format(), moment().tz("America/New_York").format()], async (err, result, fields) => {
        if(err){
            sendError(res, "Unknown Error Occured!");
        } else {

            let huntId = result.insertId;

            const insertHuntLocation = async (huntId, locationIds) => {
                try {
                    const insertQueries = locationIds.split(',').map(locationId => {
                        const query = "INSERT INTO svgr.huntlocation (huntId, locationId, createdAt) VALUES (?, ?, ?)";
                        return queryDB.queryPromise(query, [huntId, locationId, moment().tz("America/New_York").format()]);
                    });
            
                    // Use Promise.all to ensure all inserts complete before proceeding
                    await Promise.all(insertQueries);
                    console.log('All locations inserted successfully');
                } catch (error) {
                    return
                }
            };

            insertHuntLocation(huntId,locationIds);

            
            sendSuccess(res, {'id': result.insertId, 'title':title, 'description': description, 'startDate': startDate, 'endDate': endDate, 'county': county, 'huntImage':imageURL, 'mode': mode, 'status': status, 'accessCode': accessCode, 'accessCodeDescription': accessCodeDescription, 'gameType': gameType, 'huntType': huntType, 'createdAt': moment().tz("America/New_York"), 'updatedAt': moment().tz("America/New_York")}, "Hunt is created successfully!");

        }
    });

}


const huntList = async (req, res) => {

    const user = req.user;
    const { searchByName, page, limit } = req.query;
    const offset = (page - 1) * limit;
    const limitValue = limit || 10;


    // Check if user exists
    let userExistance = await queryDB.queryPromise(`SELECT * from svgr.adminuser where id='${user.userId}'`);
    if (userExistance.length === 0) {
        return sendError(res, "User doesn't exist");
    }

    await queryDB.queryPromise(`SELECT * from svgr.hunt WHERE title LIKE '%${searchByName}%' ORDER BY id DESC LIMIT ${limitValue} OFFSET ${offset}`, async (err, result, fields) => {
        if(err){
            sendError(res, "Unknown Error Occured!");
        } else {

            let finalResult = result.map(async (h) => {

                let huntLocations = await queryDB.queryPromise(`SELECT l.* from svgr.location as l JOIN svgr.huntlocation as hl ON l.id = hl.locationId where hl.huntId = ${h.id}`);
                let noParticipants = await queryDB.queryPromise(`SELECT COUNT(id) from svgr.userhuntlocation where huntId = ${h.id}`);

                let resObj = {
                    'id': h.id,
                    'title': h.title,
                    'description': h.description,
                    'startDate': h.startDate,
                    'endDate': h.endDate,
                    'county': h.county,
                    'huntImage':h.huntImage,
                    'mode': h.mode,
                    'status': h.status,
                    'accessCode': h.accessCode,
                    'accessCodeDescription': h.accessCodeDescription,
                    'gameType': h.gameType,
                    'huntType': h.huntType,
                    'noParticipants': noParticipants[0]['COUNT(id)'],
                    'createdAt': h.createdAt,
                    'updatedAt': h.updatedAt,
                    'locations': huntLocations
                }

                return resObj

            });

            sendSuccess(res, await Promise.all(finalResult), "Hunts fetched Successfully!");
            
        }
    });

}


const editHunt = async (req, res) => {

    let user = req.user;
    let {id, title, description, startDate, endDate, county, mode, status, accessCode, accessCodeDescription, gameType, huntType} = req.body;
    let file = req.file;

    let huntCheck = await queryDB.queryPromise("SELECT * from svgr.hunt where id='"+ id +"'");
    if(huntCheck == ''){
        return sendError(res, "Hunt Not Found");
    }

    let imageURL = huntCheck[0].huntImage || null;
    if(file){
        try{

            let imageKey = huntCheck[0].huntImage.split('/').pop();
            imageKey = `huntImages/${imageKey}`;
            await deleteImage(imageKey);

            let fileURL = await uploadImage(file, "huntImages");
            imageURL = fileURL;
        }catch(err){
            return sendError(res, "Failed to upload image");
        }
    }

    await queryDB.queryPromise("UPDATE svgr.hunt set title=?, description=?, startDate=?, endDate=?, county=?, huntImage=?, mode=?, status=?, accessCode=?, accessCodeDescription=?, gameType=?, huntType=?, updatedAt=? WHERE id=?", [title, description, startDate, endDate, county, imageURL, mode, status, accessCode, accessCodeDescription, gameType, huntType, moment().tz("America/New_York").format(), id], async (err, result, fields) => {
        if(err){
            sendError(res, "Unknown Error Occured!");
        } else {
            sendSuccess(res, {'id':parseInt(id), title, description, startDate, endDate, county, imageURL, mode: parseInt(mode), status, 'accessCode':parseInt(accessCode), accessCodeDescription, 'gameType':parseInt(gameType), 'huntType':parseInt(huntType), 'updatedAt': moment().tz("America/New_York")}, "Hunt is updated successfully!");
        }
    });

}


const addRemoveLocation = async (req, res) => {

    let user = req.user;
    let {huntId, locationId} = req.body;

    let huntCheck = await queryDB.queryPromise("SELECT * from svgr.hunt where id='"+ huntId +"'");
    if(huntCheck == ''){
        return sendError(res, "Hunt Not Found");
    }

    let locationCheck = await queryDB.queryPromise("SELECT * from svgr.location where id='"+ locationId +"'");
    if(locationCheck == ''){
        return sendError(res, "Location Not Found");
    }

    let huntLocationCheck = await queryDB.queryPromise("SELECT * from svgr.huntlocation where huntId='" + huntId + "' AND locationId='" + locationId + "'");
    if(huntLocationCheck == ''){

        await queryDB.queryPromise("INSERT into svgr.huntlocation (huntId, locationId, createdAt) VALUES ('"+ huntId +"', '"+ locationId +"', '"+ moment().tz("America/New_York").format() +"')", async (err, result, fields) => {
            if(err){
                sendError(res, "Unknown Error Occured!");
            } else {
                sendSuccess(res, {huntId, locationId}, "Location added successfully!");
            }
        });
    
    } else {

        await queryDB.queryPromise("DELETE from svgr.huntlocation where huntId='" + huntId + "' AND locationId='" + locationId + "'", async (err, result, fields) => {
            if(err){
            sendError(res, "Unknown Error Occured!");
            } else {
                sendSuccess(res, null, "Location removed successfully!");
            }
        });
    
    }

}


const deleteHunt = async (req, res) => {

    let user = req.user;
    let {huntId} = req.query;

    let huntCheck = await queryDB.queryPromise("SELECT * from svgr.hunt where id='"+ huntId +"'");
    if(huntCheck == ''){
        return sendError(res, "Hunt Not Found");
    }

    let huntImage = huntCheck[0].huntImage;
    if(huntImage != null && huntImage != '') {
        let imageKey = huntImage.split('/').pop();
        imageKey = `huntImages/${imageKey}`;
        await deleteImage(imageKey);
    }

    await queryDB.queryPromise("DELETE from svgr.hunt where id='"+ huntId +"'", async (err, result, fields) => {
        if(err){
            sendError(res, "Unknown Error Occured!");
        } else {
            sendSuccess(res, null, "Hunt deleted successfully!");
        }
    });

}

const huntLocationList = async (req, res) => {

    let user = req.user;

    // Check if user exists
    let userExistance = await queryDB.queryPromise(`SELECT * from svgr.adminuser where id='${user.userId}'`);
    if (userExistance.length === 0) {
        return sendError(res, "User doesn't exist");
    }

    let locations = await queryDB.queryPromise("SELECT id,name from svgr.location");

    return sendSuccess(res, locations, "Locations fetched successfully!");

}



module.exports = { createHunt, huntList, editHunt, addRemoveLocation, deleteHunt, huntLocationList };