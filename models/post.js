var pg = require('pg');
// const connectionString = "postgres://postgres:danGer95@localhost:5432/hobbyspotdb";
const connectionString = process.env.DATABASE_URL;

function addUser(array, callback) {

	// Connect to the database
	var client = new pg.Client(connectionString);

	client.connect(function(err) {

		if (err) {
			console.log("Error: Could not connect to DB");
			console.log(err);
			callback(err,null);
		}

	})

	console.log("adding the user to the database");

	var sql = "INSERT INTO _user \
			  (username, first, last, phone, email, location_id, password) \
			  VALUES \
			  ($1::text, $2::text, $3::text, $4::text, $5::text, $6::int, $7::text);"

	var params = [array['username'], 
				array['first'], 
				array['last'], 
				array['phone'], 
				array['email'], 
				array['location'], 
				array['password']]

	var query = client.query(sql, params, function(err, result) {

		client.end(function(err) {
			if (err) throw err;
		});

		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		console.log("Results: " + JSON.stringify(result.rows));
		callback(null, result.rows);
	});
}

module.exports = {
	addUser: addUser
}