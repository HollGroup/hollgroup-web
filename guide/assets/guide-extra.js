/* Holl Group guest guide, small add-ons loaded after guide.js (optional per page).
   1. **text** in any property text shows in bold.
   2. Section shortcuts stay on one scrolling row on computers too, and the mouse wheel scrolls them sideways.
   3. Optional CONFIG.offers: a "bookable experiences" section (affiliate links) shown before Local picks.
      offers: { nav, title, note, items: [ { icon: "bag"|"walk"|"fish"|"ticket", img, title, text, cta, url } ] }
      Every text can be plain or { en: "...", es: "..." }. Leave offers out and nothing changes.
   4. Optional CONFIG.servicePhotos: { early, late, mid } photo links shown on top of the three Services blocks.
   Since 20261013e guide.js loads this file on every guide, and offers and servicePhotos have Birmingham defaults
   (below). A page can replace them with its own, or switch them off with offers: false / servicePhotos: false. */
(function () {
  if (window.__hollGuideExtra) return;
  window.__hollGuideExtra = true;
  var DEFAULT_OFFERS = {"nav": {"en": "Experiences", "es": "Experiencias", "fr": "Expériences", "de": "Erlebnisse", "it": "Esperienze", "pt": "Experiências", "zh": "体验活动", "ar": "تجارب", "ja": "体験"}, "title": {"en": "Make the most of Birmingham", "es": "Aprovecha Birmingham al máximo", "fr": "Profitez pleinement de Birmingham", "de": "Holen Sie das Beste aus Birmingham heraus", "it": "Goditi Birmingham al massimo", "pt": "Aproveite Birmingham ao máximo", "zh": "畅玩伯明翰", "ar": "استمتع ببرمنغهام إلى أقصى حد", "ja": "バーミンガムを満喫しよう"}, "note": {"en": "We may earn a small commission when you book through these links, at no extra cost to you.", "es": "Podemos recibir una pequeña comisión si reservas desde estos enlaces, sin coste extra para ti.", "fr": "Nous pouvons percevoir une petite commission si vous réservez via ces liens, sans frais supplémentaires pour vous.", "de": "Wenn Sie über diese Links buchen, erhalten wir eventuell eine kleine Provision, ohne Mehrkosten für Sie.", "it": "Potremmo ricevere una piccola commissione se prenoti tramite questi link, senza costi aggiuntivi per te.", "pt": "Podemos receber uma pequena comissão se reservar através destes links, sem custo extra para si.", "zh": "通过这些链接预订，我们可能会获得少量佣金，您无需支付任何额外费用。", "ar": "قد نحصل على عمولة صغيرة عند الحجز عبر هذه الروابط، دون أي تكلفة إضافية عليك.", "ja": "これらのリンクから予約されると、私たちに少額の手数料が入る場合があります。お客様の追加負担はありません。"}, "items": [{"url": "https://gyg.me/b6jEuHiZ", "title": {"en": "Luggage storage in the city centre", "es": "Consigna de equipaje en el centro", "fr": "Consigne à bagages en centre-ville", "de": "Gepäckaufbewahrung in der Innenstadt", "it": "Deposito bagagli in centro", "pt": "Guarda-bagagem no centro", "zh": "市中心行李寄存", "ar": "تخزين الأمتعة في وسط المدينة", "ja": "市内中心部の荷物預かり"}, "text": {"en": "Arriving early or leaving late? Leave your bags at one of the many drop-off points across the city centre and enjoy Birmingham hands-free. From around £7, **free cancellation up to 24 hours before**, reserve now and pay later.", "es": "¿Llegas pronto o te vas tarde? Deja tus maletas en uno de los muchos puntos repartidos por el centro y disfruta de Birmingham sin cargar con ellas. Desde unas 7 £, **cancelación gratis hasta 24 horas antes**, reserva ahora y paga después.", "fr": "Vous arrivez tôt ou partez tard ? Déposez vos bagages dans l'un des nombreux points du centre-ville et profitez de Birmingham les mains libres. À partir d'environ 7 £, **annulation gratuite jusqu'à 24 heures avant**, réservez maintenant et payez plus tard.", "de": "Früh angekommen oder spät abreisen? Lassen Sie Ihr Gepäck an einer der vielen Abgabestellen in der Innenstadt und genießen Sie Birmingham ohne Koffer. Ab etwa 7 £, **kostenlose Stornierung bis 24 Stunden vorher**, jetzt reservieren und später bezahlen.", "it": "Arrivi presto o parti tardi? Lascia i bagagli in uno dei tanti punti del centro e goditi Birmingham a mani libere. Da circa 7 £, **cancellazione gratuita fino a 24 ore prima**, prenota ora e paga dopo.", "pt": "Chega cedo ou parte tarde? Deixe as malas num dos muitos pontos do centro e aproveite Birmingham sem carregar nada. A partir de cerca de 7 £, **cancelamento grátis até 24 horas antes**, reserve agora e pague depois.", "zh": "早到或晚走？把行李寄存在市中心众多寄存点之一，轻松畅游伯明翰。约 7 英镑起，**提前 24 小时可免费取消**，现在预订，稍后付款。", "ar": "تصل مبكرًا أو تغادر متأخرًا؟ اترك حقائبك في إحدى نقاط التسليم الكثيرة في وسط المدينة واستمتع ببرمنغهام دون حملها. ابتداءً من حوالي 7 جنيهات، **إلغاء مجاني حتى 24 ساعة قبل الموعد**، احجز الآن وادفع لاحقًا.", "ja": "早く着いた日や遅く出発する日に。市内中心部に多数ある預け場所に荷物を預けて、身軽にバーミンガムを楽しめます。約 7 ポンドから、**24 時間前まで無料キャンセル**、今予約して後払いできます。"}, "cta": {"en": "Book luggage storage", "es": "Reservar consigna", "fr": "Réserver une consigne", "de": "Gepäckaufbewahrung buchen", "it": "Prenota il deposito", "pt": "Reservar guarda-bagagem", "zh": "预订行李寄存", "ar": "احجز تخزين الأمتعة", "ja": "荷物預かりを予約"}, "img": "https://res.cloudinary.com/dyojhaiig/image/upload/c_fill,w_900,h_500,g_auto,f_auto,q_auto/v1791906085/Luggage_Drop_Off_1_wlzrbx.jpg"}, {"icon": "walk", "url": "https://gyg.me/IA9EIfgK", "title": {"en": "Peaky Blinders pub walk at dusk", "es": "Ruta de los Peaky Blinders por pubs al anochecer", "fr": "Balade des Peaky Blinders dans les pubs au crépuscule", "de": "Peaky-Blinders-Pubtour in der Abenddämmerung", "it": "Tour dei Peaky Blinders tra i pub al tramonto", "pt": "Passeio dos Peaky Blinders pelos pubs ao anoitecer", "zh": "黄昏《浴血黑帮》酒吧徒步游", "ar": "جولة Peaky Blinders في الحانات عند الغروب", "ja": "夕暮れのピーキー・ブラインダーズ パブ散策"}, "text": {"en": "A 2 hour walking tour about Birmingham's real slogging gangs, the Peaky Blinders among them, with a guide in costume and stops at 4 pubs and bars. **Adults only (18+).** Free cancellation up to 24 hours before.", "es": "Un tour a pie de 2 horas sobre las auténticas bandas callejeras de Birmingham, entre ellas los Peaky Blinders, con guía disfrazado y paradas en 4 pubs y bares. **Solo adultos (18+).** Cancelación gratis hasta 24 horas antes.", "fr": "Une visite à pied de 2 heures sur les vrais gangs de rue de Birmingham, dont les Peaky Blinders, avec un guide costumé et des arrêts dans 4 pubs et bars. **Réservé aux adultes (18+).** Annulation gratuite jusqu'à 24 heures avant.", "de": "Ein 2-stündiger Rundgang über Birminghams echte Straßenbanden, darunter die Peaky Blinders, mit kostümiertem Guide und Stopps in 4 Pubs und Bars. **Nur für Erwachsene (18+).** Kostenlose Stornierung bis 24 Stunden vorher.", "it": "Un tour a piedi di 2 ore sulle vere gang di Birmingham, tra cui i Peaky Blinders, con guida in costume e soste in 4 pub e bar. **Solo adulti (18+).** Cancellazione gratuita fino a 24 ore prima.", "pt": "Um passeio a pé de 2 horas sobre os verdadeiros gangues de Birmingham, incluindo os Peaky Blinders, com guia mascarado e paragens em 4 pubs e bares. **Só para adultos (18+).** Cancelamento grátis até 24 horas antes.", "zh": "2 小时徒步游，讲述伯明翰真实的街头帮派（包括 Peaky Blinders），导游身着戏服，途经 4 家酒吧。**仅限成人（18 岁以上）。**提前 24 小时可免费取消。", "ar": "جولة سيرًا على الأقدام لمدة ساعتين عن عصابات برمنغهام الحقيقية، ومنها Peaky Blinders، مع مرشد بزي تنكري وتوقف في 4 حانات وبارات. **للبالغين فقط (18+).** إلغاء مجاني حتى 24 ساعة قبل الموعد.", "ja": "ピーキー・ブラインダーズを含む、バーミンガムに実在したギャングの歴史をたどる 2 時間のウォーキングツアー。衣装姿のガイドと 4 軒のパブやバーを巡ります。**18 歳以上限定。**24 時間前まで無料キャンセル。"}, "cta": {"en": "See dates and book", "es": "Ver fechas y reservar", "fr": "Voir les dates et réserver", "de": "Termine ansehen und buchen", "it": "Vedi date e prenota", "pt": "Ver datas e reservar", "zh": "查看日期并预订", "ar": "عرض المواعيد والحجز", "ja": "日程を見て予約"}}, {"img": "https://res.cloudinary.com/dyojhaiig/image/upload/c_limit,w_900,f_auto,q_auto/v1791875656/places_bham_sea_life.jpg", "url": "https://gyg.me/rkiyYtLh", "title": {"en": "National SEA LIFE Centre tickets", "es": "Entradas para el National SEA LIFE Centre", "fr": "Billets pour le National SEA LIFE Centre", "de": "Tickets für das National SEA LIFE Centre", "it": "Biglietti per il National SEA LIFE Centre", "pt": "Bilhetes para o National SEA LIFE Centre", "zh": "National SEA LIFE Centre 门票", "ar": "تذاكر National SEA LIFE Centre", "ja": "ナショナル・シーライフセンターのチケット"}, "text": {"en": "Aquarium by the canals at Brindleyplace, in the city centre and great with children. Book your tickets in advance.", "es": "Acuario junto a los canales en Brindleyplace, en el centro e ideal con niños. Reserva tus entradas con antelación.", "fr": "Aquarium au bord des canaux à Brindleyplace, en centre-ville, idéal avec des enfants. Réservez vos billets à l'avance.", "de": "Aquarium an den Kanälen am Brindleyplace, im Stadtzentrum und toll mit Kindern. Buchen Sie Ihre Tickets im Voraus.", "it": "Acquario sui canali a Brindleyplace, in centro e ideale con i bambini. Prenota i biglietti in anticipo.", "pt": "Aquário junto aos canais em Brindleyplace, no centro e ótimo com crianças. Reserve os bilhetes com antecedência.", "zh": "位于市中心 Brindleyplace 运河边的水族馆，很适合带孩子。请提前预订门票。", "ar": "حوض أسماك بجوار القنوات في Brindleyplace، في وسط المدينة ورائع مع الأطفال. احجز تذاكرك مسبقًا.", "ja": "市内中心部ブリンドリープレイスの運河沿いにある水族館で、子ども連れに最適です。チケットは事前に予約しましょう。"}, "cta": {"en": "Book tickets", "es": "Reservar entradas", "fr": "Réserver des billets", "de": "Tickets buchen", "it": "Prenota i biglietti", "pt": "Reservar bilhetes", "zh": "预订门票", "ar": "احجز التذاكر", "ja": "チケットを予約"}}]};
  var DEFAULT_SERVICE_PHOTOS = {"early": "https://res.cloudinary.com/dyojhaiig/image/upload/c_fill,w_900,h_500,g_auto,f_auto,q_auto/v1791906084/early_check_in_1pm_pa0wzq.jpg", "late": "https://res.cloudinary.com/dyojhaiig/image/upload/c_fill,w_900,h_500,g_auto,f_auto,q_auto/v1791906084/late_check_out_rpwloa.jpg", "mid": "https://res.cloudinary.com/dyojhaiig/image/upload/c_fill,w_900,h_500,g_auto,f_auto,q_auto/v1791906085/mid-stay_clean_qp29zn.jpg"};
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
    var S = (!CFG || CFG.servicePhotos === undefined) ? DEFAULT_SERVICE_PHOTOS : CFG.servicePhotos; if (!S) return;
    var blocks = app.querySelectorAll("#services .stack > .soft");
    ["early", "late", "mid"].forEach(function (k, i) {
      var b = blocks[i]; if (!b || !S[k] || !/^https:\/\//.test(S[k]) || b.querySelector(".svc-img")) return;
      var img = document.createElement("img"); img.className = "svc-img"; img.src = S[k]; img.alt = ""; img.loading = "lazy";
      b.classList.add("has-photo"); b.insertBefore(img, b.firstChild);
    });
  }
  function offers() {
    var O = (!CFG || CFG.offers === undefined) ? DEFAULT_OFFERS : CFG.offers;
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
