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
   Interactive Interior Configurator & 3D Spec Builder
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
    const waText = `Zdravo MMs-tim! Konfigurisao sam svoj prostor na va?em sajtu:\n- Forma: ${spaceData.name}\n- Stil: ${styleName}\n- Materijali: ${materialName}\n- Oprema/detalj: ${hardwareName}\n\n?eleo bih da se ?ujemo oko izrade besplatnog 3D idejnog projekta i uzimanja mera.`;
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
    'kuhinja-modern': {
      title: 'Minimalistička kuhinja sa ostrvom i Fenix frontovima',
      category: 'Kuhinje po meri',
      img: 'images/portfolio/kitchen-1.jpg',
      desc: 'Elegantna moderna kuhinja u mat antracit i toplom hrast dezenu. Integrisano kuhinjsko ostrvo sa grejnim zonama, skrivenim utičnicama i prostranim fiokama sa Blum Legrabox mehanizmom.',
      specs: [
        'Materijal: Fenix NTM supermat + Egger Halifax hrast',
        'Radna ploča: Kompakt ploča 12mm otporna na vodu i toplotu',
        'Okovi: Blum Legrabox sa usporivačima + Blum Aventos HF',
        'Rasveta: Integrisani aluminijumski LED profil urezan u korpus'
      ]
    },
    'kuhinja-drvo': {
      title: 'Kuhinja čistih linija sa skrivenim gola profilima',
      category: 'Kuhinje po meri',
      img: 'images/portfolio/kitchen-2.jpg',
      desc: 'Bezvremenski dizajn bez klasičnih ručica. Otvaranje pomoću ugradnih crnih eloksiranih gola profila i servo-mehanizama na frižideru i mašini za sudove.',
      specs: [
        'Materijal: Farbani MDF (Medijapan) poliuretan 100% mat',
        'Okovi: Blum sa tihim zatvaranjem, nosivost fioka do 65kg',
        'Sudopera: Podgradna granitna sa integrisanim dozerom',
        'Organizacija: Izvlačni špajz i ugaoni LeMans bubreg'
      ]
    },
    'plakar-walkin': {
      title: 'Walk-in garderober sa parsol staklom i rasvetom',
      category: 'Plakari i garderoberi',
      img: 'images/portfolio/wardrobe-1.jpg',
      desc: 'Luksuzni garderober rađen do plafona, sa transparentnim vratima u crnom aluminijumskom ramu, policama za obuću pod uglom i fiokama sa pregradama za satove i nakit.',
      specs: [
        'Frontovi: Kaljeno zatamnjeno sivo staklo (Parsol) u alu ramu',
        'Unutrašnjost: Egger tekstilni dezen sa toplim izgledom tkanine',
        'Rasveta: Senzorski LED profili koji se pale na otvaranje',
        'Oprema: Garderoberni liftovi i izvlačni nosači pantalona'
      ]
    },
    'plakar-ugradni': {
      title: 'Ugradni plakar od poda do plafona za hodnik',
      category: 'Plakari i garderoberi',
      img: 'images/portfolio/wardrobe-2.jpg',
      desc: 'Maksimalno iskorišćenje prostora u hodniku sa skrivenim cipelarnikom, prostorom za dugačke kapute i gornjim boksom za sezonske kofere.',
      specs: [
        'Materijal: MDF lakiran u boju zida sa skrivenim ručicama',
        'Sistem: Klizni mehanizam sa dvostranim usporivačima',
        'Dimenzije: Širina 320cm x Visina 275cm',
        'Okov: Hettich TopLine bešumni klizni sistem'
      ]
    },
    'dnevna-tv-zid': {
      title: 'TV media zid sa akustičnim letvicama i lebdećom komodom',
      category: 'Dnevne sobe',
      img: 'images/portfolio/living-1.jpg',
      desc: 'Centralna figura modernog dnevnog boravka sa panelom od prirodnih hrastovih letvica, skrivenim prolazima za sve kablove i konzolnom lebdećom komodom sa push mehanizmom.',
      specs: [
        'Zidna obloga: MDF akustične letvice na crnom filcu',
        'Komoda: Farbani mat medijapan sa skrivenim nosačima nosivosti 120kg',
        'Rasveta: Zatamnjiva indirektna LED traka 3000K toplo bela',
        'Kablovi: Kompletno skrivena instalacija za konzolu i TV'
      ]
    },
    'dnevna-vitrina': {
      title: 'Moderna biblioteka sa staklenom vitrinom i policama',
      category: 'Dnevne sobe',
      img: 'images/portfolio/living-2.jpg',
      desc: 'Sofisticiran sistem polica i zatvorenih ormarića za knjige, dekoraciju i kolekciju pića, sa integrisanim LED trakama u svakoj vertikali.',
      specs: [
        'Materijal: Kombinacija crnog univera i prirodnog oraha',
        'Vrata: Bronzano staklo sa ramom u boji šampanjca',
        'Okov: Skrivene šarke sa usporivačem i uglom otvaranja 110°'
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
      desc: 'Reprezentativna recepcija sa kombinacijom belog mermernog dekora i drvenih obloga sa pozadinskim osvetljenjem 3D logotipa kompanije.',
      specs: [
        'Materijal: HPL kompakt i vatro-otporna iverica',
        'Stolovi: Ergonomski radni stolovi sa otvorima za kabliranje',
        'Namena: Poslovne zgrade, IT hubovi, klinike i saloni'
      ]
    },
    'kupatilo-ormaric': {
      title: 'Kupatilski ormarić od vlagootpornog MDF-a sa kamenom pločom',
      category: 'Kupatilski nameštaj',
      img: 'images/portfolio/bathroom-1.jpg',
      desc: 'Viseći kupatilski ormarić specijalno tretiran poliuretanskim lakom otpornim na paru i vlagu, sa keramičkim nadgradnim umivaonikom i ogledalom sa grejačem protiv magljenja.',
      specs: [
        'Materijal: Zeleni hidrofobni MDF otporan na vlagu',
        'Fioke: Blum sa izrezom za sifon i organizatorom',
        'Ploča: Keramička pločica velikog formata (mermer šara)'
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

      const waText = encodeURIComponent(`Zdravo MMs-tim! Video sam vaš rad "${data.title}" (${data.category}) i želeo bih slično rešenje za svoj prostor.`);
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

