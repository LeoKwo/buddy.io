function createNewPost() {
  $("#newPostCard").css("display", "flex");
  $("#newPostCard").css("flow-direction", "row");
  $("#closeIcon").css("display", "flex");
  $("#newPostIcon").css("display", "none");
}

function closeNewPost() {
  $("#newPostCard").css("display", "none");
  $("#closeIcon").css("display", "none");
  $("#newPostIcon").css("display", "flex");
}

function popupFunction() {
  $("#popup").css("display", "block");
}

function popupCloseFunction() {
  $("#popup").css("display", "none");
}

let socket = new WebSocket("ws://127.0.0.1:8000/");
var courseId = 1;
var courseInfoArray = new Array();

socket.onopen = function(e) {
  socket.send('requestCoursePage');
  socket.send('end');
};

socket.onmessage = function(event) {
  alert(event.data);
  if (event.data != "course" && event.data != "end" && event.data != "post") {
    courseInfoArray.push(event.data);
  }
  if (event.data == "end") {
    socket.close();
    loadCoursePage(courseInfoArray);
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

function loadCoursePage(courseInfo) {
  var coursePosts = new Array();
  var courseName = courseInfo[0];
  for (let i = 2; i < courseInfo.length; i++) {
    coursePosts.push(courseInfo[i]);
  }

  $("#courseName").html(courseName);
  addCoursePosts(coursePosts);
}

function addCoursePosts(postInfo) {
  for (let i = 0; i < postInfo.length; i+=3) {
    $("#newPostCard").after(
      "<hr>" +
      "<a class='card-body userPosts' href='post.html'>" +
        "<h5 class='card-title'>" + postInfo[i] + "</h5>" +
        "<p class='timePosted' style='font-size:x-small'>" + postInfo[i + 2] + "</p>" +
        "<p class='card-text'>"+ postInfo[i + 1] +
        "</p>" +
      "</a>"
    );
  }
}

function professorLink(professor_id) {
  socket.send('professorId');
  if (professor_id == 1) {
    socket.send("Andrew Lee");
  } else if (professor_id == 2) {
    socket.send("Ehat Ercanli");
  } else {
    socket.send("Edmund Yu");
  }
  // socket.send('end');
  // socket.end();
  window.location.href = "professorRatingDetail.html";
}

function newPostSubmit() {
  const d = new Date();
  socket.send("newPost");
  socket.send(courseId);
  socket.send($("#newPostTitle").val());
  socket.send($("#newPostTestArea").val());

  socket.send(d.getFullYear());
  socket.send(d.getMonth());
  socket.send(d.getDate());
  // alert($("#newPostTitle").val());
  // alert($("#newPostTestArea").val());
  // alert(d.getFullYear());
  // alert(d.getMonth());
  // alert(d.getDate());
  alert("Submitted!");
  socket.send('requestCoursePage');
  socket.send('end');
}
