// === Navbar toggle (Git-ready, multi-button) ===
(function(){
  function ready(fn){ if(document.readyState!=="loading"){fn()} else {document.addEventListener("DOMContentLoaded", fn)} }
  function qsa(sel, ctx){ return Array.prototype.slice.call((ctx||document).querySelectorAll(sel)); }
  function toggleMenu(menu, btn, show){
    if(!menu) return;
    const want = (typeof show==="boolean") ? show : !menu.classList.contains("show");
    menu.classList.toggle("show", want);
    if(btn){ btn.setAttribute("aria-expanded", want ? "true" : "false"); btn.classList.toggle("is-active", want); }
  }
  ready(function(){
    const menu = document.querySelector(".nav-menu");
    if(!menu) return;
    const selectors = [".nav-toggle",".menu-toggle",".hamburger",".hamburguesa",".menu-btn","#menu-btn","[data-nav-toggle]","[data-toggle='nav']"];
    const togglers = new Set(); selectors.forEach(s => qsa(s).forEach(el => togglers.add(el)));
    if(togglers.size===0){
      const c = document.querySelector(".nav-container");
      if(c){
        const btn = document.createElement("button"); btn.className="nav-toggle"; btn.setAttribute("aria-label","Abrir menú"); btn.setAttribute("aria-expanded","false"); btn.textContent="☰";
        c.insertBefore(btn, c.firstChild.nextSibling); togglers.add(btn);
      }
    }
    togglers.forEach(btn => btn.addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); toggleMenu(menu, btn); }));
    menu.addEventListener("click", e => { if(e.target && e.target.tagName==="A"){ toggleMenu(menu, null, false); } });
    document.addEventListener("click", e => {
      if(!menu.classList.contains("show")) return;
      const path = e.composedPath ? e.composedPath() : (function(n){const a=[]; while(n){a.push(n); n=n.parentNode;} return a;})(e.target);
      const inside = path.indexOf(menu)!==-1; let onBtn=false; togglers.forEach(b=>{ if(path.indexOf(b)!==-1) onBtn=true; });
      if(!inside && !onBtn) toggleMenu(menu, null, false);
    });
    document.addEventListener("keydown", e => { if(e.key==="Escape") toggleMenu(menu, null, false); });
  });
})();
