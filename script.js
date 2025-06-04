const translations = {
  en: {
    billing: "Billing",
    contacts: "Contacts",
    aboutUs: {
      title: "About Us",
      paragraphs: [
        "Keefa is a next generation tech brand focused on creating intelligent solutions...",
        "Our mission is to reshape everyday environments through innovation..."
      ]
    },
    products: {
      title: "Our Products",
      items: [
        { name: "Keefa Guard", link: "lighting.html", img: "router.png" }
      ]
    },
    features: {
      items: ["REGISTERED BRAND", "SOFTWARE ELABORATED IN MEXICO", "INTELLIGENT SYSTEMS"]
    }
  },
  es: {
    billing: "Facturación",
    contacts: "Contactos",
    aboutUs: {
      title: "Acerca de Nosotros",
      paragraphs: [
        "Keefa es una marca tecnológica de nueva generación...",
        "Nuestra misión es rediseñar los entornos cotidianos mediante la innovación..."
      ]
    },
    products: {
      title: "Nuestros Productos",
      items: [
        { name: "Keefa Guard", link: "lighting.html", img: "router.png" }
      ]
    },
    features: {
      items: ["MARCA REGISTRADA", "SOFTWARE ELABORADO EN MEXICO", "SISTEMAS INTELIGENTES"]
    }
  }
};

function renderContent(lang) {
  const data = translations[lang];

  //Desktop menu
  const desktopMenu = document.getElementById('desktopMenu');
  if (desktopMenu) {
    desktopMenu.innerHTML = `
      <li><a href="contacts.html">${translations[lang].contacts}</a></li>
      <li><a href="facturacion.html">${translations[lang].billing}</a></li>
    `;
}
  
  // Mobile menu
  const menu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    menu.innerHTML = `
      <a href="facturacion.html">${data.billing}</a>
      <a href="contactos.html">${data.contacts}</a>
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

  // Products
  const productsEl = document.getElementById('our-products');
  if (productsEl) {
    const productCards = data.products.items.map(item => `
      <a href="${item.link}" class="product-card">
        <span class="product-text">${item.name}</span>
        <img src="${item.img}" alt="${item.name}" class="product-image" />
      </a>
    `).join('');
    productsEl.innerHTML = `
      <h2>${data.products.title}</h2>
      <div class="products-container">${productCards}</div>
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

  //Initialize hamburger behavior again
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
      body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('lang') || 'en';
  setLang(lang);
});
