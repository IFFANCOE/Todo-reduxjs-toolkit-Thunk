let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router(),
    hash = require('object-hash');

const jwt = require('jsonwebtoken')
// const jwt_decode = require('jwt-decode');
// const decoded = jwt_decode(token);

//! User modle
let userSchema = require('../models/User')

//Fomat of token
// Authorization: Bearer <access_token>
//verify token
const verifyToken = (req, res, next) => {
    //Get auth header value
    const bearerHeader = req.headers['authorization']
    console.log(bearerHeader);
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array 
        const bearerToken = bearer[1];
        // Set the token 
        req.token = bearerToken
        console.log(req.token,"555");
        // Next niddleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

//-Create User in database
router.route('/register').post((req, res, next) => {

 const jwtSign  = jwt.sign(req.body, 'secretkey')

    console.log(jwtSign);
    let passwordHash = hash([req.body.password])
    const bodyReq = {
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
        confirm_password: passwordHash,
        token:jwtSign
    }
    userSchema.create(bodyReq, (error, data) => {
        if (error) {
            return next(error)
        }
        else
            console.log(data);
        res.json(data)
    })
})

//login 
router.route('/login').post(verifyToken,(req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                meg: 'Login success...',
                authData
            })
        }
    })

})
//* Read Users (show all users)
router.route('/').get((req, res) => {
    userSchema.find((error, data) => {
        if (error) {
            return next(error)
        }
        else {
            res.json(data)
        }
    })
})

//* get single student
router.route('/user/:id').get((req, res) => {
    userSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        }
        else {
            res.json(data);
        }
    })
})

//-update user
router.route('/update-user/:id').put((req, res, next) => {
    userSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error)
            console.log(error);
        }
        else {
            res.json(data);
            console.log("User update");
        }
    })
})

router.route('delete-user/:id').delete((req, res, next) => {
    userSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        }
        else {
            res.status(200).json({
                msg: data
            })
        }
    })
})



module.exports = router