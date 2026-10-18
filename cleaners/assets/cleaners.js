/* Holl Group cleaners kit: shared page builder.
   Every property page defines a CONFIG object and loads this file. Version in CHANGELOG.
   Do not edit without Ibon's confirmation (see claude/guias-limpiadoras.md).
   In CONFIG texts, **words** are shown highlighted in yellow. */
(function () {
  "use strict";
  var KIT = "20261018b";
  var CLOUD = "https://res.cloudinary.com/dyojhaiig/image/upload/";
  var C = (typeof CONFIG !== "undefined" ? CONFIG : {});

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function rich(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<mark>$1</mark>"); }
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
  var h = [];

  /* Header and progress bar */
  h.push('<header><div class="wrap"><small>Holl Group · Cleaners</small><h1>' + esc(C.propertyName) + "</h1><p>Checklist and where everything goes. Please follow it every time.</p></div></header>");
  h.push('<div class="bar"><div class="wrap"><div class="count" id="count">0 done</div><button type="button" id="reset">Start again</button></div></div>');
  h.push('<main class="wrap">');

  /* Every single time (highlighted) */
  var must = [
    "**Not one hair on any bed.** Check every bed carefully, sheets and pillows.",
    "**Leave the flat exactly as in the photos.** Do not change the cushions or move anything.",
    "**Report any damage or anything missing** the same day, with photos.",
    "**Take all the rubbish out.** Bin collection is on " + binDay + "."
  ];
  if (C.backWindows) must.push("**Close the back windows** when you leave: " + C.backWindows + ".");
  if (C.outsideCode !== false) must.push("**Change the outside code** and update it in the system.");
  h.push('<div class="must"><h2>Every single time</h2><ul>' + must.map(function (x) { return "<li>" + rich(x) + "</li>"; }).join("") + "</ul></div>");

  /* 1. When you arrive */
  var arrive = [];
  if (C.arrivalWindows) arrive.push(C.arrivalWindows);
  arrive.push("Look around the whole flat for anything the guests left behind.");
  arrive.push("Check for damage and for anything missing. Report it with photos.");
  h.push(sec("When you arrive") + list(arrive));

  /* 2. Kitchen */
  var skip = C.kitchenSkip || [];
  var kitchen = [
    ["wash", "Wash all the used utensils, cutlery, dishes and glasses."],
    ["kitchen", "Clean the kitchen: worktops, sink and cupboard fronts."],
    ["hob", C.hobText || "Clean the hob. The rings stain quickly, and stains that do not come off are normal."],
    ["microwave", "Clean the microwave inside, including the side walls."],
    ["fridge", "Empty the fridge, then clean it inside."],
    ["freezer", "Clean the freezer."]
  ].filter(function (x) { return skip.indexOf(x[0]) < 0; }).map(function (x) { return x[1]; }).concat(C.kitchenExtra || []);
  h.push(sec("Kitchen") + list(kitchen));

  /* 3. Checks */
  var b = C.bathrooms || 1;
  var checks = [
    "Windows are clean, with no marks or fingerprints.",
    "Every light bulb works. Switch each light on, and replace any bulb that does not work.",
    "Water runs well in the kitchen sink.",
    b > 1 ? "Water runs well in every bathroom basin." : "Water runs well in the bathroom basin.",
    (b > 1 ? "Water runs well in every shower." : "Water runs well in the shower.") + (C.showerNote ? " " + C.showerNote : ""),
    "Look under every bed. There must be nothing there.",
    "**Every bed: not one hair.** Look closely.",
    "Look for damage in every room. Report anything excessive with photos.",
    "Check that nothing is missing. Tell " + who + " what is."
  ];
  if (C.smoke) checks.push("Smoke detectors: " + C.smoke + ". Check they are in place. They are high on the ceiling, so do not climb on furniture. Tell " + who + " if one is missing or beeping.");
  if (C.co) checks.push("Carbon monoxide alarm, " + C.co + ": press the test button at least once a week. It must sound.");
  if (C.emergency !== false) checks.push("Emergency lights: each one must show a green light" + (C.emergencyPhoto ? ", as in the photo below." : "."));
  if (C.fireBlanket) checks.push("The fire blanket is " + C.fireBlanket + ".");
  checks.push("Dishwashing liquid, soap, shampoo, conditioner and hand wash: there must always be enough. If they are running low, bring more for the next stay and sort the receipt with our cleaning contact. We can never run out.");
  h.push(sec("Checks") + list(checks, C.emergency !== false ? photo(C.emergencyPhoto) : ""));

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
    "If you know who arrives next: one bath towel for each guest, plus one hand towel in the bathroom.",
    "If you do not know who arrives next (for example, guests leave on a Sunday and the next ones arrive on Monday): leave " + cap + " bath towels, one for each guest at full capacity, plus the hand towel."
  ]));

  /* 6. Where things go */
  h.push(sec("Where things go") + '<p class="cap" style="margin-top:-4px">Always put things back in exactly the same place, so we can tell anyone where they are.</p>');
  (C.places || []).forEach(function (p) {
    h.push('<div class="card"><h3>' + esc(p.title) + "</h3>" + (p.items || []).map(tick).join("") + (p.note ? "<p><b>" + esc(p.note) + "</b></p>" : "") + photo(p.photo) + "</div>");
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
  if (C.radiators !== false) leave.push("Switch off the radiators. If a guest is arriving the same day, leave them on.");
  if (C.backWindows) leave.push("**Close and lock the back windows**: " + C.backWindows + ". This is for security.");
  leave.push("Switch off all the lights.");
  leave.push("**Take all the rubbish out.** " + (C.rubbishRoute ? C.rubbishRoute + " " : "") + "Collection is on " + binDay + ".");
  leave.push("Make sure the flat door is closed and locked.");
  if (C.streetDoor) leave.push(C.streetDoor);
  if (C.outsideCode !== false) leave.push("**Change the code of the outside lockbox** (the building entrance) and update it in the system. Do not change the code inside until Holl Group tells you.");
  leave.push("Upload the photos of the finished flat in Rental Ninja, as usual.");
  leave.push("Tell " + who + " about anything broken, missing, or left behind by the guests.");
  leave.push("**When you have finished, tell " + who + "**" + (C.outsideCode !== false ? " and send the new outside code." : "."));
  h.push(sec("Before you leave") + list(leave));

  /* Deep clean */
  h.push("<h2>When the flat is quiet</h2>");
  h.push('<div class="card"><p>When there are no guests for a few days, please do a deeper clean: move the beds, the sofa and the bedside tables, and check for dust behind and under them. Put everything back exactly where it was.' + (C.deepCleanExtra ? " " + esc(C.deepCleanExtra) : "") + "</p></div>");

  /* Blocked sink video (optional) */
  if (C.sinkVideo) {
    h.push("<h2>Blocked sink?</h2>");
    h.push('<div class="card"><p>This video shows how to take off the trap under the sink to clear a blockage. Put a bucket underneath first.' + (C.sinkVideoNote ? " " + esc(C.sinkVideoNote) : "") + '</p><video controls playsinline preload="metadata" src="' + esc(C.sinkVideo) + '#t=0.1"></video></div>');
  }

  h.push('<div class="card"><p><b>Emergency?</b> ' + esc(C.emergencyNote || "In an emergency, contact Holl Group.") + "</p>" + (RT.note ? '<p class="cap">' + esc(RT.note) + "</p>" : "") + "</div>");
  if (RT.whatsapp) h.push('<a class="btn" href="' + esc(RT.whatsapp) + '" target="_blank" rel="noopener">Message ' + esc(who) + " on WhatsApp</a>");
  h.push("<footer>Holl Group · private page for our cleaners. Please do not share this link.</footer>");
  h.push("</main>");

  var app = document.getElementById("app");
  app.innerHTML = h.join("");
  document.title = "Holl Group";
  document.documentElement.setAttribute("data-kit", KIT);

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
    update();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  update();
})();
