function tabOnclick() {
  const fleaMarketTab = $("#fleaMarketTab");
  const buddyExperienceTab = $("#buddyExperienceTab");
  const pageTitle = $("#pageTitle");
  const bannerPhoto = $("#bannerPhoto");

  if (fleaMarketTab.hasClass("active")) {
    fleaMarketTab.removeClass("active");
    buddyExperienceTab.addClass("active");
    pageTitle.html("BuddyExperience");
    bannerPhoto.css("background-image", "url('../img/experienceBannerPhoto.jpeg')");
  } else {
    fleaMarketTab.addClass("active");
    buddyExperienceTab.removeClass("active");
    pageTitle.html("FleaMarket");
    bannerPhoto.css("background-image", "url('../img/marketBannerPhoto.jpeg')");
  }

  // TODO: Post switch when clicking button
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
