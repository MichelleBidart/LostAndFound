const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.static('public'));

mongoose.con

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

app.post('/users/', (req, res) => {
    const user = {
        id: users.length + 1,
        mail: req.body.mail,
        password: req.body.password,
    }

    users.push(user);
    res.send(user);
    
});

app.listen(3000, () => console.log('init.....'));