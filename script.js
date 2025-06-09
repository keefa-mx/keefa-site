/* -------------------------------------------------
   1.  Переводы
------------------------------------------------- */
const translations = {
  en: {
    menu: {
      products: "Products ⌄",
      app:      "Keefa App",
      contact:  "Contact",
      billing:  "Billing"
    },
    sections: {
      aboutTitle: "About Us",
      aboutP1:    "Keefa is a next generation tech brand focused on creating intelligent solutions...",
      aboutP2:    "Our mission is to reshape everyday environments through innovation..."
    },
    features: [
      "REGISTERED BRAND",
      "SOFTWARE ELABORATED IN MEXICO",
      "INTELLIGENT SYSTEMS"
    ]
  },

  es: {
    menu: {
      products: "Productos ⌄",
      app:      "Keefa App",
      contact:  "Contacto",
      billing:  "Facturación"
    },
    sections: {
      aboutTitle: "Acerca de Nosotros",
      aboutP1:    "Keefa es una marca tecnológica de nueva generación...",
      aboutP2:    "Nuestra misión es rediseñar los entornos cotidianos mediante la innovación..."
    },
    features: [
      "MARCA REGISTRADA",
      "SOFTWARE ELABORADO EN MEXICO",
      "SISTEMAS INTELIGENTES"
    ]
  }
};

/*------------------------Detecting Browser Language------------------------*/
function detectLang() {
  const saved = localStorage.getItem('lang');
  if (saved) return saved;

  const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return nav === 'es' ? 'es' : 'en';
}

/* -------------------------------Links----------------------------------- */
function renderContent(lang) {
  const t = translations[lang];
  const data = t.menu;
   
  const productsPage = '/products';
  const appPage = '/app';
  const contactPage = '/contact';
  const billingPage = '/billing';

  /* ------------------------------Desktop Menu---------------------------- */
  const desktopMenu = document.getElementById('desktopMenu');
  const desktopList = desktopMenu.querySelector('ul');
  if (desktopList) {
    desktopList.innerHTML = `
      <li><a href="${productsPage}">${data.products}</a></li>
      <li><a href="${appPage}">${data.app}</a></li>
      <li><a href="${contactPage}">${data.contact}</a></li>
      <li><a href="${billingPage}">${data.billing}</a></li>
    `;
  }

  /* -----------------------------Mobile Menu----------------------------- */
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileList = mobileMenu.querySelector('ul');
  if (mobileList) {
    mobileList.innerHTML = `
      <li><a href="${productsPage}">${data.products}</a></li>
      <li><a href="${appPage}">${data.app}</a></li>
      <li><a href="${contactPage}">${data.contact}</a></li>
      <li><a href="${billingPage}">${data.billing}</a></li>
    `;
  }

  /* ---- блок About ---- */
  const about = document.getElementById('about-us');
  if (about) {
    about.innerHTML = `
      <h2>${t.sections.aboutTitle}</h2>
      <p>${t.sections.aboutP1}</p>
      <p>${t.sections.aboutP2}</p>
    `;
  }

  /* ---- блок Features ---- */
  const feat = document.getElementById('features');
  if (feat) {
    feat.innerHTML = t.features
      .map(item => `<div class="feature-item">${item}</div>`)
      .join('');
  }
}

/* ----------------------Saving Preferred Language-------------------- */
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);
}

/* ----------------------Manual Language Change---------------------- */
function setLang(lang) {
  if (!translations[lang]) return;
  renderContent(lang);
}


/* ---------------------Hamburger Menu---------------------------- */
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const opened = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
    document.body.style.overflow = opened ? 'hidden' : ''; 
  });
}


/* ---------------------Language Dropdown Desktop and Mobile--------------------- */
function initLangDropdown() {
  const pairs = [
     { btn: 'langIconDesktop', menu: 'langMenuDesktop' },
     { btn: 'langIconMobile', menu: 'langMenuMobile' }
  ];
  pairs.forEach(({ btn, menu }) => {
     const icon = document.getElementById(btn);
     const list = document.getElementById(menu);
     if (!icon || !list) return;

     icon.addEventListener('click', (e) => {
        e.stopPropagation();
        list.classList.toggle('show');
     });
  });
   
/* -----------------------Close Language Menu By Clicking Outside-------------------- */
document.addEventListener('click', (e) => {
   pairs.forEach(({ btn, menu }) => {
      const icon = document.getElementById(btn);
      const list = document.getElementById(menu);
      if (!icon || !list) return;

      if(!icon.contains(e.target) && !list.contains(e.target)) {
         list.classList.remove('show');
      }
   });
});

/*------------------------Close Language Menu By Clicking LangIcon-------------------------- */
document.querySelectorAll('.langBtn').forEach(btn => {
   btn.addEventListener('click', () => {
      setLang(btn.dataset.lang);
      document.querySelectorAll('.langMenuDesktop, .langMenuMobile')
              .forEach(menu => menu.classList.remove('show'));
   });
});
}

/* -------------------------Start After DOM Content Loaded------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  const initialLang = detectLang();
  renderContent(initialLang);
   
  initHamburger();
  initLangDropdown();
});
