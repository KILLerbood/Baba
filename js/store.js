/* طبقة البيانات والدخول. Supabase لو الإعدادات موجودة، وإلا وضع محلي تجريبي على المتصفح. */
(function () {
  const C = window.NOOR_CONFIG || {};
  const LS_DATA = "noor_data_v1";
  const LS_HASH = "noor_admin_hash";
  const SS_AUTH = "noor_admin_auth";
  const useSB = !!(C.SUPABASE_URL && C.SUPABASE_ANON_KEY);
  let sb = null;

  const clone = (o) => JSON.parse(JSON.stringify(o));

  function loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }
  async function client() {
    if (sb) return sb;
    await loadScript("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js");
    sb = window.supabase.createClient(C.SUPABASE_URL, C.SUPABASE_ANON_KEY);
    return sb;
  }
  async function sha(s) {
    const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
    return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
  }

  async function getData() {
    const data = clone(window.NOOR_DEFAULT);
    try {
      let saved = null;
      if (useSB) {
        const c = await client();
        const { data: row } = await c.from("site_data").select("value").eq("key", "main").maybeSingle();
        saved = row && row.value;
      } else {
        const raw = localStorage.getItem(LS_DATA);
        saved = raw && JSON.parse(raw);
      }
      if (saved) {
        if (saved.categories) data.categories = saved.categories;
        if (saved.settings) data.settings = Object.assign(data.settings, saved.settings);
      }
    } catch (e) { console.warn("noor: load failed", e); }
    if (!data.settings.whatsapp && C.WHATSAPP) data.settings.whatsapp = C.WHATSAPP;
    return data;
  }

  async function saveData(d) {
    const payload = { categories: d.categories, settings: d.settings };
    if (useSB) {
      const c = await client();
      const { error } = await c.from("site_data").upsert({ key: "main", value: payload });
      if (error) throw error;
    } else {
      localStorage.setItem(LS_DATA, JSON.stringify(payload));
    }
  }

  function resizeToDataURL(file, max = 1400) {
    return new Promise((res, rej) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const k = Math.min(1, max / Math.max(img.width, img.height));
        const cv = document.createElement("canvas");
        cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k);
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
        URL.revokeObjectURL(url);
        res(cv.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = rej; img.src = url;
    });
  }

  async function uploadImage(file) {
    if (useSB) {
      const c = await client();
      const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = Date.now() + "-" + safe;
      const { error } = await c.storage.from("catalog").upload(path, file, { upsert: false });
      if (error) throw error;
      return c.storage.from("catalog").getPublicUrl(path).data.publicUrl;
    }
    return resizeToDataURL(file);
  }

  const Auth = {
    mode: useSB ? "supabase" : "local",
    adminEmail: C.ADMIN_EMAIL || "",
    async isLoggedIn() {
      if (useSB) { const c = await client(); const { data } = await c.auth.getSession(); return !!data.session; }
      return sessionStorage.getItem(SS_AUTH) === "1";
    },
    hasPassword() { return useSB ? true : !!localStorage.getItem(LS_HASH); },
    async login(pw, email) {
      if (useSB) {
        const c = await client();
        const { error } = await c.auth.signInWithPassword({ email: C.ADMIN_EMAIL || email, password: pw });
        if (error) throw error;
        return;
      }
      const h = localStorage.getItem(LS_HASH);
      if (!h) { localStorage.setItem(LS_HASH, await sha(pw)); }
      else if (h !== (await sha(pw))) throw new Error("wrong");
      sessionStorage.setItem(SS_AUTH, "1");
    },
    async logout() {
      if (useSB) { const c = await client(); await c.auth.signOut(); }
      sessionStorage.removeItem(SS_AUTH);
    },
    async forgot(email) {
      if (!useSB) throw new Error("needs-supabase");
      const c = await client();
      const { error } = await c.auth.resetPasswordForEmail(C.ADMIN_EMAIL || email, { redirectTo: location.origin + location.pathname });
      if (error) throw error;
    },
    async changePassword(newPw, oldPw) {
      if (useSB) {
        const c = await client();
        const { error } = await c.auth.updateUser({ password: newPw });
        if (error) throw error;
        return;
      }
      if (localStorage.getItem(LS_HASH) !== (await sha(oldPw || ""))) throw new Error("wrong");
      localStorage.setItem(LS_HASH, await sha(newPw));
    },
    async onRecovery(cb) {
      if (!useSB) return;
      const c = await client();
      c.auth.onAuthStateChange((ev) => { if (ev === "PASSWORD_RECOVERY") cb(); });
    }
  };

  window.NoorStore = { getData, saveData, uploadImage, Auth, useSupabase: useSB };
})();
