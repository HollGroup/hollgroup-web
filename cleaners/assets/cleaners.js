/* Holl Group cleaners kit: shared page builder.
   Every property page defines a CONFIG object and loads this file. Version in CHANGELOG.
   Do not edit without Ibon's confirmation (see claude/guias-limpiadoras.md).
   In CONFIG texts, **words** are shown highlighted in yellow. */
(function () {
  "use strict";
  var KIT = "20261018f";
  /* Holl Group WhatsApp, used only for the emergency button. Change it here if the number changes, or override per property with CONFIG.emergencyWhatsapp (false hides the button). */
  var HOLL_WA = "https://wa.me/447799777284";
  var CLOUD = "https://res.cloudinary.com/dyojhaiig/image/upload/";
  var C = (typeof CONFIG !== "undefined" ? CONFIG : {});

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function rich(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<mark>$1</mark>"); }
  function stamp() {
    var d = new Date(), z = "Europe/London";
    return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: z }) + ", " + d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: z });
  }
  function waLink(base, text) { return String(base).split("?")[0] + "?text=" + encodeURIComponent(text); }
  var n = 0;
  function tick(text) { n++; return '<label class="tick"><input type="checkbox" data-k="k' + n + '"><span>' + rich(text) + "</span></label>"; }
  function list(items, extra) { return '<div class="card list">' + items.map(tick).join("") + (extra || "") + "</div>"; }
  function photo(p) {
    if (!p || !p.id) return "";
    return '<a class="photo" href="' + CLOUD + esc(p.id) + '.jpg" target="_blank" rel="noopener"><img loading="lazy" alt="' + esc(p.alt || "") + '" src="' + CLOUD + "c_limit,w_900,f_auto,q_auto/" + esc(p.id) + '.jpg"></a>' + (p.cap ? '<div class="cap">' + esc(p.cap) + "</div>" : "");
  }
  var secN = 0;
  function sec(title) { secN++; return "<h2>" + secN + ". " + esc(title) + "</h2>"; }
  var binDay = C.binDay || "Wednesdays";
  var RT = C.reportTo || {};
  var who = RT.name || "Holl Group";
  var hi = who === "Holl Group" ? "Hi," : "Hi " + who + ",";
  /* Where the arrival and finished messages go. With the contact's number the chat opens straight away.
     Without it (not given yet), WhatsApp asks who to send it to, so the buttons and the ready-made text are always there. */
  var toWa = RT.whatsapp || (who === "Holl Group" ? HOLL_WA : "https://wa.me/");
  var asks = !RT.whatsapp && who !== "Holl Group";
  function askNote() { return asks ? '<p class="cap">WhatsApp will ask who to send it to. Choose ' + esc(who) + ".</p>" : ""; }
  /* Radiators: two Yes/No answers that go into the finished message, saved on this phone only */
  var temp = C.heatTemp || 18;
  var QKEY = "hg-cleaners-" + (C.slug || location.pathname) + "-q";
  var Q = { cold: null, on: null };
  try { var qs = JSON.parse(localStorage.getItem(QKEY) || "{}"); if (qs.cold === 0 || qs.cold === 1) Q.cold = qs.cold; if (qs.on === 0 || qs.on === 1) Q.on = qs.on; } catch (e) {}
  function yn(k) { return '<button type="button" class="yn" data-q="' + k + '" data-v="1">Yes</button><button type="button" class="yn" data-q="' + k + '" data-v="0">No</button>'; }
  function radCard() {
    return '<div class="card q"><h3>Radiators</h3><p class="cap">Answer both questions. They go in your finished message.</p>' +
      '<p class="qt">Is it cold?</p>' + yn("cold") +
      '<p class="qt">Are you leaving the radiators on?</p>' + yn("on") +
      '<div class="hint" id="hint" hidden></div></div>';
  }
  /* Ready-made WhatsApp messages. The time is taken when the button is tapped. */
  function msg(kind) {
    if (kind === "arrive") return hi + "\n*ARRIVED* at " + C.propertyName + ".\n" + stamp();
    if (kind === "finish") {
      var rad = "";
      if (C.radiators !== false) {
        var cold = Q.cold === 1 ? "YES" : Q.cold === 0 ? "NO" : "NOT ANSWERED";
        var rd = Q.on === 1 ? "LEFT ON, set to " + temp + "°C" : Q.on === 0 ? "SWITCHED OFF" : "NOT ANSWERED";
        rad = "\n\nCold today: *" + cold + "*\nRadiators: *" + rd + "*";
      }
      return hi + "\n*FINISHED* at " + C.propertyName + ".\n" + stamp() + rad + (C.outsideCode !== false ? "\n\n*THE NEW OUTSIDE CODE IS:* " : "");
    }
    return "EMERGENCY at " + C.propertyName + ": ";
  }
  function waBtn(kind, base, label, cls) {
    return '<a class="btn' + (cls ? " " + cls : "") + '" data-wa="' + kind + '" data-base="' + esc(base) + '" href="' + esc(waLink(base, msg(kind))) + '" target="_blank" rel="noopener">' + esc(label) + "</a>";
  }
  var h = [];

  /* Header and progress bar */
  h.push('<header><div class="wrap"><small>Holl Group · Cleaners</small><h1>' + esc(C.propertyName) + "</h1><p>Checklist and where everything goes. Please follow it every time.</p></div></header>");
  h.push('<div class="bar"><div class="wrap"><div class="count" id="count">0 done</div><button type="button" id="reset">Start again</button></div></div>');
  h.push('<main class="wrap">');

  /* Every single time (highlighted) */
  var must = [
    "**Not one hair on any bed.** Check it last of all, after making the beds.",
    "**Leave the flat exactly as in the photos.** Do not change the cushions or move anything.",
    "**Report any damage or anything missing** the same day, with photos.",
    "**Clean everything properly.** Do not leave any job half done.",
    "**Take all the rubbish out.** Bin collection is on " + binDay + "."
  ];
  if (C.backWindows) must.push("**Close the back windows** when you leave: " + C.backWindows + ".");
  if (C.radiators !== false) must.push("**Guests arriving the same day and it is cold? Leave the radiators on, set to " + temp + ".**");
  if (C.outsideCode !== false) must.push("**Change the outside code** and update it in the system.");
  h.push('<div class="must"><h2>Every single time</h2><ul>' + must.map(function (x) { return "<li>" + rich(x) + "</li>"; }).join("") + "</ul></div>");

  /* 1. When you arrive */
  var arrive = [];
  if (C.arrivalWindows) arrive.push(C.arrivalWindows);
  arrive.push("Look around the whole flat for anything the guests left behind. **Never keep it: it belongs to the guest. Tell " + who + " as soon as you see something.**");
  arrive.push("Check carefully for damage and for anything missing. Report it with photos.");
  arrive.unshift("Send the arrival message to " + who + ". Use the button below.");
  h.push(sec("When you arrive") + list(arrive) + waBtn("arrive", toWa, "I have arrived: message " + who) + askNote());

  /* 2. Kitchen */
  var skip = C.kitchenSkip || [];
  var kitchen = [
    ["wash", "Wash all the used utensils, cutlery, dishes and glasses."],
    ["kitchen", "Clean the kitchen properly: worktops, sink and cupboard fronts. No half jobs."],
    ["hob", C.hobText || "Clean the hob properly: every ring and the whole surface. Do not leave it half done."],
    ["microwave", "Clean the microwave inside, including the side walls" + (C.microwaveCover ? ", and make sure the plastic cover is clean" : "") + "."],
    ["fridge", "Empty the fridge, then clean it inside."],
    ["freezer", "Clean the freezer."]
  ].filter(function (x) { return skip.indexOf(x[0]) < 0; }).map(function (x) { return x[1]; }).concat(C.kitchenExtra || []);
  h.push(sec("Kitchen") + list(kitchen));

  /* 3. Checks */
  var b = C.bathrooms || 1;
  var checks = [
    "Windows are clean, with no marks or fingerprints.",
    "Every light bulb works. Switch each light on. If a bulb does not work, replace it with one of our spares. If there is no spare, tell " + who + " which one it is and send a photo, so we know the size and type of bulb.",
    "Water runs well in the kitchen sink.",
    b > 1 ? "Water runs well in every bathroom basin." : "Water runs well in the bathroom basin.",
    (b > 1 ? "Water runs well in every shower." : "Water runs well in the shower.") + (C.showerNote ? " " + C.showerNote : ""),
    "Look under every bed. There must be nothing there.",
    "Check carefully for damage in every room. Report anything excessive with photos.",
    "Check that nothing is missing. Tell " + who + " what is."
  ];
  if (C.extractor !== false) checks.push((b > 1 ? "The bathroom extractor fans work" : "The bathroom extractor fan works") + ": switch " + (b > 1 ? "each one" : "it") + " on and check that it runs. **This is important.**");
  if (C.smoke) checks.push("Smoke detectors: " + C.smoke + ". Check they are in place. They are high on the ceiling, so do not climb on furniture. Tell " + who + " if one is missing or beeping.");
  if (C.co) checks.push("Carbon monoxide alarm, " + C.co + ": press the test button at least once a week. It must sound.");
  if (C.emergency !== false) checks.push("Emergency lights: each one must show a green light" + (C.emergencyPhoto ? ", as in the photo below." : "."));
  if (C.fireBlanket) checks.push("The fire blanket is " + C.fireBlanket + ".");
  checks.push("Dishwashing liquid, soap, shampoo, conditioner and hand wash: there must always be enough. If they are running low, bring more for the next stay and sort the receipt with our cleaning contact. We can never run out.");
  checks.push("**Last of all, after making the beds: not one hair on any bed.** Look closely.");
  h.push(sec("Checks") + list(checks, photo(C.coPhoto) + (C.emergency !== false ? photo(C.emergencyPhoto) : "")));

  /* 4. Communal areas */
  if (C.communal) {
    var cm = C.communal;
    var cItems = [
      "No dust. Check carefully: skirting boards, handrail, window ledges and door frames.",
      "Carpet: vacuum everything that can be vacuumed.",
      "No damage. Report anything with photos."
    ].concat(cm.extra || []);
    h.push(sec("Communal areas") + (cm.areas ? '<p class="cap" style="margin-top:-4px">' + esc(cm.areas) + "</p>" : "") + list(cItems, photo(cm.photo)));
  }

  /* 5. Towels */
  var cap = C.capacity || 2;
  h.push(sec("Towels") + list([
    "Do you know who arrives later the same day? **Only the same day counts.** Then leave one bath towel for each of those guests.",
    "If you do not know who arrives the same day (or the next guests arrive on another day): leave one bath towel for each guest at full capacity, " + cap + ", on the beds.",
    "**Always leave a hand towel in the bathroom.**"
  ]));

  /* 6. Where things go */
  h.push(sec("Where things go") + '<p class="cap" style="margin-top:-4px">Always put things back in exactly the same place, so we can tell anyone where they are.</p>');
  (C.places || []).forEach(function (p) {
    h.push('<div class="card"><h3>' + esc(p.title) + "</h3>" + (p.items || []).map(tick).join("") + (p.note ? "<p><b>" + esc(p.note) + "</b></p>" : "") + (p.photos || [p.photo]).map(photo).join("") + "</div>");
  });
  if ((C.otherThings || []).length) {
    h.push('<div class="card"><h3>Other things</h3>' + C.otherThings.map(function (o) { return "<p><b>" + esc(o.label) + ":</b> " + esc(o.text) + "</p>"; }).join("") + "</div>");
  }

  /* 7. Do not touch */
  if ((C.doNotTouch || []).length) {
    h.push(sec("Do not touch") + C.doNotTouch.map(function (d) { return '<div class="warn"><b>' + esc(d.title) + "</b>" + esc(d.text) + "</div>"; }).join(""));
  }

  /* 8. Before you leave */
  var leave = [];
  if (C.radiators !== false) leave.push("**Close the windows first. If guests arrive the same day and it is cold, leave the radiators on, set to " + temp + " in every room. Otherwise, switch them off.**");
  if (C.backWindows) leave.push("**Close and lock the back windows**: " + C.backWindows + ". They must always be closed when you leave, even if you leave other windows or doors open to air the flat. This is for security.");
  leave.push("Switch off all the lights.");
  leave.push("**Take all the rubbish out.** " + (C.rubbishRoute ? C.rubbishRoute + " " : "") + "Collection is on " + binDay + ".");
  leave.push("Make sure the flat door is closed and locked.");
  if (C.streetDoor) leave.push(C.streetDoor);
  if (C.outsideCode !== false) leave.push("**Change the code of the outside lockbox** (the building entrance) and update it in the system. Do not change the code inside until Holl Group tells you.");
  leave.push("Upload the photos of the finished flat in Rental Ninja, as usual.");
  leave.push("Tell " + who + " about anything broken, missing, or left behind by the guests.");
  leave.push("**Send the finished message to " + who + "**" + (C.outsideCode !== false ? ", with the new outside code" : "") + ". Use the button below.");
  h.push(sec("Before you leave") + list(leave) + (C.radiators !== false ? radCard() : "") + waBtn("finish", toWa, "I have finished: message " + who) + askNote());

  /* Deep clean */
  h.push("<h2>When the flat is quiet</h2>");
  h.push('<div class="card"><p>When there are no guests for a few days, please do a deeper clean: move the beds, the sofa and the bedside tables, and check for dust behind and under them. Put everything back exactly where it was.' + (C.deepCleanExtra ? " " + esc(C.deepCleanExtra) : "") + "</p></div>");

  /* Blocked sink video (optional) */
  if (C.sinkVideo) {
    h.push("<h2>Blocked sink?</h2>");
    h.push('<div class="card"><p>This video shows how to take off the trap under the sink to clear a blockage. Put a bucket underneath first.' + (C.sinkVideoNote ? " " + esc(C.sinkVideoNote) : "") + '</p><video controls playsinline preload="metadata" src="' + esc(C.sinkVideo) + '#t=0.1"></video></div>');
  }

  h.push('<div class="card"><p><b>Emergency?</b> ' + esc(C.emergencyNote || "In an emergency, contact Holl Group.") + "</p>" + (RT.note ? '<p class="cap">' + esc(RT.note) + "</p>" : "") + "</div>");
  var ew = C.emergencyWhatsapp === false ? "" : (C.emergencyWhatsapp || HOLL_WA);
  if (ew) h.push(waBtn("emergency", ew, "Emergency: message Holl Group on WhatsApp", "emerg"));
  h.push("<footer>Holl Group · private page for our cleaners. Please do not share this link.</footer>");
  h.push("</main>");

  var app = document.getElementById("app");
  app.innerHTML = h.join("");
  document.title = "Holl Group";
  document.documentElement.setAttribute("data-kit", KIT);

  function paintQ() {
    [].forEach.call(app.querySelectorAll("button.yn"), function (b) { b.classList.toggle("on", Q[b.getAttribute("data-q")] === +b.getAttribute("data-v")); });
    var hint = document.getElementById("hint");
    if (!hint) return;
    var t = "";
    if (Q.on === 1) t = "Set every radiator to " + temp + ". " + (C.heatHow || "");
    else if (Q.cold === 1 && Q.on === 0) t = "It is cold. If guests arrive today, leave the radiators on, set to " + temp + ".";
    hint.textContent = t; hint.hidden = !t;
  }
  function saveQ() { try { localStorage.setItem(QKEY, JSON.stringify(Q)); } catch (e) {} }
  [].forEach.call(app.querySelectorAll("button.yn"), function (b) {
    b.addEventListener("click", function () { Q[b.getAttribute("data-q")] = +b.getAttribute("data-v"); saveQ(); paintQ(); });
  });
  paintQ();

  /* The time in the WhatsApp message is the time of the tap */
  [].forEach.call(app.querySelectorAll("a[data-wa]"), function (a) {
    function refresh() { a.href = waLink(a.getAttribute("data-base"), msg(a.getAttribute("data-wa"))); }
    a.addEventListener("click", refresh);
    a.addEventListener("touchstart", refresh, { passive: true });
  });

  /* Progress, saved on this phone only */
  var KEY = "hg-cleaners-" + (C.slug || location.pathname);
  var boxes = [].slice.call(app.querySelectorAll("input[data-k]"));
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { saved = {}; }
  boxes.forEach(function (bx) { if (saved[bx.dataset.k]) bx.checked = true; });
  function update() {
    var done = boxes.filter(function (bx) { return bx.checked; }).length;
    document.getElementById("count").textContent = done + " of " + boxes.length + " done";
    var s = {}; boxes.forEach(function (bx) { if (bx.checked) s[bx.dataset.k] = 1; });
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
  }
  boxes.forEach(function (bx) { bx.addEventListener("change", update); });
  document.getElementById("reset").addEventListener("click", function () {
    boxes.forEach(function (bx) { bx.checked = false; });
    Q.cold = null; Q.on = null; saveQ(); paintQ();
    update();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  update();
})();
