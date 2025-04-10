const queryDB = require("../../config/db");
const { sendSuccess, sendError } = require('../../utils/response');
let { uploadImage, deleteImage } = require("../../utils/s3Functions");
var moment = require('moment-timezone');



const createTeam = async (req, res) => {

    const user = req.user;
    const {name, description} = req.body;
    let file = req.file;


    let userExisted = await queryDB.queryPromise("SELECT * from svgr.users where id='"+user.userId+"'");
    if(userExisted == '') {
        return sendError(res, "User doesn't exist");
    }

    let teamLogo = null;
    if (file) {
        try {
            teamLogo = await uploadImage(file, "teamLogo");
        } catch (err) {
            return sendError(res, "Failed to upload image");
        }
    }

    await queryDB.queryPromise(`INSERT into svgr.userteam (createdBy, name, description, captainId, teamLogo, createdAt, updatedAt) VALUES (${user.userId}, '${name}', '${description}', ${user.userId}, '${teamLogo}', '${moment().tz("America/New_York").format()}', '${moment().tz("America/New_York").format()}')`, async (err, result, fields)=>{
        if(err || result == ''){
            sendError(res, "Create team failed!");
        } else {

            await queryDB.queryPromise(`INSERT into svgr.teammembers (teamId, memberId, status, createdAt, updatedAt) VALUES (${result.insertId}, ${user.userId}, 'accepted', '${moment().tz("America/New_York").format()}', '${moment().tz("America/New_York").format()}')`);
            sendSuccess(res, {id: result.insertId}, "Team created successfully!");

        }
    });

}

const addTeamMembers = async (req, res) => {
    try {
        const user = req.user;
        const { teamId, members } = req.body;

        // Check if the user exists
        const userExisted = await queryDB.queryPromise(
            `SELECT * FROM svgr.users WHERE id='${user.userId}'`
        );
        if (userExisted.length === 0) {
            return sendError(res, 'User not found!');
        }

        // Check if the team exists
        const teamExisted = await queryDB.queryPromise(
            `SELECT * FROM svgr.userteam WHERE id='${teamId}'`
        );
        if (teamExisted.length === 0) {
            return sendError(res, 'Team not found!');
        }

        // Insert each member into the userteammembers table
        const insertionPromises = members.map(async (memberId) => {
            return queryDB.queryPromise(
                `INSERT INTO svgr.teammembers (teamId, memberId, createdAt, updatedAt) VALUES (${teamId}, ${memberId}, ${moment().tz("America/New_York").format()}, ${moment().tz("America/New_York").format()})`
            );
        });

        // Execute all insertions in parallel
        await Promise.all(insertionPromises);

        // Respond with success message
        return sendSuccess(res, null, "Members added successfully!");

    } catch (error) {
        console.log(error);
        return sendError(res, 'An error occurred while adding members.');
    }
};

const removeTeamMember = async (req, res) => {

    let user = req.user;
    let {teamId, memberId} = req.query;

    let userExisted = await queryDB.queryPromise("SELECT * from svgr.users where id='"+user.userId+"'");
    if(userExisted == '') {
        return sendError(res, "User doesn't exist");
    }

    let removeMember = await queryDB.queryPromise("DELETE from svgr.teammembers where teamId='"+teamId+"' AND memberId='"+memberId+"'");
    if(removeMember.affectedRows == 1) {
        return sendSuccess(res, null, "Member removed successfully!");
    } else {
        return sendError(res, "Member removed failed!");
    }

}

const reassignCaptain = async (req, res) => {
    
    let user = req.user;
    let {teamId, captainId} = req.body;

    let userExisted = await queryDB.queryPromise("SELECT * from svgr.users where id='"+user.userId+"'");
    if(userExisted == '') {
        return sendError(res, "User doesn't exist");
    }

    let reassignCaptain = await queryDB.queryPromise("UPDATE svgr.userteam SET captainId='"+captainId+"' where id='"+teamId+"'");
    if(reassignCaptain.affectedRows == 1) {
        return sendSuccess(res, null, "Captain re-assigned successfully!");
    } else {
        return sendError(res, "Captain re-assignment failed!");
    }

}

const membersList = async (req, res) => {
    const user = req.user;
    let { lastId } = req.query;
    
    try {
        // Check if the user exists
        const userExisted = await queryDB.queryPromise("SELECT * FROM svgr.users WHERE id = ?", [user.userId]);
        if (userExisted.length === 0) {
            return sendError(res, "User doesn't exist");
        }
    
        // Convert lastId to number and default to 0
        lastId = parseInt(lastId) || 0;
    
        // Fetch members using parameterized query
        const members = await queryDB.queryPromise(
            `SELECT id, name, points 
            FROM svgr.users 
            WHERE verificationStatus = 1 
            AND id != ? 
            AND id ${lastId === 0 ? '>' : '<'} ? 
            ORDER BY id DESC 
            LIMIT 5`,
            [user.userId, lastId]
        );
    
        return sendSuccess(res, members, "Members list");
    } catch (error) {
        console.error("Error fetching members:", error);
        return sendError(res, "An unexpected error occurred.");
    }
}

const teamsList = async (req, res) => {

    const user = req.user;
    let userExisted = await queryDB.queryPromise("SELECT * from svgr.users where id='"+user.userId+"'");
    if(userExisted == '') {
        return sendError(res, "User doesn't exist");
    }

    let finalResult = Array();
    
    let myTeams = await queryDB.queryPromise("SELECT * from svgr.userteam where captainId='"+user.userId+"'");
    myTeams.map((tm) => {

        let id = tm.id;
        let createdBy = tm.createdBy;
        let name = tm.name;
        let description = tm.description;
        let teamLogo = tm.teamLogo;
        let captainId = tm.captainId;
        let createdAt = tm.createdAt;
        let updatedAt = tm.updatedAt;

        finalResult.push({id, createdBy, name, description, teamLogo, captainId, createdAt, updatedAt});

    });

    let otherTeams = await queryDB.queryPromise("SELECT t.* from svgr.userteam as t JOIN svgr.teammembers as tm ON t.id = tm.teamId WHERE tm.memberId='"+user.userId+"' AND tm.status='accepted'");
    otherTeams.map((ot) => {

        let id = ot.id;
        let createdBy = ot.createdBy;
        let name = ot.name;
        let description = ot.description;
        let teamLogo = ot.teamLogo;
        let captainId = ot.captainId;
        let createdAt = ot.createdAt;
        let updatedAt = ot.updatedAt;

        finalResult.push({id, createdBy, name, description, teamLogo, captainId, createdAt, updatedAt});

    })

    return sendSuccess(res, finalResult, "Teams list");

}

const teamMembers = async (req, res) => {

    let user = req.user;
    let teamId = req.query.teamId;

    let userExisted = await queryDB.queryPromise("SELECT * from svgr.users where id='"+user.userId+"'");
    if(userExisted == '') {
        return sendError(res, "User doesn't exist");
    }

    let teamMembers = await queryDB.queryPromise(`SELECT u.id,u.points,u.name from svgr.teammembers as tm JOIN svgr.users as u ON tm.memberId=u.id where tm.teamId=${teamId} AND tm.status='accepted'`);

    return sendSuccess(res, teamMembers, "Team members list");

}

const leaveTeam = async (req, res) => {

    let user = req.user;
    let teamId = req.query.teamId;

    let userExisted = await queryDB.queryPromise("SELECT * from svgr.users where id='"+user.userId+"'");
    if(userExisted == '') {
        return sendError(res, "User doesn't exist");    
    }

    await queryDB.queryPromise("DELETE from svgr.teammembers where teamId='"+teamId+"' AND memberId='"+user.userId+"'");
    return sendSuccess(res, null, "Leave team");

}

const otherMembers = async (req, res) => {

    const user = req.user;

    let userExisted = await queryDB.queryPromise("SELECT * from svgr.users where id='"+user.userId+"'");
    if(userExisted == '') {
        return sendError(res, "User doesn't exist");
    }

    let userTeams  = await queryDB.queryPromise("SELECT tm.teamId,ut.name from svgr.teammembers as tm JOIN svgr.userteam as ut ON tm.teamId = ut.id where (tm.memberId='"+user.userId+"' AND tm.status='accepted') AND ut.createdBy != '"+user.userId+"'");
    if(userTeams == '') {
        return sendSuccess(res, [], "No other members");
    }

    // Using Promise.all to handle the asynchronous operations
    let otherMembers = await Promise.all(userTeams.map(async (ut) => {
        let teamId = ut.teamId;
        let teamName = ut.name;

        let membersList = await queryDB.queryPromise("SELECT tm.memberId, u.name, u.points from svgr.teammembers as tm JOIN svgr.users as u ON tm.memberId = u.id WHERE tm.teamId = '"+teamId+"' AND tm.memberId != '"+user.userId+"' AND tm.status='accepted'");

        // Since membersList could be an array, we need to iterate over it if there are multiple members
        return membersList.map(member => {
            return {
                teamId,
                teamName,
                'memberId': member.memberId,
                'name': member.name,
                'points': member.points
            };
        });
    }));

    let othermembersList = [].concat(...otherMembers);

    // If the list is empty, return a success response with no members
    if (othermembersList.length === 0) {
        return sendSuccess(res, [], "No other members");
    } else {
        // Filter out members with duplicate memberId, keeping the one with the greater teamId
        const filteredMembers = othermembersList.reduce((acc, currentMember) => {

            const existingMember = acc.find(member => member.memberId === currentMember.memberId);
            
            if (!existingMember) {
                // If no member with the same memberId exists, add the current member to the accumulator
                acc.push(currentMember);
            } else {
                // If a member with the same memberId exists, compare teamId and keep the one with the greater teamId
                if (currentMember.teamId > existingMember.teamId) {
                    // Replace with the one having a greater teamId
                    const index = acc.indexOf(existingMember);
                    acc[index] = currentMember;
                }
            }

            return acc;
        
        }, []);
    
        // Send the filtered list
        sendSuccess(res, filteredMembers, "Filtered other members list");
    }
}


module.exports = { createTeam, addTeamMembers, removeTeamMember, membersList, teamsList, teamMembers, reassignCaptain, leaveTeam, otherMembers }