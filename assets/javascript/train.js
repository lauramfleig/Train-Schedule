
function addNewRow(){
	var newRow = $('<tr>')
	newRow.addClass('new-row')
	$('.Chart-Content').append(newRow)
	var thScope = $('<th scope = "col">')
	newRow.append(thScope)

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
		firstTrainTime = $('#trainTime').val(moment(firstTrainTime).format("h:mm")).trim()
		console.log(firstTrainTime)
		

		




		minAway = firstTrainTime +  frequency



		database.ref().push({
			Name: trainName,
        	Destination: destination,
        	Frequency: frequency,
        	FirstTrain: firstTrainTime,
        	MinutesAway: minAway,

        });

     


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
	
	
     



      // $('.train-name').text(snapshot.val().Name);
      // $('.destination-name').text(snapshot.val().Destination);
      // $('.frequency').text(snapshot.val().Frequency);
      // $('.next-arrive').text(snapshot.val().FirstTrain)
      // $('.time-btwn').text(snapshot.val().MinutesAway)
    
})
	, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }

	 



	










});