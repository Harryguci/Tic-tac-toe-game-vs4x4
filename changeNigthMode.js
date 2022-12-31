$("#change-theme-btn").click(function () {
  $(this).find(".icon").toggleClass("active");
  var bg = "--bg-color-1";

  if ($(this).find(".icon").attr("class").includes("active")) {
    bg = "--bg-color-2";
  }
  $("html, body").css({
    "background-color": `var(${bg})`,
  });
});
