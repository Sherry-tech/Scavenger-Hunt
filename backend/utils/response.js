const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data,
  })
}
// usage
// sendSuccess(res, { token, user: result[0] }, 'Login successful', 200)


const sendError = (res, message = 'Error', statusCode = 400, additionalData = {}) => {
  return res.status(statusCode).json({
    status: 'error',
    message,
    ...additionalData,
  });
};

// usage
// sendError(res, 'Error fetching users', 400)

const sendUnauthorized = (
  res,
  message = 'Unauthorized access, provide token'
) => {
  return res.status(401).json({
    status: 'error',
    message: message,
  })
}
// usage
// sendUnauthorized(res, 'Access token expired')

const sendForbidden = (res, message = 'Token Expire!') => {
  return res.status(401).json({
    status: 'error',
    message: message,
  })
}
// usage
// sendForbidden(res, 'Access denied');

const sendValidationError = (
  res,
  errors = [],
  message = 'Validation failed'
) => {
  return res.status(422).json({
    status: 'error',
    message: message,
    errors: errors,
  })
}
// usage
// sendValidationError(res, ['Invalid email format', 'Password too short']);

module.exports = {
  sendSuccess,
  sendError,
  sendUnauthorized,
  sendForbidden,
  sendValidationError,
}
