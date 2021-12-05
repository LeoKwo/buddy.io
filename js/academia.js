var courseCardImages = document.getElementsByClassName("courseCardImages");
var coursePageButtons = document.getElementsByClassName("coursePageButton");
var i;

const colors = ["#CC99C9", "#9EC1CF", "#9EE09E", "#FDFD97", "#FEB144", "#FF6663"];
for (i = 0; i < courseCardImages.length; i++) {
  var randInt = Math.floor(Math.random() * 6);
  courseCardImages[i].style.backgroundColor = colors[randInt].toString();
  // coursePageButtons[i].style.backgroundColor = colors[randInt].toString();
}
