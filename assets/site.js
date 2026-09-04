// LSDB Field Guide — copy buttons and sidebar scroll-spy. No dependencies.

(function () {
  "use strict";

  // Copy buttons. The snippet body is exactly what we hand to the clipboard,
  // which is why snippets are written without >>> prompts.
  document.querySelectorAll(".snippet").forEach(function (snippet) {
    var bar = snippet.querySelector(".snippet__bar");
    var code = snippet.querySelector("pre code");
    if (!bar || !code || !navigator.clipboard) return;

    var button = document.createElement("button");
    button.className = "copy";
    button.type = "button";
    button.textContent = "copy";
    button.addEventListener("click", function () {
      navigator.clipboard.writeText(code.textContent.trim()).then(function () {
        button.textContent = "copied";
        button.classList.add("is-done");
        setTimeout(function () {
          button.textContent = "copy";
          button.classList.remove("is-done");
        }, 1400);
      });
    });
    bar.appendChild(button);
  });

  // Scroll-spy: highlight the sidebar entry for whichever section is in view.
  var links = new Map();
  document.querySelectorAll(".sidebar a[href^='#']").forEach(function (link) {
    var target = document.getElementById(link.getAttribute("href").slice(1));
    if (target) links.set(target, link);
  });
  if (!links.size || !("IntersectionObserver" in window)) return;

  var visible = new Set();
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });

      // Of everything on screen, mark the one nearest the top of the document.
      var winner = null;
      visible.forEach(function (element) {
        if (!winner || element.offsetTop < winner.offsetTop) winner = element;
      });
      if (!winner) return;

      links.forEach(function (link) { link.classList.remove("is-active"); });
      links.get(winner).classList.add("is-active");
    },
    { rootMargin: "-4rem 0px -60% 0px" }
  );
  links.forEach(function (_link, target) { observer.observe(target); });
})();
