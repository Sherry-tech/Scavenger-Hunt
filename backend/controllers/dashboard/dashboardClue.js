const queryDB = require("../../config/db");
const { sendSuccess, sendError } = require('../../utils/response');
var moment = require('moment-timezone');



const cluesList = async (req, res) => {

    try{

        const user = req.user;
        const { searchName, page, limit } = req.query;
        const offset = (page - 1) * limit;
        const limitValue = limit || 10;
        
        const query = `SELECT lc.id, lc.clue, lc.points, lc.hint, l.id as locationId, l.name as locationName, lc.createdAt, lc.updatedAt FROM svgr.locationclue AS lc JOIN svgr.location AS l ON lc.locationId = l.id WHERE lc.clue LIKE '%${searchName}%' ORDER BY lc.createdAt DESC LIMIT ${limitValue} OFFSET ${offset}`;
        
        const result = await queryDB.queryPromise(query, [user.userId, limitValue, offset]);
        
        const total = await queryDB.queryPromise(`SELECT COUNT(*) as count FROM svgr.locationclue`);
        const totalClues = total[0].count;
        const totalPage = Math.ceil(totalClues / limitValue);

        if (result.length > 0) {
            return sendSuccess(res, { result, totalPage }, "Clues fetched successfully!");
        }  else {
            return sendSuccess(res, [], "Clues fetched successfully!");
        }

    }catch (err){
        return sendError(res, "Unknown Error Occured!");
    }

}

const addClue = async (req, res) => {
    
    try {

        const user = req.user;
        const {clue, points, hint, locationId} = req.body;

        const userExistance = await queryDB.queryPromise("SELECT * from svgr.adminuser where id='"+ user.userId +"'");
        if(userExistance == '') {
            return sendError(res, "User doesn't exist");
        }

        const insertQuery = "INSERT INTO svgr.locationclue (clue, points, hint, locationId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)";
        await queryDB.queryPromise(insertQuery, [clue, points, hint, locationId, moment().tz("America/New_York").format(), moment().tz("America/New_York").format()], async (err, result, fields) => {
            if (err) {
                return sendError(res, "Add Clue Failed!");
            } else {
                return sendSuccess(res, null, "Clue added successfully");
            }
        });

    } catch (error) {
        return sendError(res, "Unknown Error Occured");
    }

}

const editClue = async (req, res) => {

    try {

        const user = req.user;
        const {clue, points, hint, locationId, id} = req.body;

        const userExistance = await queryDB.queryPromise("SELECT * from svgr.adminuser where id='"+ user.userId +"'");
        if(userExistance == '') {
            return sendError(res, "User doesn't exist");
        }

        const updateQuery = "UPDATE svgr.locationclue set clue=?, points=?, hint=?, locationId=?, updatedAt=? where id=?";
        await queryDB.queryPromise(updateQuery, [clue, points, hint, locationId, moment().tz("America/New_York").format(), id], async (err, result, fields) => {
            if (err) {
                return sendError(res, "Update Clue Failed!");
            } else {
                return sendSuccess(res, null, "Clue updated successfully");
            }
        });

    } catch (err){
        return sendError(res, "Unknown Error Occured!");
    }

}

const clueLocationsDropDown = async (req, res) => {
    
    let locations = await queryDB.queryPromise(`
        SELECT l.id, l.name
        FROM svgr.location AS l
        LEFT JOIN svgr.locationclue AS lc
        ON l.id = lc.locationId
        WHERE lc.locationId IS NULL`);

    if(locations.length == 0) {
        return sendSuccess(res, [], "Locations fetched successfully!");
    } else {
        return sendSuccess(res, locations, "Locations fetched successfully!");
    }

}


module.exports = { cluesList, addClue, editClue, clueLocationsDropDown };