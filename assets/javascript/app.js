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

			console.log("Name:", name);
			console.log("dest:", dest);
			console.log("time:", time);
			console.log("freq:", freq);

			// Creates an object to hold train data
			var trainInput = {
				name: name,
				dest: dest,
				time: time,
				freq: freq,
			}

			// Moment.js time calculations for trains.
			// Current Time
			var currTime = moment().format("HH:mm");
			console.log("Current Time is: ", currTime);

			// First Time converstion (Must be pushed back 1 year to make sure it comes before current time).
			var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
			console.log("FirstTimeConverted: ", firstTimeConverted);

			// Difference between current time & converted time in minutes.
			var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
			console.log("TimeDiff now & firstArrivaltime converted: ", diffTime);

			// Time apart (remainder)
		  var tRemainder = diffTime % freq;
		  console.log("Remainder: ", tRemainder);

		  // Minutes until next train.
		  var minsAway = freq - tRemainder;
		  console.log("Minutes Away: ", minsAway);

		  var nextTrain = (moment().add(minsAway, "minutes")).format("hh:mm");
		  var nextArrival = nextTrain.toString();
	    console.log(nextArrival);

			// Loads data into Firebase db.
			database.ref().push(trainInput);
			// $(".form-control").val('');

			// Create Firebase listener for child changes then download data to client table.
			database.ref("trains").on("child_added", function(trainData) {
			console.log(trainData.val());

			$("#name-input").val("");
			$("#dest-input").val("");
			$("#time-input").val("");
			$("#freq-input").val("");
	  });

				$("#train-list").append(
		"<tr><td>" + name + "<td>" + dest  + "<td>" + freq + "<td>" + nextArrival + "<td>" + minsAway + "</td></tr>");

		//can create childnode using /users: database.ref("/users").push
		//your node is your key - key is node of the snapshot. 
		//console.log(snapshot.key) - how we update data later. /users/keyvalue
		// says give me back the timestamp that your server says -- in its own time zone.
		//moment js can then format it correct. It is in diff format.
		//child_added fires when there is one added. See diff of value vs. child_added in the documentation.
		//ref() is root of db. orderbyChild - orders by dateadded and limits to one record - could be last if want.
		//so it sorts and filters. 
		//snapshot gives back full value (ref) from root & child only the child value.
		//use Unix to store your data then convert back as needed

	})
})

