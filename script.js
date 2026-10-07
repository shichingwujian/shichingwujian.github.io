// ============================================
// 个人主页脚本
// 功能：移动端菜单、当前年份、导航高亮
// ============================================

(function () {
  "use strict";

  // ---------- 移动端导航菜单 ----------
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "关闭导航菜单" : "打开导航菜单");
    });

    // 点击菜单项后关闭菜单（移动端体验）
    menu.addEventListener("click", function (event) {
      if (event.target.tagName === "A" && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "打开导航菜单");
      }
    });

    // 按 Escape 键关闭菜单
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // ---------- 页脚年份自动更新 ----------
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // ---------- 滚动时高亮当前导航项 ----------
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = menu ? menu.querySelectorAll("a") : [];

  function highlightNav() {
    var scrollY = window.scrollY + 120; // 预留头部高度
    var currentId = "";

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollY) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      var isCurrent = link.getAttribute("href") === "#" + currentId;
      link.classList.toggle("is-active", isCurrent);
    });
  }

  window.addEventListener("scroll", highlightNav, { passive: true });
  highlightNav();
})();
