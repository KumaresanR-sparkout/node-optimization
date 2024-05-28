export const sendSuccess = (res, statusCode, message, body) => {
    const RESPONSE = {
        "statusCode": statusCode,
        "status": true,
        "message": message,
        "data": body
    }
    res.status(statusCode).json(RESPONSE)
}

export const sendError = (res, statusCode, message) => {
    const RESPONSE = {
        "statusCode": statusCode,
        "status": false,
        "message": message
    }
    res.status(statusCode).json(RESPONSE)
}