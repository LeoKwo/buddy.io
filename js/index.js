let socket = new WebSocket("ws://127.0.0.1:8000/");
let loggedin = false;

socket.onopen = function(e) {
  // alert("[open] Connection established");
  // alert("Sending to server");
  // socket.send("My name is John");
};

socket.onmessage = function(event) {
  alert(`[message] Data received from server: ${event.data}`);
  $("#testH1").html(event.data);
  if (event.data == "connected") {
    alert(`[message] Data received from server: ${event.data}`);
    // loggedin = true;
    // socket.close();
    // window.location.href = "academia.html";
    // $("#popup").css("display", "block");
  }
  if(event.data == "success") {
    loggedin = true;
    socket.close();
    window.location.href = "academia.html";
    // res.redirect('/UserHomePage');
  }
  if (event.data == "fail") {
    // $("#popup").css("display", "block");
    $("#popup").css("display", "block");
  }

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

function login() {
  const email = $("#email").val();
  const password = $("#password").val();
  socket.send("login")

  socket.send(email + "@syr.edu");
  socket.send(password);
  socket.send("end");
}

function popupCloseFunction() {
  $("#popup").css("display", "none");
}
