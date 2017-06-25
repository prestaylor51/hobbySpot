// Model for getting the mentors from the database
// Postgres
var pg = require('pg');
const connectionString = "postgres://postgres:danGer95@localhost:5432/hobbyspotdb";

function getAllMentors(hobby,callback) {
		
		// for connecting to heroku database(not working)
		
		// pg.defaults.ssl = true;
		// pg.connect('postgres://debpnomxrchkax:514699ac6ed5096200f17f062d603e66c77d13c6c084b4801fd53c2accb8d189@ec2-50-17-236-15.compute-1.amazonaws.com:5432/d18isi6cdbj0ld', function(err, client) {
  // 			if (err) throw err;
  // 			console.log('Connected to postgres! Getting schemas...');

  // 			client
  //   			.query('SELECT table_schema,table_name FROM information_schema.tables;')
  //   			.on('row', function(row) {
  //     				console.log(JSON.stringify(row));
  //   			});
		// });
		


	    var client = new pg.Client(connectionString);

				client.connect(function(err) {

					if (err) {
						console.log("Error: Could not connect to DB");
						console.log(err);
						callback(err,null);
					}

				})
		

		console.log("finding mentors for %s", hobby);

		var sql = "SELECT u.first, u.last, l.town, hm.mentor_id, h.name, hm.greeting FROM _user u \
			JOIN hobby_mentor hm ON u.id = hm.mentor_id \
			JOIN hobby h ON h.id = hm.hobby_id \
			JOIN location l ON u.location_id = l.id \
			WHERE h.name = $1 ;"

		var params = [hobby];

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
		getAllMentors: getAllMentors
}