const mongoose = require('mongoose');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/*
This is the Login, authenticates the user.
Uses bcryp to compare a text password with a hashed one in the DB.  
when bcrypt compares the password, in some place adds the salt.
It also uses jsonwebtoken thats basically a string that the server sends to the user to identify him. 
*/



router.post('/', async (req, res) => {
    //validates the inputs  
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //finds if the user is in the db
    let user = await User.findOne({email : req.body.email});
    if (!user) return res.status(400).send('Invalid email or password');

    // compares the password of the user input with the one in the db 
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    /*the first parameter is the payload of the json web token. 
    The second parameter is a private key
    */
    const token = jwt.sign({_id: user._id},'jwtKey');

    res.send(token);
    
});

module.exports = router; 