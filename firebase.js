var myFirebaseRef = new Firebase("https://<firebase_app>.firebaseio.com/");


function sendMessage() {

	var message = document.getElementById("inputMessage").value;

	if (message == "" || message == null) {
		// Do nothing
	} else {
		// Get date for time
		var currentdate = new Date();

		var hour = checkHour(currentdate.getHours())

		var minute = checkTime(currentdate.getMinutes())
		var ext = checkDay(currentdate.getHours());

		var currentTime = hour + ":" + minute + ext;
		var user = "";

		if (user == "" || user == null) {
			user = "Anonymous1";
		}

		var messageRef = myFirebaseRef.child("mainChatRoom");

		messageRef.push({
			name : user,
			message : message,
			time : currentTime

		});

		document.getElementById('inputMessage').value = '';

	}

}
function checkHour(h) {
	if (h > 12) {
		h = (h - 12);

		if (h < 10) {
			h = "0" + h;

		} else if (h == 12) {
			h = "00";
		}
	}

	return h;
}

function checkDay(d) {
	if (d > 12) {
		ext = 'PM';
	} else {
		ext = 'AM';
	}

	if (d > d) {
		d = (d - 12);
		ext = 'PM';

		if (d == 12) {
			ext = 'AM';
		}
	} else if (d < 12) {
		ext = 'AM';
	} else if (d == 12) {
		ext = 'PM';
	}

	return ext;
}

function checkTime(i) {
	if (i < 10) {
		i = "0" + i
	}
	; // add zero in front of numbers < 10
	return i;
}

// Retrieve new posts as they are added to our database
var ChatRef = myFirebaseRef.child('mainChatRoom');
ChatRef.on("child_added", function(snapshot) {
	var newPost = snapshot.val();

	var getName = newPost.name;
	var getMessage = newPost.message;
	var getTime = " ("+newPost.time+"):";

	var messageList = $('#messages');
	// CREATE ELEMENTS MESSAGE & SANITIZE TEXT
	var messageElement = $("<tr>");
	var breakLine = $("<br>");
	
	//CREATE ELEMETS FOR NAME & TIME
	var nameSpace = $("<span>");
	var nameElement = $("<strong class='example-chat-username'></strong>")
	nameElement.text(getName);
	nameSpace.text(getTime).prepend(nameElement);
	messageElement.text(getMessage).prepend(breakLine)
	messageElement.prepend(nameSpace);
	
	// ADD MESSAGE
	messageList.append(messageElement);

	// SCROLL TO BOTTOM OF MESSAGE LIST
	messageList[0].scrollTop = messageList[0].scrollHeight;
});
