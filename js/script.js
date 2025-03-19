document.getElementById("toggle-nav").addEventListener("click", function () {
  this.classList.toggle("toggle");
  document.querySelector(".nav__list").classList.toggle("hide-nav");
});
