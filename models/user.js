const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
      type: String,
      required: true,
      maxlenght: 255,
      minlength: 5,
      unique: true
    },
    password:{
      type: String,
      required: true,
      maxlenght: 1024,
      minlength: 5,
 
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
		email : Joi.string().min(5).max(255).required().email(), 
		password : Joi.string().min(5).max(1024).required()
	}

	return Joi.validate(user, schema);
}

exports.validate = validateUser;
exports.User = User;
exports.userSchema = userSchema;