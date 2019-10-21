const express = require('express');
const users = require('./../routes/users');
const documents = require('../routes/documents');
const auth = require('../routes/auth');
const router = express();
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');



//middleware for routes
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(express.static(path.join(__dirname, 'public')));
router.use('/users', users);//CRUD user
router.use('/users', documents); //generates the documents
router.use('/',auth);//login 


if (!config.get('jwtKey')) {
	console.error('Fatal error: jwt error');
	process.exit(1);//exit the process 
}

/** I use promisses to conncet to the DB, if it´s fullfil then I´m connected, if not 
I cath the exception. 
**/
mongoose.connect('mongodb://localhost:27017/laf')
.then( () => console.log('Conected to MongoDB '))
.catch(err => console.error('Could not connect to mongo DB', err));

module.exports = router; 