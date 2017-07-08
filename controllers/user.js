// SIGN UP
var userModel = require('../models/user.js');

/* CREATE USER
*/
function createUser(req, res) {

console.log("creating User");

	var array = req.body;

	console.log(array);

	userModel.addUser(array, function (err, newuser) {
		if (err){
			console.log("something went wrong with the model");
		}
		console.log(array['username'] + ' has been added to the database');
		res.status(200).json(newuser);
	});

}

/* HANDLE SIGN IN
*/
function handleSignIn(req, res){

	var credsArray = req.body;
	console.log("req.body = %s",req.body);
	console.log(credsArray);

	userModel.checkUserCred(credsArray, function(err, valid) {
		console.log("done with checkusercreds()");
		console.log(valid);

		// Set session var if login is successful
		if(valid == true) {
			console.log("creating session var");
			req.session.user = credsArray['username'];
		}

		res.status(200).json(valid);
	});

}

module.exports = {
		createUser: createUser,
		handleSignIn: handleSignIn
}