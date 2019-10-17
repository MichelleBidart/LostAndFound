const mongoose = require('mongoose');
let {User} = require('../models/user');
const express = require('express');
const router = express.Router();

/*
Uses promises to improve readability
*/


//gets all users

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

// get user by id
router.get('/:id', async (req, res) => {
    const users = await User.findById(req.params.id)
    .catch(err => console.error("err", err));
    if (!users) res.status(404).send('user not found');
    res.send(users);
});

//deletes user by id
router.delete('/:id', async (req, res) => {
    const users = await User.findByIdAndRemove(req.params.id)
    .catch(err => console.error("err", err));
    if (!users) res.status(404).send('user not found');
    res.send(users);
});


// post one user
router.post('/', async (req, res) => {
    let user = new User ({
        email: req.body.email,
        password: req.body.password,
    });
    user = await user.save();
    res.send(user);
    
});

module.exports = router; 