class NavComponent extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute('active') || '';

    this.innerHTML = `
      <nav class="primary-nav">
        <a href="index.html" class="nav-logo">
          <img src="logo/logo.webp" alt="Línea B Amoblamientos" loading="lazy" />
        </a>
        <ul class="nav-links">
          <li><a href="index.html#nosotros" class="${active === 'nosotros' ? 'active' : ''}">Nosotros</a></li>
          <li><a href="index.html#categorias" class="${active === 'categorias' ? 'active' : ''}">Categorías</a></li>
          <li><a href="productos.html" class="${active === 'productos' ? 'active' : ''}">Productos</a></li>
          <li><a href="index.html#servicios" class="${active === 'servicios' ? 'active' : ''}">Servicios</a></li>
          <li><a href="index.html#contacto" class="${active === 'contacto' ? 'active' : ''}">Contacto</a></li>
        </ul>
        <a href="https://wa.me/542915241760" target="_blank" class="nav-cta" rel="noopener">Consultar</a>
        <button class="hamburger" aria-label="Abrir menú" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div class="nav-overlay" aria-hidden="true"></div>
    `;

    // Inject floating WA button once (avoid duplicates)
    if (!document.querySelector('.wa-float')) {
      const waBtn = document.createElement('a');
      waBtn.href = 'https://wa.me/542915241760';
      waBtn.target = '_blank';
      waBtn.rel = 'noopener';
      waBtn.className = 'wa-float';
      waBtn.setAttribute('aria-label', 'Consultar por WhatsApp');
      waBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span>WhatsApp</span>
      `;
      document.body.appendChild(waBtn);
    }

    const btn = this.querySelector('.hamburger');
    const navLinks = this.querySelector('.nav-links');
    const overlay = this.querySelector('.nav-overlay');

    const openMenu = () => {
      navLinks.classList.add('open');
      btn.classList.add('open');
      overlay.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
      navLinks.classList.remove('open');
      btn.classList.remove('open');
      overlay.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    };

    if (btn && navLinks) {
      btn.addEventListener('click', () => {
        navLinks.classList.contains('open') ? closeMenu() : openMenu();
      });
    }

    // Close when clicking overlay
    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    // Close when clicking any nav link (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });

    if (this.getAttribute('transparent') !== 'false') {
      window.addEventListener('scroll', () => {
        const nav = this.querySelector('.primary-nav');
        if (!nav) return;
        if (window.scrollY > 20) {
          nav.style.background = 'rgba(13, 13, 11, 0.96)';
          nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
        } else {
          nav.style.background = 'rgba(13, 13, 11, 0.65)';
          nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.03)';
        }
      });
    }
  }
}

class FooterComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <div class="footer-grid">
          <div class="footer-col" style="grid-column: span 2;">
            <div class="footer-brand-name">Línea B Amoblamientos</div>
            <p class="footer-brand-desc">Diseño, fabricación e instalación de muebles a medida en Bahía Blanca. Melamina de primera calidad y terminaciones industriales.</p>
          </div>
          <div class="footer-col">
            <div class="footer-col-title">Explorar</div>
            <ul>
              <li><a href="index.html">Inicio</a></li>
              <li><a href="productos.html">Catálogo</a></li>
              <li><a href="index.html#nosotros">Nosotros</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <div class="footer-col-title">Contacto</div>
            <ul>
              <li><a href="index.html#contacto">Formulario</a></li>
              <li><a href="https://wa.me/542915241760" target="_blank" rel="noopener">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© ${new Date().getFullYear()} Línea B Amoblamientos.</p>
          <p>Bahía Blanca, Argentina.</p>
        </div>
      </footer>
    `;
  }
}

customElements.define('lineab-nav', NavComponent);
customElements.define('lineab-footer', FooterComponent);