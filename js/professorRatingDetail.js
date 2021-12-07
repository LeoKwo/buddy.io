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
