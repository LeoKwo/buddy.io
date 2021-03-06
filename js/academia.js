var courseCardImages = document.getElementsByClassName("courseCardImages");
var coursePageButtons = document.getElementsByClassName("coursePageButton");
var i;

// randomly assign colors to the course card's background
const colors = ["#CC99C9", "#9EC1CF", "#9EE09E", "#FDFD97", "#FEB144", "#FF6663"];
for (i = 0; i < courseCardImages.length; i++) {
  var randInt = Math.floor(Math.random() * 6);
  courseCardImages[i].style.backgroundColor = colors[randInt].toString();
}

// create a websocket object connecting to localhost:8000
let socket = new WebSocket("ws://127.0.0.1:8000/");

socket.onopen = function(e) {
  // do nothing
};

socket.onmessage = function(event) {
  // do nothing
};

socket.onclose = function(event) {
  if (event.wasClean) {
    alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    alert('[close] Connection died');
  }
};

socket.onerror = function(error) {
  alert(`[error] ${error.message}`);
};

// connect the user to the correct course details page
function coursePageButtonClick(course_id) {
  socket.send("coursePageId");
  socket.send(course_id);
}
