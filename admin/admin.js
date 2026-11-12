(function () {
  "use strict";
  const S = window.NoorStore, A = S.Auth;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  let DATA = null, cur = 0;

  function show(id) { ["loginView", "resetView", "appView"].forEach((v) => ($("#" + v).hidden = v !== id)); }
  function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2200); }
  function msg(el, text, kind) { el.textContent = text || ""; el.className = "msg" + (kind ? " " + kind : ""); }
  const uid = () => "i" + Math.random().toString(36).slice(2, 9);

  async function persist(okMsg) {
    try { await S.saveData(DATA); toast(okMsg || "تم الحفظ"); }
    catch (e) {
      console.error(e);
      toast("تعذّر الحفظ" + (/quota/i.test(String(e)) ? " (مساحة المتصفح ممتلئة)" : ""));
    }
  }

  /* ---------- login ---------- */
  async function initLogin() {
    const first = !A.hasPassword();
    $("#loginSub").textContent = first ? "أول دخول: اختر كلمة سر (٨ أحرف على الأقل) وستُحفظ على هذا المتصفح." : "أدخل كلمة السر للدخول.";
    $("#lBtn").textContent = first ? "حفظ ودخول" : "دخول";
    $("#emailRow").hidden = A.mode !== "supabase" || !!A.adminEmail;
    if (A.mode === "local") {
      const n = $("#modeNote"); n.hidden = false;
      n.textContent = "وضع تجريبي: التعديلات تُحفظ على هذا المتصفح فقط ولا تظهر لزوار الموقع. لتفعيل الحفظ العام واستعادة كلمة السر بالإيميل، اربط Supabase (راجع README).";
      $("#forgotBtn").style.opacity = ".5";
    }
    show("loginView");
  }
  $("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const pw = $("#lPass").value, m = $("#lMsg");
    if (!A.hasPassword() && pw.length < 8) return msg(m, "كلمة السر لازم ٨ أحرف على الأقل.", "err");
    if (!pw) return msg(m, "اكتب كلمة السر.", "err");
    msg(m, "جارٍ الدخول...");
    try { await A.login(pw, $("#lEmail").value.trim()); $("#lPass").value = ""; msg(m, ""); await enter(); }
    catch (err) { msg(m, "كلمة السر غير صحيحة.", "err"); }
  });
  $("#forgotBtn").addEventListener("click", async () => {
    const m = $("#lMsg");
    if (A.mode === "local") return msg(m, "استعادة كلمة السر بالإيميل تعمل بعد ربط Supabase. حاليًا يمكنك مسح بيانات الموقع من المتصفح لإعادة التعيين.", "err");
    const email = A.adminEmail || $("#lEmail").value.trim();
    if (!email) return msg(m, "اكتب البريد الإلكتروني أولًا.", "err");
    try { await A.forgot(email); msg(m, "أرسلنا رابط إعادة التعيين إلى البريد إن كان مسجّلًا.", "ok"); }
    catch (err) { msg(m, "تعذّر الإرسال. حاول بعد قليل.", "err"); }
  });
  $("#resetForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const p = $("#rPass").value, m = $("#rMsg");
    if (p.length < 8) return msg(m, "٨ أحرف على الأقل.", "err");
    try { await A.changePassword(p); msg(m, "تم التغيير.", "ok"); history.replaceState(null, "", location.pathname); await enter(); }
    catch (err) { msg(m, "تعذّر التغيير. اطلب رابطًا جديدًا.", "err"); }
  });
  $("#logoutBtn").addEventListener("click", async () => { await A.logout(); initLogin(); });

  /* ---------- app ---------- */
  async function enter() {
    DATA = await S.getData();
    cur = 0; renderCats(); renderPanel(); show("appView");
  }
  function renderCats() {
    $("#catList").innerHTML = DATA.categories.map((c, i) =>
      `<li><button class="${i === cur ? "on" : ""}" data-i="${i}"><span>${esc(c.ar)}</span><small>${(c.items || []).length}</small></button></li>`).join("");
  }
  $("#catList").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; cur = +b.dataset.i; renderCats(); renderPanel(); });
  $("#addCat").addEventListener("click", async () => {
    const ar = $("#newCat").value.trim(), en = $("#newCatEn").value.trim();
    if (!ar) return toast("اكتب اسم القسم");
    DATA.categories.push({ id: "c" + uid(), ar, en: en || ar, items: [] });
    $("#newCat").value = ""; $("#newCatEn").value = "";
    cur = DATA.categories.length - 1; renderCats(); renderPanel(); await persist("تمت إضافة القسم");
  });

  function renderPanel() {
    const c = DATA.categories[cur];
    if (!c) { $("#catPanel").innerHTML = ""; return; }
    $("#catPanel").innerHTML = `
      <div class="panel">
        <h2>القسم</h2>
        <div class="grid2">
          <label>الاسم بالعربي<input id="cAr" value="${esc(c.ar)}"></label>
          <label>Name (English)<input id="cEn" dir="ltr" value="${esc(c.en)}"></label>
        </div>
        <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn sm" id="saveCat">حفظ الاسم</button>
          <button class="btn bad sm" id="delCat">حذف القسم</button>
        </div>
      </div>
      <div class="panel">
        <h2>الصور</h2>
        <div class="drop" id="drop">اسحب الصور هنا أو
          <button class="btn gold sm" id="pick" type="button">اختر صور</button>
          <input type="file" id="file" accept="image/*" multiple hidden>
        </div>
        <div class="items" id="items"></div>
      </div>`;
    renderItems();
    $("#saveCat").onclick = async () => { c.ar = $("#cAr").value.trim() || c.ar; c.en = $("#cEn").value.trim() || c.en; renderCats(); await persist(); };
    $("#delCat").onclick = async () => {
      if (!confirm("حذف القسم وكل صوره؟ لا يمكن التراجع.")) return;
      DATA.categories.splice(cur, 1); cur = 0; renderCats(); renderPanel(); await persist("تم الحذف");
    };
    const drop = $("#drop"), file = $("#file");
    $("#pick").onclick = () => file.click();
    file.onchange = () => addFiles([...file.files]);
    ["dragenter", "dragover"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add("over"); }));
    ["dragleave", "drop"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove("over"); }));
    drop.addEventListener("drop", (e) => addFiles([...e.dataTransfer.files]));
  }

  async function addFiles(files) {
    const c = DATA.categories[cur];
    files = files.filter((f) => f.type.startsWith("image/"));
    if (!files.length) return toast("اختر صورًا فقط");
    toast("جارٍ الرفع...");
    for (const f of files) {
      try {
        const src = await S.uploadImage(f);
        c.items.push({ id: uid(), src, ar: "", en: "", dar: "", den: "" });
      } catch (e) { console.error(e); toast("تعذّر رفع " + f.name); }
    }
    renderCats(); renderItems(); await persist("تم الرفع");
  }

  function renderItems() {
    const c = DATA.categories[cur], box = $("#items");
    box.innerHTML = (c.items || []).map((it, i) => `
      <article class="item" data-i="${i}">
        <div class="thumb">${it.src ? `<img src="${esc(it.src)}" alt="">` : "بدون صورة"}</div>
        <div class="f">
          <input data-f="ar" placeholder="الاسم بالعربي" value="${esc(it.ar)}">
          <input data-f="en" dir="ltr" placeholder="Name (English)" value="${esc(it.en)}">
          <textarea data-f="dar" rows="2" placeholder="الوصف (اختياري)">${esc(it.dar)}</textarea>
          <textarea data-f="den" dir="ltr" rows="2" placeholder="Description (optional)">${esc(it.den)}</textarea>
          <div class="row">
            <button class="btn ghost sm" data-a="up">▲</button><button class="btn ghost sm" data-a="down">▼</button>
            <button class="btn ghost sm" data-a="replace">استبدال الصورة</button>
            <button class="btn bad sm" data-a="del">حذف</button>
          </div>
        </div>
      </article>`).join("") || `<p style="color:var(--muted)">لا توجد صور بعد.</p>`;
  }
  $("#catPanel").addEventListener("change", async (e) => {
    const f = e.target.dataset && e.target.dataset.f; if (!f) return;
    const i = +e.target.closest(".item").dataset.i;
    DATA.categories[cur].items[i][f] = e.target.value; await persist();
  });
  $("#catPanel").addEventListener("click", async (e) => {
    const b = e.target.closest("[data-a]"); if (!b) return;
    const items = DATA.categories[cur].items, i = +b.closest(".item").dataset.i, a = b.dataset.a;
    if (a === "del") { if (!confirm("حذف هذه الصورة؟")) return; items.splice(i, 1); }
    else if (a === "up" && i > 0) [items[i - 1], items[i]] = [items[i], items[i - 1]];
    else if (a === "down" && i < items.length - 1) [items[i + 1], items[i]] = [items[i], items[i + 1]];
    else if (a === "replace") {
      const inp = document.createElement("input"); inp.type = "file"; inp.accept = "image/*";
      inp.onchange = async () => { if (!inp.files[0]) return; try { items[i].src = await S.uploadImage(inp.files[0]); renderItems(); await persist("تم الاستبدال"); } catch (er) { toast("تعذّر الرفع"); } };
      inp.click(); return;
    } else return;
    renderCats(); renderItems(); await persist();
  });

  /* ---------- settings ---------- */
  const dlg = $("#settingsDlg");
  $("#settingsBtn").addEventListener("click", () => {
    $("#sWa").value = (DATA.settings && DATA.settings.whatsapp) || "";
    $("#oldRow").hidden = A.mode === "supabase"; msg($("#sMsg"), ""); dlg.showModal();
  });
  $("#closeSettings").addEventListener("click", () => dlg.close());
  $("#saveWa").addEventListener("click", async () => {
    DATA.settings = DATA.settings || {}; DATA.settings.whatsapp = $("#sWa").value.replace(/\D/g, ""); await persist("تم حفظ الرقم");
  });
  $("#savePw").addEventListener("click", async () => {
    const n = $("#sNew").value, m = $("#sMsg");
    if (n.length < 8) return msg(m, "٨ أحرف على الأقل.", "err");
    try { await A.changePassword(n, $("#sOld").value); $("#sNew").value = ""; $("#sOld").value = ""; msg(m, "تم تغيير كلمة السر.", "ok"); }
    catch (e) { msg(m, "كلمة السر الحالية غير صحيحة.", "err"); }
  });

  /* ---------- boot ---------- */
  (async function () {
    await A.onRecovery(() => show("resetView"));
    if (/type=recovery/.test(location.hash)) { show("resetView"); return; }
    if (await A.isLoggedIn()) await enter(); else initLogin();
  })();
})();
