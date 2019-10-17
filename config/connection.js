const mongoose = require('mongoose');

/** I use promisses to conncet to the DB, if it´s fullfil then I´m connected, if not 
I cath the exception. 
**/
mongoose.connect('mongodb://localhost:27017/laf')
.then( () => console.log('Conected to MongoDB '))
.cath(err => console.error('Could not connect to mongo DB', err));

module.exports = mongoose;