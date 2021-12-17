let socket = new WebSocket("ws://127.0.0.1:8000/");

var isBuddyExp = true;
var campusLifeInfoArray = new Array();

socket.onopen = function(e) {
  // socket.send('end');
  loadCampusLife();
};

socket.onmessage = function(event) {
  alert(event.data);
  if (event.data != "campuslife" && event.data != "end") {
    campusLifeInfoArray.push(event.data);
  }
  if (event.data == "end") {
    addPosts(campusLifeInfoArray);
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

function loadCampusLife() {
  if (isBuddyExp) {
    socket.send("buddyexperience");
    socket.send("end");
  } else {
    socket.send("fleamarket");
    socket.send("end");
  }
}

function addPosts(posts) {
  $("#newPostCard").nextAll().remove();
  for (let i = 0; i < posts.length; i+=3) {
    $("#newPostCard").after(
      "<hr>" +
      "<a class='card-body userPosts' href='post.html'>" +
        "<h5 class='card-title'>" + posts[i] + "</h5>" +
        "<p class='timePosted' style='font-size:x-small'>" + posts[i + 2] + "</p>" +
        "<p class='card-text'>"+ posts[i + 1] + "</p>" +
      "</a>"
    );
  }
  campusLifeInfoArray = new Array();
}








function tabOnclick() {
  const fleaMarketTab = $("#fleaMarketTab");
  const buddyExperienceTab = $("#buddyExperienceTab");
  const pageTitle = $("#pageTitle");
  const bannerPhoto = $("#bannerPhoto");

  if (fleaMarketTab.hasClass("active")) {
    fleaMarketTab.removeClass("active");
    buddyExperienceTab.addClass("active");
    pageTitle.html("BuddyExperience");
    bannerPhoto.css("background-image", "url('img/experienceBannerPhoto.jpeg')");
    isBuddyExp = true;
    loadCampusLife();
  } else {
    fleaMarketTab.addClass("active");
    buddyExperienceTab.removeClass("active");
    pageTitle.html("FleaMarket");
    bannerPhoto.css("background-image", "url('img/marketBannerPhoto.jpeg')");
    isBuddyExp = false;
    loadCampusLife();
  }
}

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





function newPostSubmit() {
  const d = new Date();
  if (isBuddyExp) {
    socket.send("newBuddyExpPost");
  } else {
    socket.send("newFleaMartPost");
  }
  // socket.send("newPost");
  // socket.send(courseId);
  socket.send($("#newPostTitle").val());
  socket.send($("#newPostTestArea").val());
  socket.send(d.getFullYear().toString());
  socket.send(d.getMonth().toString());
  socket.send(d.getDate().toString());
  alert("Submitted!");
  window.location.href = "coursePage.html";
}
