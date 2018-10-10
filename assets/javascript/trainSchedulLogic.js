// Initialize Firebase


<script src="https://www.gstatic.com/firebasejs/5.5.3/firebase.js"></script>
/* <script> */

  var config = {
    apiKey: "AIzaSyBBRGpHAN_PHxaouRjt69jimjWFJTOOn6g",
    authDomain: "anyname-5ad2a.firebaseapp.com",
    databaseURL: "https://anyname-5ad2a.firebaseio.com",
    projectId: "anyname-5ad2a",
    storageBucket: "anyname-5ad2a.appspot.com",
    messagingSenderId: "379410627625"
  };
  firebase.initializeApp(config);
/* </script> */

// var config = {
//   apiKey: "AIzaSyBBRGpHAN_PHxaouRjt69jimjWFJTOOn6g",
// //   apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
//   authDomain: "time-sheet-55009.firebaseapp.com",
//   databaseURL: "https://time-sheet-55009.firebaseio.com",
//   storageBucket: "time-sheet-55009.appspot.com"
// };

// firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-time-input").val().trim(), "MM/DD/YYYY").format("X");
  var frequency = $("#frequency input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    role: destination,
    start: firstTrain,
    rate: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.role);
  console.log(newTrain.start);
  console.log(newTrain.rate);

//   alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency input").val("");
  
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().role;
  var firstTrain = childSnapshot.val().start;
  var frequency = childSnapshot.val().rate;

  // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  // clean up date
  var firstTrainClean = moment.unix(firstTrain).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment(firstTrain, "X"), "months");
  console.log(empMonths);

  // Calculate the total billed rate
  var empBilled = empMonths * frequency;
  console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(firstTrainClean),
    $("<td>").text(empMonths),
    $("<td>").text(frequency),
    $("<td>").text(empBilled)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});


