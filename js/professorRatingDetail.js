let socket = new WebSocket("ws://127.0.0.1:8000/");
// var professorId = 1;

socket.onopen = function(e) {
  // socket.send('requestProfessorPage');
  socket.send('end');
};

var professorInfoArray = new Array();
socket.onmessage = function(event) {
  alert(event.data);
  if (event.data != "rate" && event.data != "end") {
    professorInfoArray.push(event.data);
  }
  if (event.data == "end") {
    loadProfessorPage(loadProfessorPage);
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

loadProfessorPage(professorInfo) {
  $("#professorName").html(professorInfo[1]);
  $("#professorRating").html("Overall: " + professorInfo[2] + "stars");
  $("#professorAvatar").css("src", "img/professor" + professorInfo[0] + ".jpeg")
  // for (let i = 0; i < professorInfo.length; i++) {
  //   $("$professorName").html(professorInfo[i])
  // }
}




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
