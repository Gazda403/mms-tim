/**
 * MMs-tim Nameštaj po meri - Interactive Features & Configurator
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCategoryFilters();
  initSteppedAccordion();
  initInteriorConfigurator();
  initProjectModal();
  initConsultationForm();
  initMobileMenu();
  initProjectModal();
  initConsultationForm();
  initMobileMenu();
});

/* ==========================================================================
   Navbar Scroll Effect
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   Interactive Category Filtering
   ========================================================================== */
function initCategoryFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.catalog-item-filterable');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = '';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease';
            card.style.opacity = '1';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   Stepped Accordion (Ref 2 "HOW WE WORK")
   ========================================================================== */
function initSteppedAccordion() {
  const cards = document.querySelectorAll('.stepped-process-card');
  if (!cards.length) return;

  cards.forEach(card => {
    const header = card.querySelector('.process-card-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = card.classList.contains('active');
      
      // Close others
      cards.forEach(c => {
        c.classList.remove('active');
        const body = c.querySelector('.process-card-body');
        if (body) body.style.display = 'none';
      });

      // Toggle current
      if (!isActive) {
        card.classList.add('active');
        const body = card.querySelector('.process-card-body');
        if (body) {
          body.style.display = 'grid';
          body.style.animation = 'fadeIn 0.3s ease';
        }
      }
    });
  });
}

/* ==========================================================================
   Interactive Interior Configurator & Spec Builder
   (Design & Style Focused - No Price Sensitivity)
   ========================================================================== */
function initInteriorConfigurator() {
  const typeBtns = document.querySelectorAll('[data-config-type]');
  const styleBtns = document.querySelectorAll('[data-config-style]');
  const materialBtns = document.querySelectorAll('[data-config-material]');
  const hardwareBtns = document.querySelectorAll('[data-config-hardware]');

  // Summary elements
  const previewImg = document.getElementById('concept-preview-image');
  const previewTitle = document.getElementById('concept-preview-title');
  const summarySpace = document.getElementById('summary-spec-space');
  const summaryStyle = document.getElementById('summary-spec-style');
  const summaryMaterial = document.getElementById('summary-spec-material');
  const summaryHardware = document.getElementById('summary-spec-hardware');
  const waBtn = document.getElementById('config-whatsapp-btn');
  const viberBtn = document.getElementById('config-viber-btn');

  if (!previewImg || !previewTitle) return;

  let currentType = 'kuhinja';
  let currentStyle = 'minimal';
  let currentMaterial = 'fenix-drvo';
  let currentHardware = 'led-skrivena';

  const typeConfig = {
    kuhinja: {
      name: 'Kuhinja sa ostrvom',
      img: 'images/portfolio/kitchen-1.jpg',
      headline: 'Kuhinja sa ostrvom'
    },
    plakar: {
      name: 'Ugradni plakar do plafona',
      img: 'images/portfolio/wardrobe-1.jpg',
      headline: 'Ugradni garderober'
    },
    dnevna: {
      name: 'TV Zid & Akusti?ne letvice',
      img: 'images/portfolio/living-1.jpg',
      headline: 'TV media zid sa lebde?om komodom'
    },
    spavaca: {
      name: 'Master krevet sa boksom',
      img: 'images/portfolio/bedroom-1.jpg',
      headline: 'Tapacirani bra?ni krevet po meri'
    },
    kupatilo: {
      name: 'Kupatilski ormari?',
      img: 'images/portfolio/bathroom-1.jpg',
      headline: 'Vise?i vlagootporni ormari?'
    },
    kancelarija: {
      name: 'Pult & Poslovni name?taj',
      img: 'images/portfolio/office-1.jpg',
      headline: 'Recepcija i poslovni name?taj'
    }
  };

  const styleConfig = {
    minimal: 'Minimalizam & Bez ru?ica',
    skandi: 'Topli Skandinavski (Hrast & Ka?mir)',
    'dark-luxury': 'Tamni Luksuz (Antracit & Staklo)',
    'modern-classic': 'Moderni Klasik (Profilisani frontovi)'
  };

  const materialConfig = {
    'fenix-drvo': 'Fenix Nano & Hrast',
    'mdf-mat': 'Poliuretanski MDF Mat',
    'egger-kasmir': 'Egger Ka?mir & Orah',
    'furnir-prirodni': 'Prirodni Hrastov Furnir',
    'akril-sjaj': 'Akril Visoki Sjaj',
    'kompakt-kamen': 'Kompakt Plo?a 12mm'
  };

  const hardwareConfig = {
    'led-skrivena': 'Skrivena LED rasveta 3000K',
    'blum-legrabox': 'Blum Legrabox usporiva?i',
    'servo-drive': 'Servo-Drive elektri?no otvaranje',
    'parsol-staklo': 'Parsol tonirano staklo u alu ramu'
  };

  function updateConfigurator() {
    const spaceData = typeConfig[currentType] || typeConfig.kuhinja;
    const styleName = styleConfig[currentStyle] || styleConfig.minimal;
    const materialName = materialConfig[currentMaterial] || materialConfig['fenix-drvo'];
    const hardwareName = hardwareConfig[currentHardware] || hardwareConfig['led-skrivena'];

    // Smooth image crossfade
    if (previewImg.getAttribute('src') !== spaceData.img) {
      previewImg.style.opacity = '0.3';
      setTimeout(() => {
        previewImg.src = spaceData.img;
        previewImg.style.opacity = '1';
      }, 150);
    }

    // Dynamic headline
    previewTitle.textContent = `${spaceData.headline} u stilu "${styleName}"`;

    // Update specs breakdown
    if (summarySpace) summarySpace.textContent = spaceData.name;
    if (summaryStyle) summaryStyle.textContent = styleName;
    if (summaryMaterial) summaryMaterial.textContent = materialName;
    if (summaryHardware) summaryHardware.textContent = hardwareName;

    // Pre-formatted WhatsApp & Viber inquiries
    const waText = `Zdravo MMs-tim! Konfigurisao sam svoj prostor na vašem sajtu:\n- Forma: ${spaceData.name}\n- Stil: ${styleName}\n- Materijali: ${materialName}\n- Oprema/detalj: ${hardwareName}\n\nŽeleo bih da se čujemo oko dogovora i besplatnog uzimanja mera za moj prostor.`;
    const encoded = encodeURIComponent(waText);

    const phone = '381641234567';
    if (waBtn) waBtn.href = `https://wa.me/${phone}?text=${encoded}`;
    if (viberBtn) viberBtn.href = `viber://chat?number=%2B${phone}`;
  }

  // Bind clicks
  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentType = btn.getAttribute('data-config-type');
      updateConfigurator();
    });
  });

  styleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      styleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentStyle = btn.getAttribute('data-config-style');
      updateConfigurator();
    });
  });

  materialBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      materialBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMaterial = btn.getAttribute('data-config-material');
      updateConfigurator();
    });
  });

  hardwareBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      hardwareBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentHardware = btn.getAttribute('data-config-hardware');
      updateConfigurator();
    });
  });

  updateConfigurator();
}

/* ==========================================================================
   Project Details Modal
   ========================================================================== */
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-desc');
  const modalSpecs = document.getElementById('modal-specs');
  const modalWaLink = document.getElementById('modal-wa-link');

  if (!modal) return;

  const triggerButtons = document.querySelectorAll('[data-modal-project]');

    const projectData = {
    'kuhinja-open-space': {
      title: 'Kuhinjsko ostrvo i otvoreni koncept za dnevni boravak',
      category: 'Kuhinje i šankovi',
      img: 'images/imagesss/dobrasoba.avif',
      desc: 'Kompletno rešenje za moderan open-space koncept stana. Izrada centralnog šanka/ostrva u dezenu tamnog oraha koji spaja prostor za kuvanje i opuštanje, sa ugradnim ormarićima do plafona i visećim metalnim lusterima.',
      specs: [
        'Šank / Ostrvo: Debelozidna radna ploča i bočne obloge u dezenu oraha',
        'Viseći elementi: Bela mat iverica visokog kvaliteta sa skrivenim otvaranjem',
        'Funkcija: Mesto za brze obroke, rad i druženje sa pogledom na dnevnu sobu',
        'Okov: Blum mehanizmi sa usporivačima za nesmetano tiho zatvaranje'
      ]
    },

    'kuhinja-kasmir': {
      title: 'Ugaona kuhinja u kašmir i hrast dezenu',
      category: 'Kuhinje po meri',
      img: 'images/imagesss/kuhinja.jpg',
      desc: 'Elegantna kuhinja izvedena do plafona sa podelom gornjih elemenata na dva nivoa (kašmir mat i hrast dekor). Integrisana ugradna tehnika, crne urezne profilne ručice i tihi Blum okovi.',
      specs: [
        'Frontovi: Oplemenjeni univer u kašmir mat boji + Egger Hrast',
        'Radna ploča: 38mm vodootporna HPL ploča u dezenu hrasta',
        'Okovi: Blum sa usporivačima (soft-close šarke i fioke)',
        'Oprema: Ugradna rerna na visini, skriveni teleskopski aspirator'
      ]
    },
    'dnevna-letvice': {
      title: 'TV media zid sa akustičnim letvicama i LED rasvetom',
      category: 'Dnevne sobe',
      img: 'images/imagesss/dnevna.avif',
      desc: 'Kompletan zidni sistem sa vertikalnim drvenim letvicama, indirektnom toplom LED rasvetom sa leve i desne strane, lebdećom TV komodom i staklenom vitrinom sa toniranim parsol staklom.',
      specs: [
        'Zidna obloga: Akustične drvene letvice na crnom apsorpcionom filcu',
        'Rasveta: Integrisani aluminijumski LED kanali 3000K toplo bela',
        'Komoda: Konzolna lebdeća komoda sa drvenom gornjom pločom i belim frontovima',
        'Vitrina: Vitrina sa staklenim vratima i unutrašnjom rasvetom'
      ]
    },
    'plakar-predsoblje': {
      title: 'Predsoblje sa cipelarnikom, čivilukom i zidnom oblogom',
      category: 'Plakari i predsoblja',
      img: 'images/imagesss/ormar.webp',
      desc: 'Praktično i upečatljivo rešenje za ulazni hodnik. Zidna obloga sa dekorom beljenog rustičnog drveta, masivne metalne kuke za odlaganje kaputa, gornja otvorena polica i donji cipelarnik na metalnim nogicama.',
      specs: [
        'Materijal: Egger pločasti materijal sa reljefnom rustičnom teksturom',
        'Cipelarnik: Vrata sa usporivačima i metalnim lučnim ručicama',
        'Dimenzije: Prilagođeno tačnoj širini zida hodnika',
        'Okov: Čvrste metalne crne kuke i podesive nožice'
      ]
    },
    'dnevna-rgb': {
      title: 'TV zid sa lebdećim panelom i ambijentalnim svetlom',
      category: 'Dnevne sobe',
      img: 'images/imagesss/dnevna.jpg',
      desc: 'Atraktivan TV zid sa isturenim centralnim panelom za TV, skrivenim prolazom za sve kablove, ambijentalnim pozadinskim osvetljenjem, akustičnim panelom i niskom medijapan komodom.',
      specs: [
        'Centralni panel: Mat bež panel sa pozadinskim LED osvetljenjem',
        'Akustični panel: Vertikalne drvene letvice',
        'Komoda: Dvodelna komoda sa mekim otvaranjem i skrivenom instalacijom',
        'MMS Team oznaka: Autentičan projekat sa terena'
      ]
    },
    'kuhinja-led': {
      title: 'Moderna kuhinja sa ugrađenom LED linijskom rasvetom',
      category: 'Kuhinje po meri',
      img: 'images/imagesss/kuhina3.jpg',
      desc: 'Kompaktna ugaona kuhinja sa visećim elementima u teksturi prirodnog hrasta, belim donjim elementima i urezanim aluminijumskim profilom sa ravnomernim radnim osvetljenjem.',
      specs: [
        'Frontovi: Kombinacija prirodnog hrasta i bele mat',
        'Radna ploča: Hrastova radna ploča sa bež granitnom sudoperom',
        'Rasveta: Urezani ugaoni LED profil sa difuzorom bez tačkica',
        'Okovi: Blum soft-close šarke i fioke'
      ]
    },
    'kupatilo-stub': {
      title: 'Kupatilski vertikalni ormar u petrol plavoj i orahu',
      category: 'Kupatilski nameštaj',
      img: 'images/imagesss/kupatilo2n.jpg',
      desc: 'Ekskluzivni uski i visoki kupatilski stub izrađen od vlagootpornog materijala u petrol plavoj boji u kombinaciji sa toplim orahom. Sadrži otvorene police za brzi pristup i donji zatvoreni deo sa korpom.',
      specs: [
        'Materijal: Vlagootporni lakirani MDF u petrol plavoj nijansi',
        'Unutrašnjost: Dezen oraha sa otpornim melaminskim slojem',
        'Namena: Iskoristivost uskog prostora pored sanitarija',
        'Okov: Blum usporivači i skriveni nosači'
      ]
    },
    'kuhinja-sank': {
      title: 'Kuhinjsko poluostrvo sa reljefnim kanelurama',
      category: 'Kuhinje i šankovi',
      img: 'images/imagesss/kuhinjacesma.jpg',
      desc: 'Elegantni šank koji odvaja kuhinjski deo od trpezarije. Prednji panel izrađen je sa finim vertikalnim kanelurama (rebrasti dezen), sa bočnom otvorenom policom za začine i drvenom masivnom radnom pločom.',
      specs: [
        'Front šanka: Reljefni kanelirani MDF u bež boji',
        'Bočne police: Otvorene police za čaše i dekoraciju u dezenu hrasta',
        'Armatura: Visoka mat crna slavina i podgradna sudopera',
        'Ploča: Otporna radna ploča debljine 38mm'
      ]
    },
    'dnevna-komoda': {
      title: 'Dugačka TV komoda u dezenu kamena i drveta',
      category: 'Dnevne sobe',
      img: 'images/imagesss/boravak.webp',
      desc: 'Niska konzolna komoda za televizore velikih dijagonala. Frontovi sa teksturom kamenog rustika u kombinaciji sa toplom drvenom gornjom policom i otvorenim delom za multimedijalne uređaje.',
      specs: [
        'Frontovi: Univer sa sinhronizovanom strukturom kamena',
        'Polica: Masivna drvena ploča u boji oraha',
        'Okov: Šarke sa mekim zatvaranjem i diskretne mat metalne ručice',
        'Dimenzije: Dužina 280cm za maksimalno odlaganje'
      ]
    },
    'kuhinja-plafon': {
      title: 'U-kuhinja do plafona sa mermernom zidnom oblogom',
      category: 'Kuhinje po meri',
      img: 'images/imagesss/kuhinica.avif',
      desc: 'Kuhinja u obliku slova U projektovana oko prozora. Donji elementi u elegantnoj sivoj boji, gornji u čistoj beloj, sa ugradnom mašinom za sudove i crnom granitnom sudoperom.',
      specs: [
        'Raspored: U-oblik sa radnom zonom ispod prozora',
        'Materijal: Kombinacija antracit-sive i bele mat iverice',
        'Zidna obloga: Mermerne keramičke ploče velikog formata',
        'Oprema: Granitna okrugla sudopera i crna jednoručna baterija'
      ]
    },
    'kupatilo-lavabo': {
      title: 'Viseći ormarić sa ogledalom za kupatilo',
      category: 'Kupatilski nameštaj',
      img: 'images/imagesss/kupatilo.avif',
      desc: 'Kupatilski ormarić sa ogledalom i donjim ormarićem za nadgradni lavabo. Specijalno zaštićen poliuretanskim lakom otpornim na paru i vlagu.',
      specs: [
        'Materijal: Vlagootporni beli poliuretan',
        'Ogledalo: Ormarić sa ogledalnim vratima i unutrašnjim policama',
        'Okov: Šarke sa usporivačem otporne na koroziju'
      ]
    },
    'spavaca-krevet': {
      title: 'Tapacirani bračni krevet sa podiznim mehanizmom',
      category: 'Spavaće sobe',
      img: 'images/portfolio/bedroom-1.jpg',
      desc: 'Custom-made krevet sa velikim skladišnim prostorom ispod dušeka, tapaciranim uzglavljem od mikrofiber vodo-odbojnog štofa i lebdećim noćnim stočićima sa bežičnim punjačem.',
      specs: [
        'Podizanje: Snažni gasni amortizeri 1200N',
        'Stočići: Konzolni sa mekim zatvaranjem fioka',
        'Dimenzije dušeka: 180 x 200 cm, visina uzglavlja 120 cm'
      ]
    },
    'poslovni-recepcija': {
      title: 'Prijemni pult za poslovni prostor i kancelarijski stolovi',
      category: 'Poslovni nameštaj',
      img: 'images/portfolio/office-1.jpg',
      desc: 'Reprezentativna recepcija sa kombinacijom belog mermernog dekora i drvenih obloga sa pozadinskim osvetljenjem logotipa kompanije.',
      specs: [
        'Materijal: HPL kompakt i vatro-otporna iverica',
        'Stolovi: Ergonomski radni stolovi sa otvorima za kabliranje',
        'Namena: Poslovne zgrade, IT hubovi, klinike i saloni'
      ]
    }
  };

  triggerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-modal-project');
      const data = projectData[projId];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalCategory.textContent = data.category;
      modalImg.src = data.img;
      modalImg.alt = data.title;
      modalDesc.textContent = data.desc;

      modalSpecs.innerHTML = '';
      data.specs.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        li.style.fontSize = '0.86rem';
        li.style.color = '#57575E';
        li.style.marginBottom = '0.4rem';
        modalSpecs.appendChild(li);
      });

    const waText = `Zdravo MMs-tim! Konfigurisao sam svoj prostor na vašem sajtu:\n- Forma: ${spaceData.name}\n- Stil: ${styleName}\n- Materijali: ${materialName}\n- Oprema/detalj: ${hardwareName}\n\nŽeleo bih da se čujemo oko dogovora i besplatnog uzimanja mera za moj prostor.`;
      if (modalWaLink) modalWaLink.href = `https://wa.me/381641234567?text=${waText}`;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

/* ==========================================================================
   Consultation & Measurement Booking Form
   ========================================================================== */
function initConsultationForm() {
  const form = document.getElementById('consultation-booking-form');
  const alert = document.getElementById('form-success-alert');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="client_name"]').value;
    const phone = form.querySelector('[name="client_phone"]').value;
    const location = form.querySelector('[name="client_location"]').value;
    const project = form.querySelector('[name="client_project"]').value;
    const notes = form.querySelector('[name="client_notes"]').value;

    if (!name || !phone) {
      alert('Molimo vas da unesete ime i broj telefona.');
      return;
    }

    // Format WhatsApp message with details
    const msg = `Zahtev za merenje i konsultacije:\n- Ime: ${name}\n- Telefon: ${phone}\n- Lokacija: ${location}\n- Tip projekta: ${project}\n- Napomena: ${notes}`;
    const waUrl = `https://wa.me/381641234567?text=${encodeURIComponent(msg)}`;

    if (alert) {
      alert.style.display = 'block';
      alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    form.reset();

    // Optionally open WhatsApp after 1.5 seconds for instant contact
    setTimeout(() => {
      const confirmWa = confirm('Hvala na upitu! Da li želite da nam pošaljete podatke direktno i putem WhatsApp-a za najbrži odgovor?');
      if (confirmWa) {
        window.open(waUrl, '_blank');
      }
    }, 1200);
  });
}

/* ==========================================================================
   Mobile Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.main-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const isVisible = nav.style.display === 'flex';
    if (isVisible) {
      nav.style.display = 'none';
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '84px';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.background = '#FFFFFF';
      nav.style.padding = '2rem 1.5rem';
      nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      nav.style.borderBottom = '1px solid #ECECEC';
    }
  });

  // Close menu when clicking nav items
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        nav.style.display = 'none';
      }
    });
  });
}

