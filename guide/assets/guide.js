/* Holl Group guest guide, small add-ons loaded after guide.js (optional per page).
   1. **text** in any property text shows in bold.
   2. Section shortcuts stay on one scrolling row on computers too, and the mouse wheel scrolls them sideways.
   3. Optional CONFIG.offers: a "bookable experiences" section (affiliate links) shown before Local picks.
      offers: { nav, title, note, items: [ { icon: "bag"|"walk"|"fish"|"ticket", img, title, text, cta, url } ] }
      Every text can be plain or { en: "...", es: "..." }. Leave offers out and nothing changes.
   4. Optional CONFIG.servicePhotos: { early, late, mid } photo links shown on top of the three Services blocks. */
(function () {
  var css = "@media (min-width:700px){" +
    ".nav{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:thin;scrollbar-color:#C9DCD6 transparent}" +
    ".nav::-webkit-scrollbar{display:block;height:6px}.nav::-webkit-scrollbar-thumb{background:#C9DCD6;border-radius:3px}" +
    ".nav a{font-size:14px;padding:6px 12px;min-height:34px}" +
    ".nav-wrap::after{display:block}.nav-wrap.end::after{display:none}}" +
    "#app b.hl{font-weight:700;color:inherit}" +
    ".offers-grid{display:grid;gap:12px;margin-top:6px}" +
    ".offer-card{background:var(--tint-2,#F3FAF8);border:1px solid var(--line,#DCEAE5);border-radius:16px;overflow:hidden;display:flex;flex-direction:column}" +
    ".offer-card img{width:100%;height:160px;object-fit:cover;display:block}" +
    ".offer-body{padding:14px 16px;display:flex;flex-direction:column;gap:10px}" +
    ".offer-head{display:flex;align-items:center;gap:12px}" +
    ".offer-head .ico{width:44px;height:44px;border-radius:12px;background:var(--accent-ink,#1D7563);color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0}" +
    ".offer-head .ico svg{width:24px;height:24px}" +
    ".offer-body .btn{align-self:stretch}" +
    ".offers-note{font-size:14px;color:var(--muted,#4A4A4A);margin-top:12px}" +
    "#services .soft.has-photo{padding:0;overflow:hidden}#services .soft.has-photo>:not(img){margin-left:16px;margin-right:16px}#services .soft.has-photo>p{margin-bottom:14px}" +
    ".svc-img{width:100%;height:140px;object-fit:cover;display:block;margin-bottom:12px}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var app = document.getElementById("app");
  if (!app) return;
  var CFG = (typeof CONFIG !== "undefined") ? CONFIG : window.CONFIG;
  var ICONS = {
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="7" width="16" height="13" rx="2"/><path d="M9 7V4h6v3M8 11v5M16 11v5"/></svg>',
    walk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="4" r="2"/><path d="M10 21l2-6 3 3v3M8 12l2-4 4 1 2 4 2 1M10 8l-1 5"/></svg>',
    fish: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12c3-5 9-6 13-3l5-3v12l-5-3c-4 3-10 2-13-3z"/><circle cx="8" cy="11" r=".8"/></svg>',
    ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8a2 2 0 0 0 0 4v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 1 0-4V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/><path d="M13 4v14" stroke-dasharray="2 2"/></svg>'
  };
  var esc = function (v) { return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  function servicePhotos() {
    var S = CFG && CFG.servicePhotos; if (!S) return;
    var blocks = app.querySelectorAll("#services .stack > .soft");
    ["early", "late", "mid"].forEach(function (k, i) {
      var b = blocks[i]; if (!b || !S[k] || !/^https:\/\//.test(S[k]) || b.querySelector(".svc-img")) return;
      var img = document.createElement("img"); img.className = "svc-img"; img.src = S[k]; img.alt = ""; img.loading = "lazy";
      b.classList.add("has-photo"); b.insertBefore(img, b.firstChild);
    });
  }
  function offers() {
    var O = CFG && CFG.offers;
    if (!O || !(O.items || []).length || document.getElementById("offers")) return;
    var main = app.querySelector("main.wrap"); if (!main) return;
    var lang = (document.documentElement.lang || "en").slice(0, 2);
    var t = function (v) { return esc((v && typeof v === "object") ? (v[lang] || v.en || "") : v); };
    var sec = document.createElement("section");
    sec.className = "card"; sec.id = "offers";
    sec.innerHTML = '<h2>' + t(O.title) + '</h2><div class="offers-grid">' + O.items.filter(function (it) { return /^https:\/\//.test(it.url || ""); }).map(function (it) {
      return '<div class="offer-card">' + (it.img ? '<img src="' + esc(it.img) + '" alt="" loading="lazy">' : '') +
        '<div class="offer-body"><div class="offer-head">' + (it.img ? '' : '<span class="ico">' + (ICONS[it.icon] || ICONS.ticket) + '</span>') +
        '<div class="sub" style="margin:0">' + t(it.title) + '</div></div><p>' + t(it.text) + '</p>' +
        '<a class="btn btn-primary" href="' + esc(it.url) + '" target="_blank" rel="noopener sponsored">' + t(it.cta) + '</a></div></div>';
    }).join("") + '</div>' + (O.note ? '<p class="offers-note">' + t(O.note) + '</p>' : '');
    var before = document.getElementById("picks") || document.getElementById("thanks");
    main.insertBefore(sec, before);
    var navBar = document.getElementById("navBar");
    if (navBar && O.nav && !navBar.querySelector('[data-id="offers"]')) {
      var a = document.createElement("a"); a.href = "#offers"; a.setAttribute("data-id", "offers"); a.innerHTML = t(O.nav);
      var ref = navBar.querySelector('[data-id="picks"]') || navBar.querySelector('[data-id="thanks"]');
      navBar.insertBefore(a, ref);
    }
  }
  var RE = /\*\*([^*]+)\*\*/g;
  function bold() {
    var w = document.createTreeWalker(app, NodeFilter.SHOW_TEXT, null), n, list = [];
    while ((n = w.nextNode())) { if (n.nodeValue.indexOf("**") > -1 && !(n.parentNode && /^(SCRIPT|STYLE|TEXTAREA|OPTION)$/.test(n.parentNode.nodeName))) list.push(n); }
    list.forEach(function (t) {
      var s = t.nodeValue, frag = document.createDocumentFragment(), last = 0, m;
      RE.lastIndex = 0;
      while ((m = RE.exec(s))) {
        if (m.index > last) frag.appendChild(document.createTextNode(s.slice(last, m.index)));
        var b = document.createElement("b"); b.className = "hl"; b.textContent = m[1]; frag.appendChild(b);
        last = RE.lastIndex;
      }
      if (last === 0) return;
      if (last < s.length) frag.appendChild(document.createTextNode(s.slice(last)));
      t.parentNode.replaceChild(frag, t);
    });
    // alt texts of photos: drop the asterisks
    app.querySelectorAll("img[alt*='**']").forEach(function (i) { i.alt = i.alt.replace(/\*\*/g, ""); });
  }
  var mo = new MutationObserver(function () { mo.disconnect(); offers(); servicePhotos(); bold(); mo.observe(app, { childList: true, subtree: true }); });
  offers(); servicePhotos(); bold(); mo.observe(app, { childList: true, subtree: true });

  document.addEventListener("wheel", function (e) {
    var nav = e.target.closest && e.target.closest("#navBar");
    if (!nav || Math.abs(e.deltaY) <= Math.abs(e.deltaX) || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollLeft += (document.documentElement.dir === "rtl" ? -1 : 1) * e.deltaY; e.preventDefault();
  }, { passive: false });
})();
