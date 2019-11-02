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

const DOCUMENT_MAX_LENGTH = 12;
const DOCUMENT_MIN_LENGTH = 5;

const documentSchema = new Schema({
    documentNumber: { 
    	type: String,
    	required: true, 
        minlength : DOCUMENT_MIN_LENGTH,
        maxlength : DOCUMENT_MAX_LENGTH
    },
    user :{
    	type : mongoose.Schema.Types.ObjectId,
    	ref : 'User'
    },
    isLost: {
    	type: Boolean,
    	required: true
    },
    date: {
    	type: Date, 
    	default : Date.now,
    },
    documentType: {
        type : String,
        required : true
    }
});

// I´ll pass the model, in this case Document, with the schema.
const Document = mongoose.model('Document', documentSchema);
							
module.exports = Document;