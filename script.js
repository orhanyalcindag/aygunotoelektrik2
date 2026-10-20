/**
 * AYGÜN OTO ELEKTRONİK 2 - INTERACTIVE JAVASCRIPT
 * Fatih Usta - 0530 075 52 82
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. CANLI ÇALIŞMA SAATİ KONTROLÜ (08:30 - 19:30)
     ========================================================================== */
  function updateShopStatus() {
    const statusElement = document.getElementById('liveShopStatus');
    const liveDot = document.querySelector('.top-status .live-dot');
    if (!statusElement) return;

    const now = new Date();
    const day = now.getDay(); // 0: Pazar, 1: Pzt, ..., 6: Cmt
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours + minutes / 60;

    const openTime = 8.5;  // 08:30
    const closeTime = 19.5; // 19:30

    const isWorkingDay = day >= 1 && day <= 6; // Pzt - Cmt
    const isOpen = isWorkingDay && currentTime >= openTime && currentTime < closeTime;

    if (isOpen) {
      statusElement.textContent = 'Atölyemiz Şu An Açık · Kapanış Saati: 19:30';
      statusElement.style.color = '#10b981';
      if (liveDot) {
        liveDot.style.backgroundColor = '#10b981';
        liveDot.style.boxShadow = '0 0 10px #10b981';
      }
    } else {
      let nextOpen = 'Pazartesi 08:30';
      if (day >= 1 && day <= 5 && currentTime >= closeTime) {
        nextOpen = 'Yarın 08:30';
      } else if (day >= 1 && day <= 6 && currentTime < openTime) {
        nextOpen = 'Bugün 08:30';
      }
      statusElement.textContent = `Atölyemiz Kapalı · Açılış: ${nextOpen}`;
      statusElement.style.color = '#f59e0b';
      if (liveDot) {
        liveDot.style.backgroundColor = '#f59e0b';
        liveDot.style.boxShadow = '0 0 10px #f59e0b';
      }
    }
  }
  updateShopStatus();
  setInterval(updateShopStatus, 60000); // Her dakika kontrol et

  /* ==========================================================================
     2. STICKY HEADER & SCROLL SHADOW
     ========================================================================== */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ==========================================================================
     3. MOBİL MENÜ YÖNETİMİ
     ========================================================================== */
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.m-link');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileBtn.classList.toggle('open');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileBtn.classList.remove('open');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ==========================================================================
     4. AKTİF NAVİGASYON BAĞLANTISI (SCROLLSPY)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     5. SSS (FAQ) AKORDİYON
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Diğerlerini kapat
      faqItems.forEach(otherItem => otherItem.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     6. GALERİ LIGHTBOX MODAL
     ========================================================================== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.querySelector('.lightbox-backdrop');

  if (lightboxModal) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.getAttribute('data-title') || img.alt;
        if (img) {
          lightboxImg.src = img.src;
          lightboxCaption.textContent = title;
          lightboxModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  /* ==========================================================================
     7. HIZLI ARIZA DANIŞMA FORMU (WHATSAPP ENTEGRASYONU)
     ========================================================================== */
  const inquiryForm = document.getElementById('quickInquiryForm');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const carModel = document.getElementById('carModel').value.trim();
      const carIssue = document.getElementById('carIssue').value.trim();

      if (!carModel || !carIssue) {
        alert('Lütfen araç modelinizi ve arıza detayını yazınız.');
        return;
      }

      const message = `Merhaba Fatih Usta,\n\nWeb siteniz üzerinden yazıyorum:\n🚗 Araç: ${carModel}\n⚠️ Şikayet / Arıza: ${carIssue}\n\nFiyat ve tamir süreci hakkında bilgi alabilir miyim?`;
      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/905300755282?text=${encodedMsg}`;

      window.open(whatsappUrl, '_blank');
    });
  }

  /* ==========================================================================
     8. INTERAKTİF ÖNCESİ & SONRASI (BEFORE / AFTER) SLIDER
     ========================================================================== */
  const baContainer = document.getElementById('baContainer');
  const baBeforeLayer = document.getElementById('baBeforeLayer');
  const baDivider = document.getElementById('baDivider');

  if (baContainer && baBeforeLayer && baDivider) {
    let isDragging = false;

    const setSliderPosition = (clientX) => {
      const rect = baContainer.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      let percentage = (offsetX / rect.width) * 100;

      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;

      baContainer.style.setProperty('--ba-pos', `${percentage}%`);
      baDivider.style.left = `${percentage}%`;
    };

    const onStart = (e) => {
      isDragging = true;
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      setSliderPosition(clientX);
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      setSliderPosition(clientX);
    };

    const onEnd = () => {
      isDragging = false;
    };

    baContainer.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    baContainer.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);
  }

  /* ==========================================================================
     9. AKILLI ARIZA TEŞHİS ASİSTANI
     ========================================================================== */
  const diagTabs = document.querySelectorAll('.diag-tab-btn');
  const diagTabContents = document.querySelectorAll('.diag-tab-content');
  const diagCards = document.querySelectorAll('.diag-card');

  const resultTitle = document.getElementById('resultTitle');
  const resultSeverity = document.getElementById('resultSeverity');
  const resultCauses = document.getElementById('resultCauses');
  const resultSolution = document.getElementById('resultSolution');
  const resultWaBtn = document.getElementById('resultWaBtn');

  const diagnosticData = {
    'check-engine': {
      title: 'Motor Arıza Lambası (Check Engine)',
      severity: 'Orta - Yüksek Öncelik',
      severityClass: 'medium',
      causes: 'Motor beyni (ECU) sensör okuma hatası, ateşleme bobini/buji arızası, oksijen sensörü (Lambda), gaz kelebeği kirliliği veya yakıt basınç regülatörü sapması.',
      solution: 'Atölyemizde lisanslı arıza tespit cihazıyla canlı sensör değerleri okunur, arıza hafızası temizlenir veya beyin donanımsal arızası varsa mikro tamir yapılır.',
      waQuery: 'Motor Arıza Lambası yanıyor'
    },
    'epc-light': {
      title: 'EPC / Elektronik Güç Kontrolü',
      severity: 'Yüksek Öncelik (Acil)',
      severityClass: 'high',
      causes: 'Elektronik gaz pedalı potansiyometresi, gaz kelebeği konum sensörü, fren müşürü veya motor beyni çıkış hattı arızası.',
      solution: 'Gaz kelebeği adaptasyonu yapılır, sinyal hatları osiloskop ile ölçülür ve gaz kontrol sürücü entegresi onarılır.',
      waQuery: 'EPC ışığı yanıyor ve araç gaz yemiyor'
    },
    'battery-light': {
      title: 'Akü / Şarj Sistemi İkazı',
      severity: 'Yüksek Öncelik (Acil)',
      severityClass: 'high',
      causes: 'Alternatör kömür/diyot tablası arızası, şarj dinamosu regülatörü, V kayışı kopması veya akü ömrünün bitmesi.',
      solution: 'Şarj dinamosu sökülüp konjektör ve kömür revizyonu yapılır; şarj voltajı 13.8V - 14.4V aralığına getirilir.',
      waQuery: 'Kırmızı akü şarj lambası yanıyor'
    },
    'abs-esp': {
      title: 'ABS / ESP Fren Sistemi Lambası',
      severity: 'Yüksek Öncelik',
      severityClass: 'high',
      causes: 'ABS hidrolik beyni pompa motoru arızası, tekerlek porya ABS sensörü kopukluğu veya fren basınç sensörü hatası.',
      solution: 'ABS elektronik beyni tezgahta test edilerek soğuk lehimler ve pompa sürücü transistörleri garantili olarak yenilenir.',
      waQuery: 'ABS ve ESP lambası yanıyor'
    },
    'glow-plug': {
      title: 'Kızdırma / Isıtma Bujisi İkazı',
      severity: 'Orta Öncelik',
      severityClass: 'medium',
      causes: 'Dizel ısıtma bujisi patlaması, kızdırma rölesi arızası veya dizel yakıt basınç hatası.',
      solution: 'Ohmmetre ile ısıtma bujileri tek tek test edilir; röle ve beyin çıkış sinyalleri kontrol edilerek arızalı parça yenilenir.',
      waQuery: 'Dizel kızdırma bujisi lambası yanıp sönüyor'
    },
    'airbag-light': {
      title: 'Airbag / Hava Yastığı Lambası',
      severity: 'Güvenlik Önceliği',
      severityClass: 'high',
      causes: 'Direksiyon zemberek sargısı kopması, koltuk altı soket temassızlığı veya kaza sonrası beyne yazılan kilitlenme (Crash Data).',
      solution: 'Airbag beyni sıfırlanır (Crash Data Reset), zemberek ve soket hatları ölçülüp orijinal direnç değerlerine kavuşturulur.',
      waQuery: 'Airbag hava yastığı lambası yanıyor'
    },
    'crank-no-start': {
      title: 'Marş Basıyor Fakat Araç Çalışmıyor',
      severity: 'Acil Durum',
      severityClass: 'high',
      causes: 'Krank devir sensörü (CKP) sinyal yokluğu, immobilizer anahtar okumama (İmmo kilitli), motor beyni ana röle kesintisi veya yakıt pompası elektriği.',
      solution: 'Tezgahta krank sinyal testi, immobox eşleme veya ECU ana besleme hattı onarımı yapılır.',
      waQuery: 'Marş basıyor ama araç kesinlikle çalışmıyor'
    },
    'limp-mode': {
      title: 'Araç Koruma Modunda (3000 Devri Geçmiyor)',
      severity: 'Orta - Yüksek Öncelik',
      severityClass: 'medium',
      causes: 'Turbo basınç sensörü (MAP/MAF), partikül filtresi (DPF) doluluğu, EGR valfi sıkışması veya enjektör geri dönüş kaçağı.',
      solution: 'Canlı veride turbo ve yakıt rayı basıncı test edilir; yazılımsal veya mekanik arıza giderilerek araç tam gücüne döndürülür.',
      waQuery: 'Araç koruma modunda çekişten düştü'
    },
    'ac-warm': {
      title: 'Klima Üflüyor Fakat Soğutmuyor',
      severity: 'Konfor Arızası',
      severityClass: 'medium',
      causes: 'Klima gazı eksilmesi/kaçağı, klima kompresör kavrama bobini yanması veya klima basınç sensörü (Trinary) arızası.',
      solution: 'Dijital Robinair istasyonumuzla vakum ve kaçak testi yapılır, gramajında R134a/R1234yf gaz ve kompresör yağı basılır.',
      waQuery: 'Klima soğutmuyor gaz dolumu ve elektrik kontrolü için'
    },
    'parasitic-drain': {
      title: 'Akü Kaçağı (1-2 Günde Akü Boşalıyor)',
      severity: 'Elektriksel Arıza',
      severityClass: 'medium',
      causes: 'Teyp/multimedya uyku moduna geçmeme, BCM konfor beyni röle yapışması veya sonradan takılan alarm/LED tesisat kaçağı.',
      solution: 'Ampermetre ile uyku modunda miliamper (mA) kaçak testi yapılarak kaçağa neden olan sigorta ve modül tespit edilip onarılır.',
      waQuery: 'Araçta akü kaçağı var sabahları bitiyor'
    },
    'electrical-ghosts': {
      title: 'Farlar, Sinyaller veya Silecekler Düzensiz',
      severity: 'Gövde Elektroniği',
      severityClass: 'medium',
      causes: 'Gövde kontrol modülü (BCM/SAM), direksiyon altı kumanda kolu veya şasi kablosu oksitlenmesi.',
      solution: 'BCM beyni sökülüp kart üzerindeki mosfetler test edilir, şasi kabloları temizlenir ve modül yeniden kodlanır.',
      waQuery: 'Elektrik tesisatında ve konfor beyninde düzensizlik var'
    },
    'dpf-clogged': {
      title: 'DPF / AdBlue Hatası & Çalıştırma Sayacı',
      severity: 'Yüksek Öncelik',
      severityClass: 'high',
      causes: 'Dizel partikül filtresi aşırı kurum dolumu, AdBlue ısıtıcı/pompa arızası veya NOx sensörü haberleşme hatası.',
      solution: 'Masaüstü cihazla güvenli yazılım güncellemesi, DPF/EGR/AdBlue yazılımsal optimizasyonu veya adaptasyon uygulanır.',
      waQuery: 'DPF ve AdBlue arızası için yazılımsal çözüm'
    }
  };

  // Tab switching
  diagTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      diagTabs.forEach(b => b.classList.remove('active'));
      diagTabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(`tab-${tabId}`);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // Card selection
  diagCards.forEach(card => {
    card.addEventListener('click', () => {
      diagCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const issueKey = card.getAttribute('data-issue');
      const info = diagnosticData[issueKey];

      if (info && resultTitle && resultCauses && resultSolution && resultWaBtn) {
        resultTitle.textContent = info.title;
        resultSeverity.textContent = info.severity;
        resultSeverity.className = `severity-pill ${info.severityClass}`;
        resultCauses.textContent = info.causes;
        resultSolution.textContent = info.solution;

        const waText = encodeURIComponent(`Merhaba Fatih Usta, web sitenizdeki Arıza Asistanı üzerinden yazıyorum: Aracımda "${info.waQuery}" problemi var. Ne zaman getirebilirim?`);
        resultWaBtn.href = `https://wa.me/905300755282?text=${waText}`;
      }
    });
  });

  /* ==========================================================================
     10. KARGO ADRESİ KOPYALAMA
     ========================================================================== */
  const copyBtn = document.getElementById('copyAddressBtn');
  const copyBtnText = document.getElementById('copyBtnText');
  if (copyBtn && copyBtnText) {
    copyBtn.addEventListener('click', () => {
      const address = "Alıcı: Aygün Oto Elektronik 2 (Fatih Usta)\nTel: 0530 075 52 82\nAdres: Kocasinan Mahallesi, Lüleburgaz Köprübaşı Eski Sanayi Sitesi, Sanayi 20. Sokak No: 4/1, 39750 Lüleburgaz / Kırklareli";
      navigator.clipboard.writeText(address).then(() => {
        const originalText = copyBtnText.textContent;
        copyBtnText.textContent = 'Adres Kopyalandı! ✓';
        copyBtn.style.backgroundColor = '#10b981';
        setTimeout(() => {
          copyBtnText.textContent = originalText;
          copyBtn.style.backgroundColor = '';
        }, 2500);
      }).catch(() => {
        alert('Kargo Adresi:\n' + address);
      });
    });
  }

  /* ==========================================================================
     11. HIZLI RANDEVU & FİYAT SİHİRBAZI
     ========================================================================== */
  let selectedBrand = 'Volkswagen / VAG';
  let selectedService = 'ECU Motor Beyin Tamiri';
  let selectedTime = 'Bugün / Acil';

  const updateWizardSummary = () => {
    const summaryEl = document.getElementById('wizardSummaryText');
    if (summaryEl) {
      summaryEl.textContent = `${selectedBrand} · ${selectedService} · ${selectedTime}`;
    }
  };

  const setupButtonGroup = (containerId, callback) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const buttons = container.querySelectorAll('.wizard-opt-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        callback(btn.getAttribute('data-value'));
        updateWizardSummary();
      });
    });
  };

  setupButtonGroup('brandOptions', (val) => { selectedBrand = val; });
  setupButtonGroup('serviceOptions', (val) => { selectedService = val; });
  setupButtonGroup('timeOptions', (val) => { selectedTime = val; });

  const wizardSubmitBtn = document.getElementById('wizardSubmitBtn');
  if (wizardSubmitBtn) {
    wizardSubmitBtn.addEventListener('click', () => {
      const msg = `Merhaba Fatih Usta,\n\nWeb siteniz üzerinden Online Randevu Talebi oluşturmak istiyorum:\n🚗 Araç: ${selectedBrand}\n🔧 Talep Edilen İşlem: ${selectedService}\n⏰ Tercih Edilen Zaman: ${selectedTime}\n\nMüsaitlik durumunuz ve fiyat hakkında bilgi alabilir miyim?`;
      const encoded = encodeURIComponent(msg);
      window.open(`https://wa.me/905300755282?text=${encoded}`, '_blank');
    });
  }

  /* ==========================================================================
     12. PWA SERVICE WORKER REGISTRATION
     ========================================================================== */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('SW registration error:', err);
      });
    });
  }

});

