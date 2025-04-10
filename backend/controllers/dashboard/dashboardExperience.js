const queryDB = require("../../config/db");
const { sendSuccess, sendError } = require('../../utils/response');
var moment = require('moment-timezone');
let { uploadImage, deleteImage } = require("../../utils/s3Functions");


const addExperience = async (req, res) => {

    const { user } = req;
    const { title, description, experienceImage, type, status, associatedLocations } = req.body;
    const file = req.file;

    try {
        // Validate user existence
        const userExistance = await queryDB.queryPromise(
            "SELECT * FROM svgr.adminuser WHERE id = ?",
            [user.userId]
        );

        if (!userExistance.length) {
            return sendError(res, "User doesn't exist");
        }

        // Upload image if provided
        let uploadedImageUrl = experienceImage || null;
        if (file) {
            try {
                uploadedImageUrl = await uploadImage(file, "experienceImages");
            } catch (err) {
                return sendError(res, "Failed to upload image");
            }
        }

        // Insert experience into the database
        const insertExperienceQuery = `
            INSERT INTO svgr.experience
            (title, description, type, status, experienceImage, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const currentTime = moment().tz('America/New_York').format();
        const experienceResult = await queryDB.queryPromise(insertExperienceQuery, [
            title,
            description,
            type,
            status,
            uploadedImageUrl,
            currentTime,
            currentTime,
        ]);

        const experienceId = experienceResult.insertId;

        // Insert associated locations
        const locationIds = associatedLocations ? associatedLocations.split(',') : [];
        const locationPromises = locationIds.map((locationId) =>
            queryDB.queryPromise(
                "INSERT INTO svgr.locationexperience (experienceId, locationId, createdAt) VALUES (?, ?, ?)",
                [experienceId, locationId, currentTime]
            )
        );

        await Promise.all(locationPromises);

        // Send success response
        return sendSuccess(res, null, "Experience added successfully");
    } catch (err) {
        return sendError(res, "Failed to add experience");
    }

};


const editExperience = async (req, res) => {

    let user = req.user;
    const { id, title, description, type, status } = req.body;
    let file = req.file;

    let experienceExisted = await queryDB.queryPromise("SELECT * from svgr.experience where id='"+id+"'");
    if(experienceExisted == '') {
        return sendError(res, "Experience doesn't exist");
    }

    let userExisted = await queryDB.queryPromise("SELECT * from svgr.adminuser where id='"+user.userId+"'");
    if(userExisted == '') {
        return sendError(res, "User doesn't exist");
    }

    let imageURL = experienceExisted[0].experienceImage || null;
    if(file){
        try{

            if(imageURL !== null){
                let imageKey = experienceExisted[0].experienceImage.split('/').pop();
                imageKey = `experienceImages/${imageKey}`;
                await deleteImage(imageKey);
            }

            imageURL = await uploadImage(file, "experienceImages");
        }catch(err){
            return sendError(res, "Failed to upload image");
        }
    }

    let updateQuery = "UPDATE svgr.experience set title=?, description=?, experienceImage=?, type=?, status=?, updatedAt=? where id=?";
    await queryDB.queryPromise(updateQuery, [title, description, imageURL, type, status, moment().tz("America/New_York").format(), id], async (err, result, fields) => {
        if (err) {
            return sendError(res, "Unknown Error Occured");
        } else {
            return sendSuccess(res, null, "Experience updated successfully!");
        }
    });

}

const experienceList = async (req, res) => {
    try {
        let user = req.user;
        const { searchByName, page, limit } = req.query;
        const offset = (page - 1) * limit;
        const limitValue = limit || 10;

        // Check if user exists
        let userExistance = await queryDB.queryPromise(`SELECT * from svgr.adminuser where id='${user.userId}'`);
        if (userExistance.length === 0) {
            return sendError(res, "User doesn't exist");
        }

        // Fetch all experiences
        let experienceList = await queryDB.queryPromise(`SELECT * from svgr.experience WHERE title LIKE '%${searchByName}%' ORDER BY createdAt DESC LIMIT ${limitValue} OFFSET ${offset}`);
        if (experienceList.length === 0) {
            return sendSuccess(res, null, "No experiences found");
        }

        // Collect experience locations
        let experienceWithLocations = await Promise.all(
            experienceList.map(async (experience) => {
                let experienceId = experience.id;

                let experienceLocation = await queryDB.queryPromise(
                    `SELECT l.* from svgr.locationexperience as le JOIN svgr.location as l ON le.locationId=l.id where le.experienceId='${experienceId}'`
                );

                return {
                    ...experience,
                    locations: experienceLocation,
                };
            })
        );

        // Send response with the list of experiences and their locations
        return sendSuccess(res, experienceWithLocations, "Experiences and their locations retrieved successfully");

    } catch (error) {
        console.error(error);
        return sendError(res, "An error occurred while fetching experiences");
    }
};


const deleteExperience = async (req, res) => {

    let user = req.user;
    let { experienceId } = req.query;

    let userExisted = await queryDB.queryPromise("SELECT * from svgr.adminuser where id='"+user.userId+"'");
    if(userExisted == '') {
        return sendError(res, "User doesn't exist");
    }

    let experienceExisted = await queryDB.queryPromise("SELECT * from svgr.experience where id='"+experienceId+"'");
    if(experienceExisted == '') {
        return sendError(res, "Experience doesn't exist");
    }

    let experienceImage = experienceExisted[0].experienceImage;
    if(experienceImage != null || experienceImage != '') {
        let imageKey = experienceImage.split('/').pop();
        imageKey = `experienceImages/${imageKey}`;
        await deleteImage(imageKey);
    }

    let deleteExperience = await queryDB.queryPromise("DELETE from svgr.experience where id='"+experienceId+"'");
    if(deleteExperience.affectedRows == 1) {
        return sendSuccess(res, null, "Experience deleted successfully!");
    } else {
        return sendError(res, "Experience deleted failed!");
    }

}


const experienceLocationsDropDown = async (req, res) => {
    
    //check if the location isn't already associated with the experience already
    let locations = await queryDB.queryPromise(`
        SELECT l.id, l.name
        FROM svgr.location AS l
        LEFT JOIN svgr.locationexperience AS le
        ON l.id = le.locationId
        WHERE le.locationId IS NULL`);

    if(locations.length == 0) {
        return sendSuccess(res, [], "Locations fetched successfully!");
    } else {
        return sendSuccess(res, locations, "Locations fetched successfully!");
    }

}


module.exports = { addExperience, editExperience, experienceList, deleteExperience, experienceLocationsDropDown };