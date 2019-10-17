const express = require('express');
const users = require('./routes/users');
const documents = require('./routes/documents');
const app = express();
const mongoose = require('mongoose');

//middleware for routes
app.use(express.json());
app.use('/users', users);
app.use('/users', documents);


/** I use promisses to conncet to the DB, if it´s fullfil then I´m connected, if not 
I cath the exception. 
**/
mongoose.connect('mongodb://localhost:27017/laf')
.then( () => console.log('Conected to MongoDB '))
.catch(err => console.error('Could not connect to mongo DB', err));


app.listen(3000, () => console.log('init.....'));