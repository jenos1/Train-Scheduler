$(document).ready(function () {

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

	$("#submit").on("click", function (event) {
		event.preventDefault();

		var name = $("#name-input").val().trim();
		var dest = $("#dest-input").val().trim();
		var time = $("#time-input").val().trim();
		var freq = $("#freq-input").val().trim();

		var trainInput = {
			name: name,
			dest: dest,
			time: time,
			freq: freq,
		}

		database.ref("trains").push(trainInput);
		$(".form-control").val('');

	})

	// Create Firebase listener for onclick child changes then download data to client in table format.
	database.ref("trains").on("child_added", function (trainData) {
		var name = (trainData.val().name);
		var dest = (trainData.val().dest);	
		var time = (trainData.val().time);
		var freq = (trainData.val().freq);

	// Moment.js - use time calculations to convert train time.
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

		$("#train-list").append(
		"<tr><td>" + trainData.val().name + "<td>" + trainData.val().dest
		+ "<td>" + trainData.val().freq + "<td>" + nextArrival + "<td>" + minsAway + "</td></tr>");

	})
});