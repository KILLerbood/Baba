/* الهيدر والفوتر المشتركين بين كل الصفحات */
(function () {
  const page = document.body.dataset.page || "home";
  const links = [
    ["home", "index.html", "nav.home"],
    ["about", "about.html", "nav.about"],
    ["process", "process.html", "nav.process"],
    ["rooms", "rooms.html", "nav.rooms"],
    ["fabrics", "fabrics.html", "nav.fabrics"],
    ["catalog", "catalog.html", "nav.catalog"],
    ["build", "build.html", "nav.build"]
  ];
  const symbol = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="noor-mark" viewBox="0 0 48 48">
    <path d="M10 43V23a14 14 0 0 1 28 0v20z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>
    <circle cx="24" cy="23" r="5" fill="currentColor"/>
    <path d="M24 8V4M13 12l-2.5-2.5M35 12l2.5-2.5M7 23H3.5M44.5 23H41" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></symbol></svg>`;
  const nav = links.map(([id, href, key]) =>
    `<a href="${href}" data-i18n="${key}"${id === page ? ' aria-current="page"' : ""}></a>`).join("");
  const header = `
  <header class="site-header${page === "home" ? "" : " solid"}" id="top">
    <a class="brand" href="index.html" aria-label="نور Noor"><svg class="brand-mark"><use href="#noor-mark"/></svg><span class="brand-name">نور</span></a>
    <nav class="nav" id="nav">${nav}</nav>
    <div class="header-actions">
      <button class="lang-btn" id="langBtn" type="button" data-i18n="lang.toggle"></button>
      <button class="menu-btn" id="menuBtn" type="button" aria-label="menu"><span></span><span></span></button>
    </div>
  </header>`;
  const footer = `
  <footer class="footer">
    <svg class="brand-mark"><use href="#noor-mark"/></svg>
    <p data-i18n="foot.text"></p>
  </footer>
  <a class="wa-float" id="waFloat" href="request.html" aria-label="WhatsApp">
    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.3.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.4.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z"/></svg>
  </a>`;
  const modal = `
  <div class="modal" id="roomModal" hidden>
    <div class="modal-backdrop" data-close></div>
    <div class="modal-card" role="dialog" aria-modal="true">
      <button class="modal-x" data-close type="button" aria-label="close">×</button>
      <div class="viewer" id="viewer">
        <div class="viewer-img" id="viewerImg"></div>
        <button class="arrow prev" id="vPrev" type="button" aria-label="previous"><span></span></button>
        <button class="arrow next" id="vNext" type="button" aria-label="next"><span></span></button>
        <p class="viewer-hint" data-i18n="rooms.hint"></p>
      </div>
      <div class="viewer-info" id="viewerInfo"></div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML("afterbegin", symbol + header);
  document.body.insertAdjacentHTML("beforeend", footer + (page === "home" || page === "rooms" ? modal : ""));
})();
