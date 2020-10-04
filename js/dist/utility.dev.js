"use strict";

// UI VARIABLES
var hamburgerIcon = document.querySelector(".hamburger-icon");
var asideBar = document.querySelector(".main-aside");
var asideSubLinks = document.querySelectorAll(".aside-sub-links");
var asideSubLinksWrapper = document.querySelectorAll(".aside-sub-links-wrapper");
var mainMain = document.querySelector(".main-main"); // handle aside bar toggler

hamburgerIcon.addEventListener("click", function () {
  if (window.innerWidth > 500) {
    asideBar.classList.toggle("main-aside-animate");
    mainMain.classList.toggle("main-main-animate");
  }
});
window.addEventListener("resize", function () {
  if (window.innerWidth <= 500) {
    asideBar.classList.remove("main-aside-animate");
    mainMain.classList.remove("main-main-animate");
  }
}); // handle aside sub links

asideSubLinksWrapper.forEach(function (link) {
  link.addEventListener("mouseenter", function (e) {
    if (!e.target.closest(".main-aside-animate")) e.target.children[2].classList.add("aside-sub-links-animate");
    if (e.target.closest(".main-aside-animate")) e.target.closest(".aside-sub-links-wrapper").children[2].classList.add("aside-sub-links-animate-open");
  });
});
asideSubLinksWrapper.forEach(function (link) {
  link.addEventListener("mouseleave", function (e) {
    if (!e.target.closest(".main-aside-animate")) e.target.children[2].classList.remove("aside-sub-links-animate");
    if (e.target.closest(".main-aside-animate")) e.target.closest(".aside-sub-links-wrapper").children[2].classList.remove("aside-sub-links-animate-open");
  });
});