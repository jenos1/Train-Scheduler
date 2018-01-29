$(document).ready(function() {

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyAhzbkgzUqUZloR9SCVe3LtboKh20u0aaw",
		authDomain: "trains-f0aaf.firebaseapp.com",
		databaseURL: "https://trains-f0aaf.firebaseio.com",
		projectId: "trains-f0aaf",
		storageBucket: "",
		messagingSenderId: "38292520638"
	};

	firebase.initializeApp(config);

	var database = firebase.database();

	// Assign variables. 
  var name = "";
  var dest = ""; 
  var freq = 0;
  var nextArrival = 0;
  var minsAway = 0;
  var time = 0;

	$("#submit").on("click", function(event) {
		// Prevent page refresh to preserve data.
		event.preventDefault();

		// Stores user input in existing variables.
		name = $("#name-input").val().trim();
		dest = $("#dest-input").val().trim();
		time = $("#time-input").val().trim();
		freq = $("#freq-input").val().trim();	

		// Creates an object to hold train data
		var trainInput = {
			name: name,
			dest: dest,
			time: time,
			freq: freq,
		}

		// Moment.js time calculations for trains - define variables.

		// Current Time
		var currTime = moment().format("HH:mm");
		// First Time converstion (Must be pushed back 1 year to make sure it comes before current time).
		var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
		// Difference between current time & converted time in minutes.
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		// Time apart (remainder)
	  var tRemainder = diffTime % freq;
	  // Minutes until next train.
	  var minsAway = freq - tRemainder;
		var nextTrain = (moment().add(minsAway, "minutes")).format("hh:mm");
	  var nextArrival = nextTrain.toString();

		console.log("Current Time is: ", currTime);
		console.log("FirstTimeConverted: ", firstTimeConverted);
		console.log("TimeDiff now & firstArrivaltime converted: ", diffTime);
		console.log("Remainder: ", tRemainder);
	  console.log("Minutes Away: ", minsAway);
	  console.log(nextArrival);

		// Loads data into Firebase db.
		database.ref().push(trainInput);
		// $(".form-control").val('');

		// Create Firebase listener for child changes then download data to client in table format.
		database.ref("trains").on("child_added", function(trainData) {
		console.log(trainData.val());
			$("#name-input").val("");
			$("#dest-input").val("");
			$("#time-input").val("");
			$("#freq-input").val("");
	 		 });

			$("#train-list").append(
			"<tr><td>" + name + "<td>" + dest  + "<td>" + freq + "<td>" + nextArrival + "<td>" + minsAway + "</td></tr>");

			$(".form-control").val('');

	})
})

