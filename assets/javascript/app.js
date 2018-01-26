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

	// Get a reference to the database service & assign variables.
  var database = firebase.database();
  var name = "";
  var dest = ""; 
  var freq = 0;
  var nextArrival = 0;
  var minsAway = 0;
	var time = 0;

$("#submit").on("click", function(event) {
	event.preventDefault();

	name = $("#name-input").val().trim();
	dest = $("#dest-input").val().trim();
	time = $("#time-input").val().trim();
	freq = $("#freq-input").val().trim();	

	console.log("Name:", name);
	console.log("dest:", dest);
	console.log("time:", time);
	console.log("freq:", freq);

	var trainInput = {
		name: name,
		dest: dest,
		time: time,
		freq: freq
	}
	database.ref("trains").push(trainInput);
})

	database.ref("trains").on("child_added", function(trainData) {
		console.log(trainData.val());
		// $("#train-table tr").remove(); 
		// $("#list tbody").remove();
		$("#train-list").append(
		// "<tr><td>" + name + dest + time + freq + nextArrival + minsAway + "</td></tr>");
		"<tr><td>" + name +
		"<tr><td>" + dest +	
		"<tr><td>" + time +	
		"<tr><td>" + freq +
		"<tr><td>" + nextArrival +
		"<tr><td>" + minsAway +
		"<td><tr>");

	})


})

