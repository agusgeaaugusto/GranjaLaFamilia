// Granja La Familia - script.js
// Controles de Interacción, Datos y Animaciones

document.addEventListener('DOMContentLoaded', () => {
    // 1. DATA (Productos y Opiniones)
    const dataProductos = [
        {
            id: 'h-premium',
            nombre: 'Huevos de Patio Premium',
            descripcion: 'Docena de huevos de gallinas felices, yema más colorida y sabor intenso.',
            precio: 'G. 18.000',
            unidad: '/ docena',
            img: 'assets/img/huevos_1.png', // Debe existir
            cta: 'Pedir 1 docena',
            wa_text: 'me gustaría pedir una docena de Huevos de Patio Premium.'
        },
        {
            id: 'h-maple',
            nombre: 'Maple Económico (30 Unidades)',
            descripcion: 'El formato ideal para familias y pequeños negocios. Frescura garantizada.',
            precio: 'G. 42.000',
            unidad: '/ maple (30 u.)',
            img: 'assets/img/maple_huevos.png', // Debe existir
            cta: 'Pedir 1 maple',
            wa_text: 'me gustaría pedir un Maple Económico de 30 unidades.'
        },
        {
            id: 'pollo-patio',
            nombre: 'Pollo de Patio Entero',
            descripcion: 'Carne más firme y sabrosa, criados con alimentación natural. Peso aprox. 2kg.',
            precio: 'G. 45.000',
            unidad: '/ unidad',
            img: 'assets/img/gallina_png.webp', // Debe existir
            cta: 'Pedir 1 Pollo',
            wa_text: 'me gustaría pedir 1 Pollo de Patio Entero.'
        }
    ];

    const dataOpiniones = [
        { texto: "Los huevos son increíblemente frescos. La yema tiene un color y un sabor que no se compara con nada de supermercado. ¡Excelente servicio!", autor: "María C.", rating: 5 },
        { texto: "Siempre cumplen con la entrega en el día. Los pollos de patio son de una calidad superior. ¡Apoyo 100% a Granja La Familia!", autor: "Javier R.", rating: 5 },
        { texto: "La diferencia en el sabor es notable. Se nota que las gallinas son bien cuidadas. Pedido recurrente asegurado.", autor: "Andrea M.", rating: 4 },
        { texto: "Muy buena atención y los precios son justos por la calidad que ofrecen. Totalmente recomendados en Saltos del Guairá.", autor: "Carlos D.", rating: 5 },
    ];

    // 2. RENDERIZADO DE PRODUCTOS
    const listaProductos = document.getElementById('lista-productos');
    if (listaProductos) {
        listaProductos.innerHTML = dataProductos.map(p => `
            <article class="product-card fade-up lift">
                <img loading="lazy" src="${p.img}" alt="${p.nombre}">
                <div class="product-card-content">
                    <h3>${p.nombre}</h3>
                    <p>${p.descripcion}</p>
                    <span class="price">${p.precio}<small>${p.unidad}</small></span>
                    <a href="https://wa.me/595982302685?text=Hola%20Granja%20La%20Familia,%20${encodeURIComponent(p.wa_text)}" class="btn btn-primary" target="_blank" style="margin-top: 15px; display: inline-flex;">
                        ${p.cta}
                    </a>
                </div>
            </article>
        `).join('');
    }

    // 3. RENDERIZADO DE TESTIMONIOS Y SLIDER
    const sliderContainer = document.getElementById('opiniones-slider');
    if (sliderContainer) {
        sliderContainer.innerHTML = dataOpiniones.map(o => `
            <article class="testimonial-card fade-up">
                <div class="rating">${'★'.repeat(o.rating)}${'☆'.repeat(5 - o.rating)}</div>
                <p>"${o.texto}"</p>
                <cite>${o.autor}</cite>
            </article>
        `).join('');

        // Lógica de Slider (Scroll simple)
        const btnPrev = document.querySelector('.slider-prev');
        const btnNext = document.querySelector('.slider-next');
        const scrollAmount = 300; 

        btnNext.addEventListener('click', () => { sliderContainer.scrollLeft += scrollAmount; });
        btnPrev.addEventListener('click', () => { sliderContainer.scrollLeft -= scrollAmount; });
    }

    // 4. ANIMACIONES (Contadores, Fade-Up y Parallax)
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Intersection Observer para .fade-up
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('is-in');
                // Mantener observe si se desea animación al scrollear de vuelta.
            }
        });
    }, { threshold: 0.14 });
    document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

    // Parallax suave
    const layer = document.querySelector('.parallax-band .layer');
    if (layer) {
        window.addEventListener('scroll', () => {
            const speed = parseFloat(layer.dataset.parallax?.split(':')[1] || 0.35);
            const y = window.scrollY * speed;
            layer.style.transform = `translateY(${y * -0.2}px)`;
        }, { passive: true });
    }

    // Contadores del hero
    function countUp(el, to, dur = 1500) {
        if (!el) return;
        let start = 0, t0 = null;
        const step = (ts) => {
            if (!t0) t0 = ts;
            const p = Math.min(1, (ts - t0) / dur);
            el.textContent = Math.floor(p * to).toLocaleString('es-PY');
            if (p < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = to.toLocaleString('es-PY');
            }
        };
        // Inicia el contador al entrar en vista
        new IntersectionObserver(([entry], observer) => {
            if (entry.isIntersecting) {
                requestAnimationFrame(step);
                observer.unobserve(el);
            }
        }, { threshold: 1.0 }).observe(el);
    }
    countUp(document.getElementById('stat-huevos'), 320);
    countUp(document.getElementById('stat-clientes'), 1500);
    countUp(document.getElementById('stat-anios'), 5); 

    // 5. NAVEGACIÓN Y MENÚ
    const menuBtn = document.querySelector('.nav-toggle');
    const menu = document.getElementById('menu');
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;
            menuBtn.setAttribute('aria-expanded', !isExpanded);
        });
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 950) {
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
});

// 6. MANEJO DE FORMULARIO (WhatsApp)
function enviarMensaje(event) {
    event.preventDefault();
    const form = event.target;
    const nombre = form.nombre.value;
    const telefono = form.telefono.value;
    const mensaje = form.mensaje.value;
    const waNumber = '595982302685'; 
    
    const waText = `¡Hola Granja La Familia!%0AMi nombre es: *${nombre}*%0AMi Teléfono/WhatsApp es: *${telefono}*%0A%0AMi mensaje es:%0A"${mensaje}"`;
    
    const waLink = `https://wa.me/${waNumber}?text=${waText}`;
    
    window.open(waLink, '_blank');
    
    form.reset();
    return false;
}
