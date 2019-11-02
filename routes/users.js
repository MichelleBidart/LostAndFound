const mongoose = require('mongoose');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const middlewareAuth = require('../middleware/auth');

/*
CRUD users
Uses promises to improve readability
*/

//gets all users
router.get('/', middlewareAuth ,async (req, res) => {
    const users = await User.find();
    res.send(users);
});

// get user by id
router.get('/:id',middlewareAuth ,async (req, res) => {
    const users = await User.findById(req.params.id)
    .catch(err => console.error("err", err));
    if (!users) res.status(404).send('user not found');
    res.send(users);
});

//delets user by id
router.delete('/:id',middlewareAuth ,async (req, res) => {
    const users = await User.findByIdAndRemove(req.params.id)
    .catch(err => console.error("err", err));
    if (!users) res.status(404).send('User not found');
    res.send(users);
});


// create user
router.post('/', middlewareAuth ,async (req, res) => {
    console.log('PUT --CREATE USER');
    console.log(req.body);
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let uniqueUser = await User.findOne({email : req.body.email});
    if (uniqueUser) return res.status(400).send('User already register');

    let user = new User ({
        email: req.body.email,
        password: req.body.password,
    });

    //generate the hash password to persist in db 
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    user = await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token',  token).send(user);
});


module.exports = router; 