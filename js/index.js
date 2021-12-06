let socket = new WebSocket("ws://127.0.0.1:8000/");

socket.onopen = function(e) {
  alert("[open] Connection established");
  alert("Sending to server");
  socket.send("My name is John");
};

socket.onmessage = function(event) {
  alert(`[message] Data received from server: ${event.data}`);
  // $("#testH1").html(event.data);
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
  // socket.send(email);
  // socket.send(email);
  // console.log(email);
  $("#testH1").html(email);
  // alert(document.getElementById("email").value);
}
