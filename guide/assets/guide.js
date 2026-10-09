/* Holl Group guest guide, shared page builder.
   You normally never edit this file. Property data lives in each property's index.html (CONFIG),
   and all sentences live in guide-i18n.js. */
(function () {
  const C = (typeof CONFIG !== "undefined") ? CONFIG : window.CONFIG;
  const DICT = window.GUIDE_I18N;
  const LANGS = window.GUIDE_LANGS;
  const PHONE = "+447799777284", PHONE_TXT = "+44 779 977 7284", EMAIL = "bookings@hollgroup.co.uk", WA = "https://wa.me/447799777284";
  // Brevo "Returning guests" form (shared by every property)
  const BREVO = "https://e839be71.sibforms.com/serve/MUIFAIpm5qy6-_i9pB5InRDHuU1d8EfMd-Cml7oOBTsq3vjWG_hJK4Snhz4klkhnlU4dIX_BulnSd9fYXhErq0ISEjxPXfu1NQJt23-LDMajkJLs0g4seC6Zz-ldBb35MeYYV6HJET4vBofO4jTL3J4Laoo_EloMPqxSHHAV5FzvdOpvV-zZKBpziZJA_naPmdqEC_72hXZuKjOirA==";
  const store = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} } };
  try { if (new URLSearchParams(location.search).get("join") === "reset") { localStorage.removeItem("hollJoined"); localStorage.removeItem("hollPromoHide"); } } catch (e) {}
  const LOGO = "https://res.cloudinary.com/dyojhaiig/image/upload/f_auto,q_auto,w_160/v1781020925/logo_cropped_pezlyx.png";
  const HOST = "https://res.cloudinary.com/dyojhaiig/image/upload/c_thumb,g_face,w_240,h_240,z_0.75,f_auto,q_auto/v1787835750/aiboryyy-20251211-0001_yx87j9.jpg";

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clean = v => String(v || "").replace(/\s+/g, "");
  // Accepts coordinates ("52.47, -1.89") or a full Google Maps link
  const maps = c => /^https?:\/\//i.test(clean(c)) ? clean(c) : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(clean(c));
  const isFlat = C.propertyType !== "house";
  const isLockbox = C.entry !== "smartlock";

  // Pick the language: ?lang=xx in the link, then the guest's last choice, then the phone's language, then English
  const supported = LANGS.map(l => l[0]);
  // Language: ?lang=xx in the link, else the guest's earlier choice, else the guest chooses on the welcome screen
  const pickLang = () => {
    const q = new URLSearchParams(location.search).get("lang");
    if (q && supported.includes(q)) return q;
    try { const s = localStorage.getItem("hollGuideLang"); if (s && supported.includes(s)) return s; } catch (e) {}
    return null;
  };
  const saveLang = l => { try { localStorage.setItem("hollGuideLang", l); } catch (e) {} };

  function renderLanding() {
    const hello = { en: "Welcome", es: "Bienvenido", fr: "Bienvenue", de: "Willkommen", it: "Benvenuto", pt: "Bem-vindo", zh: "欢迎", ar: "أهلًا وسهلًا", ja: "ようこそ" };
    const n = (navigator.language || "en").slice(0, 2).toLowerCase();
    const first = supported.includes(n) ? n : "en";
    const order = [first].concat(supported.filter(l => l !== first));
    const name = (typeof C.propertyName === "string") ? esc(C.propertyName) : esc(C.propertyName.en || "");
    document.documentElement.dir = "ltr";
    document.getElementById("app").innerHTML = `
<main class="landing">
  <img src="${LOGO}" alt="Holl Group" class="landing-logo">
  <p class="eyebrow">Holl Group</p>
  <h1>${name}</h1>
  <p class="landing-hello">${order.slice(0, 5).map(l => hello[l]).join(" · ")}</p>
  <p class="landing-ask">Choose your language</p>
  <div class="landing-grid">${order.map(l => `<button type="button" class="landing-btn${l === first ? " first" : ""}" data-lang="${l}" lang="${l}">${LANGS.find(x => x[0] === l)[1]}</button>`).join("")}</div>
</main>`;
    document.querySelectorAll(".landing-btn").forEach(b => b.addEventListener("click", () => {
      const l = b.getAttribute("data-lang");
      saveLang(l);
      window.scrollTo(0, 0);
      render(l);
    }));
  }

  const I = {
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.6A8.4 8.4 0 1 1 21 11.5z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    wifi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5a15 15 0 0 1 20 0"/><path d="M5 12a10 10 0 0 1 14 0"/><path d="M8.5 15.5a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1"/></svg>',
    temp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 14.8V4a2 2 0 0 0-4 0v10.8a4 4 0 1 0 4 0z"/><path d="M12 10v6"/></svg>',
    key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="4.5"/><path d="M10.7 12.3L21 2"/><path d="M16 7l3 3"/><path d="M18.5 4.5l2 2"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
    qr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3"/></svg>',
    gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>'
  };

  function render(lang) {
    const D = DICT[lang] || DICT.en;
    // Translated sentence, falling back to English, with {placeholders} filled in
    const T = (k, vars) => {
      let s = D[k] ?? DICT.en[k] ?? k;
      if (vars) for (const v in vars) s = s.split("{" + v + "}").join(vars[v]);
      return s;
    };
    // Property text: plain text, or { en: "...", es: "..." } per language. [BRACKETS] show highlighted.
    const P = v => {
      const raw = (v && typeof v === "object") ? (v[lang] ?? v.en ?? "") : v;
      return esc(raw).replace(/\[[^\]]+\]/g, m => `<span class="ph">${m}</span>`);
    };
    const name = P(C.propertyName);
    const mapBtn = (coords, label, cls) => clean(coords)
      ? `<a class="btn ${cls || "btn-primary"}" href="${maps(coords)}" target="_blank" rel="noopener">${I.pin}${esc(label)}</a>`
      : `<div class="soft"><span class="ph">[ADD COORDINATES IN CONFIG]</span></div>`;
    // Photos and step-by-step routes (property data, optional)
    const altText = v => { const raw = (v && typeof v === "object") ? (v[lang] ?? v.en ?? "") : (v || ""); return esc(raw); };
    const photo = (src, alt) => src ? `<button type="button" class="zoom" data-src="${esc(src)}" aria-label="${esc(T("zoom"))}"><img class="ph-img" src="${esc(src)}" alt="${altText(alt)}" loading="lazy"></button>` : "";
    const route = r => !r || !r.steps || !r.steps.length ? "" : `
      <div class="route">${r.title ? `<div class="sub">${P(r.title)}</div>` : ""}
        <ol class="route-list">${r.steps.map((st, i) => `<li><span class="n">${i + 1}</span><div class="route-body">
          ${(st.imgs || []).length ? `<div class="route-imgs${st.imgs.length > 1 ? " two" : ""}">${st.imgs.map(u => photo(u, st.text)).join("")}</div>` : ""}
          <p>${P(st.text)}</p></div></li>`).join("")}</ol></div>`;
    const gallery = list => !list || !list.length ? "" : `<div class="gallery">${list.map(g => `<figure>${photo(g.img, g.caption)}${g.caption ? `<figcaption>${P(g.caption)}</figcaption>` : ""}</figure>`).join("")}</div>`;
    const nav = [["glance", "navGlance"], ["important", "navImportant"], ["arrive", "navArrival"], ["home", "navHome"], ["rules", "navRules"], ["safety", "navSafety"], ["help", "navHelp"], ["services", "navServices"], ["checkout", "navCheckout"], ["picks", "navPicks"], ["thanks", "navThanks"]];
    const phoneLink = `<a href="tel:${PHONE}" dir="ltr"><b>${PHONE_TXT}</b></a>`;
    const emailLink = `<a href="mailto:${EMAIL}" dir="ltr"><b>${EMAIL}</b></a>`;
    const time = t => `<bdi dir="ltr">${esc(t)}</bdi>`;

    document.documentElement.lang = lang === "en" ? "en-GB" : lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    document.getElementById("app").innerHTML = `
<header class="top">
  <div class="top-in"><img src="${LOGO}" alt="Holl Group"><span class="t">${name}</span>
    <select class="lang" id="langSel" aria-label="${esc(T("langLabel"))}">${LANGS.map(([c, n]) => `<option value="${c}"${c === lang ? " selected" : ""}>${n}</option>`).join("")}</select>
  </div>
  <div class="nav-wrap" id="navWrap"><nav class="nav" id="navBar" aria-label="Sections">${nav.map(([id, k]) => `<a href="#${id}" data-id="${id}">${T(k)}</a>`).join("")}</nav></div>
</header>

<main class="wrap">
  ${store.get("hollJoined") || store.get("hollPromoHide") ? "" : `<div class="promo" id="promo"><span>${I.gift}${T("promo")}</span><a href="#thanks">${T("promoGo")}</a><button type="button" id="promoX" aria-label="${esc(T("close"))}">&times;</button></div>`}
  <section class="hero">
    <span class="eyebrow">${T("eyebrow")}</span>
    <h1>${T("welcomeTo", { name })}</h1>
    <p style="color:var(--muted)">${P(C.area)}</p>
    <div class="host">
      <img src="${HOST}" alt="Ibon">
      <div><b>${T("hostTitle")}</b><p>${T("hostP1")}</p><p style="margin-top:8px">${T("hostP2")}</p></div>
    </div>
  </section>

  <section class="card glance" id="glance">
    <h2>${T("glanceTitle")}</h2>
    <div class="g-grid">
      <div class="g-item"><div class="k">${T("checkInFrom")}</div><div class="v">${time(C.checkIn)}</div></div>
      <div class="g-item"><div class="k">${T("checkOutBy")}</div><div class="v">${time(C.checkOut)}</div></div>
      <div class="g-item wifi">
        <div class="wifi-row"><div><div class="k">${T("wifiNetwork")}</div><div class="v" dir="ltr">${P(C.wifiName)}</div></div></div>
        <div class="wifi-row"><div><div class="k">${T("password")}</div><div class="v" dir="ltr">${P(C.wifiPassword)}</div></div>
          <button class="btn btn-white" id="copyPw" type="button" style="min-height:44px;padding:8px 14px;font-size:15px">${I.copy}${T("copy")}</button></div>
        <button class="btn btn-white" id="qrBtn" type="button">${I.qr}${T("showQr")}</button>
        <div id="wifiQr" aria-label="Wi-Fi QR"></div>
      </div>
    </div>
    <div class="stack" style="margin-top:12px">${mapBtn(C.entranceCoords, T("entrance"), "btn-white")}</div>
  </section>

  <section class="card imp" id="important">
    <h2>${T("impTitle")}</h2>
    <ul class="imp-list">
      ${isFlat ? `<li class="hot"><span class="h">${T("impCorrH")}</span>${T("impCorr")}</li>` : ""}
      ${(C.importantExtra || []).map(x => `<li class="hot"><span class="h">${P(x.title)}</span>${P(x.text)}</li>`).join("")}
      <li><span class="h">${T("impGuestsH")}</span>${T("impGuests")}</li>
      <li><span class="h">${T("impLeaveH", { time: time(C.checkOut) })}</span>${T("impLeave")}</li>
      ${isLockbox ? `<li><span class="h">${T("impKeysH")}</span>${T("impKeys")}${C.keysNote ? ` <b>${P(C.keysNote)}</b>` : ""}</li>` : ""}
    </ul>
  </section>

  <section class="card" id="contact">
    <h2>${T("contactTitle")}</h2>
    <p style="font-family:'Outfit',system-ui,sans-serif;font-size:21px;font-weight:600;margin-bottom:8px">${T("contactLead")}</p>
    <p>${T("contactBody", { phone: phoneLink, email: emailLink })}</p>
    <div class="btn-row" style="margin-top:14px">
      <a class="btn btn-primary" href="${WA}">${I.chat}${T("whatsapp")}</a>
      <a class="btn btn-light" href="tel:${PHONE}">${I.phone}${T("call")}</a>
    </div>
  </section>

  <section class="card" id="arrive">
    <h2>${T("arriveTitle")}</h2>
    <div class="stack">
      <p>${P(C.directions)}</p>
      ${mapBtn(C.entranceCoords, T("entrance"))}
      <div class="soft"><div class="sub">${T("parking")}</div>
        ${C.parking === "none" ? `<p>${T("noParking")}</p><p style="margin-top:8px">${P(C.parkingNearby)}</p>` : `<p>${P(C.parkingDetails)}</p>`}
        ${gallery(C.parkingPhotos)}
      </div>
    </div>
    <h2 style="margin-top:26px">${T("gettingIn")}</h2>
    <div class="stack">
      ${isLockbox
        ? `<p>${T("lockboxText")}</p>
           ${C.lockboxAreaPhoto ? photo(C.lockboxAreaPhoto, T("lockboxArea")) : `<img src="lockbox-area.jpg" alt="" style="width:100%;border-radius:14px;display:block" onerror="this.outerHTML='<div class=&quot;soft&quot;><span class=&quot;ph&quot;>[PHOTO: lockbox-area.jpg in this folder]</span></div>'">`}
           ${clean(C.lockboxCoords) ? mapBtn(C.lockboxCoords, T("lockboxArea"), "btn-light") : ""}`
        : `<p>${T("smartText")}${C.smartLockCodeTimeLimited ? " " + T("smartLimited") : ""}</p>
           <p>${P(C.smartLockHowTo)}</p>
           <p>${T("smartFail")}</p>`}
      ${route(C.arrivalRoute)}
    </div>
  </section>

  <section class="card" id="home">
    <h2>${T("homeTitle")}</h2>
    <div class="stack">${C.property.map(b => `<div class="soft"><div class="sub">${P(b.title)}</div><p>${P(b.text)}</p></div>`).join("")}</div>
  </section>

  <section class="card" id="rules">
    <h2>${T("rulesTitle")}</h2>
    <p style="font-family:'Outfit',system-ui,sans-serif;font-size:24px;font-weight:600;margin-bottom:12px">${T("quiet")}</p>
    <ul class="rules">
      <li>${T("noise")}</li>
      ${isFlat
        ? `<li>${T("camFlat")}</li>`
        : `${C.exteriorCameras ? `<li>${T("camHouse")}</li>` : ""}<li>${T("neighHouse")}</li>${C.garden ? `<li>${T("garden")}</li>` : ""}`}
      <li><b>${T("noSmoking")}</b></li>
    </ul>
    <h2 style="margin-top:26px">${T("binsTitle")}</h2>
    <p>${P(C.bins)}</p>
    ${route(C.binsRoute)}
  </section>

  <section class="card fire" id="safety">
    <h2>${T("fireTitle")}</h2>
    <ol class="steps">
      <li><span class="n">1</span><p><b>${T("fire1")}</b></p></li>
      <li><span class="n">2</span><p>${T("fire2")}</p></li>
      <li><span class="n">3</span><p>${T("fire3", { n999: `<a href="tel:999" style="color:var(--ink)"><b style="font-size:22px">999</b></a>` })}</p></li>
      <li><span class="n">4</span><p>${T("fire4")}</p></li>
      <li><span class="n">5</span><p>${T("fire5")}</p></li>
    </ol>
    <p style="margin-top:14px">${P(C.fireDetails)}</p>
  </section>

  <section class="card">
    <h2>${T("emTitle")}</h2>
    <div class="em">
      <a href="tel:999"><span class="num">999</span><span class="lbl">${T("em999")}</span></a>
      <a href="tel:111"><span class="num">111</span><span class="lbl">${T("em111")}</span></a>
      <a href="tel:08001111999"><span class="num" dir="ltr">0800 111 999</span><span class="lbl">${T("emGas")}</span></a>
      <a href="tel:${PHONE}"><span class="num">Ibon</span><span class="lbl" dir="ltr">${PHONE_TXT}</span></a>
    </div>
    <div class="stack" style="margin-top:12px">
      ${(() => { const list = [].concat(C.pharmacy || []), many = list.length > 1;
        return (many ? `<div class="sub" style="margin-bottom:-4px">${T("pharmacies")}</div>` : "") + list.map(ph => { const label = many ? P(ph.name) : `${T("pharmacy")}: ${P(ph.name)}`;
          return clean(ph.coords) ? `<a class="btn btn-light" href="${maps(ph.coords)}" target="_blank" rel="noopener">${I.pin}${label}</a>` : `<div class="soft">${label}</div>`; }).join(""); })()}
      ${C.pharmacyNote ? `<p style="font-size:16px;color:var(--muted)">${P(C.pharmacyNote)}</p>` : ""}
      ${(() => { const list = [].concat(C.hospital || []), many = list.length > 1;
        return (many ? `<div class="sub" style="margin-bottom:-4px">${T("aes")}</div>` : "") + list.map(h => { const label = many ? P(h.name) : `${T("ae")}: ${P(h.name)}`;
          return clean(h.coords) ? `<a class="btn btn-light" href="${maps(h.coords)}" target="_blank" rel="noopener">${I.pin}${label}</a>` : `<div class="soft">${label}</div>`; }).join(""); })()}
      ${C.hospitalNote ? `<p style="font-size:16px;color:var(--muted)">${P(C.hospitalNote)}</p>` : ""}
      <div class="soft">${C.utilitiesLocked ? T("utilLocked") : `<b>${T("stopcock")}:</b> ${P(C.stopcock)}<br><b>${T("fuse")}:</b> ${P(C.fuseBox)}`}</div>
    </div>
  </section>

  <section class="card" id="help">
    <h2>${T("helpTitle")}</h2>
    <p style="margin-bottom:14px">${T("helpIntro")}</p>
    <div class="stack">
      <div class="issue"><span class="icon">${I.wifi}</span><div><div class="sub">${T("wifiLabel")}</div><p>${C.utilitiesLocked ? T("wifiLocked") : `${T("wifiFix")} ${P(C.routerLocation)}`}</p></div></div>
      <div class="issue"><span class="icon">${I.temp}</span><div><div class="sub">${T("heatLabel")}</div><p>${P(C.heatingCheck)}</p></div></div>
      <div class="issue"><span class="icon">${I.key}</span><div><div class="sub">${T("keyLabel")}</div><p>${T("keyFix")}</p></div></div>
    </div>
  </section>

  <section class="card" id="services">
    <h2>${T("servTitle")}</h2>
    <p style="margin-bottom:14px">${T("servIntro")}</p>
    <div class="stack">
      <div class="soft"><div class="sub">${T("early")}</div><p>${T("earlyD")}</p></div>
      <div class="soft"><div class="sub">${T("late")}</div><p>${T("lateD")}</p></div>
      <div class="soft"><div class="sub">${T("mid")}</div><p>${T("midD")}</p></div>
    </div>
  </section>

  <section class="card" id="checkout">
    <h2>${T("coTitle")}</h2>
    <p style="font-family:'Outfit',system-ui,sans-serif;font-size:24px;font-weight:600;margin-bottom:12px">${T("coAt", { time: `<span class="acc">${time(C.checkOut)}</span>` })}</p>
    <div class="stack">
      <p>${T("coWindows")}</p>
      <p>${T("coOnTime")}</p>
      <p>${P(C.securing)}</p>
      <p>${T("coLater")}</p>
      <div class="soft"><div class="sub">${T("favourH")}</div><p>${T("favour")}</p></div>
    </div>
  </section>

  <section class="card" id="picks">
    <h2>${T("picksTitle")}</h2>
    <div>${C.picks.map(p => `<div class="pick"><div><div class="cat">${T("cat_" + p.category)}</div><div class="name">${P(p.name)}</div><div class="note">${P(p.note)} · ${T("walk", { n: esc(p.walkMins) })}</div></div>${clean(p.coords) ? `<a href="${maps(p.coords)}" target="_blank" rel="noopener" aria-label="Maps">${I.pin}</a>` : ""}</div>`).join("")}</div>
  </section>

  <section class="card gift" id="thanks">
    <div class="icon" style="margin:0 auto 12px;width:56px;height:56px">${I.gift}</div>
    <h2>${T("thanksTitle")}</h2>
    <p style="font-family:'Outfit',system-ui,sans-serif;font-size:20px;font-weight:600;color:var(--accent-ink);margin-bottom:10px">${T("bookDirect")}</p>
    <p style="margin-bottom:16px">${T("same")}</p>
    <div class="offer">
      <div><div class="big">${T("less")}</div><p style="font-size:16px">${T("lessD")}</p></div>
      <div class="dark"><div class="big">${T("extra")}</div><p style="font-size:16px">${T("extraD")}</p></div>
    </div>
    <a class="btn btn-primary" href="${esc(C.discountUrl)}" style="margin-top:16px">${T("claim")}</a>
    <p style="margin-top:12px;font-size:16px;color:var(--muted)">${T("orCode", { code: `<span class="code" dir="ltr">${esc(C.discountCode)}</span>` })}</p>

    <div class="join" id="join">
      <h3>${T("joinTitle")}</h3>
      <p>${T("joinD")}</p>
      <div class="join-ok" id="joinOk" role="status"${store.get("hollJoined") ? "" : " hidden"}>${T("fOk")}</div>
      <form id="joinForm" method="POST" action="${BREVO}" novalidate${store.get("hollJoined") ? " hidden" : ""}>
        <label class="f"><span>${T("fName")}</span><input type="text" name="NOMBRE" maxlength="200" autocomplete="given-name"></label>
        <label class="f"><span>${T("fEmail")} *</span><input type="email" name="EMAIL" id="joinEmail" autocomplete="email" inputmode="email" dir="ltr" required></label>
        <fieldset class="f"><legend>${T("fCities")}</legend>
          <label class="chk"><input type="checkbox" name="BIRMINGHAM" value="1"> Birmingham</label>
          <label class="chk"><input type="checkbox" name="NOTTINGHAM" value="1"> Nottingham</label>
        </fieldset>
        <fieldset class="f"><legend>${T("fPurpose")}</legend>
          <label class="chk"><input type="radio" name="TRAVEL_PURPOSE" value="1"> ${T("pWork")}</label>
          <label class="chk"><input type="radio" name="TRAVEL_PURPOSE" value="2"> ${T("pLeisure")}</label>
          <label class="chk"><input type="radio" name="TRAVEL_PURPOSE" value="3"> ${T("pBoth")}</label>
        </fieldset>
        <label class="chk consent"><input type="checkbox" name="OPT_IN" value="1" id="joinConsent"> <span>${T("fConsent")} *</span></label>
        <input type="hidden" name="PROPERTY" value="${esc((typeof C.propertyName === "string" ? C.propertyName : (C.propertyName.en || "")))}">
        <input type="hidden" name="GUIDE_LANGUAGE" value="${lang}">
        <input type="hidden" name="locale" value="en">
        <input type="hidden" name="html_type" value="simple">
        <input type="text" name="email_address_check" value="" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
        <p class="join-err" id="joinErr" role="alert" hidden></p>
        <button class="btn btn-primary" type="submit" id="joinBtn">${T("fSend")}</button>
        <p class="fine">${T("fBrevo")}</p>
      </form>
    </div>
  </section>

  ${T("legal") ? `<p class="legal">${T("legal")}</p>` : ""}
  <footer><img src="${LOGO}" alt="Holl Group">Holl Group · hollgroup.co.uk</footer>
</main>

<nav class="bar" aria-label="Quick actions"><div class="bar-in">
  <a class="main" href="${WA}">${I.chat}${T("whatsapp")}</a>
  <a href="tel:${PHONE}">${I.phone}${T("call")}</a>
  ${clean(C.entranceCoords) ? `<a href="${maps(C.entranceCoords)}" target="_blank" rel="noopener">${I.pin}${T("directions")}</a>` : `<a href="mailto:${EMAIL}">${I.mail}${T("email")}</a>`}
</div></nav>`;

    document.title = (typeof C.propertyName === "string" && !C.propertyName.startsWith("[") ? C.propertyName + " | " : "") + "Holl Group";

    document.getElementById("langSel").addEventListener("change", e => {
      const l = e.target.value;
      saveLang(l);
      const y = window.scrollY;
      render(l);
      window.scrollTo(0, y);
    });

    // Section shortcuts: hide the fade at the end of the row, highlight the section on screen
    const navBar = document.getElementById("navBar"), navWrap = document.getElementById("navWrap");
    const fade = () => { const max = navBar.scrollWidth - navBar.clientWidth; navWrap.classList.toggle("end", max <= 2 || Math.abs(navBar.scrollLeft) >= max - 2); };
    navBar.addEventListener("scroll", fade, { passive: true }); fade();
    if ("IntersectionObserver" in window) {
      const links = {}; navBar.querySelectorAll("a").forEach(a => links[a.dataset.id] = a);
      let current = "";
      const pick = () => {
        const line = window.innerHeight * 0.4;
        let best = null;
        Object.keys(links).forEach(id => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= line) best = id; });
        if (!best || best === current) return;
        current = best;
        navBar.querySelectorAll("a.on").forEach(x => x.classList.remove("on"));
        const a = links[best]; a.classList.add("on");
        const left = a.offsetLeft - navBar.clientWidth / 2 + a.clientWidth / 2;
        navBar.scrollTo({ left: document.documentElement.dir === "rtl" ? -Math.max(0, navBar.scrollWidth - navBar.clientWidth - left) : left, behavior: "smooth" });
      };
      const io = new IntersectionObserver(pick, { threshold: [0, 0.25, 0.5, 0.75, 1] });
      Object.keys(links).forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
      window.addEventListener("scroll", pick, { passive: true });
    }

    // Tap a photo to see it full screen
    let lb = document.getElementById("lb");
    if (!lb) { lb = document.createElement("div"); lb.id = "lb"; lb.className = "lb"; lb.hidden = true; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.innerHTML = '<button type="button" class="lb-close">&times;</button><img alt="">'; document.body.appendChild(lb); }
    const lbClose = lb.querySelector(".lb-close"), lbImg = lb.querySelector("img");
    lbClose.setAttribute("aria-label", T("close"));
    let lastBtn = null;
    const closeLb = () => { lb.hidden = true; document.body.style.overflow = ""; lbImg.removeAttribute("src"); if (lastBtn) lastBtn.focus(); };
    document.querySelectorAll(".zoom").forEach(btn => btn.addEventListener("click", () => {
      lastBtn = btn;
      lbImg.src = btn.dataset.src.replace("c_limit,w_900", "c_limit,w_1800");
      lbImg.alt = btn.querySelector("img").alt;
      lb.hidden = false; document.body.style.overflow = "hidden"; lbClose.focus();
    }));
    lb.onclick = e => { if (e.target !== lbImg) closeLb(); };
    document.onkeydown = e => { if (e.key === "Escape" && !lb.hidden) closeLb(); };

    // Promo strip: hide for good once closed
    const promoX = document.getElementById("promoX");
    if (promoX) promoX.addEventListener("click", () => { store.set("hollPromoHide", "1"); document.getElementById("promo").remove(); });

    // Returning guests sign up: sent to Brevo in the background, the guest never leaves the guide
    const jf = document.getElementById("joinForm");
    if (jf) {
      const err = document.getElementById("joinErr"), btn = document.getElementById("joinBtn");
      const showErr = html => { err.innerHTML = html; err.hidden = false; };
      jf.addEventListener("change", () => { err.hidden = true; });
      jf.addEventListener("submit", e => {
        e.preventDefault();
        const email = document.getElementById("joinEmail").value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return showErr(esc(T("fErrEmail")));
        if (!document.getElementById("joinConsent").checked) return showErr(esc(T("fErrConsent")));
        err.hidden = true;
        btn.disabled = true; btn.textContent = T("fSending");
        fetch(BREVO, { method: "POST", mode: "no-cors", body: new URLSearchParams(new FormData(jf)) })
          .then(() => {
            store.set("hollJoined", "1");
            jf.hidden = true;
            document.getElementById("joinOk").hidden = false;
            const pr = document.getElementById("promo"); if (pr) pr.remove();
          })
          .catch(() => {
            btn.disabled = false; btn.textContent = T("fSend");
            showErr(`${esc(T("fErrSend"))} <a href="${BREVO}" target="_blank" rel="noopener">${esc(T("fErrLink"))}</a>`);
          });
      });
    }

    const toast = msg => { const el = document.getElementById("toast"); el.textContent = msg; el.classList.add("on"); setTimeout(() => el.classList.remove("on"), 1600); };
    document.getElementById("copyPw").addEventListener("click", () => {
      if (navigator.clipboard) navigator.clipboard.writeText(C.wifiPassword).then(() => toast(T("copied"))).catch(() => toast(T("copyFail")));
    });

    // Wi-Fi QR in the standard format phones understand
    const wesc = s => String(s).replace(/([\\;,:"])/g, "\\$1");
    let qrMade = false;
    document.getElementById("qrBtn").addEventListener("click", () => {
      const box = document.getElementById("wifiQr");
      if (!qrMade && window.QRCode) {
        new QRCode(box, { text: `WIFI:T:WPA;S:${wesc(C.wifiName)};P:${wesc(C.wifiPassword)};;`, width: 200, height: 200, colorDark: "#1E1E1E", colorLight: "#FFFFFF", correctLevel: QRCode.CorrectLevel.M });
        qrMade = true;
      }
      box.classList.toggle("show");
    });
  }

  const start = pickLang();
  if (start) render(start); else renderLanding();
})();
