const WA_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

const IG_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;

class NavComponent extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute('active') || '';
    const base = this.getAttribute('base') || '';

    this.innerHTML = `
      <nav class="primary-nav">
        <a href="${base}index.html" class="nav-logo">
          <img src="${base}logo/logo.webp" alt="Línea B Amoblamientos" loading="lazy" />
        </a>
        <ul class="nav-links">
          <li><a href="${base}index.html#nosotros"  class="${active==='nosotros'?'active':''}">Nosotros</a></li>
          <li><a href="${base}index.html#categorias" class="${active==='categorias'?'active':''}">Categorías</a></li>
          <li><a href="${base}html/productos.html"  class="${active==='productos'?'active':''}">Productos</a></li>
          <li><a href="${base}index.html#servicios" class="${active==='servicios'?'active':''}">Servicios</a></li>
          <li><a href="${base}index.html#contacto"  class="${active==='contacto'?'active':''}">Contacto</a></li>
        </ul>
        <a href="https://wa.me/542915241760" target="_blank" class="nav-cta" rel="noopener">${WA_SVG} Consultar</a>
        <button class="hamburger" aria-label="Abrir menú" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div class="nav-overlay" aria-hidden="true"></div>
    `;

    // Floating WA button — inject once
    if (!document.querySelector('.wa-float')) {
      const waBtn = document.createElement('a');
      waBtn.href = 'https://wa.me/542915241760';
      waBtn.target = '_blank';
      waBtn.rel = 'noopener';
      waBtn.className = 'wa-float';
      waBtn.setAttribute('aria-label', 'Consultar por WhatsApp');
      waBtn.innerHTML = `${WA_SVG}<span>WhatsApp</span>`;
      document.body.appendChild(waBtn);
    }

    const btn      = this.querySelector('.hamburger');
    const navLinks = this.querySelector('.nav-links');
    const overlay  = this.querySelector('.nav-overlay');

    const openMenu = () => {
      navLinks.classList.add('open');
      btn.classList.add('open');
      overlay.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    const closeMenu = () => {
      navLinks.classList.remove('open');
      btn.classList.remove('open');
      overlay.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    btn.addEventListener('click', () => navLinks.classList.contains('open') ? closeMenu() : openMenu());
    overlay.addEventListener('click', closeMenu);
    navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

    if (this.getAttribute('transparent') !== 'false') {
      window.addEventListener('scroll', () => {
        const nav = this.querySelector('.primary-nav');
        if (!nav) return;
        nav.style.background = window.scrollY > 20
          ? 'rgba(255,255,255,0.97)'
          : 'rgba(255,255,255,0.88)';
      }, { passive: true });
    }
  }
}

class FooterComponent extends HTMLElement {
  connectedCallback() {
    const base = this.getAttribute('base') || '';
    this.innerHTML = `
      <footer>
        <div class="footer-grid">
          <div class="footer-col" style="grid-column:span 2">
            <div class="footer-brand-name">Línea B Amoblamientos</div>
            <p class="footer-brand-desc">Diseño, fabricación e instalación de muebles a medida en Bahía Blanca. Melamina de primera calidad y terminaciones industriales.</p>
            <div class="footer-social">
              <a href="https://www.instagram.com/lineab_amoblamientos/" target="_blank" rel="noopener" aria-label="Instagram Línea B">${IG_SVG}</a>
              <a href="https://wa.me/542915241760" target="_blank" rel="noopener" aria-label="WhatsApp">${WA_SVG}</a>
            </div>
          </div>
          <div class="footer-col">
            <div class="footer-col-title">Explorar</div>
            <ul>
              <li><a href="${base}index.html">Inicio</a></li>
              <li><a href="${base}html/productos.html">Catálogo</a></li>
              <li><a href="${base}index.html#nosotros">Nosotros</a></li>
              <li><a href="${base}index.html#servicios">Servicios</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <div class="footer-col-title">Contacto</div>
            <ul>
              <li><a href="${base}index.html#contacto">Formulario</a></li>
              <li><a href="https://wa.me/542915241760" target="_blank" rel="noopener">WhatsApp</a></li>
              <li><a href="https://www.instagram.com/lineab_amoblamientos/" target="_blank" rel="noopener">@lineab_amoblamientos</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© ${new Date().getFullYear()} Línea B Amoblamientos. Todos los derechos reservados.</p>
          <p>Bahía Blanca, Argentina.</p>
        </div>
        <div class="footer-noda">
          <span class="footer-noda-text">Sitio web desarrollado por</span>
          <a href="https://www.instagram.com/noda.web" target="_blank" rel="noopener" class="footer-noda-link">NODA</a>
        </div>
      </footer>
    `;
  }
}

customElements.define('lineab-nav', NavComponent);
customElements.define('lineab-footer', FooterComponent);