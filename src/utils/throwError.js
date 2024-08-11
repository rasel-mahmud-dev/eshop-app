function throwError(statusCode, message, statusText) {
    let errMessage = message
    let status = statusCode
    let statusText2 = statusText || ""

    if (statusCode && typeof statusCode === "string") {
        errMessage = statusCode
        status = 500
        statusText2 = message
    }

    const newError = new Error(errMessage);
    newError.status = status
    newError.statusText = statusText2
    // logger.error(errMessage, status);
    throw newError
}
export default throwError
