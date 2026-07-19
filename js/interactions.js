(function () {
  // Scroll progress bar
  var bar = document.querySelector(".scroll-progress");
  function updateProgress() {
    var doc = document.documentElement;
    var scrollable = doc.scrollHeight - doc.clientHeight;
    var pct = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
    if (bar) bar.style.width = pct + "%";
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  });
  updateProgress();

  // Reveal-on-scroll
  var targets = document.querySelectorAll(".reveal, .reveal-group");
  if ("IntersectionObserver" in window && targets.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach(function (el) {
      io.observe(el);
    });
  } else {
    targets.forEach(function (el) {
      el.classList.add("in-view");
    });
  }
})();
