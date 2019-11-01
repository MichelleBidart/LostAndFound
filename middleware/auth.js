const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next){

	const token = req.cookies.auth;
	console.log('token middleware');
	console.log(token);
	if (!token) return res.status(401).send('Access denied. No token provided.');

	try{
		const decoded = jwt.verify(token, 'jwtKey');	
		req.user_id = decoded._id;
		next();
	}catch(ex){
		res.status(400).send('invalid token');
	}
}
 
 module.exports = auth;