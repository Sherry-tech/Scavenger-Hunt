const queryDB = require("../../config/db");
const { sendSuccess, sendError } = require('../../utils/response');
var moment = require('moment-timezone');


const createLocation = async (req, res) => {

    const user = req.user;
    const {name, address, points, description, status, lat, long, city, startDate, endDate, contactNumber, associatedHunts } = req.body;

    let userExisted = await queryDB.queryPromise("SELECT * from svgr.adminuser where id='"+user.userId+"'");
    if(userExisted == '') {
        return sendError(res, "User doesn't exist");
    }


    let locationCreation = await queryDB.queryPromise("INSERT into svgr.location (name, address, points, description, status, lat, `long`, city, startDate, endDate, contactNumber, createdAt, updatedAt) VALUES ('"+name.replace(/'/g, "''")+"', '"+address.replace(/'/g, "''")+"', "+points+", '"+description.replace(/'/g, "''")+"', '"+status+"', "+lat+", "+long+", '"+city+"', '"+startDate+"', '"+endDate+"', '"+contactNumber+"', '"+moment().tz("America/New_York").format()+"', '"+moment().tz("America/New_York").format()+"')");

    if(locationCreation.affectedRows == 1) {

        let locationId = locationCreation.insertId;

        associatedHunts.split(',').map(async (huntId) => {
            await queryDB.queryPromise("INSERT into svgr.huntlocation (huntId, locationId, createdAt) VALUES ('"+huntId+"', '"+locationId+"', '"+moment().tz("America/New_York").format()+"')");
        });

        sendSuccess(res, null, "Create Location Successfully!");

    } else {
        sendError(res, "Create Location Failed!");
    }

}

const huntsDropdown = async (req, res) => {

    const user = req.user;

    let userExisted = await queryDB.queryPromise("SELECT * from svgr.adminuser where id='"+user.userId+"'");
    if(userExisted == '') {
        return sendError(res, "User doesn't exist");
    }

    let hunts = await queryDB.queryPromise("SELECT id, title from svgr.hunt");
    return sendSuccess(res, hunts, "Hunts Dropdown");

}

const locationList = async (req, res) => {

    const user = req.user;
    const { searchByName, page, limit } = req.query;
    const offset = (page - 1) * limit;
    const limitValue = limit || 10;

    // Check if user exists
    const userExisted = await queryDB.queryPromise("SELECT * FROM svgr.adminuser WHERE id = ?", [user.userId]);
    if (userExisted.length === 0) {
        return sendError(res, "User doesn't exist");
    }

    // Define base query for locations
    let locationQuery = `SELECT * FROM svgr.location WHERE name LIKE '%${searchByName}%' ORDER BY id DESC LIMIT ${limitValue} OFFSET ${offset}`;

    // Fetch all (or filtered) locations
    let locationList = await queryDB.queryPromise(locationQuery);

    // Populate each location with hunt details
    await Promise.all(locationList.map(async (location) => {
        // Initialize huntLocations as an array if it doesn't exist
        location.locationHunts = [];

        // Fetch hunt locations for each location
        const locationHunts = await queryDB.queryPromise("SELECT * FROM svgr.huntlocation WHERE locationId = ?", [location.id]);

        // Fetch hunt details for each hunt location
        const huntDetails = await Promise.all(locationHunts.map(async (locationHunt) => {
            const huntDetail = await queryDB.queryPromise("SELECT id, title FROM svgr.hunt WHERE id = ?", [locationHunt.huntId]);
            return huntDetail[0]; // Assuming huntDetail contains a single hunt object
        }));

        location.locationHunts.push(...huntDetails); // Add all hunt details to location
    }));

    return sendSuccess(res, locationList, "Location List");

};

const editLocation = async (req, res) => {

    let user = req.user;
    let { id, name, address, points, description, status, lat, long, city, startDate, endDate, contactNumber } = req.body;

    let userExisted = await queryDB.queryPromise("SELECT * from svgr.adminuser where id='"+user.userId+"'");
    if(userExisted == '') {
        return sendError(res, "User doesn't exist");
    }


    await queryDB.queryPromise("UPDATE svgr.location set name='"+name+"', address='"+address+"', points='"+points+"', description= '"+description+"', status='"+status+"', lat='"+lat+"', `long`='"+long+"', city='"+city+"', startDate='"+startDate+"', endDate='"+endDate+"', contactNumber='"+contactNumber+"', updatedAt='"+moment().tz("America/New_York").format()+"' where id='"+id+"'", (err, result, fields) => {
        if(err){
            return sendError(res, "Update Location Failed!");
        } else {
            return sendSuccess(res, null, "Location Updated");
        }
    });


}


const editLocationHunt = async (req, res) => {

    let user = req.user;
    let huntId = req.body.huntId;
    let locationId = req.body.locationId;

    let userExisted = await queryDB.queryPromise("SELECT * from svgr.adminuser where id='"+user.userId+"'");
    if(userExisted == '') {
        return sendError(res, "User doesn't exist");
    }

    let huntLocationCheck = await queryDB.queryPromise("SELECT * from svgr.huntlocation where huntId='" + huntId + "' AND locationId='" + locationId + "'");
    if(huntLocationCheck == '') {
        
        let addHunt = await queryDB.queryPromise("INSERT into svgr.huntlocation (huntId, locationId, createdAt) VALUES ('"+huntId+"', '"+locationId+"', '"+moment().tz("America/New_York").format()+"')");
        if(addHunt.affectedRows == 1) {
            return sendSuccess(res, null, "Location added successfully!");
        } else {
            return sendError(res, "Unknown Error Occured!");
        }

    } else {

        let removeHunt = await queryDB.queryPromise("DELETE from svgr.huntlocation where huntId='" + huntId + "' AND locationId='" + locationId + "'");
        if(removeHunt.affectedRows == 1) {
            return sendSuccess(res, null, "Location removed successfully!");
        } else {
            return sendError(res, "Unknown Error Occured!");
        }

    }

}

const deleteLocation = async (req, res) => {

    let user = req.user;
    let locationId = req.query.locationId;

    let userExisted = await queryDB.queryPromise("SELECT * from svgr.adminuser where id='"+user.userId+"'");
    if(userExisted == '') {
        return sendError(res, "User doesn't exist");
    }
    let deleteLocation = await queryDB.queryPromise("DELETE from svgr.location where id='"+locationId+"'");
    if(deleteLocation.affectedRows == 1) {
        return sendSuccess(res, null, "Location deleted successfully!");
    } else {
        return sendError(res, "Unknown Error Occured!");
    }

}

module.exports = { createLocation, huntsDropdown, locationList, editLocation, editLocationHunt, deleteLocation };