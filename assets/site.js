/* Finsnovai site script: theme toggle, reveal on scroll, hero fade, reading progress. */
(function () {
  var root = document.documentElement;

  /* Theme. The choice is remembered on this device only. */
  var toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      toggle.setAttribute("aria-label", next === "light" ? "Switch to dark mode" : "Switch to light mode");
      try { localStorage.setItem("finsnovai-theme", next); } catch (e) {}
    });
    toggle.setAttribute("aria-label", root.getAttribute("data-theme") === "light" ? "Switch to dark mode" : "Switch to light mode");
  }

  /* Text and borders appear as they scroll into view. */
  var revealables = document.querySelectorAll("[data-reveal], [data-weave]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealables.forEach(function (el, i) {
      var delay = el.getAttribute("data-reveal-delay");
      if (delay) el.style.transitionDelay = delay + "ms";
      io.observe(el);
    });
  } else {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* The hero gently fades and lifts away as the page scrolls. */
  var hero = document.querySelector("[data-hero]");
  /* Reading progress bar on articles. */
  var bar = document.querySelector("[data-progress]");
  var article = document.querySelector("[data-article]");

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || window.pageYOffset;
      if (hero && !reduce) {
        var h = window.innerHeight;
        var t = Math.min(y / (h * 0.75), 1);
        hero.style.opacity = String(1 - t);
        hero.style.transform = "translateY(" + (-y * 0.18).toFixed(1) + "px)";
      }
      if (bar && article) {
        var start = article.offsetTop;
        var end = start + article.offsetHeight - window.innerHeight;
        var p = Math.max(0, Math.min(1, (y - start) / Math.max(end - start, 1)));
        bar.style.transform = "scaleX(" + p.toFixed(4) + ")";
      }
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
