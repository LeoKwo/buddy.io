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
  alert.(event.data);
  // var courseInfo = new List();
  if (event.data != "course" && event.data != "end" && event.data != "post") {
    // courseInfoArray.add(event.data);
    courseInfoArray.push(event.data);
  }
  if (event.data == "end") {
    socket.close();
    loadCoursePage(courseInfoArray);
  }
  // courseId = event.data;
  // socket.send('end');
  // loadCourseBasedOnId(courseId);
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

// var coursePosts = new Array();

function loadCoursePage(courseInfo) {
  // var courseName = "";
  var courseName = courseInfo[0];
  // var courseDesc = "";
  var coursePosts = new Array();
  for (let i = 2; i < courseInfo.length; i++) {
    // if (i == 0) {
      // courseName = courseInfo[0];
    // } else if (i == 1) {
    //   courseDesc = courseInfo[i];
    // } else {
    // } else {
    coursePosts.push(courseInfo[i]);
    // }
  }

  $("#courseName").html(courseName);
  // $("#courseDescription").html(courseDesc);
  addCoursePosts(coursePosts);
}

function addCoursePosts(postInfo) {
// function addCoursePosts() {
  // var coursePosts = new Array();
  // coursePosts.push("Title");
  // coursePosts.push("FullText");
  // coursePosts.push("Time");

  // $("#newPostCard").after(
  //   "<hr>" +
  //   "<a class='card-body userPosts' href='post.html'>" +
  //     "<h5 class='card-title'>" + "postInfo[i]" + "</h5>" +
  //     "<p class='timePosted' style='font-size:x-small'>" + "postInfo[i + 1]" + "</p>" +
  //     "<p class='card-text'>"+ "postInfo[i + 2]" +
  //     "</p>" +
  //   "</a>"
  // );
  // for (let i = 0; i < coursePosts.length; i+=3) {
  //   $("#newPostCard").after(
  //     "<hr>" +
  //     "<a class='card-body userPosts' href='post.html'>" +
  //       "<h5 class='card-title'>" + coursePosts[i] + "</h5>" +
  //       "<p class='timePosted' style='font-size:x-small'>" + coursePosts[i + 1] + "</p>" +
  //       "<p class='card-text'>"+ coursePosts[i + 2] +
  //       "</p>" +
  //     "</a>"
  //   );
  // }

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

  // <a class="card-body userPosts" href="post.html">
  //   <h5 class="card-title">Homework 5 need help!</h5>
  //   <p class="timePosted" style="font-size:x-small"> 30 seconds before </p>
  //   <p class="card-text">So I never go to class but hw5 is due tmr. Please someone help!
  //   </p>
  // </a>
}
