const mongoose = require('mongoose');
const {userSchema} = require('../models/user');
const Schema = mongoose.Schema;

/*
isLost is a boolean that determinates if the user enters to the found or lost choice. Is true
when it he choose the lost document option.
*/

/*
Uses reference to persist one to many relationship with User. 
Example: https://vegibit.com/mongoose-relationships-tutorial/
*/
const documentSchema = new Schema({
    documentNumber: { 
    	type: String,
    	required: true 
    },
    user :{
    	type : mongoose.Schema.Types.ObjectId,
    	ref : 'User'
    },
    isLost: {
    	type: Boolean,
        default: true,
    	required: true
    },
    date: {
    	type: Date, 
    	default : Date.now,
    },
    documentType: {type : String}
});

// I´ll pass the model, in this case Document, with the schema.
const Document = mongoose.model('Document', documentSchema);
							
module.exports = Document;