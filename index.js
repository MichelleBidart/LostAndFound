const express = require('express');

const app = express();

const users = [
    { id: 1, mail: 'bidart.michelle@gmail.com', password: '1234' },
    { id: 2, mail: 'martinbrude@gmail.com', password: '45678' },
];

app.get('/users', (req, res) => {

    res.send(users);

});

app.get('/users/:id', (req, res) => {

    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) res.status(404).send('user not found');

    res.send(user);

});

app.listen(3000, () => console.log('init.....'));