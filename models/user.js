const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const  MAIL_MAX_LENGTH = 255;
const  MAIL_MIN_LENGTH = 5;
const  PASS_MAX_LENGTH = 1024;
const  PASS_MIN_LENGTH = 5;


const userSchema = new Schema({
    email:{
      type: String,
      required: true,
      maxlength: MAIL_MAX_LENGTH,
      minlength: MAIL_MIN_LENGTH,
      unique: true
    },
    password:{
      type: String,
      required: true,
      maxlength: PASS_MAX_LENGTH,
      minlength: PASS_MIN_LENGTH,
 
    }
 });

userSchema.methods.generateAuthToken =  function() {
    /*the first parameter is the payload of the json web token. 
    The second parameter is a private key
    */
    const token = jwt.sign({_id: this._id},config.get('jwtKey'));
    return token;
}


const User = mongoose.model('User', userSchema);

//validates that the inputs are correct 
function validateUser(user){
	const schema = {
		// added email to ask if it´s a valid email
		email : Joi.string().min(MAIL_MIN_LENGTH).max(MAIL_MAX_LENGTH).required().email(), 
		password : Joi.string().min(PASS_MIN_LENGTH).max(PASS_MAX_LENGTH).required()
	}

	return Joi.validate(user, schema);
}

exports.validate = validateUser;
exports.User = User;
exports.userSchema = userSchema;