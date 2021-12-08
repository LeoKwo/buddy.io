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
  // var courseInfo = new List();
  if (event.data != "course" && event.data != "end") {
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


function loadCoursePage(courseInfo) {
  // var courseName = "";
  var courseName = courseInfo[0];
  // var courseDesc = "";
  var coursePosts = new Array();
  for (let i = 3; i < courseInfo.length; i++) {
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
  $("#courseDescription").html(courseDesc);
  addCoursePosts(coursePosts);
}

function addCoursePosts(postInfo) {
  var courseName = "";
  var courseDesc = "";
  var coursePosts = new Array();
  for (let i = 0; i < courseInfo.length; i+=3) {
    // if (i == 0) {
    //   courseName = courseInfo[i];
    // } else if (i == 1) {
    //   courseDesc = courseInfo[i];
    // } else {
    //   coursePosts.push(courseInfo[i]);
    // }
    $("#newPostCard").after(
      "<hr>" +
      "<a class='card-body userPosts' href='post.html'>" +
        "<h5 class='card-title'>" + couseInfo[i] + "</h5>" +
        "<p class='timePosted' style='font-size:x-small'>" + courseInfo[i + 1] + "</p>" +
        "<p class='card-text'>"+ courseInfo[i + 2] +
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
