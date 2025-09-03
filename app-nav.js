// === Robust hamburger toggle (stable) ===
(function(){
  function ready(fn){ if(document.readyState!=='loading'){fn()} else {document.addEventListener('DOMContentLoaded',fn)} }
  function qsa(s,ctx){ return Array.prototype.slice.call((ctx||document).querySelectorAll(s)); }
  function closest(el,sel){ while(el && el.nodeType===1){ if(el.matches(sel)) return el; el = el.parentElement; } return null; }
  function findMenuFor(btn){
    var sel = btn.getAttribute('data-target') || btn.getAttribute('data-menu') || btn.getAttribute('aria-controls');
    if(sel){ try{ var t=document.querySelector(sel); if(t && t.classList.contains('nav-menu')) return t; }catch(e){} }
    var scope = closest(btn,'.nav-container') || closest(btn,'nav') || document;
    return scope.querySelector('.nav-menu') || document.querySelector('.nav-menu');
  }
  function toggleMenu(menu, btn, want){
    if(!menu) return; var show=(typeof want==='boolean')?want:!menu.classList.contains('show');
    menu.classList.toggle('show', show); if(btn){ btn.setAttribute('aria-expanded', show?'true':'false'); btn.classList.toggle('is-active', show); }
  }
  ready(function(){
    var sels=['.nav-toggle','.menu-toggle','.hamburger','.hamburguesa','.menu-btn','#menu-btn','[data-nav-toggle]','[data-toggle="nav"]','[aria-label*="menú" i]','[aria-label*="menu" i]'];
    var togglers=[]; sels.forEach(function(s){ qsa(s).forEach(function(el){ if(togglers.indexOf(el)===-1) togglers.push(el); }); });
    if(togglers.length===0){
      var c=document.querySelector('.nav-container');
      if(c){ var b=document.createElement('button'); b.className='nav-toggle'; b.setAttribute('aria-label','Abrir menú'); b.setAttribute('aria-expanded','false'); b.textContent='☰'; c.insertBefore(b, c.firstChild?c.firstChild.nextSibling:c.firstChild); togglers.push(b); }
    }
    togglers.forEach(function(btn){ btn.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); var m=findMenuFor(btn); toggleMenu(m, btn); }); });
    qsa('.nav-menu').forEach(function(m){ m.addEventListener('click', function(e){ if(e.target && e.target.tagName==='A'){ toggleMenu(m, null, false); } }); });
    document.addEventListener('click', function(e){ qsa('.nav-menu.show').forEach(function(m){ var path=e.composedPath?e.composedPath():[]; var inside=path.indexOf(m)!==-1 || m.contains(e.target); var onBtn=togglers.some(function(b){ return path.indexOf(b)!==-1 || b.contains(e.target); }); if(!inside && !onBtn){ toggleMenu(m, null, false); } }); });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape'){ qsa('.nav-menu.show').forEach(function(m){ toggleMenu(m, null, false); }); } });
  });
})();
