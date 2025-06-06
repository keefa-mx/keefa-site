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

function renderContent(lang) {
  const data = translations[lang];
  const productsPage = '/products';
  const appPage = '/app';
  const contactPage = '/contact';
  const billingPage = '/billing';

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
  initHamburgerMenu();
}

function setLang(lang) {
  renderContent(lang);
}

function initHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const body = document.body;

  if (hamburger && mobileMenu) {
    hamburger.onclick = () => {
      mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open');
      body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('lang') || 'en';
  setLang(lang);
});
