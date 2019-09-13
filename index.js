const express = require('express');
const users = require('./routes/users');
const documents = require('./routes/documents');
const app = express();

//midleware
app.use(express.json());
app.use(express.static('public')); 
app.use('/users', users);
app.use('/users', documents);


app.listen(3000, () => console.log('init.....'));