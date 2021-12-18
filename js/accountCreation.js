// create a socket object connecting to localhost:8000
let socket = new WebSocket("ws://127.0.0.1:8000/");
let loggedin = false; // set initial loggedin boolean to false

socket.onopen = function(e) {
  // do nothing
};

socket.onmessage = function(event) {
  if(event.data == "success") {
    loggedin = true;
    socket.close();
    window.location.href = "academia.html";
  }
  if (event.data == "fail") {
    alert("Failed to signup.");
  }
};

socket.onclose = function(event) {
  // default behavior
  if (event.wasClean) {
    alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    alert('[close] Connection died');
  }
};

socket.onerror = function(error) {
  alert(`[error] ${error.message}`);
};

// signing up an account for the user based on the information he/she provides to us
function signup() {
  const email = $("#emailInput").val();
  const password = $("#passwordInput").val();
  const username = $("#usernameInput").val();
  const organization = $('#organizationSelect option:selected').text();
  const role = $('#roleSelect option:selected').text();

  if (email != "" && password != "" && username != "" && organization != "") {
    socket.send("signup");
    socket.send(email);
    socket.send(username);
    socket.send(password);
    socket.send(organization);
    socket.send(role);
    socket.send("end")
  } else {
    // do a banner
    alert("Fill out the required fields!");
  }
}
