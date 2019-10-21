const express = require('express');
const users = require('./routes/users');
const documents = require('./routes/documents');
const auth = require('./routes/auth');
const app = express();
const mongoose = require('mongoose');
const config = require('config');


//middleware for routes
app.use(express.json());
app.use('/users', users);//CRUD user
app.use('/users', documents); //generates the documents
app.use('/auth',auth);//login 


//views
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs');

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


app.listen(3000, () => console.log('init.....'));