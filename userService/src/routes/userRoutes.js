const express = require('express');
const router = express.Router();
const {jwtValidation} = require('../middlewares/jwt-validations');
const { body, validationResult } = require('express-validator');
const { postUser, getUser, editUser, deleteUser } = require('../controllers/userController');

router.post('/register',
    body('username').isLength({ min: 3, max: 20 }),
    body('email').isEmail(),
    body('password').isStrongPassword(),
    body('telf').matches(/^\d+$/),
    
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        postUser(req, res);
    }
);

router.get('/login',
    body('username').isLength({ min: 3, max: 20 }).optional(),
    body('email').isEmail().optional(),
    body('password').isStrongPassword(),
    
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
       getUser( req, res );
    }
);

router.put('/edit/:id', 
    body('username').isLength({ min: 3, max: 20 }).optional(),
    body('email').isEmail().optional(),
    jwtValidation,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        editUser( req, res );
    }
);

router.delete('/delete/:id',
    body('username').isLength({ min: 3, max: 20 }),
    body('email').isEmail(),
    body('password').isStrongPassword(),
    
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
       deleteUser( req, res );
    }
);
module.exports = router;
