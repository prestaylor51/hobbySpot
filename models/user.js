var pg = require('pg');
var bcrypt = require('bcrypt');
const saltRounds = 10;

// Set up the database url
if (process.env.DATABASE_URL){
	pg.defaults.ssl = true;
}
var connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/hobbyspotdb";

// Connect to the database
var client = new pg.Client(connectionString);

client.connect(function(err) {

	if (err) {
		console.log("Error: Could not connect to DB");
		console.log(err);
		callback(err,null);
	}

})

/* ADD USER
*/
function addUser(array, callback) {

	console.log("adding the user to the database");

	// Encrypt the password and insert the user into the database
	bcrypt.hash(array['password'], saltRounds, function(err, hash){
		if (err) {
			console.log("Error: password has failed");
			callback(err, null);
		}

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
				hash];

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


		});	
}


/* SIGN IN USER
*/
function checkUserCred(credsArray, callback) {

	console.log("checking user credentials");


	var sql = "Select u.password FROM _user u\
				WHERE u.username = $1::text;"

	var params = [credsArray['username']];

	console.log(credsArray['username']);

	client.query(sql, params, function(err, result) {
		if (err) {
			console.log("The query failed");
		}
		console.log("Results: " + JSON.stringify(result.rows));

		var hash = result.rows[0]['password'];

		console.log("hash of 0: ", result.rows[0]['password']);
		console.log(hash);

		bcrypt.compare(credsArray['password'], hash, function(err, res) {
			if (err) {
				console.log("Error: Invalid password");
			}

			console.log("res: %s", res);

			callback(null, res);
		})

	});

	
	

}

module.exports = {
	addUser: addUser,
	checkUserCred: checkUserCred
}