/* =========================================================
   农蕊 · 个人简历 — 交互脚本
   实现：FadeIn 入场、Magnet 磁性头像、滚动跑马灯、
        逐字浮现 AnimatedText、项目叠层卡片缩放。
   尊重系统"减少动态效果"设置。
   ========================================================= */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. FadeIn ---------- */
  var fades = document.querySelectorAll("[data-fade]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var d = e.target.getAttribute("data-delay");
          if (d) e.target.style.transitionDelay = d + "s";
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    fades.forEach(function (el) { io.observe(el); });
  } else {
    fades.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- 2. Magnet（磁性头像） ---------- */
  if (!reduce) {
    document.querySelectorAll("[data-magnet]").forEach(function (el) {
      var padding = parseInt(el.getAttribute("data-padding"), 10) || 120;
      var strength = parseInt(el.getAttribute("data-strength"), 10) || 3;
      var zone = el.parentElement;
      if (!zone) return;
      zone.addEventListener("mousemove", function (ev) {
        var r = zone.getBoundingClientRect();
        var x = ev.clientX - (r.left + r.width / 2);
        var y = ev.clientY - (r.top + r.height / 2);
        var reach = Math.max(r.width, r.height) / 2 + padding;
        if (Math.hypot(x, y) < reach) {
          el.style.transition = "transform 0.3s ease-out";
          el.style.transform = "translate3d(" + (x / strength) + "px," + (y / strength) + "px,0)";
        }
      });
      zone.addEventListener("mouseleave", function () {
        el.style.transition = "transform 0.6s ease-in-out";
        el.style.transform = "translate3d(0,0,0)";
      });
    });
  }

  /* ---------- 3. 跑马灯（滚动驱动） ---------- */
  var marquee = document.querySelector(".marquee");
  var rows = document.querySelectorAll(".marquee .row");

  /* ---------- 4. 逐字浮现 ---------- */
  var animEls = [];
  document.querySelectorAll("[data-anim]").forEach(function (el) {
    var text = el.textContent;
    el.textContent = "";
    var frag = document.createDocumentFragment();
    var chars = [];
    Array.from(text).forEach(function (ch) {
      var s = document.createElement("span");
      s.className = "char";
      s.textContent = ch;
      frag.appendChild(s);
      chars.push(s);
    });
    el.appendChild(frag);
    animEls.push({ el: el, chars: chars });
  });

  /* ---------- 5. 项目叠层卡片 ---------- */
  var cards = Array.prototype.slice.call(document.querySelectorAll("[data-pcard]"));
  var total = cards.length;

  function onScroll() {
    var vh = window.innerHeight;

    if (marquee && rows.length) {
      var rect = marquee.getBoundingClientRect();
      var sectionTop = rect.top + window.scrollY;
      var offset = (window.scrollY - sectionTop + vh) * 0.3;
      var shift = offset - 200;
      rows.forEach(function (row) {
        var dir = row.getAttribute("data-marquee") === "left" ? -1 : 1;
        row.style.transform = "translate3d(" + (dir * shift) + "px,0,0)";
      });
    }

    animEls.forEach(function (item) {
      var r = item.el.getBoundingClientRect();
      var start = vh * 0.8, end = vh * 0.2;
      var p = (start - r.top) / (start - end);
      p = Math.max(0, Math.min(1, p));
      var litCount = p * item.chars.length;
      item.chars.forEach(function (c, i) {
        if (i < litCount) c.classList.add("lit");
        else c.classList.remove("lit");
      });
    });

    if (!reduce) {
      cards.forEach(function (card, i) {
        var wrap = card.parentElement;
        var r = wrap.getBoundingClientRect();
        var passed = Math.max(0, (vh * 0.5) - r.top);
        var prog = Math.min(1, passed / (vh * 0.5));
        var targetScale = 1 - (total - 1 - i) * 0.03;
        var scale = 1 - (1 - targetScale) * prog;
        card.style.transform = "scale(" + scale.toFixed(4) + ")";
      });
    }
  }

  if (!reduce) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () { onScroll(); ticking = false; });
      }
    }, { passive: true });
  }
  onScroll();

  /* ---------- 年份 ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
