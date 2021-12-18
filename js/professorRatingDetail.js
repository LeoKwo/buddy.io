// create a websocket object connecting to localhost:8000
let socket = new WebSocket("ws://127.0.0.1:8000/");

socket.onopen = function(e) {
  socket.send('end');
};

socket.onmessage = function(event) {
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

// load the page with the current professor's information
// display the professor's name, rating, image on top of page
function loadProfessorPage(professorInfo) {
  $("#professorName").html(professorInfo[1]);
  $("#professorRating").html("Overall: " + professorInfo[2] + "stars");
  $("#professorAvatar").css("src", "img/professor" + professorInfo[0] + ".jpeg");
}

// switch tabs between good comments and bad comments
function tabOnclick() {
  const negativeTab = $("#negativeTab");
  const positiveTab = $("#positiveTab");

  const commentOne = $("#commentOne");
  const commentTwo = $("#commentTwo");
  const commentThree = $("#commentThree");

  if (negativeTab.hasClass("active")) {
    negativeTab.removeClass("active");
    positiveTab.addClass("active");
    commentOne.html("Best. Period");
    commentTwo.html("Easy homework.");
    commentThree.html("Light workload.");
  } else {
    negativeTab.addClass("active");
    positiveTab.removeClass("active");
    commentOne.html("Bad. Terrible. Avoid at all cost");
    commentTwo.html("RUUUUN");
    commentThree.html("Take his course if only you want to fail :C");
  }
}

// respond to star clicks
// send star rating to the backend
// display's users' star rating for this professor
function starClick(star_id) {
  alert("You gave this instructor " + star_id + " star(s) rating!");
  socket.send("rating");
  socket.send($("#professorName").text());
  socket.send(star_id);
  socket.send("end");
  $("#ratingMessage").html("You have rated this instructor " + star_id + " stars.")
  $("#ratingPrompt").html("")
  for (let i = 1; i <= star_id; i++) {
    $("#" + i).empty();
    $("#" + i).html('<i class="fas fa-star ratingStar" style="color:#F76900"></i>');
  }

  for (let i = star_id + 1; i <= 5; i++) {
    $("#" + i).empty();
    $("#" + i).html('<i class="far fa-star ratingStar" style="color:#F76900"></i>');
  }
}
