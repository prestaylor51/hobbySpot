// GET STUDENTS

// Postgres
var pg = require('pg');
if (process.env.DATABASE_URL){
	pg.defaults.ssl = true;
}
var connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/hobbyspotdb";

/* GET STUDENTS
	get a list of students according to a sigle mentor
*/

function getStudents(mentor, callback) {

	var client = new pg.Client(connectionString);

	client.connect(function(err) {
		if (err) {
			console.log("Error: Could not connect to DB");
			console.log(err);
			callback(err,null);
		}
	});

	console.log('Connected to postgres! Getting schemas...');
	console.log("finding students for mentor: %s", mentor);

	var sql = "SELECT u.first, u.last, u.phone, u.email, h.name FROM _user u \
				JOIN student_mentor sm ON sm.student_id = u.id \
				JOIN hobby h ON sm.hobby_id = h.id\
				AND sm.mentor_id = $1::int;"

	params = [mentor];

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
	getStudents: getStudents
}