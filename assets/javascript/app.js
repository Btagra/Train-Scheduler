$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBn6D2D5_SJ5lW67axyauuZt3-_zb2PqyI",
        authDomain: "train-scheduler-9db65.firebaseapp.com",
        databaseURL: "https://train-scheduler-9db65.firebaseio.com",
        projectId: "train-scheduler-9db65",
        storageBucket: "train-scheduler-9db65.appspot.com",
        messagingSenderId: "509917488439"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();
        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var trainTime = $("#train-time-input").val().trim();
        var frequency = $("#frequency-input").val().trim();

        var newTrain = {
            name: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency
        };

        database.ref().push(newTrain);

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.trainTime);
        console.log(newTrain.frequency);

        alert("Train successfully added");

        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#train-time-input").val("");
        $("#frequency-input").val("");
    });

    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().trainTime;
        var frequency = childSnapshot.val().frequency;

        var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % frequency;
        var tMinutesTillTrain = frequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var nextArrival = moment(nextTrain).format("hh:mm A");

        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextArrival),
            $("<td>").text(tMinutesTillTrain)
        );

        $("#train-table > tbody").append(newRow);
    });

});