

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
	var tMinutesTillTrain = 0
	var diffTime = 0

	$('.submit').on('click', function(event){
		event.preventDefault()
		trainName = $('#trainName').val().trim()
		destination = $('#destination').val().trim()
		frequency = $('#frequency').val().trim()
		firstTrainTime = $('#trainTime').val().trim()

		var firstTimeConverted = moment(firstTrainTime, "h:mm a")
    	var currentTime = moment();
 
		//If the current time occurs before the first train time
		if (firstTimeConverted > currentTime) {

    		var diffTime = moment(firstTimeConverted).diff(moment(), 'minutes')

			database.ref().push({
				Name: trainName,
        		Destination: destination,
        		Frequency: frequency,
        		FirstTrain: firstTrainTime,
        		MinutesAway: diffTime

        	})

		} else {

			var firstTimeConverted = moment(firstTrainTime, "hh:mm a").subtract(1, "years")

    		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    		var tRemainder = diffTime % frequency;

    		var tMinutesTillTrain = frequency - tRemainder;

   			var nextTrain = moment().add(tMinutesTillTrain, "minutes");

			database.ref().push({
				Name: trainName,
        		Destination: destination,
        		Frequency: frequency,
        		FirstTrain: firstTrainTime,
        		MinutesAway: tMinutesTillTrain,

        	})

		}

    });

	database.ref().on("child_added", function(snapshot) {
   
		var newRow = $('<tr>')
		newRow.addClass('new-row')
		var thScope = $('<th>')
		thScope.attr('scope', 'col')
		thScope.text(snapshot.val().Name);

		var thScope2 = $('<th>')
		thScope2.attr('scope', 'col')
		thScope2.text(snapshot.val().Destination)

		var thScope3 = $('<th>')
		thScope3.attr('scope', 'col')
		thScope3.text(snapshot.val().Frequency)

		var thScope4 = $('<th>')
		thScope4.attr('scope', 'col')
		thScope4.text(snapshot.val().FirstTrain)

		var thScope5 = $('<th>')
		thScope5.attr('scope', 'col')
		thScope5.text(snapshot.val().MinutesAway)


		newRow.append(thScope)
		newRow.append(thScope2)
		newRow.append(thScope3)
		newRow.append(thScope4)
		newRow.append(thScope5)


		$('.Chart-Content').append(newRow)
	
    
	})
	













});