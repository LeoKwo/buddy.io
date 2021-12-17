let socket = new WebSocket("ws://127.0.0.1:8000/");

var courseSearchResultArray = new Array();

socket.onopen = function(e) {
  // do nothing
  socket.send("end");
};

socket.onmessage = function(event) {
  if (event.data != "courseSearchResult" && event.data != "end") {
    courseSearchResultArray.push(event.data);
  }
  if (event.data == "end") {
    renderCourseSearchResult(courseSearchResultArray);
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

function searchCourse() {
  const courseKeyword = $("#courseKeywordInput").val();
  socket.send(courseKeyword);
  socket.send("end");
  // console.log(email);
  // $("#testH1").html(courseKeyword);
  // alert(document.getElementById("email").value);
}

function renderCourseSearchResult() {
  $("#search").nextAll().remove();
  for (let i = 0; i < courseSearchResultArray.length; i+=2) {
    $("#search").after(
      '<div class="col-sm-6 courseCard">' +
        '<div class="card courseCardInside">' +
          '<div class="card-body">' +
            '<h5 class="card-title">' + courseSearchResultArray[i] + '</h5>' +
            '<p class="card-text">' + courseSearchResultArray[i + 1] + '</p>' +
            '<button class="btn btn-primary addCourseBtn" onclick="addCourse()">Add</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }
}

function addCourse() {
  
}
