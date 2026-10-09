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
  // Thank you in many languages. Flags are small images (emoji flags do not show on Windows); a flag that fails to load is simply removed.
  const THANKS_LIST = [["gb", "Thank you"], ["cheers", "Cheers, bab!"], ["es", "Gracias"], [null, "Eskerrik asko"], [null, "Gràcies"], [null, "Graciñas"], ["fr", "Merci"], ["de", "Danke"], ["it", "Grazie"], ["pt", "Obrigado"], ["gb-wls", "Diolch"], ["ie", "Go raibh maith agat"], ["gb-sct", "Tapadh leat"], ["nl", "Dank u"], ["se", "Tack"], ["no", "Takk"], ["dk", "Tak"], ["fi", "Kiitos"], ["ee", "Aitäh"], ["pl", "Dziękuję"], ["cz", "Děkuji"], ["hu", "Köszönöm"], ["ro", "Mulțumesc"], ["gr", "Efcharistó"], ["tr", "Teşekkürler"], ["ua", "Diakuiu"], ["ru", "Spasibo"], ["sa", "Shukran"], ["il", "Toda"], ["ir", "Mamnoon"], ["in", "Dhanyavaad"], ["pk", "Shukriya"], ["bd", "Dhonnobad"], ["cn", "Xièxie"], ["hk", "M'goi"], ["jp", "Arigato"], ["kr", "Gamsahamnida"], ["ph", "Salamat"], ["id", "Terima kasih"], ["th", "Khop khun"], ["vn", "Cảm ơn"], ["ke", "Asante"], ["za", "Dankie"], ["so", "Mahadsanid"], ["jm", "Give tanks"], ["rainbow", "Gracias"], [null, "Thank you"]];
  const flag = c => !c ? "" : c === "cheers" ? '<span class="tk-emo">🥂</span>' : c === "rainbow" ? '<span class="tk-rainbow"></span>' : `<img class="tk-flag" src="https://flagcdn.com/w40/${c}.png" width="20" height="15" alt="" loading="lazy" onerror="this.remove()">`;
  const thanksHtml = () => THANKS_LIST.map(([c, t]) => `<span class="tk">${flag(c)}${esc(t)}</span>`).join('<span class="tk-dot">·</span>');
  const HOMES = "https://hollgroup.co.uk/properties.html";
  const LOGO = "https://res.cloudinary.com/dyojhaiig/image/upload/f_auto,q_auto,w_160/v1781020925/logo_cropped_pezlyx.png";
  const HOST = "https://res.cloudinary.com/dyojhaiig/image/upload/c_thumb,g_face,w_240,h_240,z_0.75,f_auto,q_auto/v1787835750/aiboryyy-20251211-0001_yx87j9.jpg";

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clean = v => String(v || "").replace(/\s+/g, "");
  // Accepts coordinates ("52.47, -1.89") or a full Google Maps link
  const maps = c => /^https?:\/\//i.test(clean(c)) ? clean(c) : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(/^-?\d/.test(String(c).trim()) ? clean(c) : String(c).trim());
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
    train: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 10h14M9 14h.01M15 14h.01M8 21l2-4M16 21l-2-4"/></svg>',
    tram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="6" width="14" height="12" rx="3"/><path d="M8 2h8M12 2v4M5 12h14M9 15h.01M15 15h.01M8 22l1.5-4M16 22l-1.5-4"/></svg>',
    bus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="15" rx="3"/><path d="M4 11h16M8 15h.01M16 15h.01M7 18v3M17 18v3"/></svg>',
    plane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
    car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17h14v-5l-2-5H7l-2 5v5z"/><path d="M5 12h14"/><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/></svg>',
    walk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="4" r="2"/><path d="M10 21l2-6 3 3v3M8 12l2-4 4 1 2 4 2 1M10 8l-1 5"/></svg>',
    pill: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 20.5a7 7 0 0 1-9.9-9.9l6-6a7 7 0 0 1 9.9 9.9z"/><path d="M8.5 8.5l7 7"/></svg>',
    hospital: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 7v10M7 12h10"/></svg>',
    eat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 2v20M4 2v6a3 3 0 0 0 6 0V2M17 22V2c-2.2 1.5-3 4-3 7v4h3"/></svg>',
    coffee: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2v3M12 2v3"/></svg>',
    drinks: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l-1 8a5 5 0 0 1-10 0z"/><path d="M12 16v5M8 21h8M6.5 7h11"/></svg>',
    essentials: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9h18l-2 11H5z"/><path d="M8 9l4-6 4 6M9 13v4M15 13v4"/></svg>',
    see: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>',
    bed_single: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="3" width="10" height="18" rx="2"/><rect x="9" y="5" width="6" height="3" rx="1"/><path d="M7 11h10"/></svg>',
    bed_double: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="5" y="5" width="6" height="3" rx="1"/><rect x="13" y="5" width="6" height="3" rx="1"/><path d="M3 11h18"/></svg>',
    bed_king: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><rect x="4" y="4" width="7" height="3.5" rx="1"/><rect x="13" y="4" width="7" height="3.5" rx="1"/><path d="M2 10.5h20"/></svg>',
    bed_sofa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><path d="M2 13a2 2 0 0 1 4 0v2h12v-2a2 2 0 0 1 4 0v5H2z"/><path d="M5 18v2M19 18v2"/></svg>',
    bath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z"/><path d="M6 12V5a2 2 0 0 1 4 0M7 20l-1 2M17 20l1 2"/></svg>',
    people: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.5a5 5 0 0 1 5.5 5"/></svg>',
    door: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17M3 21h18"/><circle cx="15" cy="12" r="1"/></svg>',
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
    // Appliance guides: tap a name to open its steps
    const appliances = list => !list || !list.length ? "" : `<div class="appl-list">${list.map(a => {
      const steps = (a.steps && (a.steps[lang] || a.steps.en)) || [];
      return `<details class="appl"><summary><span>${P(a.name)}</span><small dir="ltr">${esc([a.brand, a.model].filter(Boolean).join(" · "))}</small></summary>
        ${steps.length ? `<ol>${steps.map(x => `<li>${esc(x)}</li>`).join("")}</ol>` : ""}
        ${a.tip ? `<p class="appl-tip"><b>${T("applTip")}:</b> ${P(a.tip)}</p>` : ""}
        ${a.manual ? `<a class="appl-man" href="${esc(a.manual)}" target="_blank" rel="noopener">${T("applManual")}${a.model ? ` <span dir="ltr">(${esc(a.model)})</span>` : ""}</a>` : ""}
      </details>`; }).join("")}</div>`;
    // Lockbox away from the building: guests must collect the keys before going to the entrance
    const keysFirst = isLockbox && C.keysFirst;
    const keysFirstBox = () => !keysFirst ? "" : `<div class="keys-first"><div class="sub">${I.key}${T("keysFirstH")}</div><p>${T("keysFirstD", { where: P(C.keysFirstWhere) })}</p>${clean(C.lockboxCoords) ? mapBtn(C.lockboxCoords, T("keysFirstBtn"), "btn-primary") : ""}</div>`;
    // Visual cards (transport, pharmacies, A&E, local picks): big icon, optional photo, name, minutes, short note. Tap opens Maps.
    const card = (c, ico, label, wide) => {
      const img = c.img ? `<img class="cd-img" src="${esc(c.img)}" alt="" loading="lazy">` : "";
      const time = c.mins ? `<span class="tr-time">${I[c.how || "walk"] || ""}${T("tmin_" + (c.how || "walk"), { n: esc(c.mins) })}</span>` : "";
      const tag = c.tag ? `<span class="cd-tag">${T("tag_" + c.tag)}</span>` : "";
      const inner = `${img}<span class="cd-row"><span class="tr-ico">${I[ico] || I.pin}</span><span class="tr-body"><span class="tr-mode">${label}</span><span class="tr-name">${P(c.name)}</span>${tag}${time}${c.note ? `<span class="tr-note">${P(c.note)}</span>` : ""}</span></span>${clean(c.coords) ? `<span class="cd-go">${I.pin}${T("openMaps")}</span>` : ""}`;
      const cls = "tr" + (wide ? " wide" : "") + (c.img ? " has-img" : "");
      return clean(c.coords) ? `<a class="${cls}" href="${maps(c.coords)}" target="_blank" rel="noopener">${inner}</a>` : `<div class="${cls}">${inner}</div>`;
    };
    const cards = (title, list, fn, wide) => !list || !list.length ? "" : `${title ? `<div class="sub" style="margin-top:4px">${title}</div>` : ""}<div class="tr-grid${wide ? " one" : ""}">${list.map(fn).join("")}</div>`;
    const transport = list => cards(T("transportTitle"), list, t => card(t, t.mode === "coach" ? "bus" : t.mode, T("tm_" + t.mode)));
    // Sleeping arrangements at a glance
    const beds = list => {
      if (!list || !list.length) return "";
      const rooms = list.filter(r => r.room !== "living").length;
      const stats = `<div class="bd-stats">${C.sleeps ? `<span>${I.people}${T("sleepsN", { n: esc(C.sleeps) })}</span>` : ""}<span>${I.door}${T("bedroomsN", { n: rooms })}</span>${C.bathrooms ? `<span>${I.bath}${T("bathroomsN", { n: esc(C.bathrooms) })}</span>` : ""}</div>`;
      return stats + `<div class="tr-grid">${list.map(r => {
        const counts = {}; (r.beds || []).forEach(b => counts[b] = (counts[b] || 0) + 1);
        return `<div class="tr bd"><span class="tr-mode">${T("room_" + r.room)}</span>
          <span class="bd-icons">${(r.beds || []).map(b => `<span class="bd-ico">${I["bed_" + b]}</span>`).join("")}</span>
          <span class="bd-list">${Object.keys(counts).map(b => `<b>${counts[b]} × ${T("bed_" + b)}</b>`).join("")}</span>
          ${r.ensuite ? `<span class="bd-extra">${I.bath}${T("ensuite")}</span>` : ""}
          ${r.note ? `<span class="tr-note">${P(r.note)}</span>` : ""}</div>`; }).join("")}</div>`;
    };
    const nav = [["glance", "navGlance"], ["important", "navImportant"], ["arrive", "navArrival"], ["home", "navHome"], ["story", "navStory"], ["rules", "navRules"], ["safety", "navSafety"], ["help", "navHelp"], ["services", "navServices"], ["checkout", "navCheckout"], ["picks", "navPicks"], ["thanks", "navThanks"]];
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
  <div class="nav-wrap" id="navWrap"><nav class="nav" id="navBar" aria-label="Sections">${nav.filter(([id]) => (id !== "picks" || (C.picks || []).length) && (id !== "story" || C.story)).map(([id, k]) => `<a href="#${id}" data-id="${id}">${T(k)}</a>`).join("")}</nav></div>
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
    <div class="stack" style="margin-top:12px">${keysFirst && clean(C.lockboxCoords) ? mapBtn(C.lockboxCoords, T("keysFirstBtn"), "btn-white") : ""}${mapBtn(C.entranceCoords, keysFirst ? T("entranceStep2") : T("entrance"), "btn-white")}</div>
  </section>

  <section class="card imp" id="important">
    <h2>${T("impTitle")}</h2>
    <ul class="imp-list">
      ${keysFirst ? `<li class="hot"><span class="h">${T("keysFirstH")}</span>${T("keysFirstD", { where: P(C.keysFirstWhere) })}</li>` : ""}
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
      ${keysFirstBox()}
      ${C.directions ? `<p>${P(C.directions)}</p>` : ""}
      ${transport(C.transport)}
      ${mapBtn(C.entranceCoords, keysFirst ? T("entranceStep2") : T("entrance"), keysFirst ? "btn-light" : "btn-primary")}
      <div class="soft"><div class="sub">${T("parking")}</div>
        ${C.parking === "none"
          ? `<p>${T("noParking")}</p><p style="margin-top:8px">${P(C.parkingNearby)}</p>${clean(C.parkingNearbyCoords) ? `<div style="margin-top:10px">${mapBtn(C.parkingNearbyCoords, T("parkingMap"), "btn-light")}</div>` : ""}`
          : `<p>${P(C.parkingDetails)}</p>${clean(C.parkingCoords) ? `<div style="margin-top:10px">${mapBtn(C.parkingCoords, T("parkingEntrance"), "btn-primary")}</div>` : ""}${gallery(C.parkingPhotos)}${C.parkingNearby ? `<p style="margin-top:12px">${P(C.parkingNearby)}</p>` : ""}${clean(C.parkingNearbyCoords) ? `<div style="margin-top:10px">${mapBtn(C.parkingNearbyCoords, T("parkingMap"), "btn-light")}</div>` : ""}`}
      </div>
    </div>
    <h2 style="margin-top:26px">${T("gettingIn")}</h2>
    <div class="stack">
      ${isLockbox
        ? `<p>${T("lockboxText")}</p>
           ${C.lockboxAreaPhoto ? photo(C.lockboxAreaPhoto, T("lockboxArea")) : clean(C.lockboxCoords) ? "" : `<img src="lockbox-area.jpg" alt="" style="width:100%;border-radius:14px;display:block" onerror="this.outerHTML='<div class=&quot;soft&quot;><span class=&quot;ph&quot;>[PHOTO: lockbox-area.jpg in this folder]</span></div>'">`}
           ${clean(C.lockboxCoords) ? mapBtn(C.lockboxCoords, T("lockboxArea"), "btn-light") : ""}`
        : `<p>${T("smartText")}${C.smartLockCodeTimeLimited ? " " + T("smartLimited") : ""}</p>
           <p>${P(C.smartLockHowTo)}</p>
           <p>${T("smartFail")}</p>`}
      ${route(C.arrivalRoute)}
    </div>
  </section>

  <section class="card" id="home">
    <h2>${T("homeTitle")}</h2>
    ${C.beds ? `<div class="sub" style="margin:4px 0 10px">${T("bedsTitle")}</div>${beds(C.beds)}<div style="height:16px"></div>` : ""}
    <div class="stack">${C.property.map(b => `<div class="soft"><div class="sub">${P(b.title)}</div><p>${P(b.text)}</p>${appliances(b.appliances)}</div>`).join("")}</div>
  </section>

  ${C.story ? `<section class="card story" id="story">
    <span class="eyebrow">${T("storyEyebrow")}</span>
    <h2 style="margin-top:6px">${P(C.story.title)}</h2>
    ${C.story.lead ? `<p class="story-lead">${P(C.story.lead)}</p>` : ""}
    ${(C.story.timeline || []).length ? `<div class="tl">${C.story.timeline.map(t => `<div class="tl-row"><span class="tl-year">${esc(t.year)}</span><span>${P(t.text)}</span></div>`).join("")}</div>` : ""}
    ${gallery((C.story.gallery || []).filter(g => g.img))}
    ${(C.story.blocks || []).map(b => `<div class="soft" style="margin-top:12px"><div class="sub">${P(b.title)}</div><p>${P(b.text)}</p></div>`).join("")}
    ${(C.story.challenge || []).length ? `<div class="sub" style="margin-top:18px">${T("storyChallenge")}</div><div class="hunt">${C.story.challenge.map((c, k) => `<label class="hunt-item"><input type="checkbox" data-k="${k}"><span><b>${P(c.title)}</b><small>${P(c.text)}</small></span></label>`).join("")}</div>` : ""}
  </section>` : ""}

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
    ${C.fireDetails ? `<p style="margin-top:14px">${P(C.fireDetails)}</p>` : ""}
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
      ${cards(T("pharmacies"), [].concat(C.pharmacy || []), c => card(c, "pill", T("cardPharmacy")))}
      ${C.pharmacyNote ? `<p style="font-size:16px;color:var(--muted)">${P(C.pharmacyNote)}</p>` : ""}
      ${cards(T("aes"), [].concat(C.hospital || []), c => card(Object.assign({ how: "car" }, c), "hospital", T("cardAE")))}
      <p style="font-size:16px;color:var(--muted)">${C.hospitalNote ? P(C.hospitalNote) : T("aeNote")}</p>
      <div class="soft">${C.utilitiesLocked ? T("utilLocked") : `<b>${T("stopcock")}:</b> ${P(C.stopcock)}<br><b>${T("fuse")}:</b> ${P(C.fuseBox)}`}</div>
    </div>
  </section>

  <section class="card" id="help">
    <h2>${T("helpTitle")}</h2>
    <p style="margin-bottom:14px">${T("helpIntro")}</p>
    <div class="stack">
      <div class="issue"><span class="icon">${I.wifi}</span><div><div class="sub">${T("wifiLabel")}</div><p>${(C.routerLocked ?? C.utilitiesLocked) ? T("wifiLocked") : `${T("wifiFix")} ${P(C.routerLocation)}`}</p></div></div>
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

  ${(C.picks || []).length ? `<section class="card" id="picks">
    <h2>${T("picksTitle")}</h2>
    ${C.picksImage ? `<div style="margin:6px 0 14px">${photo(C.picksImage, T("picksTitle"))}</div>` : ""}
    ${(() => { const order = ["essentials", "eat", "coffee", "drinks", "see"];
      const cats = order.filter(c => C.picks.some(p => p.category === c));
      const sorted = order.flatMap(c => C.picks.filter(p => p.category === c)).concat(C.picks.filter(p => !order.includes(p.category)));
      const chips = cats.length > 1 && C.picks.length > 6 ? `<div class="pk-chips" id="pkChips"><button type="button" class="on" data-cat="">${T("allCats")}</button>${cats.map(c => `<button type="button" data-cat="${c}">${T("cat_" + c)}</button>`).join("")}</div>` : "";
      return chips + cards("", sorted, p => card(Object.assign({}, p, { mins: p.mins || p.walkMins }), p.category, T("cat_" + p.category), true).replace(/^<(a|div) class="/, `<$1 data-cat="${p.category}" class="`), true); })()}
  </section>` : ""}

  <section class="card gift" id="thanks">
    <div class="icon" style="margin:0 auto 12px;width:56px;height:56px">${I.gift}</div>
    <h2>${T("thanksTitle")}</h2>
    <div class="thanks-ticker" aria-hidden="true" dir="ltr"><div class="thanks-track"><span class="tk-run">${thanksHtml()}<span class="tk-dot">·</span></span><span class="tk-run">${thanksHtml()}<span class="tk-dot">·</span></span></div></div>
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

  <section class="card more" id="more">
    <h2>${T("moreTitle")}</h2>
    <p>${T("moreD")}</p>
    <a class="btn btn-primary btn-big" href="${HOMES}?utm_source=guest-guide&utm_medium=referral&utm_campaign=${encodeURIComponent((typeof C.propertyName === "string" ? C.propertyName : (C.propertyName.en || "")).toLowerCase().replace(/[^a-z0-9]+/g, "-"))}" target="_blank" rel="noopener">${I.pin}${T("moreBtn")}</a>
  </section>

  ${T("legal") ? `<p class="legal">${T("legal")}</p>` : ""}
  <footer><img src="${LOGO}" alt="Holl Group">Holl Group · hollgroup.co.uk</footer>
</main>

<nav class="bar" aria-label="Quick actions"><div class="bar-in">
  <a class="main" href="${WA}">${I.chat}${T("whatsapp")}</a>
  <a href="tel:${PHONE}">${I.phone}${T("call")}</a>
  ${clean(C.entranceCoords) ? `<a href="${maps(keysFirst && clean(C.lockboxCoords) ? C.lockboxCoords : C.entranceCoords)}" target="_blank" rel="noopener">${I.pin}${T("directions")}</a>` : `<a href="mailto:${EMAIL}">${I.mail}${T("email")}</a>`}
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
        const body = new URLSearchParams(new FormData(jf));
        const ok = () => {
          store.set("hollJoined", "1");
          jf.hidden = true;
          document.getElementById("joinOk").hidden = false;
          const pr = document.getElementById("promo"); if (pr) pr.remove();
        };
        const fail = msg => {
          btn.disabled = false; btn.textContent = T("fSend");
          showErr(`${msg ? esc(msg) + "<br>" : esc(T("fErrSend")) + " "}<a href="${BREVO}" target="_blank" rel="noopener">${esc(T("fErrLink"))}</a>`);
        };
        // Brevo answers with {"success": true/false, "message": "..."}; read it so a refusal is never silent
        fetch(BREVO + "?isAjax=1", { method: "POST", body })
          .then(r => r.text().then(t => {
            let j = null; try { j = JSON.parse(t); } catch (e) {}
            console.log("Brevo sign up:", r.status, t);
            if (!r.ok || (j && j.success === false)) fail(j && (j.message || (j.errors && JSON.stringify(j.errors)))); else ok();
          }))
          .catch(err => { console.log("Brevo sign up blocked:", err); fail(null); });
      });
    }

    // Garden challenge: remember ticks on this phone
    document.querySelectorAll(".hunt input").forEach(cb => {
      const key = "hollHunt" + location.pathname + cb.dataset.k;
      cb.checked = store.get(key) === "1";
      cb.addEventListener("change", () => store.set(key, cb.checked ? "1" : ""));
    });

    // Filter local picks by category
    const pkChips = document.getElementById("pkChips");
    if (pkChips) pkChips.addEventListener("click", e => {
      const btn = e.target.closest("button"); if (!btn) return;
      pkChips.querySelectorAll("button").forEach(b => b.classList.toggle("on", b === btn));
      const cat = btn.dataset.cat;
      document.querySelectorAll("#picks [data-cat]").forEach(el => { if (el.parentElement !== pkChips) el.hidden = !!cat && el.dataset.cat !== cat; });
    });

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
