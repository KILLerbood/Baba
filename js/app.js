(function () {
  "use strict";
  const I18N = window.NOOR_I18N;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  let DATA = null;
  let lang = "ar";
  try { lang = localStorage.getItem("noor_lang") || "ar"; } catch (e) {}

  const t = (k) => (I18N[lang] && I18N[lang][k]) || k;
  const nm = (o) => (lang === "ar" ? o.ar : o.en);
  const ds = (o) => (lang === "ar" ? o.dar : o.den);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- i18n ---------- */
  function applyI18n() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    $$("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
    $$("[data-i18n-ph]").forEach((el) => (el.placeholder = t(el.dataset.i18nPh)));
    document.title = lang === "ar" ? "نور | Noor — تصنيع وتنجيد الأثاث في الكويت" : "Noor | نور — Furniture making and upholstery in Kuwait";
    $(".brand-name").textContent = lang === "ar" ? "نور" : "Noor";
  }

  /* ---------- process ---------- */
  function renderSteps() {
    if (!$("#steps")) return;
    $("#steps").innerHTML = DATA.process.map((s) =>
      `<li class="step reveal"><h3>${esc(nm(s))}</h3><p>${esc(ds(s))}</p></li>`).join("");
  }

  /* ---------- fabrics ---------- */
  function renderFabrics() {
    if (!$("#fabricsGrid")) return;
    $("#fabricsGrid").innerHTML = DATA.fabrics.map((f) => `
      <article class="fabric reveal">
        <div class="swatch" style="--c:${f.color};background-image:url('${esc(f.img || "")}')" role="img" aria-label="${esc(nm(f))}"></div>
        <div class="fabric-body">
          <h3>${esc(nm(f))}</h3><p>${esc(ds(f))}</p>
          <div class="meter">
            <span>${t("fabrics.soft")}</span><div class="bar"><i data-w="${f.soft * 20}" style="width:0"></i></div>
            <span>${t("fabrics.tough")}</span><div class="bar"><i data-w="${f.tough * 20}" style="width:0"></i></div>
            <span>${t("fabrics.care")}</span><div class="bar"><i data-w="${f.care * 20}" style="width:0"></i></div>
          </div>
        </div>
      </article>`).join("");
  }

  /* ---------- catalog ---------- */
  const cat = { c: 0, i: 0 };
  const chairIcon = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 6h24v20H12zM8 26h32v8H8zM12 34v8M36 34v8"/></svg>';
  function renderCatalog() {
    if (!$("#catTabs")) return;
    const cats = DATA.categories;
    cat.c = clamp(cat.c, 0, cats.length - 1);
    $("#catTabs").innerHTML = cats.map((c, i) =>
      `<button class="tab${i === cat.c ? " on" : ""}" role="tab" data-c="${i}"><span class="tab-img">${c.items && c.items[0] && c.items[0].src ? `<img src="${esc(c.items[0].src)}" alt="" loading="lazy" draggable="false">` : ""}</span><span class="tab-name">${esc(nm(c))}</span></button>`).join("");
    renderSlides();
  }
  function renderSlides() {
    const c = DATA.categories[cat.c];
    const items = (c && c.items) || [];
    cat.i = clamp(cat.i, 0, Math.max(0, items.length - 1));
    const view = $("#slideView");
    if (!items.length) { view.innerHTML = `<div class="slide on"><div class="ph">${t("catalog.empty")}</div></div>`; $("#dots").innerHTML = ""; return; }
    view.innerHTML = items.map((it, i) => `
      <div class="slide${i === cat.i ? " on" : ""}"${it.src ? ` style="--bg:url('${esc(new URL(it.src, document.baseURI).href)}')"` : ""}>
        ${it.src ? `<img src="${esc(it.src)}" alt="${esc(nm(it))}" loading="lazy" draggable="false">` : `<div class="ph">${chairIcon}</div>`}
        <div class="cap"><h3>${esc(nm(it))}</h3>${ds(it) ? `<p>${esc(ds(it))}</p>` : ""}</div>
      </div>`).join("");
    $("#dots").innerHTML = items.map((_, i) => `<button class="${i === cat.i ? "on" : ""}" data-i="${i}" aria-label="${i + 1}"></button>`).join("");
    fitSlides();
  }
  // Photos whose shape differs a lot from the frame are shown whole over a blurred copy, others fill the frame.
  function fitSlides() {
    if (!$("#slideView")) return;
    const box = $("#slideView").getBoundingClientRect();
    if (!box.width) return;
    const frame = box.width / box.height;
    $$("#slideView .slide img").forEach((im) => {
      const apply = () => {
        const r = im.naturalWidth / im.naturalHeight;
        im.closest(".slide").classList.toggle("fit", Math.abs(r - frame) / frame > 0.22);
      };
      im.complete && im.naturalWidth ? apply() : im.addEventListener("load", apply, { once: true });
    });
  }
  addEventListener("resize", () => { if (DATA) fitSlides(); });
  function slide(dir) {
    const items = DATA.categories[cat.c].items || [];
    if (!items.length) return;
    cat.i = (cat.i + dir + items.length) % items.length;
    $$("#slideView .slide").forEach((s, i) => s.classList.toggle("on", i === cat.i));
    $$("#dots button").forEach((b, i) => b.classList.toggle("on", i === cat.i));
  }
  function bindCatalog() {
    if (!$("#catTabs")) return;
    $("#catTabs").addEventListener("click", (e) => { const b = e.target.closest(".tab"); if (!b) return; cat.c = +b.dataset.c; cat.i = 0; renderCatalog(); });
    $("#dots").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; cat.i = +b.dataset.i; slide(0); });
    // next means "to the reading end": in RTL that is left
    $("#nextBtn").addEventListener("click", () => slide(1));
    $("#prevBtn").addEventListener("click", () => slide(-1));
    let sx = null;
    const v = $("#slideView");
    v.addEventListener("pointerdown", (e) => { sx = e.clientX; });
    v.addEventListener("pointerup", (e) => {
      if (sx == null) return;
      const dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 50) slide((dx > 0) === (lang === "ar") ? 1 : -1);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") slide(lang === "ar" ? -1 : 1);
      if (e.key === "ArrowLeft") slide(lang === "ar" ? 1 : -1);
    });
  }

  /* ---------- rooms ---------- */
  function renderRooms() {
    if (!$("#roomsGrid")) return;
    $("#roomsGrid").innerHTML = DATA.rooms.map((r, i) => r.hidden ? "" : `
      <button class="room reveal" data-r="${i}" type="button">
        <div class="room-bg ${r.angles.length ? "" : "ph"}" ${r.angles.length ? `style="background-image:url('${esc(r.angles[0])}')"` : ""}></div>
        <div class="room-body">
          <h3>${esc(nm(r))}</h3><p>${esc(ds(r))}</p>
          <div class="room-tags">${(lang === "ar" ? r.tags_ar : r.tags_en).map((x) => `<span>${esc(x)}</span>`).join("")}</div>
          <span class="room-open">${t("rooms.open")}</span>
        </div>
      </button>`).join("");
  }
  /* ---------- villa plan (3D top view photo with clickable rooms) ---------- */
  // room id -> [pinX%, pinY%, left%, top%, right%, bottom%] on assets/plan/villa-top.jpg
  const PLAN3D = {
    diwaniya: [50, 15.5, 15, 8, 85, 23],
    dining: [33, 36, 14, 29, 52, 44],
    living: [69, 34, 53, 24, 86, 43],
    cinema: [28, 53, 12, 43, 45, 63],
    studio: [73, 56, 57, 50, 88, 63],
    gaming: [26, 73, 9, 64, 44, 83],
    master: [73, 75, 57, 64, 91, 83]
  };
  function renderPlan() {
    const box = $("#villaPlan"); if (!box) return;
    const order = ["diwaniya", "living", "dining", "master", "studio", "gaming", "cinema"];
    const btns = Object.keys(PLAN3D).map((id) => {
      const idx = DATA.rooms.findIndex((r) => r.id === id);
      if (idx < 0 || DATA.rooms[idx].hidden) return "";
      const [px, py, l, tp, r, b] = PLAN3D[id], room = DATA.rooms[idx];
      return `<button class="reg3" type="button" data-r="${idx}" aria-label="${esc(nm(room))}" style="left:${l}%;top:${tp}%;width:${r - l}%;height:${b - tp}%">
        <span class="pin3" style="left:${px - l >= 0 ? ((px - l) / (r - l)) * 100 : 50}%;top:${((py - tp) / (b - tp)) * 100}%"><b>${order.indexOf(id) + 1}</b><em>${esc(nm(room))}</em></span></button>`;
    }).join("");
    box.innerHTML = `<div class="plan3d"><img src="assets/plan/villa-top.jpg" alt="${esc(t("plan.title"))}" decoding="async">${btns}</div>`;
    $$(".reg3", box).forEach((el) => el.addEventListener("click", () => openRoom(+el.dataset.r)));
  }

  const vw = { r: null, a: 0 };
  function openRoom(i) {
    vw.r = DATA.rooms[i]; vw.a = 0;
    $("#roomModal").hidden = false;
    document.body.style.overflow = "hidden";
    drawViewer();
  }
  function closeRoom() { $("#roomModal").hidden = true; document.body.style.overflow = ""; }
  function drawViewer(keepZoom) {
    const r = vw.r; if (!r) return;
    const box = $("#viewerImg");
    const n = r.angles.length;
    box.innerHTML = n
      ? `<img src="${esc(r.angles[vw.a])}" alt="${esc(nm(r))}" draggable="false">`
      : `<div class="ph"><div><h3 style="font-size:1.6rem">${esc(nm(r))}</h3><p style="opacity:.7">${t("rooms.soon")}</p></div></div>`;
    (r.hotspots || []).filter((h) => h.angle == null || h.angle === vw.a).forEach((h, i) => {
      const b = document.createElement("button");
      b.className = "hs"; b.type = "button"; b.textContent = i + 1;
      b.style.left = h.x + "%"; b.style.top = h.y + "%";
      b.addEventListener("pointerdown", (e) => e.stopPropagation());
      b.addEventListener("click", (e) => { e.stopPropagation(); zoomTo(h); });
      box.appendChild(b);
    });
    if (!keepZoom) resetZoom();
    $("#viewerInfo").innerHTML = `<h3>${esc(nm(r))}</h3><p>${esc(ds(r))}</p><div id="hsInfo"></div>`;
    $("#vPrev").style.display = $("#vNext").style.display = n > 1 ? "" : "none";
  }
  function zoomTo(h) {
    const box = $("#viewerImg");
    box.style.setProperty("--ox", h.x + "%"); box.style.setProperty("--oy", h.y + "%");
    box.style.setProperty("--z", 2.1); box.style.transform = "scale(2.1)";
    $("#hsInfo").innerHTML = `<div class="info-hs"><b>${esc(nm(h))}</b><p>${esc(ds(h))}</p></div>`;
  }
  function resetZoom() {
    const box = $("#viewerImg");
    box.style.setProperty("--z", 1); box.style.transform = "scale(1)";
    const i = $("#hsInfo"); if (i) i.innerHTML = "";
  }
  function turn(d) {
    const n = vw.r.angles.length; if (n < 2) return;
    vw.a = (vw.a + d + n) % n; drawViewer();
  }
  function bindRooms() {
    if (!$("#roomModal")) return;
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#roomModal").hidden) closeRoom(); });
    if ($("#roomsGrid")) $("#roomsGrid").addEventListener("click", (e) => { const b = e.target.closest(".room"); if (b) openRoom(+b.dataset.r); });
    $("#roomModal").addEventListener("click", (e) => { if (e.target.hasAttribute("data-close")) closeRoom(); });
    $("#vPrev").addEventListener("click", () => turn(-1));
    $("#vNext").addEventListener("click", () => turn(1));
    const v = $("#viewer");
    let sx = null, acc = 0, moved = false;
    v.addEventListener("pointerdown", (e) => { if (e.target.closest(".hs") || e.target.closest(".arrow")) return; sx = e.clientX; acc = 0; moved = false; v.classList.add("grab"); });
    v.addEventListener("pointermove", (e) => {
      if (sx == null) return;
      acc += e.clientX - sx; sx = e.clientX;
      if (Math.abs(acc) > 60) { moved = true; turn(acc > 0 ? 1 : -1); acc = 0; }
    });
    const end = () => { if (sx != null && !moved && Math.abs(acc) < 5) resetZoom(); sx = null; v.classList.remove("grab"); };
    v.addEventListener("pointerup", end); v.addEventListener("pointerleave", end);
  }

  /* ---------- builder (real photo stages, per piece) ---------- */
  const PIECES = [
    { id: "sofa", ar: "كنب", en: "Sofa", form: "sofas", sizes: [["مقعدان", "2 seats"], ["ثلاثة مقاعد", "3 seats"], ["أربعة مقاعد", "4 seats"]] },
    { id: "armchair", ar: "كرسي استرخاء", en: "Armchair", form: "chairs", sizes: [["عادي", "Standard"], ["عريض", "Wide"]] },
    { id: "chair", ar: "كرسي سفرة", en: "Dining chair", form: "chairs", sizes: [["طقم ٤ كراسي", "Set of 4"], ["طقم ٦ كراسي", "Set of 6"], ["طقم ٨ كراسي", "Set of 8"]] },
    { id: "bed", ar: "سرير", en: "Bed", form: "beds", sizes: [["سرير فردي", "Single"], ["سرير مزدوج", "Double"], ["سرير كينج", "King"]] },
    { id: "cinema", ar: "مقعد سينما", en: "Cinema seat", form: "cinema", sizes: [["مقعد واحد", "1 seat"], ["صف مقعدين", "Row of 2"], ["صف أربعة مقاعد", "Row of 4"]] }
  ];
  const B = { step: 1, piece: "sofa", wood: "oak", foam: "medium", fabric: "velvet", color: -1, size: 1 };
  // swatches for the colour step (hue in degrees), -1 = the fabric as photographed
  const COLORS = [
    { c: "#7a2e3b", h: 345 }, { c: "#2f4a43", h: 165 }, { c: "#2c3e56", h: 215 }, { c: "#8a7a6a", h: 30 },
    { c: "#d8c8ad", h: 40 }, { c: "#23201d", h: 30 }, { c: "#9b5b3a", h: 20 }, { c: "#6c5b7b", h: 275 }
  ];
  // hue of each fabric as photographed, and whether it is nearly colourless (needs sepia before tinting)
  const BASE = { velvet: [220, 0], linen: [40, 1], chenille: [100, 0], boucle: [45, 1], suede: [25, 0], leather: [30, 0], pu: [0, 1] };
  const STEP_KEYS = ["build.piece", "build.s1", "build.s2", "build.s3", "build.s4", "build.s5"];
  const pieceOf = () => PIECES.find((p) => p.id === B.piece) || PIECES[0];
  const IMG = {
    frame: (w) => "assets/build/" + B.piece + "/frame-" + w + ".jpg",
    foam: () => "assets/build/" + B.piece + "/foam.jpg",
    finished: (f) => "assets/build/" + B.piece + "/finished-" + f + ".jpg"
  };
  let stageShown = "";
  function stageCandidates() {
    if (B.step <= 2) return [IMG.frame(B.wood), IMG.frame("oak")];
    if (B.step === 3) return [IMG.foam(), IMG.frame(B.wood), IMG.frame("oak")];
    return [IMG.finished(B.fabric), IMG.foam(), IMG.frame(B.wood), IMG.frame("oak")];
  }
  function colourFilter() {
    if (B.step < 5 || B.color < 0) return "none";
    const [bh, low] = BASE[B.fabric] || [0, 0], target = COLORS[B.color].h;
    const d = ((target - bh) % 360 + 360) % 360;
    return (low ? "sepia(.85) " : "") + "hue-rotate(" + d + "deg) saturate(" + (low ? 2.2 : 1.1) + ")";
  }
  function paintStage() {
    const box = $("#buildStage"); if (!box) return;
    const a = $("#bpA"), b2 = $("#bpB"), empty = $("#bEmpty");
    const list = stageCandidates();
    const tryNext = (i) => {
      if (i >= list.length) {
        a.classList.remove("on"); b2.classList.remove("on"); stageShown = "";
        if (empty) { empty.hidden = false; empty.textContent = nm(pieceOf()) + " · " + t("build.soon"); }
        return;
      }
      const src = list[i], probe = new Image();
      probe.onload = () => {
        if (empty) empty.hidden = true;
        if (src !== stageShown) {
          const incoming = a.classList.contains("on") ? b2 : a, outgoing = incoming === a ? b2 : a;
          incoming.src = src; incoming.classList.add("on"); outgoing.classList.remove("on"); stageShown = src;
        }
        const on = a.classList.contains("on") ? a : b2;
        on.style.filter = colourFilter();
      };
      probe.onerror = () => tryNext(i + 1);
      probe.src = src;
    };
    tryNext(0);
    const badge = $("#bBadge");
    if (badge) badge.textContent = B.step >= 6 ? (pieceOf().sizes[B.size] || pieceOf().sizes[0])[lang === "ar" ? 0 : 1] : "";
  }
  function drawBuilder() {
    if (!$("#buildSteps")) return;
    $("#buildSteps").innerHTML = STEP_KEYS.map((k, i) =>
      `<li><button class="bstep ${i + 1 === B.step ? "on" : i + 1 < B.step ? "done" : ""}" data-s="${i + 1}" type="button">${i + 1}. ${t(k)}</button></li>`).join("");
    let o = "";
    if (B.step === 1) o = PIECES.map((p) => `<button class="opt${B.piece === p.id ? " on" : ""}" data-k="piece" data-v="${p.id}">${esc(nm(p))}</button>`).join("");
    if (B.step === 2) o = ["oak", "walnut", "beech"].map((k) => `<button class="opt${B.wood === k ? " on" : ""}" data-k="wood" data-v="${k}">${t("build." + k)}</button>`).join("");
    if (B.step === 3) o = ["soft", "medium", "firm"].map((k) => `<button class="opt${B.foam === k ? " on" : ""}" data-k="foam" data-v="${k}">${t("build." + k)}</button>`).join("");
    if (B.step === 4) o = DATA.fabrics.map((f) => `<button class="opt opt-fab${B.fabric === f.id ? " on" : ""}" data-k="fabric" data-v="${f.id}"><i style="background-image:url('${esc(f.img || "")}')"></i>${esc(nm(f))}</button>`).join("");
    if (B.step === 5) o = `<button class="opt${B.color < 0 ? " on" : ""}" data-k="color" data-v="-1">${t("build.original")}</button>` +
      COLORS.map((c, i) => `<button class="dot${B.color === i ? " on" : ""}" data-k="color" data-v="${i}" style="--c:${c.c}" aria-label="${c.c}"></button>`).join("");
    if (B.step === 6) o = pieceOf().sizes.map((z, i) => `<button class="opt${B.size === i ? " on" : ""}" data-k="size" data-v="${i}">${z[lang === "ar" ? 0 : 1]}</button>`).join("");
    $("#buildOptions").innerHTML = o;
    $("#buildSummary").innerHTML = `<b>${t("build.summary")}:</b> ${buildText()}`;
    paintStage();
  }
  function buildText() {
    const f = DATA.fabrics.find((x) => x.id === B.fabric), p = pieceOf();
    const col = B.color < 0 ? t("build.original") : COLORS[B.color].c.toUpperCase();
    return [nm(p), t("build." + B.wood), t("build." + B.foam), f ? nm(f) : "", col, (p.sizes[B.size] || p.sizes[0])[lang === "ar" ? 0 : 1]].join(" · ");
  }
  function bindBuilder() {
    if (!$("#buildStage")) return;
    $("#buildStage").innerHTML = `<div class="bphoto"><img id="bpA" class="bp" alt=""><img id="bpB" class="bp" alt=""><p class="bempty" id="bEmpty" hidden></p></div><span class="bbadge" id="bBadge"></span>`;
    $("#buildSteps").addEventListener("click", (e) => { const b = e.target.closest(".bstep"); if (!b) return; B.step = +b.dataset.s; drawBuilder(); });
    $("#buildOptions").addEventListener("click", (e) => {
      const b = e.target.closest("[data-k]"); if (!b) return;
      const k = b.dataset.k; B[k] = k === "size" || k === "color" ? +b.dataset.v : b.dataset.v;
      if (k === "fabric") B.color = -1;
      if (k === "piece") { B.size = 0; stageShown = ""; }
      drawBuilder();
    });
    $("#buildSend").addEventListener("click", () => {
      try { sessionStorage.setItem("noor_build", buildText()); sessionStorage.setItem("noor_build_type", pieceOf().form); } catch (e) {}
      location.href = "request.html";
    });
  }

  /* ---------- request form ---------- */
  function fillFormOptions() {
    if (!$("#fType")) return;
    const cur = $("#fType").value, curF = $("#fFabric").value;
    $("#fType").innerHTML = `<option value="">${t("form.pick")}</option>` +
      DATA.categories.map((c) => `<option value="${esc(c.id)}">${esc(nm(c))}</option>`).join("") + `<option value="other">${t("form.other")}</option>`;
    $("#fFabric").innerHTML = `<option value="">—</option>` + DATA.fabrics.map((f) => `<option value="${f.id}">${esc(nm(f))}</option>`).join("");
    $("#fType").value = cur; $("#fFabric").value = curF;
  }
  function waNumber() { return String((DATA.settings && DATA.settings.whatsapp) || "").replace(/\D/g, ""); }
  function buildMessage() {
    const typeSel = $("#fType"), type = typeSel.selectedOptions[0] ? typeSel.selectedOptions[0].textContent : "";
    const has = $("input[name=hasM]:checked").value === "yes";
    const dims = [["W", "#fW"], ["H", "#fH"], ["D", "#fD"]].map(([k, s]) => ($(s).value ? `${k}: ${$(s).value} cm` : "")).filter(Boolean).join("  ");
    const fab = $("#fFabric").selectedOptions[0] ? $("#fFabric").selectedOptions[0].textContent : "";
    const lines = [`*${t("wa.hello")}*`];
    if (type && $("#fType").value) lines.push(`${t("wa.what")}: ${type}`);
    if ($("#fDesc").value.trim()) lines.push(`${t("wa.desc")}: ${$("#fDesc").value.trim()}`);
    lines.push(`${t("wa.measure")}: ${has ? dims || t("form.yes") : t("wa.hasno")}`);
    if ($("#fFabric").value) lines.push(`${t("wa.fabric")}: ${fab}`);
    if ($("#fBuild").value) lines.push(`${t("wa.build")}: ${$("#fBuild").value}`);
    lines.push(`${t("wa.name")}: ${$("#fName").value.trim()}`, `${t("wa.phone")}: ${$("#fPhone").value.trim()}`);
    if ($("#fArea").value.trim()) lines.push(`${t("wa.area")}: ${$("#fArea").value.trim()}`);
    return lines.join("\n");
  }
  function bindForm() {
    if (!$("#reqForm")) return;
    let pending = null;
    try { pending = sessionStorage.getItem("noor_build"); } catch (e) {}
    if (pending) {
      $("#fBuild").value = pending;
      const note = $("#buildNote"); note.hidden = false;
      const paint = () => { note.innerHTML = `<b>${t("form.build")}:</b> ${esc(pending)}`; };
      paint(); note.dataset.paint = "1"; window.__paintBuildNote = paint;
      fillFormOptions(); try { const bt = sessionStorage.getItem("noor_build_type"); if ($("#fType") && bt) $("#fType").value = bt; } catch (e) {}
    }
    $$("input[name=hasM]").forEach((r) => r.addEventListener("change", () => { $("#dims").hidden = $("input[name=hasM]:checked").value !== "yes"; }));
    $("#reqForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const msg = $("#formMsg"); msg.className = "form-msg";
      if ((!$("#fType").value && !$("#fDesc").value.trim()) || !$("#fName").value.trim() || !$("#fPhone").value.trim()) {
        msg.textContent = t("form.need"); msg.classList.add("err"); return;
      }
      const text = buildMessage(), num = waNumber();
      if (num) { window.open(`https://wa.me/${num}?text=${encodeURIComponent(text)}`, "_blank", "noopener"); msg.textContent = ""; }
      else {
        try { await navigator.clipboard.writeText(text); } catch (err) {}
        msg.textContent = t("form.nonum");
      }
    });
  }

  /* ---------- hero scroll scene ---------- */
  function initHero() {
    if (!$("#hero")) return;
    const frames = (DATA.hero && DATA.hero.frames) || [];
    const box = $("#heroFrames");
    box.innerHTML = frames.map((s, i) => `<img src="${esc(s)}" alt="" ${i < 2 ? "" : 'loading="lazy"'} decoding="async">`).join("");
    const imgs = $$("img", box), hero = $("#hero"), copy = $("#heroCopy"), cue = $("#scrollCue");
    let ticking = false;
    function update() {
      ticking = false;
      const total = hero.offsetHeight - innerHeight;
      const p = clamp(-hero.getBoundingClientRect().top / total, 0, 1);
      if (imgs.length) {
        const pos = p * (imgs.length - 1), i = Math.floor(pos), f = pos - i;
        imgs.forEach((im, k) => { im.style.opacity = k <= i ? 1 : k === i + 1 ? f : 0; });
        box.style.transform = `scale(${1 + p * 0.18})`;
      }
      const fade = clamp(1 - p * 3.2, 0, 1);
      copy.style.opacity = fade; copy.style.transform = `translateY(${p * -60}px) scale(${1 - p * 0.06})`;
      copy.style.pointerEvents = fade < 0.2 ? "none" : "";
      cue.style.opacity = clamp(1 - p * 8, 0, 0.8);
      const eb = $("#enterBtn");
      if (eb) { const o = clamp((p - 0.8) / 0.15, 0, 1); eb.style.opacity = o; eb.style.pointerEvents = o < 0.3 ? "none" : "auto"; eb.style.transform = `translate(-50%, ${(1 - o) * 14}px)`; }
    }
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener("resize", update);
    update();
    initWalkIn(frames[frames.length - 1]);
  }

  /* walk through the door, then zoom out onto the top-view villa */
  function initWalkIn(doorImg) {
    const eb = $("#enterBtn"), plan = $("#villaPlan"), target = $("#inside .plan-wrap");
    if (!eb || !plan || !target) return;
    let busy = false;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches || !plan.animate;
    const goTo = () => {
      const y = target.getBoundingClientRect().top + scrollY - Math.max(70, (innerHeight - target.offsetHeight) / 2);
      scrollTo({ top: Math.max(0, y), behavior: "instant" });
    };
    eb.addEventListener("click", (e) => {
      e.preventDefault();
      if (busy) return;
      if (still) { $("#inside").scrollIntoView({ behavior: "auto" }); return; }
      busy = true;
      const ov = document.createElement("div");
      ov.style.cssText = "position:fixed;inset:0;z-index:300;overflow:hidden;background:#f4ead6;pointer-events:all";
      const door = document.createElement("div");
      door.style.cssText = `position:absolute;inset:0;background:url(${doorImg}) center/cover no-repeat;transform-origin:50% 52%`;
      const light = document.createElement("div");
      light.style.cssText = "position:absolute;inset:0;background:radial-gradient(circle at 50% 52%,#fff6dc,#f4ead6 70%);opacity:0";
      ov.append(door, light); document.body.append(ov);
      const ease = "cubic-bezier(.55,.05,.35,1)";
      door.animate([{ transform: "scale(1.18)" }, { transform: "scale(3.6)" }], { duration: 1100, easing: ease, fill: "forwards" });
      light.animate([{ opacity: 0 }, { opacity: 0, offset: .55 }, { opacity: 1 }], { duration: 1100, easing: ease, fill: "forwards" })
        .finished.then(() => {
          target.style.overflow = "hidden"; target.style.borderRadius = "20px";
          plan.style.transformOrigin = "50% 94%";
          goTo();
          const z = plan.animate([{ transform: "scale(2.7)", opacity: .2 }, { transform: "scale(1)", opacity: 1 }], { duration: 1700, easing: "cubic-bezier(.16,.7,.2,1)" });
          ov.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 900, easing: "ease-out", fill: "forwards" }).finished.then(() => ov.remove());
          z.finished.then(() => { target.style.overflow = ""; target.style.borderRadius = ""; plan.style.transformOrigin = ""; busy = false; });
        });
    });
  }

  /* ---------- effects ---------- */
  function initEffects() {
    const header = $(".site-header");
    const inner = document.body.classList.contains("inner");
    const onS = () => header.classList.toggle("solid", inner || scrollY > 40);
    $("#waFloat").addEventListener("click", (e) => {
      const num = waNumber();
      if (num) { e.preventDefault(); window.open(`https://wa.me/${num}`, "_blank", "noopener"); }
    });
    addEventListener("scroll", onS, { passive: true }); onS();
    document.addEventListener("pointermove", (e) => {
      const b = e.target.closest && e.target.closest(".btn"); if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty("--mx", e.clientX - r.left + "px"); b.style.setProperty("--my", e.clientY - r.top + "px");
    });
    $("#menuBtn").addEventListener("click", () => { $("#nav").classList.toggle("open"); $("#menuBtn").classList.toggle("open"); });
    $("#nav").addEventListener("click", (e) => { if (e.target.tagName === "A") { $("#nav").classList.remove("open"); $("#menuBtn").classList.remove("open"); } });
  }
  let io = null;
  function observeReveals() {
    if (io) io.disconnect();
    io = new IntersectionObserver((es) => es.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      $$("i[data-w]", en.target).forEach((b) => (b.style.width = b.dataset.w + "%"));
      io.unobserve(en.target);
    }), { threshold: 0.12 });
    $$(".reveal").forEach((el) => io.observe(el));
  }

  /* ---------- boot ---------- */
  const HOME_CARDS = [
    ["process.html", "nav.process", "card.process", "assets/catalog/beds/1.jpg"],
    ["rooms.html", "nav.rooms", "card.rooms", "assets/rooms/diwaniya-1.jpg"],
    ["fabrics.html", "nav.fabrics", "card.fabrics", "assets/fabrics/velvet.jpg"],
    ["catalog.html", "nav.catalog", "card.catalog", "assets/catalog/sofas/2.jpg"],
    ["build.html", "nav.build", "card.build", "assets/catalog/chairs/1.jpg"],
    ["request.html", "nav.request", "card.request", "assets/hero/02-gate.jpg"]
  ];
  function renderHomeCards() {
    if (!$("#homeCards")) return;
    $("#homeCards").innerHTML = HOME_CARDS.map(([href, tk, dk, img]) => `
      <a class="card-link reveal" href="${href}">
        <span class="card-img" style="background-image:url('${img}')"></span>
        <span class="card-body"><b>${t(tk)}</b><small>${t(dk)}</small><em>${t("card.go")}</em></span>
      </a>`).join("");
  }
  function renderAll() {
    applyI18n(); renderHomeCards(); renderSteps(); renderPlan(); renderRooms(); renderFabrics(); renderCatalog(); fillFormOptions();
    drawBuilder(false); observeReveals();
    if ($("#roomModal") && !$("#roomModal").hidden) drawViewer(true);
    if (window.__paintBuildNote) window.__paintBuildNote();
    
  }
  async function boot() {
    DATA = await window.NoorStore.getData();
    $("#langBtn").addEventListener("click", () => {
      lang = lang === "ar" ? "en" : "ar";
      try { localStorage.setItem("noor_lang", lang); } catch (e) {}
      renderAll();
    });
    bindCatalog(); bindRooms(); bindBuilder(); bindForm(); initEffects();
    renderAll(); initHero();
    if ($("#buildStage")) { B.step = 1; drawBuilder(); }
  }
  boot();
})();
