require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateJWT = ( id, username ) => {
    return new Promise ( (resolve, reject) => {

        const payload = {
            id: id,
            username: username
        }
    
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (error , token ) => {
            if( error ) {
                reject('Error on token generation')
            }
            resolve( token );
        })
    } )
   
}
module.exports = {
    generateJWT
}