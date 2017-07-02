
// Postgres
var pg = require('pg');
if (process.env.DATABASE_URL){
	pg.defaults.ssl = true;
}
var connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/hobbyspotdb";

/* GET HOBBIES
	Get all of the hobbies from the database*/
function getHobbies(callback) {

	// connect to database
	var client = new pg.Client(connectionString);

	client.connect(function(err) {
		if (err) {
			console.log("Error: Could not connect to DB");
			console.log(err);
			callback(err,null);
		}
	});
	console.log("connected to database")

	var sql = "SELECT h.name, h.description FROM hobby h;"

	console.log("getting hobbies");
	// Query database
	client.query(sql, function(err, results) {
		client.end(function(err) {
			if (err) throw err;
		});

		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		console.log("Results: " + JSON.stringify(results.rows));

		callback(null, results.rows);

	});
}

/* GET HOBBY
	Takes an id and get the information for that one hobby*/
function getHobby(hobbyId, callback) {
	// connect to database
	var client = new pg.Client(connectionString);

	client.connect(function(err) {
		if (err) {
			console.log("Error: Could not connect to DB");
			console.log(err);
			callback(err,null);
		}
	});

	var sql = "SELECT h.name, h.description FROM hobby h\
				WHERE h.id = $1::int;"

	var params = [hobbyId];

	console.log("getting hobbies");
	// Query database
	client.query(sql, params, function(err, results) {
		client.end(function(err) {
			if (err) throw err;
		});

		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		console.log("Results: " + JSON.stringify(results.rows));

		callback(null, results.rows);

	});


}

module.exports = {
	getHobbies: getHobbies,
	getHobby: getHobby
}