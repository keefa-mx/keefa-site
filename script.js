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
      intro: "Keefa is <span class='highlight'>a next-generation tech brand</span> focused on creating intelligent solutions that transform <span class='highlight'>residential, commercial, and public spaces</span> into more <span class='highlight'>robust and automated</span> environments.",
      leftColumn: "We design and develop products and systems that enhance the functionality, efficiency, and adaptability of <span class='highlight'>private homes, hotels, restaurants, supermarkets,</span> and more.",
      rightColumn: "Our mission is to reshape everyday environments through innovation — blending <span class='highlight'>hardware, software, and AI</span> to make spaces responsive to the people who use them."
    },
   cards: [
      {
         title: "Private Homes",
         items: [
            "stay aware of who frequents your private property",
            "distinguish between strangers and people you know",
            "register family members and friends",
            "get to know if a stranger is on your property even if they hide behind objects",
            "receive app alerts if a stranger remains on your property for too long",
            "receive app alerts if a stranger visits your property multiple times",
            "get to know if a stranger is on your property even if they are out of reach of your cameras",
            "receive app notifications if a family member or a friend is close to your home",
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
            "automate the process of gathering data about your staff's clock in and clock out hours",
            "get to know your regular clients",
            "gather the daily, monthly and yearly statistics on the number of clients who visit your establishment",
            "get to know which things on your menu are the most popular",
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
      "Trademark",
      "Software made in Mexico",
      "AI-powered"
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
      intro: "Keefa es <span class='highlight'>una marca tecnológica de nueva generación</span> enfocada en crear soluciones inteligentes que transforman <span class='highlight'>los espacios residenciales, comerciales y públicos</span> en entornos más <span class='highlight'>robustos y automatizados.</span>",
      leftColumn: "Diseñamos y desarrollamos productos y sistemas que mejoran la funcionalidad, eficiencia y adaptabilidad de <span class='highlight'>casas privadas, hoteles, restaurantes, supermercados</span> y más.",
      rightColumn: "Nuestra misión es redefinir los entornos cotidianos a través de la innovación — combinando <span class='highlight'>hardware, software e inteligencia artificial</span> para hacer que los espacios respondan a las personas que los utilizan. "
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
  if (aboutCards) {
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
     list.appendChild(li);
   }); 
     
   card.appendChild(title);
   card.appendChild(list);
   aboutCards.appendChild(card);
  });
}
  /* ---------------------------- Features -------------------------- */
  const features = document.getElementById('features');
  if (features) {
    features.innerHTML = t.features
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

/* ---------------------Language Button Desktop --------------------- */
document.querySelectorAll('.lang-btn-desktop').forEach(btn => {
  btn.addEventListener('click', () => {
    const selectedLang = btn.dataset.lang.toLowerCase();
    console.log('Selected language:', selectedLang);
    setLang(selectedLang);
  });
});

/* ---------------------Language Button Mobile --------------------- */
document.querySelectorAll('.lang-btn-mobile').forEach(btn => {
  btn.addEventListener('click', () => {
    const selectedLang = btn.dataset.lang.toLowerCase();
    console.log('Selected language:', selectedLang);
    setLang(selectedLang);
  });
});

/* -------------------------Start After DOM Content Loaded------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  const initialLang = detectLang();
  renderContent(initialLang);
   
  initHamburger();
  initLangDropdown();
});
