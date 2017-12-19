
function addNewRow(){
	var newRow = $('<tr>')
	newRow.addClass('new-row')
	$('.Chart-Content').append(newRow)

}
	


$(document).ready(function () {

   var config = {
    apiKey: "AIzaSyB52UKC3YPbYotshARmKoVljIehyZBDjiI",
    authDomain: "train-schedule-95534.firebaseapp.com",
    databaseURL: "https://train-schedule-95534.firebaseio.com",
    projectId: "train-schedule-95534",
    storageBucket: "train-schedule-95534.appspot.com",
    messagingSenderId: "752216394632"
  };

  firebase.initializeApp(config);


  var database = firebase.database()

	var trainName = ""
	var destination = ""
	var firstTrainTime = 0
	var frequency = 0
	var minAway = 0

	$('.submit').on('click', function(event){
		event.preventDefault()
		trainName = $('#trainName').val().trim()
		destination = $('#destination').val().trim()
		frequency = $('#frequency').val().trim()
		firstTrainTime = $('#trainTime').val().trim()
		minAway = firstTrainTime +  frequency

		database.ref().set({
			Name: trainName,
        	Destination: destination,
        	Frequency: frequency,
        	FirstTrain: firstTrainTime,
        	MinutesAway: minAway,

        });


	});

database.ref().on("value", function(snapshot) {
      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      console.log(snapshot.val().Name);
      console.log(snapshot.val().Destination);
      console.log(snapshot.val().Frequency);
      console.log(snapshot.val().FirstTrain);
      console.log(snapshot.val().MinutesAway);
      // Change the HTML to reflect


      $('.train-name').text(snapshot.val().Name);
      $('.destination-name').text(snapshot.val().Destination);
      $('.frequency').text(snapshot.val().Frequency);
      $('.next-arrive').text(snapshot.val().FirstTrain)
      $('.time-btwn').text(snapshot.val().MinutesAway)
    
})
	, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }

	 



	










});