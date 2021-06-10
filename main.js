/* https://jhildenbiddle.github.io/css-vars-ponyfill/#/?id=variables */
/*Determines how the ponyfill handles modern browsers with native CSS custom property support.

When true, the ponyfill will only generate legacy-compatible CSS and invoke associated callbacks in browsers that lack native support for CSS custom properties (i.e. “legacy” browsers). When false, the ponyfill will treat all browsers as legacy, generating legacy-compatible CSS and invoking associated callbacks regardless of support for CSS custom properties.

Tip: Setting this value to false allows for easier testing and debugging in modern browsers when legacy browsers are not accessible. */

// cssVars({
//   onlyLegacy: true, // default
// });

// cssVars({
//   // Treat all browsers as legacy
//   onlyLegacy: false,
// });

cssVars({
  // Treat Edge 15/16 as legacy
  onlyLegacy: !/Edge\/1[56]\./i.test(navigator.userAgent),
});

document.addEventListener("DOMContentLoaded", function () {
  /*HAMBURGER */
  var navIcon = document.querySelector("#nav-icon");
  if (navIcon) {
    navIcon.addEventListener("click", function () {
      console.log("click");
      navIcon.classList.toggle("open");
    });
  }
  /*SLIDER */
  let timeoutId;

  //const slides = Array.from(document.querySelectorAll(".slide"));
  const slides = Array.prototype.slice.call(
    document.querySelectorAll(".slide")
  );
  //const slider = document.querySelectorAll(".slider");
  const buttons = document.querySelectorAll(".slider-button");
  const dotsEl = document.querySelector(".dots");

  function getNextPrev() {
    const activeSlide = document.querySelector(".slide.active");
    const activeIndex = slides.indexOf(activeSlide);
    let next, prev;
    if (activeIndex === slides.length - 1) {
      next = slides[0];
    } else {
      next = slides[activeIndex + 1];
    }
    if (activeIndex === 0) {
      prev = slides[slides.length - 1];
    } else {
      prev = slides[activeIndex - 1];
    }
    return [next, prev];
  }
  function getPosition() {
    const activeSlide = document.querySelector(".slide.active");
    const activeIndex = slides.indexOf(activeSlide);
    //const [next, prev] = getNextPrev();
    let next = getNextPrev()[0];
    let prev = getNextPrev()[1];
    Array.prototype.slice.call(slides).forEach(function (slide, index) {
      if (index === activeIndex) {
        slide.style.transform = "translateX(0)";
      } else if (slide === prev) {
        slide.style.transform = "translateX(-100%)";
      } else if (slide === next) {
        slide.style.transform = "translateX(100%)";
      } else {
        slide.style.transform = "translateX(100%)";
      }
      //transitionend
      slide.addEventListener("transitionend", function () {
        slide.classList.remove("top");
      });
    });
  }
  Array.prototype.slice.call(buttons).forEach(function (button) {
    button.addEventListener("click", function () {
      if (button.classList.contains("next")) getNextSlide();
      else if (button.classList.contains("prev")) getPrevSlide();
    });
  });

  function getNextSlide() {
    clearInterval(timeoutId);
    const current = document.querySelector(".slide.active");
    //const [next, prev] = getNextPrev();
    const next = getNextPrev()[0];
    if (current.classList.contains("top")) {
      return;
    }
    current.classList.add("top");
    next.classList.add("top");
    current.style.transform = "translate(-100%)";
    current.classList.remove("active");
    next.style.transform = "translateX(0)";
    next.classList.add("active");
    getPosition();
    getActiveDot();
    autoLoop();
  }
  function getPrevSlide() {
    clearInterval(timeoutId);
    const current = document.querySelector(".active");
    //const [next, prev] = getNextPrev();
    const prev = getNextPrev()[1];
    current.classList.add("top");
    prev.classList.add("top");
    current.style.transform = "translate(100%)";
    current.classList.remove("active");
    prev.style.transform = "translateX(0)";
    prev.classList.add("active");
    getPosition();
    getActiveDot();
    autoLoop();
  }
  getPosition();

  // dots
  Array.prototype.slice.call(slides).forEach(function (slide) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dotsEl.appendChild(dot);
  });
  function getActiveDot() {
    const allDots = document.querySelectorAll(".dots .dot");
    Array.prototype.slice.call(allDots).forEach(function (dot) {
      dot.classList.remove("active");
    });
    const activeSlide = document.querySelector(".slide.active");
    const activeIndex = slides.indexOf(activeSlide);
    allDots[activeIndex].classList.add("active");
  }
  function functionalDots() {
    const allDots = document.querySelectorAll(".dots .dot");
    Array.prototype.slice.call(allDots).forEach(function (dot, index) {
      dot.addEventListener("click", function () {
        getDotSlide(index);
      });
    });
  }
  function getDotSlide(index) {
    clearTimeout(timeoutId);
    Array.prototype.slice.call(slides).forEach(function (slide) {
      slide.classList.remove("active");
    });
    const current = slides[index];
    current.classList.add("active");
    getPosition();
    getActiveDot();
    autoLoop();
  }

  function autoLoop() {
    timeoutId = setTimeout(function () {
      getNextSlide();
    }, 5000);
  }
  getActiveDot();
  functionalDots();
  //autoLoop();
});
