// SIGN UP
var userModel = require('../models/user.js');

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

module.exports = {
		createUser: createUser
}