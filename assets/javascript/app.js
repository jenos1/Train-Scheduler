$(document).ready(function() {

	// Initialize Firebase
	var config = {
	  apiKey: "AIzaSyA2_y_RdRtwMuAg33LHlBCZ0U8JqRwJY-0",
	  authDomain: "fir-click-counter-7cdb9.firebaseapp.com",
	  databaseURL: "https://fir-click-counter-7cdb9.firebaseio.com",
	  storageBucket: "fir-click-counter-7cdb9.appspot.com"
	  };

	firebase.initializeApp(config);

	// Get a reference to the database service
  var database = firebase.database();



})