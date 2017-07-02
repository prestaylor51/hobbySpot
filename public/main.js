

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

function updateListMentors(data) {
	
	if (data.Search && data.Search.length > 0) {
		var mentorList = $("#mentorListResults");
		mentorList.empty();

		console.log("updateListMentors");
		console.log(data.Search[0].first);

		for (var i = 0; i < data.Search.length; i++) {

			var mentorName = data.Search[i].first;

			mentorList.append("<li><p>" + mentorName + "</p></li>");

		}
	}

}

