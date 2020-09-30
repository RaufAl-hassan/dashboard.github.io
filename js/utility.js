// UI VARIABLES
const hamburgerIcon = document.querySelector(".hamburger-icon");
const asideBar = document.querySelector(".main-aside");
const asideSubLinks = document.querySelectorAll(".aside-sub-links");
const asideSubLinksWrapper = document.querySelectorAll(
  ".aside-sub-links-wrapper"
);
const mainMain = document.querySelector(".main-main");

// handle aside bar toggler
hamburgerIcon.addEventListener("click", () => {
  if (window.innerWidth > 500) {
    asideBar.classList.toggle("main-aside-animate");
    mainMain.classList.toggle("main-main-animate");
  }
});
window.addEventListener("resize", () => {
  if (window.innerWidth <= 500) {
    asideBar.classList.remove("main-aside-animate");
    mainMain.classList.remove("main-main-animate");
  }
});

// handle aside sub links
asideSubLinksWrapper.forEach((link) => {
  link.addEventListener("mouseenter", (e) => {
    if (!e.target.closest(".main-aside-animate"))
      e.target.children[2].classList.add("aside-sub-links-animate");

    if (e.target.closest(".main-aside-animate"))
      e.target
        .closest(".aside-sub-links-wrapper")
        .children[2].classList.add("aside-sub-links-animate-open");
  });
});
asideSubLinksWrapper.forEach((link) => {
  link.addEventListener("mouseleave", (e) => {
    if (!e.target.closest(".main-aside-animate"))
      e.target.children[2].classList.remove("aside-sub-links-animate");

    if (e.target.closest(".main-aside-animate"))
      e.target
        .closest(".aside-sub-links-wrapper")
        .children[2].classList.remove("aside-sub-links-animate-open");
  });
});
