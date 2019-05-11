function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({error: { code: err.code || 'UNEXPECTED', msg: err }});
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({error: { code: 'INVALID_TOKEN', msg: 'The token is invalid' }});
    }

    // default to 500 server error
    return res.status(500).json({error: { code: message.code || 'UNEXPECTED', msg: err.message }});
}

module.exports = errorHandler;