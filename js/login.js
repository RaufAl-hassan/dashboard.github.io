let visibiltyState = false;

const togglePasswordVisibilityUI = document.querySelector(
  "#password-visibility"
);

if (togglePasswordVisibilityUI)
  togglePasswordVisibilityUI.addEventListener("click", (e) => {
    const iconWrapper = e.target.closest(".append-icon");
    const input = iconWrapper.previousElementSibling;

    if (input) {
      visibiltyState = !visibiltyState;
      input.type = visibiltyState ? "text" : "password";
      iconWrapper.title = visibiltyState ? "hide" : "show";
      e.target.classList.toggle("fa-eye-slash");
    } else {
      undefined;
    }
  });
else undefined;
