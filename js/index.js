document.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const title = header.querySelector("h1");
  const particlesDiv = document.getElementById("particles-js");

  // Calculate the scroll percentage based on the window height or another threshold
  let scrollPercent = window.scrollY / (0.15 * window.innerHeight);
  scrollPercent = Math.min(1, scrollPercent); // Cap at 1 (100%)

  // Set the styles according to the scroll position
  const opacity = scrollPercent;
  const translateY = -100 + scrollPercent * 100; // Calculate translateY value

  header.style.backgroundColor = `rgba(43, 43, 43, ${opacity})`;
  title.style.opacity = `${opacity}`;
  title.style.transform = `translateY(${translateY}%)`;
  particlesDiv.style.opacity = scrollPercent;
});

document.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

particlesJS.load("particles-js", "particles.json", function () {
  console.log("particles.js loaded - callback");
});

function toggleCollapse() {
  var content = document.getElementById("collapsibleContent");
  if (content.style.display === "none") {
    content.style.display = "block";
  } else {
    content.style.display = "none";
  }
}
