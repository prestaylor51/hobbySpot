var pg = require('pg');
const connectionString = "postgres://postgres:danGer95@localhost:5432/hobbyspotdb";

function addUser(array, callback) {

	var result = 'result';
	callback(null, result);

}

module.exports = {
	addUser: addUser
}