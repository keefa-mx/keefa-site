/* -------------------------------------------------
   1.  Переводы
------------------------------------------------- */
const translations = {
  en: {
    menu: {
      products: "Products",
      app: "Keefa App",
      center: "Engineering Center",
      contact: "Contact",
      billing: "Billing"
    },
    sections: {
      intro: "Keefa is <span style='font-weight: 700;'>a next-generation tech brand</span> focused on creating intelligent solutions that transform <span style='font-weight: 700;'>residential, commercial, and public spaces</span> into more <span style='font-weight: 700;'>robust and automated</span> environments.",
      leftColumn: "We design and develop products and systems that enhance the functionality, efficiency, and adaptability of <span style='font-weight: 700;'>private homes, hotels, restaurants, supermarkets,</span> and more.",
      rightColumn: "Our mission is to reshape everyday environments through innovation — blending <span style='font-weight: 700;'>hardware, software, and AI</span> to make spaces responsive to the people who use them."
    },
   cards: [
      {
         title: "Private Homes",
         items: [
            "item 1",
            "item 2",
            "item 3",
         ]
      },
      {
         title: "Hotels",
         items: [
            "item 1",
            "item 2",
         ]
      },
      {
         title: "Restaurants",
         items: [
            "item 1",
            "item 2",
         ]
      },
      {
         title: "Supermarkets",
         items: [
            "item 1",
            "item 2",
         ]
      }
   ],
    features: [
      "REGISTERED BRAND",
      "SOFTWARE ELABORATED IN MEXICO",
      "INTELLIGENT SYSTEMS"
    ]
  },

  es: {
    menu: {
      products: "Productos",
      app: "Keefa App",
      center: "Centro de Ingeniería",
      contact: "Contacto",
      billing: "Facturación"
    },
    sections: {
      intro: "Keefa es <span style='font-weight: 700;'>una marca tecnológica de nueva generación</span> enfocada en crear soluciones inteligentes que transforman <span style='font-weight: 700;'>los espacios residenciales, comerciales y públicos</span> en entornos más <span style='font-weight: 700;'>robustos y automatizados.</span>",
      leftColumn: "Diseñamos y desarrollamos productos y sistemas que mejoran la funcionalidad, eficiencia y adaptabilidad de <span style='font-weight: 700;'>casas privadas, hoteles, restaurantes, supermercados</span> y más.",
      rightColumn: "Nuestra misión es redefinir los entornos cotidianos a través de la innovación — combinando <span style='font-weight: 700;'>hardware, software e inteligencia artificial</span> para hacer que los espacios respondan a las personas que los utilizan. "
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
  const cardsData = t.cards;
   
  const productsPage = '/products';
  const appPage = '/app';
  const centerPage = '/center';
  const contactPage = '/contact';
  const billingPage = '/billing';

  function updateAboutSection(lang) {
    document.getElementById('intro').innerHTML = t.sections.intro;
    document.getElementById('left-column').innerHTML = t.sections.leftColumn;
    document.getElementById('right-column').innerHTML = t.sections.rightColumn;
  }
  updateAboutSection(lang);

  /* ------------------------------Desktop Menu---------------------------- */
  const desktopMenu = document.getElementById('desktopMenu');
  const desktopList = desktopMenu.querySelector('ul');
  if (desktopList) {
    desktopList.innerHTML = `
      <li><a href="${productsPage}">${data.products}</a></li>
      <li><a href="${appPage}">${data.app}</a></li>
      <li><a href="${centerPage}">${data.center}</a></li>
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
      <li><a href="${centerPage}">${data.center}</a></li>
      <li><a href="${contactPage}">${data.contact}</a></li>
      <li><a href="${billingPage}">${data.billing}</a></li>
    `;
  }

/* ------------------------ About Cards --------------------- */
  const aboutCards = document.getElementById('about-cards');
  cardsData.forEach(cardData => {
     const card = document.createElement('div');
     card.classList.add('card');

     const title = document.createElement('h3');
     title.textContent = cardData.title;

     const list = document.createElement('ul');
     cardData.items.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('list-item');

     const emoji = document.createElement('span');
     emoji.classList.add('emoji');
     emoji.textContent = '✔️';

     const text = document.createElement('span');
     text.classList.add('text');
     text.textContent = item;

     li.appendChild(emoji);
     li.appendChild(text);
     li.appendChild(li);
   }); 
     
   card.appendChild(title);
   card.appendChild(list);
   aboutCards.appendChild(card);
  });
  /* ---- блок Features ---- */
  const feat = document.getElementById('features');
  if (feat) {
    feat.innerHTML = t.features
      .map(item => `<div class="feature-item">${item}</div>`)
      .join('');
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
