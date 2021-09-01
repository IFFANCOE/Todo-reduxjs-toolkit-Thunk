let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router(),
    hash = require('object-hash')

// const MongoClient = require('mongodb').MongoClient;
// const url = "../database/database.js";

const jwt = require('jsonwebtoken');
const user = require('../models/User');
// const jwt_decode = require('jwt-decode');
// const decoded = jwt_decode(token); // verifyToken

//! User modle
let userSchema = require('../models/User')

//Fomat of token
// Authorization: Bearer <access_token>
//verify token
const verifyToken = (req, reply, next) => {
    //Get auth header value
    const { authorization } = req.headers
    console.log(authorization);
    // Check if bearer is undefined
    if (typeof authorization !== 'undefined') {
        // split at the space
        const bearer = authorization.split(' ');
        // Get token from array 
        const bearerToken = bearer[1];
        // Set the token 
        req.token = bearerToken
        console.log("Token is :", req.token);
        // Next niddleware
        next();
    } else {
        // Forbidden
        reply.sendStatus(403);
    }
}

//-Create User in database
router.route('/register').post((req, res, next) => {
    const jwtSign = jwt.sign(req.body, 'secretkey')
    console.log(jwtSign);
    let passwordHash = hash([req.body.password])
    const bodyReq = {
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
        confirm_password: passwordHash,
        token: jwtSign
    }

    const userData = userSchema.find({ }, (User, schema) => { console.log(schema) })

    const sameEmail = users.find(user => user.email === req.body.email)
    // console.log(users);

    if (sameEmail.length) {
        console.log("same email");
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

//login verify is decoded
router.route('/login').post(verifyToken, (req, res) => {

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