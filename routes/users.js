const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.static('public'));


const users = [
    { id: 1, mail: 'bidart.michelle@gmail.com', password: '1234'},
    { id: 2, mail: 'martinbrude@gmail.com', password: '45678'},
];


router.get('/', (req, res) => {
    res.send(users);
});

router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) res.status(404).send('user not found');
    res.send(user);
});

router.post('/', (req, res) => {
    const user = {
        id: users.length + 1,
        mail: req.body.mail,
        password: req.body.password,
    }

    users.push(user);
    res.send(user);
    
});

module.exports = router; 