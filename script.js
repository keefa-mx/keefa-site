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
  const productsPage = '/products';
  const appPage = '/app';
  const contactPage = '/contact';
  const billingPage = '/billing';
  };

  /* ---- десктоп‑меню ---- */
  const desktopMenu = document.getElementById('desktopMenu');
  if (desktopMenu) {
    desktopMenu.innerHTML = `
      <li><a href="${productsPage}">${data.products}</a></li>
      <li><a href="${appPage}">${data.app}</a></li>
      <li><a href="${contactPage}">${data.contact}</a></li>
      <li><a href="${billingPage}">${data.billing}</a></li>
    `;
  }

  /* ---- мобильное меню ---- */
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.innerHTML = `
      <a href="${productsPage}">${data.products}</a>
      <a href="${appPage}">${data.app}</a>
      <a href="${contactPage}">${data.contact}</a>
      <a href="${billingPage}">${data.billing}</a>
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

  /* ---- атрибут lang и сохранение ---- */
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);

  /* ---- переинициализация зависимостей ---- */
  initHamburger();
  initLangButtonsInsideMobile();
}

/* -------------------------------------------------
   4.  Смена языка вручную
------------------------------------------------- */
function setLang(lang) {
  renderContent(lang);
}

/* -------------------------------------------------
   5.  Бургер‑меню
------------------------------------------------- */
function initHamburger() {
  const burger = document.querySelector('.hamburger');
  const mob    = document.getElementById('mobileMenu');
  if (!burger || !mob) return;

  burger.onclick = () => {
    mob.classList.toggle('open');
    burger.classList.toggle('open');
    document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
  };
}

/* -------------------------------------------------
   6.  Dropdown с планетой 🌐
------------------------------------------------- */
function initLangDropdown() {
  const toggle = document.getElementById('lang-toggle');
  const menu   = document.getElementById('lang-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => menu.classList.toggle('show'));

  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('show');
    }
  });

  menu.querySelectorAll('.lang-btn').forEach(btn => {
    btn.onclick = () => {
      setLang(btn.dataset.lang);
      menu.classList.remove('show');
    };
  });
}

/* -------------------------------------------------
   7.  Кнопки языков внутри мобильного меню
------------------------------------------------- */
function initLangButtonsInsideMobile() {
  const mob = document.getElementById('mobileMenu');
  if (!mob) return;

  mob.querySelectorAll('.lang-btn').forEach(btn => {
    btn.onclick = () => {
      setLang(btn.dataset.lang);
      document.querySelector('.hamburger')?.click();  // Закроет меню
    };
  });
}

/* -------------------------------------------------
   8.  Запуск после загрузки страницы
------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const initialLang = detectLang();
  setLang(initialLang);
  initLangDropdown();  // планета‑dropdown
});
