const express = require('express');
const users = require('./users');
const app = express();

app.use('/users', users);

app.listen(3000, () => console.log('init.....'));