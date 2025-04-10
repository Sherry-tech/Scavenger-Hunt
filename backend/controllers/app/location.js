const queryDB = require("../../config/db");
const { sendSuccess, sendError } = require('../../utils/response');
var moment = require('moment-timezone');



const getHuntLocations = async (req, res) => {

    let user = req.user;
    const { huntId } = req.query;

    try {
        const locations = await queryDB.queryPromise(`
            SELECT 
                hl.huntId, 
                hl.locationId AS id, 
                l.name, 
                l.address,
                l.contactNumber,
                l.startDate,
                l.endDate,
                l.city,
                l.lat, 
                l.long, 
                l.description as locationDescription, 
                l.points,
                uhl.status as progressStatus, 
                CASE 
                    WHEN usl.id IS NOT NULL THEN TRUE 
                    ELSE FALSE 
                END AS isFavourite,
                hl.createdAt
            FROM 
                svgr.huntlocation hl
            JOIN 
                svgr.location l ON hl.locationId = l.id
            LEFT JOIN 
                svgr.userhuntlocation uhl 
                ON uhl.locationId = hl.locationId 
                AND uhl.userId = ${user.userId} 
                AND uhl.huntId = ${huntId}
            LEFT JOIN 
                svgr.usersavelocation usl 
                ON usl.locationId = hl.locationId 
                AND usl.userId = ${user.userId}
                AND usl.huntId = ${huntId}
            WHERE 
                hl.huntId = ${huntId}
        `);

        if (!locations || locations.length === 0) {
            return sendSuccess(res, [], "No Locations Found.");
        }

        const enrichedLocations = await Promise.all(
            locations.map(async (location) => {
                // Explicitly convert `isFavourite` to a boolean
                location.isFavourite = Boolean(location.isFavourite);
                location.progressStatus == null ? location.progressStatus = 1001 : location.progressStatus = location.progressStatus;
                const experiences = await queryDB.queryPromise(`
                    SELECT e.* 
                    FROM svgr.experience e
                    JOIN svgr.locationexperience le 
                    ON e.id = le.experienceId 
                    WHERE le.locationId = ${location.id}
                `);

                //Retrieve Hunt Clues
                const clues = await queryDB.queryPromise(`SELECT lc.*, CASE WHEN ulc.id IS NOT NULL THEN true ELSE false END AS isComplete from locationclue as lc LEFT JOIN userlocationclue as ulc ON lc.id = ulc.clueId AND ulc.userId=${user.userId} where lc.locationId=${location.id}`);

                // Convert `isComplete` values to proper booleans in JavaScript
                const processedClues = clues.map(clue => ({
                    ...clue,
                    isComplete: !!clue.isComplete // Ensure proper boolean conversion
                }));

                return {
                    ...location,
                    experiences: experiences || [],
                    clues: processedClues || []
                };
            })
        );

        sendSuccess(res, enrichedLocations, "Locations Fetched Successfully!");
    } catch (error) {
        console.error(error);
        sendError(res, "Unknown Error Occurred!");
    }
};

const locationStatus = async (req, res) => {

    const user = req.user;
    const { huntId, locationId, status, teamMembers } = req.body;


    const huntExistence = await queryDB.queryPromise("SELECT * from svgr.hunt where id='"+ huntId +"'");
    if(huntExistence == ''){
        sendError(res, "Hunt doesn't exist!");
    }

    const locationExistence = await queryDB.queryPromise("SELECT * from svgr.location where id='"+ locationId +"'");
    if(locationExistence == ''){
        sendError(res, "Location doesn't exist!");
    }


    const locationCheck = await queryDB.queryPromise("SELECT * from svgr.userhuntlocation where userId='"+ user.userId +"' AND huntId='"+ huntId +"' AND locationId='"+ locationId +"'");
    
    if(locationCheck == ''){

        await queryDB.queryPromise("INSERT into svgr.userhuntlocation (userId, huntId, locationId, status, teamMembers, createdAt) VALUES ('"+ user.userId +"', '"+ huntId +"', '"+ locationId +"', '"+ status +"', '"+ teamMembers +"','"+moment().tz("America/New_York").format()+"')", async (err, result, fields) => {
            if(err){
                sendError(res, "Hunt Location Started Failed!");
            } else {
                sendSuccess(res, "Hunt Location Started Successfully!");
            }
        });

    } else {

        await queryDB.queryPromise("UPDATE svgr.userhuntlocation SET status='"+ status +"', updatedAt='"+ moment().tz("America/New_York").format() +"' WHERE userId='"+ user.userId +"' AND huntId='"+ huntId +"' AND locationId='"+ locationId +"'", async (err, result, fields) => {
            if(err){
                sendError(res, "Hunt Location Status update failed!");
            } else {
                sendSuccess(res, "Hunt Location Status update successfully!");
            }
        });

    }

}


const saveUnsaveLocation = async (req, res) => {

    const user = req.user;
    const { huntId, locationId } = req.body;

    const huntCheck = await queryDB.queryPromise("SELECT * from svgr.hunt where id='"+ huntId +"'");
    if(huntCheck == ''){
        sendError(res, "Hunt do not exist");
    }

    const locationCheck = await queryDB.queryPromise("SELECT * from svgr.location where id='"+ locationId +"'");
    if(locationCheck == ''){
        sendError(res, "Location do not exist");
    }


    const savedCheck = await queryDB.queryPromise(`SELECT * from svgr.usersavelocation where userId=${user.userId} AND huntId=${huntId} AND locationId=${locationId}`);
    
    if(savedCheck == ''){

        await queryDB.queryPromise("INSERT into svgr.usersavelocation (userId, huntId, locationId) VALUES ('"+ user.userId +"', '"+ huntId +"', '"+ locationId +"')", async (err, result, fields) => {
            if(err){
                sendError(res, "Location saved Failed!");
            } else {
                sendSuccess(res, null, "Location saved successfully!");
            }
        });
    
    } else {

        await queryDB.queryPromise("DELETE from svgr.usersavelocation where userId='"+ user.userId +"' AND huntId='"+ huntId +"' AND locationId='"+ locationId +"'", async (err, result, fields) => {
            if(err){
                sendError(res, "Location remove Failed!");
            } else {
                sendSuccess(res, null, "Location removed successfully!");
            }
        });

    }

}

const locationClueStatus = async (req, res) => {
    
    const user = req.user;
    const { clueId, points, teamId } = req.body;

    const clueExistence = await queryDB.queryPromise("SELECT * from svgr.locationclue where id='"+ clueId +"'");
    if(clueExistence == ''){
        return sendError(res, "Clue doesn't exist!");
    }

    const userExistance = await queryDB.queryPromise("SELECT * from svgr.users where id='"+ user.userId +"'");
    if(userExistance == ''){
        return sendError(res, "User doesn't exist!");
    }

    if(teamId == null || !teamId || teamId == ''){
     
        let userPoints = await queryDB.queryPromise("SELECT points from svgr.users where id='"+ user.userId +"'");

        console.log(userPoints);

        if(userPoints[0].points < points || userPoints[0].points == null || userPoints[0].points == 0) {
            return sendError(res, "Not enough points!");
        } else {
            //decuct points from user
            await queryDB.queryPromise("UPDATE svgr.users SET points=points-"+points+" where id='"+ user.userId +"'",async (err, result, fields) => {
                if(err){
                    return sendError(res, "Points Deduct Failed!");
                } else {
                    await queryDB.queryPromise("INSERT into svgr.userlocationclue (userId, clueId) VALUES ('"+ user.userId +"', '"+ clueId +"')")
                    return sendSuccess(res, null, "Points Deducted Successfully!");
                }
            });
        }
        
    }

}

module.exports = { getHuntLocations, locationStatus, saveUnsaveLocation, locationClueStatus };