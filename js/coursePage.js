// function createNewPost() {
//   $("#postInteraction").after(
//     "<div class='card-header' style='display:flex; flow-direction:row;'>" +
//       "<form id='newPostForm'>" +
//         "<div class='form-group'>" +
//           "<label for='newPostTitle'>Topic</label>" +
//           "<input type='email' class='form-control' id='newPostTitle' placeholder='Homework 5 discussion, Review material for midterm?, etc.'>" +
//         "</div>" +
//         "<div class='form-group'>" +
//           "<label for='newPostTestArea'>What's on your mind?</label>" +
//           "<textarea class='form-control' id='newPostTestArea'></textarea>" +
//         "</div>" +
//         "<button type='submit' class='btn btn-primary' style='background-color: #F76900; margin-left:auto;'>AskForHelp!</button>" +
//       "</form>" +
//     "</div>");
//     $("#newPost").prop("disabled",true);
// }
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










// // Get the modal
// var modal = document.getElementById("myModal").style.display = "block";;
//
// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");
//
// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
//
// // When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }
//
// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }
//
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

function popupFunction() {
  // modal.style.display = "block";
  $("#popup").css("display", "block");
  // $("#myModal").show();
}

function popupCloseFunction() {
  $("#popup").css("display", "none");
}
