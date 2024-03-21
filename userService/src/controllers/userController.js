const {response, request} = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const User = require('../models/userModel');


const getUser = async (request, response) => {
    try {
        const { username, email, password } = request.body;
        let user = null;
        
        if (email) {
            user = await User.findOne({ email: email });
        } else if (username) {
            user = await User.findOne({ username: username });
        }
  
        if (user && bcrypt.compareSync( password, user.password)) {
            const token = await generateJWT( user._id, username);

            return response.status(200).json({
                ok: true,
                info: 'User logged in',
                user: user,
                token: token
            });

        } else {
            return response.status(400).json({
                ok: false,
                info: 'Error',
                message: 'Invalid Password'
            });
        }
    } catch (error) {
        return response.status(500).json({
            error: error.message,
            message: 'Something went wrong'
        });
    }
}
const postUser = async( request, response ) => {
    try {
        
        const { username, email, telf, password } = request.body;
        const exstUser = await User.find( {email: email} );
        
        if( exstUser.length > 0 ) {
            return response.status(400).json({
                ok: false,
                info: 'User already exists',
                messages: 'Did you forgot your password?'
            })
        }

        const newUser = new User ({
            username: username,
            email: email,
            telf: telf,
            password: password
        })
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, salt);
        const userSvd = await newUser.save();
        const token = await generateJWT( userSvd._id, username);
        response.status(200).json({
            ok: true,
            info: newUser ? 'User created' : 'Error',
            message: newUser,
            token: token
        })

    } catch (error) {
        response.status(500).json({
            ok: false,
            error: error.message,
            message: 'Something went wrong'
        })
    }
}
const editUser = async (request, response) => {
    try {
        const id = request.params.id;
        const dataToUpdate = request.body;
        
        const user = await User.findOne( {_id: id} );
        
        if( !user ) {
            return response.status(404).json({
                ok: false,
                info: 'Error',
                message: 'User not found'
            })
        }

        if( dataToUpdate.email === user.email){
            delete dataToUpdate.email
        } else {
            const exstUser = await User.find( {email: email} );
            if(exstUser){
                return response.status(404).json({
                    ok: true,
                    info: 'Email already exists',
                    message: error.message
                })
            }
        }

        delete dataToUpdate.password;
 
        const uptUser = await User.findByIdAndUpdate(id, dataToUpdate, {new : true});
        return response.status(200).json({
            ok: true,
            info: 'User updated',
            user: uptUser,
            message: 'User updated succesfully'
        })

    } catch (error) {
        response.status(500).json({
            ok: false,
            info: 'Error',
            error: error.message,
            message: 'Something went wrong'
        })
    }
    
}
const deleteUser = async (request, response) => {
    try {
        
        const id = request.params.id;
        const dataToUpdate = request.body;

        const user = await User.findById(id);
        if( !user ) {
            response.status(500).json({
                ok: false,
                error: error.message,
                message: 'User not found'
            })
        }

        if( dataToUpdate.password === user.password ) {
            await User.findOneAndDelete( user._id );
            
            return response.status(200).json({
                ok: true,
                info: 'User deleted',
                message: 'User deleted succesfully'
            });
        }

    } catch (error) {
        response.status(500).json({
            ok: false,
            error: error.message,
            message: 'Something went wrong'
        })
    }
}
module.exports = {
    getUser,
    postUser,
    editUser,
    deleteUser
}