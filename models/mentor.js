// Model for getting the mentors from the database
// Postgres
var pg = require('pg');
if (process.env.DATABASE_URL){
	pg.defaults.ssl = true;
}
var connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/hobbyspotdb";

/* GET ALL MENTORS
	Return all of the mentors form DB*/
function getAllMentors(hobby,callback) {	
		
		//for connecting to database
		
		var client = new pg.Client(connectionString);

		client.connect(function(err) {

			if (err) {
				console.log("Error: Could not connect to DB");
				console.log(err);
				callback(err,null);
			}

		})

		console.log('Connected to postgres! Getting schemas...');
		console.log("finding mentors for %s", hobby);

		var sql = "SELECT u.first, u.last, l.town, hm.mentor_id, h.name, hm.greeting FROM _user u \
			JOIN hobby_mentor hm ON u.id = hm.mentor_id \
			JOIN hobby h ON h.id = hm.hobby_id \
			JOIN location l ON u.location_id = l.id \
			WHERE h.name = $1 ;"

		var params = [hobby];

		client.query(sql, params, function(err, result) {

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

/* SIGN MENTOR
	Insert user into the hobby_mentor table*/
function signMentor(array, callback) {
	//for connecting to database
	var client = new pg.Client(connectionString);

	client.connect(function(err) {

		if (err) {
			console.log("Error: Could not connect to DB");
			console.log(err);
			callback(err);
		}

	});

	// Prepare query for the hobby_mentor table
	var sql = "INSERT INTO hobby_mentor\
				(hobby_id, mentor_id, greeting)\
				VALUES\
				($1::int, $2::int, $3::text);"

	var params = [array['hobby'],
					array['mentor'],
					array['greeting']];

	// Make insertion
	client.query(sql, params, function(err, result) {

		client.end(function(err) {
			if (err) throw err;
		});

		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		console.log("Results: " + JSON.stringify(result));
		callback(null, result);
	});	

}
module.exports = {
		getAllMentors: getAllMentors,
		signMentor: signMentor
}