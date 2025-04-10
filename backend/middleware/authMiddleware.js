const jwt = require('jsonwebtoken')
const queryDB = require('../config/db.js')
const {
  sendUnauthorized,
  sendForbidden,
  sendError,
} = require('../utils/response.js')

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1] // Bearer <token>

    jwt.verify(token, 'secret', (err, user) => {
      if (err) {
        return sendForbidden(res) // Forbidden
      }

      req.user = user
      next()
    })
  } else {
    return sendUnauthorized(res) // Unauthorized
  }
}

function checkRole(allowedRoles) {
  return async (req, res, next) => {
    if (!req.user || !req.user.userId) {
      sendError(res, 'User not found', 403)
    }

    const userId = req.user.userId;

    // Fetch the role from the database using JOIN
    const query = `
      SELECT r.role
      FROM vres.users u
      JOIN vres.user_role r ON u.roleId = r.id 
      WHERE u.id = ?
    `

    await queryDB.queryPromise(query, [userId], (err, results) => {
      if (err || results.length === 0) {
        sendError(res, 'User not found', 403)
      }

      const userRoleName = results[0].role

      // check if user status is "active"
      // const userStatus = results[0].status
      // if (userStatus !== 'active') {
      //   sendError(res, 'User is inactive', 403)
      // }

      // Check if the user role is in the allowedRoles array
      if (allowedRoles.includes(userRoleName)) {
        next()
      } else {
        sendError(res, 'Permission Denied, You are not authorized', 403)
      }
    })
  }
}
module.exports = {
  authenticateJWT,
  checkRole,
}
