

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

			var mentorFirst = data[i].first;
			var mentorLast	= data[i].last;

			mentorList.append("<li><p>" + mentorFirst + " " + mentorLast + "</p></li>");
		}
	}

}

/* SIGN IN USER*/
function signInUser() {

	var username = $('#username').val();
	var password = $('#password').val();

	console.log(username);
	console.log(password);
	console.log("in main.js");

	var params = {username: username, password: password};

	console.log(params);

	$.post("/signIn", params, function(data, status) {
		console.log("back from controller");
		
		console.log(data);

		if(data == true){
			console.log("password is valid");
			window.location.replace("main.html");
		}
		else{
			console.log("password is invalid");
		}	


	})

}


function logout() {

	$.get("/logOut", function(status) {
		console.log("logged out");
	});

	window.location.replace("signIn.html");

}