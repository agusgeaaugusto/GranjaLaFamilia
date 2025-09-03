
// ====== Datos para editar ======
const dataProductos = [
  { nombre: "Huevo Docena", descripcion: "Huevos frescos L/XL", precio: 15000, foto: "🥚" },
  { nombre: "Maple 30", descripcion: "Ideal para familias y negocios", precio: 35000, foto: "🧺" },
  { nombre: "Pollo de patio", descripcion: "Bajo pedido", precio: 0, foto: "🐔" },
  { nombre: "Huevos caseros premium", descripcion: "Yema naranja intensa", precio: 18000, foto: "🍳" },
];

const dataGaleria = [
  "assets/logo.jpg","assets/logo.jpg","assets/logo.jpg","assets/logo.jpg","assets/logo.jpg","assets/logo.jpg"
];

const dataOpiniones = [
  { texto: "Huevos riquísimos y super frescos. Recomendadísimo.", autor: "María G." },
  { texto: "Entrega rápida y atención excelente.", autor: "Carlos R." },
  { texto: "La diferencia de sabor se nota. ¡Volveré a comprar!", autor: "Laura S." }
];

// ====== Utilidades ======
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

// ====== Menú móvil ======
const btn = $(".menu-btn");
const menu = $("#menu");
btn?.addEventListener("click", () => {
  const open = menu.style.display === "block";
  menu.style.display = open ? "none" : "block";
  btn.setAttribute("aria-expanded", String(!open));
});

// ====== Año dinámico ======
$("#year").textContent = new Date().getFullYear();

// ====== Stats contadores ======
function animateValue(el, end, dur=1200){
  const start = 0;
  const steps = Math.max(1, Math.floor(dur/16));
  let current = 0;
  const inc = (end - start) / steps;
  const timer = setInterval(()=>{
    current += inc;
    el.textContent = Math.round(current).toLocaleString("es-PY");
    if(current >= end){ el.textContent = end.toLocaleString("es-PY"); clearInterval(timer); }
  }, 16);
}
animateValue($("#stat-huevos"), 240, 1400);
animateValue($("#stat-clientes"), 1200, 1400);
animateValue($("#stat-anios"), 5, 1400);

// ====== Render productos ======
function guaranies(n){ return n ? n.toLocaleString("es-PY") + " Gs." : "Consultar"; }
const cont = $("#lista-productos");
dataProductos.forEach(p=>{
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <div class="card-img" aria-hidden="true"><span style="font-size:2.2rem">${p.foto || "🥚"}</span></div>
    <h3>${p.nombre}</h3>
    <p>${p.descripcion}</p>
    <p class="price">${guaranies(p.precio)}</p>
    <div class="actions">
      <a class="btn btn-primary" href="https://wa.me/+595982302685?text=Hola%2C%20vengo%20de%20la%20web%20de%20Granja%20La%20Familia.%20Quiero%20m%C3%A1s%20info%20%2F%20hacer%20un%20pedido. 982 302 685?text=Hola%20Granja%20La%20Familia,%20quiero%20${encodeURIComponent(p.nombre)}">Comprar</a>
      <button class="btn" aria-label="Agregar a favoritos">☆</button>
    </div>`;
  cont.appendChild(card);
});

// ====== Galería + Lightbox ======
const gal = $("#galeria-grid");
dataGaleria.forEach(src=>{
  const img = document.createElement("img");
  img.src = src;
  img.alt = "Foto de la granja";
  img.addEventListener("click", ()=>{
    $("#lightbox-img").src = src;
    $("#lightbox").showModal();
  });
  gal.appendChild(img);
});
$("#lightbox-close").addEventListener("click",()=>$("#lightbox").close());

// ====== Opiniones (slider simple) ======
const slider = $("#opiniones-slider");
let idx = 0;
function renderSlide(i){
  slider.innerHTML = "";
  const o = dataOpiniones[i];
  const el = document.createElement("div");
  el.className = "slide";
  el.innerHTML = `<blockquote>“${o.texto}”</blockquote><footer>— ${o.autor}</footer>`;
  slider.appendChild(el);
}
renderSlide(idx);
$("#prev").addEventListener("click", ()=>{ idx = (idx - 1 + dataOpiniones.length) % dataOpiniones.length; renderSlide(idx); });
$("#next").addEventListener("click", ()=>{ idx = (idx + 1) % dataOpiniones.length; renderSlide(idx); });

// ====== Form contacto -> WhatsApp ======
function enviarMensaje(e){
  e.preventDefault();
  const f = e.target;
  const nombre = f.nombre.value.trim();
  const tel = f.telefono.value.trim();
  const msg = f.mensaje.value.trim();
  const texto = `Hola Granja La Familia, soy ${nombre} (${tel}). ${msg}`;
  const numero = "+595 982 302 685"; // <-- CAMBIAR
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank");
  return false;
}

  // 1) Evitar que el navegador restaure el scroll al recargar
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // 2) Quitar el #hash de la URL (si quedó de un clic a "Productos", "Contacto", etc.)
  window.addEventListener('DOMContentLoaded', () => {
    if (location.hash) {
      const urlSinHash = location.pathname + location.search;
      history.replaceState(null, document.title, urlSinHash);
    }

    // 3) Forzar arriba al cargar
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  });

  // 4) Navegación suave a secciones sin dejar el #hash pegado
  //    (opcional: hace scroll suave y NO ensucia la URL)
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // No ponemos location.hash = … para que al recargar no “salte”
      history.replaceState(null, '', location.pathname + location.search);
    }
  });

  // 5) Por si algún input tiene autofocus y te arrastra hacia abajo
  document.querySelectorAll('[autofocus]').forEach(el => el.removeAttribute('autofocus'));

