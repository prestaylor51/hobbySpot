
var studentmodel = require('../models/student.js');

// HANDLE STUDENTS
function handleStudents(req, res) {
	console.log("getting students");
	var mentor = req.query.mentor

	console.log("mentor %s = ", mentor)
	studentmodel.getStudents(mentor, function (err, result) {
		if (err) { 
			console.log("Error in the student model");
		}

		console.log(result);
		res.status(200).json(result);

	});	

}

module.exports = {
	handleStudents: handleStudents
}