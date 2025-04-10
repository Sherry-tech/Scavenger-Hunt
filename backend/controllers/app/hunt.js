const queryDB = require("../../config/db");
const { sendSuccess, sendError } = require('../../utils/response');
var moment = require('moment-timezone');



const huntList = async (req, res) => {
    const user = req.user;

    const sqlQuery = `
        SELECT h.*, 
        CASE 
            WHEN ush.id IS NOT NULL THEN TRUE 
            ELSE FALSE 
        END AS saved
        FROM svgr.hunt AS h
        LEFT JOIN svgr.usersavehunt AS ush 
        ON h.id = ush.huntId AND ush.userId = ?
    `;

    try {
        const result = await queryDB.queryPromise(sqlQuery, [user.userId]);

        if (result.length === 0) {
            sendSuccess(res, [], "Hunts fetched Successfully!");
        } else {

            const hunts = await Promise.all(
                result.map(async (h) => {
                    let isSaved = h.saved === 1;

                    // Step 1: Get total locations and their IDs.
                    let locationsTotalCount = await queryDB.queryPromise(
                        "SELECT COUNT(locationId) as totalLocations, GROUP_CONCAT(locationId) as locationIds FROM svgr.huntlocation WHERE huntId = ?",
                        [h.id]
                    );
            
                    // Step 2: Get completed locations for the user.
                    let userCompletedLocations = await queryDB.queryPromise(
                        "SELECT COUNT(locationId) as completedLocations FROM svgr.userhuntlocation WHERE userId = ? AND huntId = ? AND status = 'Complete'",
                        [user.userId, h.id]
                    );
            
                    // Step 3: Calculate total points for the hunt locations.
                    let locationIds = locationsTotalCount[0].locationIds;
                    let huntPoints = 0;
            
                    if (locationIds) {
                        const placeholders = locationIds.split(',').map(() => '?').join(',');
                        const pointsResult = await queryDB.queryPromise(
                            `SELECT SUM(points) as totalPoints FROM svgr.location WHERE id IN (${placeholders})`,
                            locationIds.split(',')
                        );
                        huntPoints = pointsResult[0].totalPoints || 0; // Default to 0 if null.
                    }
            
                    // Step 4: Return the mapped hunt object.
                    return {
                        id: h.id,
                        title: h.title,
                        description: h.description,
                        startDate: h.startDate,
                        endDate: h.endDate,
                        county: h.county,
                        huntImage: h.huntImage,
                        mode: h.mode,
                        status: h.status,
                        accessCode: h.accessCode,
                        accessCodeDescription: h.accessCodeDescription,
                        gameType: h.gameType,
                        huntType: h.huntType,
                        isSaved: isSaved,
                        totalLocations: locationsTotalCount[0].totalLocations || 0,
                        completedLocations: userCompletedLocations[0].completedLocations || 0,
                        totalPoints: parseInt(huntPoints)
                    };
                })
            );

            
            // Step 5: Send the response with all hunts.
            sendSuccess(res, hunts, "Hunts Fetched Successfully!");
            
        }

    } catch (err) {
        sendError(res, err);
    }
};

const addHuntToFavourite = async (req, res) => {

    const user = req.user;
    const { huntId } = req.body;


    await queryDB.queryPromise("SELECT * from svgr.hunt where id='"+ huntId +"'", async (err, result, fields) => {
        if(err || result == ''){
            
            sendError(res, "Hunt doesn't exist!");
        
        } else {

            await queryDB.queryPromise(`SELECT * from svgr.usersavehunt where userId=${user.userId} AND huntId=${huntId}`, async (err, result, fields) => {
                if(err){

                    sendError(res, "Unknown Error Occured!");
                
                } else if (result == '') {
                
                    let saveHunt = await queryDB.queryPromise(`INSERT into svgr.usersavehunt (userId,huntId) VALUES (${user.userId},${huntId})`);
                    
                    if(saveHunt.affectedRows == 1){
                        sendSuccess(res, null, 'Hunt saved successfully!');
                    } else {
                        sendError(res, 'Hunt not saved!');
                    }
                    
                } else {

                    let deleteHunt = await queryDB.queryPromise(`DELETE from svgr.usersavehunt where userId=${user.userId} AND huntId=${huntId}`);
                    
                    if(deleteHunt.affectedRows == 1){
                        sendSuccess(res, null, 'Hunt removed successfully!');
                    } else {
                        sendError(res, 'Hunt not unsaved!');
                    }

                }
            });

        }
    });
    

}


module.exports = { huntList, addHuntToFavourite };