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
