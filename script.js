const translations = {
  en: {
    products: "Products ⌄",
    app: "Keefa App",
    contact: "Contact",
    billing: "Billing",
    aboutUs: {
      title: "About Us",
      paragraphs: [
        "Keefa is a next generation tech brand focused on creating intelligent solutions...",
        "Our mission is to reshape everyday environments through innovation..."
      ]
    },
    features: {
      items: ["REGISTERED BRAND", "SOFTWARE ELABORATED IN MEXICO", "INTELLIGENT SYSTEMS"]
    }
  },
  es: {
    products: "Productos ⌄",
    app: "Keefa App",
    contact: "Contacto",
    billing: "Facturación",
    aboutUs: {
      title: "Acerca de Nosotros",
      paragraphs: [
        "Keefa es una marca tecnológica de nueva generación...",
        "Nuestra misión es rediseñar los entornos cotidianos mediante la innovación..."
      ]
    },
    features: {
      items: ["MARCA REGISTRADA", "SOFTWARE ELABORADO EN MEXICO", "SISTEMAS INTELIGENTES"]
    }
  }
};

function detectLang () {
  const saved = localStorage.getItem('lang');
  if (saved) return saved;

  const navLang = (navigator.language || 'en').slice(0,2).toLowerCase();
  return navLang === 'es' ? 'es' : 'en';
}

function renderContent (lang) {
  const data = translations[lang] || translations.en;

  const links = {
    products: '/products/',
    app:      '/app/',
    contact:  '/contact/',
    billing:  '/billing/'
  };

  // Desktop menu
  const desktopMenu = document.getElementById('desktopMenu');
  if (desktopMenu) {
    desktopMenu.innerHTML = `
  <li><a href="${productsPage}">${data.products}</a></li>
  <li><a href="${appPage}">${data.app}</a></li>
  <li><a href="${contactPage}">${data.contact}</a></li>
  <li><a href="${billingPage}">${data.billing}</a></li>
`;
  }

  // Mobile menu
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.innerHTML = `
      <div class="mobile-lang-switch">
        <button class="lang-btn" onclick="setLang('en')">EN</button>
        <button class="lang-btn" onclick="setLang('es')">ES</button>
      </div>
      <a href="${productsPage}">${data.products}</a>
      <a href="${appPage}">${data.app}</a>
      <a href="${contactPage}">${data.contact}</a>
      <a href="${billingPage}">${data.billing}</a>
    `;
  }

  // About Us
  const aboutEl = document.getElementById('about-us');
  if (aboutEl) {
    aboutEl.innerHTML = `
      <h2>${data.aboutUs.title}</h2>
      <p>${data.aboutUs.paragraphs[0]}</p>
      <p>${data.aboutUs.paragraphs[1]}</p>
    `;
  }

  // Features
  const featuresEl = document.getElementById('features');
  if (featuresEl) {
    const featureCards = data.features.items.map(item => `
      <div class="feature-item">${item}</div>
    `).join('');
    featuresEl.innerHTML = `
      <div class="feature-list">${featureCards}</div>
    `;
  }

  // Set <html lang="">
  document.documentElement.lang = lang;

  // Save selected language
  localStorage.setItem('lang', lang);

  // Reinitialize hamburger menu
  initHamburger();
  initLangButtonsInsideMobile();
}

function setLang(lang) {
  renderContent(lang);
}

function initHamburger () {
  const burger = document.querySelector('.hamburger');
  const mob    = document.getElementById('mobileMenu');
  if (!burger || !mob) return;

  burger.onclick = () => {
    mob.classList.toggle('open');
    burger.classList.toggle('open');
    document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
  };
}

function initLangDropdown () {
  const toggle = document.getElementById('lang-toggle');
  const menu   = document.getElementById('lang-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('show');
    }
  });

  menu.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLang(btn.dataset.lang);
      menu.classList.remove('show');
    });
  });
}

function initLangButtonsInsideMobile () {
  const mob = document.getElementById('mobileMenu');
  if (!mob) return;

  mob.querySelectorAll('.lang-btn').forEach(btn => {
    btn.onclick = () => {
      setLang(btn.dataset.lang);
      document.querySelector('.hamburger').click(); // закрыть меню
    };
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const initialLang = detectLang();
  setLang(initialLang);

  initLangDropdown();   // иконка 🌐
});
