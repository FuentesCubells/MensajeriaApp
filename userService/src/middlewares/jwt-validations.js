require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtValidation = (request, response, next) => {
    const token = request.header('x-token');

    if( !token ) {
        return response.status(401).json({
            ok: false,
            info: 'Error token not found',
            message: 'Authentication required'
        })
    }

    try {
        const {id} = jwt.verify ( token, process.env.JWT_SECRET );
        response.id = id;
        next();
    } catch (error) {
        return response.status(404).json({
            ok: false,
            error: error.message,
            message: 'Invalid Token'
        })
    }
}

module.exports = {
    jwtValidation
}