
/* GET MENTORS*/
function getMentors() {
	var hobbyStr = $("#hobby").val();

	console.log("getting mentors");

	console.log("for hobby: %s", hobbyStr);

	var params = {hobby: hobbyStr};

	$.get("/getMentors", params, function(data, status){

		console.log("Back from server");
		console.log("status; %s",status);

		console.log(data);

		updateListMentors(data);
	});

}

/* UPDATE LIST MENTORS*/
function updateListMentors(data) {
	
	if (data) {
		var mentorList = $("#mentorListResults");
		mentorList.empty();

		console.log("updateListMentors");
		console.log(data[0].first);

		for (var i = 0; i < data.length; i++) {

			var mentorName = data[i].first;

			mentorList.append("<li><p>" + mentorName + "</p></li>");

		}
	}

}

/* SIGN IN USER*/
function signInUser() {

	var username = $('#username').val();
	var password = $('#password').val();

	console.log("in main.js");

}
