// SIGN UP
var signUpModel = require('../models/post.js');

function createUser(req, res) {

console.log("creating User");

	var array = req.body;

	console.log(array);

	signUpModel.addUser(array, function (err, result) {
		console.log("callback");
	});

}

module.exports = {
		createUser: createUser
}