// add "Create New Post" section to the page
// this section will allow the users to create new posts about the course
// with the information that they provide
function createNewPost() {
  $("#newPostCard").css("display", "flex");
  $("#newPostCard").css("flow-direction", "row");
  $("#closeIcon").css("display", "flex");
  $("#newPostIcon").css("display", "none");
}

// removes "Create New Post" section from the page
// will collapse the new post section to a hidden state to remove visual clutter
function closeNewPost() {
  $("#newPostCard").css("display", "none");
  $("#closeIcon").css("display", "none");
  $("#newPostIcon").css("display", "flex");
}

// opens the popup modal and display the COVID-19 warning message
function popupFunction() {
  $("#popup").css("display", "block");
}

// hide the popup modal
function popupCloseFunction() {
  $("#popup").css("display", "none");
}

// create a new websocket object on localhost:8000
let socket = new WebSocket("ws://127.0.0.1:8000/");
var courseId = 1; // set courseId to 1. We use courseId to referes to different courses. This matches data in the database
var courseInfoArray = new Array();

socket.onopen = function(e) {
  socket.send('end');
};

socket.onmessage = function(event) {
  if (event.data != "course" && event.data != "end" && event.data != "post") {
    courseInfoArray.push(event.data);
  }
  if (event.data == "end") {
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

// load coursepage with the latest course posts
function loadCoursePage(courseInfo) {
  var coursePosts = new Array();
  var courseName = courseInfo[0];
  courseId = courseInfo[1];
  for (let i = 3; i < courseInfo.length; i++) {
    coursePosts.push(courseInfo[i]);
  }
  $("#courseName").html(courseName);
  addCoursePosts(coursePosts);
}

// sequentially add post stored in the database to the webpage
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

// communicate with the server to let it know which professor's profile we want to visit
// and connect to that professor's rating page
function professorLink(professor_id) {
  socket.send('professorId');
  if (professor_id == 1) {
    socket.send("Andrew Lee");
  } else if (professor_id == 2) {
    socket.send("Ehat Ercanli");
  } else {
    socket.send("Edmund Yu");
  }
  window.location.href = "professorRatingDetail.html";
}

// submit new post's information to the server
// reload the page with the new post displayed
function newPostSubmit() {
  const d = new Date();
  socket.send("newPost");
  socket.send(courseId);
  socket.send($("#newPostTitle").val());
  socket.send($("#newPostTestArea").val());

  socket.send(d.getFullYear().toString());
  socket.send(d.getMonth().toString());
  socket.send(d.getDate().toString());
  alert("Submitted!");
  window.location.href = "coursePage.html";
}
