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
     13. GLOBAL TOAST NOTIFICATION SYSTEM
     ========================================================================== */
  const appToast = document.getElementById('appToast');
  const toastText = document.getElementById('toastText');
  let toastTimer = null;

  function showToast(message, duration = 3200) {
    if (!appToast || !toastText) return;
    toastText.textContent = message;
    appToast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      appToast.classList.remove('show');
    }, duration);
  }

  /* ==========================================================================
     14. "FATİH USTA'YI REHBERE KAYDET" (vCard / .vcf İNDİRME)
     ========================================================================== */
  function downloadVCard() {
    const vcardLines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Usta;Fatih;;;',
      'FN:Fatih Usta - Aygün Oto Elektronik 2',
      'ORG:Aygün Oto Elektronik 2',
      'TITLE:Oto Elektronik & Beyin Tamiri Uzmanı',
      'TEL;TYPE=CELL,VOICE;VALUE=uri:tel:+905300755282:+905300755282',
      'EMAIL;TYPE=WORK:info@aygunotoelektronik2.com',
      'ADR;TYPE=WORK,POSTAL,PARCEL:;;Sanayi 20. Sk. No: 4/1 Kocasinan Mah. Lüleburgaz Köprübaşı Eski Sanayi Sitesi;Lüleburgaz;Kırklareli;39750;Türkiye',
      'URL:https://aygunotoelektronik2.vercel.app/',
      'NOTE:Aygün Oto Elektronik 2 - Lüleburgaz Araç Motor Beyin (ECU) Tamiri, ABS, Airbag, Gösterge, İmmobilizer & Arıza Tespiti. Fatih Usta: 0530 075 52 82',
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vcardLines], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.setAttribute('download', 'Fatih_Usta_Aygun_Oto_Elektronik_2.vcf');
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    URL.revokeObjectURL(url);

    showToast('Fatih Usta rehber kartı (.vcf) indirildi! Telefonunuza kaydedebilirsiniz.');
  }

  const vcardButtons = document.querySelectorAll('.vcard-download-btn');
  vcardButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      downloadVCard();
    });
  });

  /* ==========================================================================
     15. AKILLI NAVİGASYON SEÇİCİ MODAL (#navModal)
     ========================================================================== */
  const navModal = document.getElementById('navModal');
  const navModalClose = document.getElementById('navModalClose');
  const navModalBackdrop = document.getElementById('navModalBackdrop');
  const navModalCopyBtn = document.getElementById('navModalCopyBtn');
  const navModalCopyText = document.getElementById('navModalCopyText');
  const openNavButtons = document.querySelectorAll('.open-nav-modal-btn');
  const yandexNavAppBtn = document.getElementById('yandexNavAppBtn');

  function openNavModal(e) {
    if (e) e.preventDefault();
    if (!navModal) return;
    navModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeNavModal() {
    if (!navModal) return;
    navModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openNavButtons.forEach(btn => {
    btn.addEventListener('click', openNavModal);
  });

  if (navModalClose) navModalClose.addEventListener('click', closeNavModal);
  if (navModalBackdrop) navModalBackdrop.addEventListener('click', closeNavModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navModal && navModal.classList.contains('active')) {
      closeNavModal();
    }
  });

  // Yandex App fallback to web
  if (yandexNavAppBtn) {
    yandexNavAppBtn.addEventListener('click', () => {
      const fallbackUrl = yandexNavAppBtn.getAttribute('data-fallback');
      const start = Date.now();
      setTimeout(() => {
        if (Date.now() - start < 2000) {
          window.open(fallbackUrl, '_blank');
        }
      }, 1200);
    });
  }

  // Address copy inside Nav modal
  if (navModalCopyBtn && navModalCopyText) {
    navModalCopyBtn.addEventListener('click', () => {
      const address = "Kocasinan Mahallesi, Lüleburgaz Köprübaşı Eski Sanayi Sitesi, Sanayi 20. Sokak No: 4/1, 39750 Lüleburgaz / Kırklareli";
      navigator.clipboard.writeText(address).then(() => {
        navModalCopyText.textContent = 'Kopyalandı! ✓';
        navModalCopyBtn.style.backgroundColor = '#10b981';
        navModalCopyBtn.style.borderColor = '#10b981';
        showToast('Adres panoya kopyalandı! Haritada aratabilirsiniz.');
        setTimeout(() => {
          navModalCopyText.textContent = 'Adresi Kopyala';
          navModalCopyBtn.style.backgroundColor = '';
          navModalCopyBtn.style.borderColor = '';
        }, 2500);
      }).catch(() => {
        showToast('Adres: ' + address);
      });
    });
  }


  /* ==========================================================================
     17. OBD-II ARIZA KODU (DTC) CANLI ARAMA MOTORU (#dtc-lookup)
     ========================================================================== */
  const dtcSearchInput = document.getElementById('dtcSearchInput');
  const dtcSearchClear = document.getElementById('dtcSearchClear');
  const dtcChips = document.querySelectorAll('.dtc-chip');
  const dtcCards = document.querySelectorAll('.dtc-card');
  const dtcNotFound = document.getElementById('dtcNotFound');
  const dtcCustomWaBtn = document.getElementById('dtcCustomWaBtn');

  function filterDtc(query) {
    const q = query.trim().toUpperCase();
    let visibleCount = 0;

    if (dtcSearchClear) {
      dtcSearchClear.style.display = q.length > 0 ? 'block' : 'none';
    }

    dtcCards.forEach(card => {
      const code = (card.getAttribute('data-code') || '').toUpperCase();
      const text = card.textContent.toUpperCase();

      const matches = !q || q === 'ALL' || code.includes(q) || text.includes(q);

      if (matches) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (dtcNotFound) {
      if (visibleCount === 0) {
        dtcNotFound.style.display = 'block';
        if (dtcCustomWaBtn) {
          const customMsg = `Merhaba Fatih Usta, aracımda '${query}' arıza kodu / problemi çıktı. Cihaz tespiti ve tamir hakkında bilgi alabilir miyim?`;
          dtcCustomWaBtn.href = `https://wa.me/905300755282?text=${encodeURIComponent(customMsg)}`;
        }
      } else {
        dtcNotFound.style.display = 'none';
      }
    }
  }

  if (dtcSearchInput) {
    dtcSearchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      dtcChips.forEach(chip => {
        const filterVal = chip.getAttribute('data-filter');
        if (filterVal !== 'all' && val.toUpperCase().includes(filterVal.toUpperCase())) {
          chip.classList.add('active');
        } else if (filterVal === 'all' && val.trim() === '') {
          chip.classList.add('active');
        } else {
          chip.classList.remove('active');
        }
      });
      filterDtc(val);
    });
  }

  if (dtcSearchClear && dtcSearchInput) {
    dtcSearchClear.addEventListener('click', () => {
      dtcSearchInput.value = '';
      dtcChips.forEach(c => c.classList.remove('active'));
      const allChip = document.querySelector('.dtc-chip[data-filter="all"]');
      if (allChip) allChip.classList.add('active');
      filterDtc('');
      dtcSearchInput.focus();
    });
  }

  dtcChips.forEach(chip => {
    chip.addEventListener('click', () => {
      dtcChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterVal = chip.getAttribute('data-filter');
      const searchVal = filterVal === 'all' ? '' : filterVal;
      if (dtcSearchInput) {
        dtcSearchInput.value = searchVal;
      }
      filterDtc(searchVal);
    });
  });

  /* ==========================================================================
     18. ACİL YOL YARDIMI & CANLI GPS MODAL (#emergencyModal)
     ========================================================================== */
  let selectedEmergencyIssue = 'Akü Bitti / Marş Basmıyor';
  const emergencyModal = document.getElementById('emergencyModal');
  const emergencyModalClose = document.getElementById('emergencyModalClose');
  const emergencyModalBackdrop = document.getElementById('emergencyModalBackdrop');
  const openEmergencyBtns = document.querySelectorAll('.open-emergency-modal-btn');
  const emergencyPills = document.querySelectorAll('.emergency-pill');
  const emergencyGetGpsBtn = document.getElementById('emergencyGetGpsBtn');
  const emergencyGetGpsBtnText = document.getElementById('emergencyGetGpsBtnText');
  const emergencyGpsStatusText = document.getElementById('emergencyGpsStatusText');
  const emergencyCoordsDisplay = document.getElementById('emergencyCoordsDisplay');
  const emergencyCoordsText = document.getElementById('emergencyCoordsText');
  const emergencyManualLoc = document.getElementById('emergencyManualLoc');
  const emergencyManualSendBtn = document.getElementById('emergencyManualSendBtn');

  function openEmergencyModal(e) {
    if (e) e.preventDefault();
    if (!emergencyModal) return;
    emergencyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeEmergencyModal() {
    if (!emergencyModal) return;
    emergencyModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openEmergencyBtns.forEach(btn => {
    btn.addEventListener('click', openEmergencyModal);
  });

  if (emergencyModalClose) emergencyModalClose.addEventListener('click', closeEmergencyModal);
  if (emergencyModalBackdrop) emergencyModalBackdrop.addEventListener('click', closeEmergencyModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && emergencyModal && emergencyModal.classList.contains('active')) {
      closeEmergencyModal();
    }
  });

  emergencyPills.forEach(pill => {
    pill.addEventListener('click', () => {
      emergencyPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedEmergencyIssue = pill.getAttribute('data-issue') || pill.textContent.trim();
    });
  });

  // GPS Geolocation retrieval & WhatsApp Dispatch
  if (emergencyGetGpsBtn) {
    emergencyGetGpsBtn.addEventListener('click', () => {
      if (!navigator.geolocation) {
        showToast('Tarayıcınız GPS konum servisini desteklemiyor. Lütfen konumu yazarak gönderin.');
        return;
      }

      emergencyGetGpsBtnText.textContent = 'Canlı Uydu Konumu Alınıyor...';
      emergencyGetGpsBtn.disabled = true;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lon = position.coords.longitude.toFixed(6);
          const mapsLink = `https://maps.google.com/?q=${lat},${lon}`;

          emergencyGetGpsBtnText.textContent = 'Konum Alındı! WhatsApp Açılıyor...';
          if (emergencyGpsStatusText) {
            emergencyGpsStatusText.textContent = `GPS Koordinatları Doğrulandı (Hassasiyet: ±${Math.round(position.coords.accuracy)}m)`;
          }
          if (emergencyCoordsDisplay && emergencyCoordsText) {
            emergencyCoordsDisplay.style.display = 'block';
            emergencyCoordsText.textContent = `${lat}, ${lon}`;
          }

          const message = `🚨 *ACİL YOL YARDIMI - AYGÜN OTO ELEKTRONİK 2*\n\nMerhaba Fatih Usta, aracım arıza yaptı ve yolda kaldım!\n\n⚠️ *Arıza Durumu:* ${selectedEmergencyIssue}\n📍 *Canlı GPS Konumum:* ${mapsLink}\n\nAcil teknik destek veya çekici yönlendirmesi rica ediyorum.`;
          const encoded = encodeURIComponent(message);
          const waUrl = `https://wa.me/905300755282?text=${encoded}`;

          setTimeout(() => {
            window.open(waUrl, '_blank');
            emergencyGetGpsBtnText.textContent = 'Canlı GPS Konumumu Al ve Fatih Usta\'ya Gönder (WhatsApp)';
            emergencyGetGpsBtn.disabled = false;
          }, 600);
        },
        (err) => {
          emergencyGetGpsBtnText.textContent = 'Canlı GPS Konumumu Al ve Fatih Usta\'ya Gönder (WhatsApp)';
          emergencyGetGpsBtn.disabled = false;
          let errMsg = 'Konum alınamadı. Lütfen tarayıcı konum iznini kontrol edin veya konumu yazın.';
          if (err.code === 1) errMsg = 'Konum izni reddedildi. Lütfen nerede olduğunuzu yazarak iletin.';
          showToast(errMsg, 4500);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  }

  // Manual location sender
  if (emergencyManualSendBtn && emergencyManualLoc) {
    emergencyManualSendBtn.addEventListener('click', () => {
      const locText = emergencyManualLoc.value.trim();
      if (!locText) {
        showToast('Lütfen nerede olduğunuzu kısaca yazınız.');
        emergencyManualLoc.focus();
        return;
      }
      const message = `🚨 *ACİL YOL YARDIMI - AYGÜN OTO ELEKTRONİK 2*\n\nMerhaba Fatih Usta, aracım arıza yaptı ve yolda kaldım!\n\n⚠️ *Arıza Durumu:* ${selectedEmergencyIssue}\n📍 *Bulunduğum Konum / Adres:* ${locText}\n\nAcil destek veya çekici yönlendirmesi rica ediyorum.`;
      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/905300755282?text=${encoded}`, '_blank');
    });
  }

  /* ==========================================================================
     20. OTO HESAPLAYICI (KLİMA GAZI & AKÜ ŞARJ ANALİZİ)
     ========================================================================== */
  const calcTabs = document.querySelectorAll('.calc-tab-btn');
  const calcPaneKlima = document.getElementById('calcPaneKlima');
  const calcPaneAku = document.getElementById('calcPaneAku');

  calcTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      calcTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-calc');
      if (target === 'klima') {
        if (calcPaneKlima) calcPaneKlima.classList.add('active');
        if (calcPaneAku) calcPaneAku.classList.remove('active');
      } else {
        if (calcPaneKlima) calcPaneKlima.classList.remove('active');
        if (calcPaneAku) calcPaneAku.classList.add('active');
      }
    });
  });

  // AC Database
  const acDatabase = {
    volkswagen: [
      { name: "Passat B8 (2014 - 2022)", gas: "R134a / R1234yf", weight: "500 ± 25 gr", oil: "PAG 46", oilQty: "110 - 130 ml" },
      { name: "Golf 7 / 7.5 (2012 - 2020)", gas: "R134a / R1234yf", weight: "500 ± 25 gr", oil: "PAG 46", oilQty: "100 - 120 ml" },
      { name: "Polo 6R / 6C / AW", gas: "R134a", weight: "500 ± 20 gr", oil: "PAG 46", oilQty: "90 - 110 ml" },
      { name: "Caddy / Transporter T5/T6", gas: "R134a", weight: "600 ± 25 gr", oil: "PAG 46", oilQty: "140 - 160 ml" }
    ],
    renault: [
      { name: "Megane 4 (2016 - 2023)", gas: "R1234yf / R134a", weight: "480 ± 25 gr", oil: "PAG 46", oilQty: "110 - 125 ml" },
      { name: "Clio 4 / Clio 5", gas: "R134a / R1234yf", weight: "450 ± 25 gr", oil: "PAG 46", oilQty: "95 - 110 ml" },
      { name: "Dacia Duster 1.5 dCi", gas: "R134a", weight: "475 ± 25 gr", oil: "PAG 46", oilQty: "115 - 130 ml" }
    ],
    ford: [
      { name: "Focus 3 / 3.5 (2011 - 2018)", gas: "R134a", weight: "530 ± 20 gr", oil: "PAG 46", oilQty: "120 - 140 ml" },
      { name: "Focus 4 (2018+)", gas: "R1234yf", weight: "475 ± 25 gr", oil: "PAG 46", oilQty: "110 - 130 ml" },
      { name: "Fiesta 1.4 / 1.5 TDCi", gas: "R134a", weight: "520 ± 20 gr", oil: "PAG 46", oilQty: "100 - 120 ml" },
      { name: "Transit Custom / V362", gas: "R134a", weight: "675 ± 25 gr", oil: "PAG 46", oilQty: "150 - 180 ml" }
    ],
    fiat: [
      { name: "Egea Sedan / HB / Cross", gas: "R1234yf / R134a", weight: "450 ± 20 gr", oil: "PAG 46", oilQty: "90 - 110 ml" },
      { name: "Doblo 1.3 / 1.6 Multijet", gas: "R134a", weight: "500 ± 25 gr", oil: "PAG 46", oilQty: "120 - 140 ml" },
      { name: "Fiorino 1.3 Multijet", gas: "R134a", weight: "450 ± 20 gr", oil: "PAG 46", oilQty: "90 - 110 ml" },
      { name: "Linea 1.3 / 1.6 Multijet", gas: "R134a", weight: "500 ± 20 gr", oil: "PAG 46", oilQty: "100 - 120 ml" }
    ],
    bmw: [
      { name: "3 Serisi F30 (2012 - 2019)", gas: "R134a", weight: "550 ± 25 gr", oil: "PAG 46", oilQty: "120 - 140 ml" },
      { name: "5 Serisi F10 (2010 - 2017)", gas: "R134a", weight: "650 ± 25 gr", oil: "PAG 46", oilQty: "140 - 160 ml" },
      { name: "3 Serisi G20 / G30", gas: "R1234yf", weight: "500 ± 20 gr", oil: "PAG 46", oilQty: "110 - 130 ml" }
    ],
    mercedes: [
      { name: "C Serisi W205 (2014 - 2021)", gas: "R134a / R1234yf", weight: "590 ± 20 gr", oil: "PAG 46", oilQty: "120 - 140 ml" },
      { name: "E Serisi W212 / W213", gas: "R134a / R1234yf", weight: "630 ± 25 gr", oil: "PAG 46", oilQty: "130 - 150 ml" },
      { name: "Sprinter 906 / 907", gas: "R134a", weight: "820 ± 30 gr", oil: "PAG 46", oilQty: "180 - 220 ml" }
    ],
    audi: [
      { name: "A4 B8 / B9 (2008 - 2023)", gas: "R134a / R1234yf", weight: "550 ± 25 gr", oil: "PAG 46", oilQty: "110 - 130 ml" },
      { name: "A3 8V / 8Y (2013+)", gas: "R134a / R1234yf", weight: "500 ± 25 gr", oil: "PAG 46", oilQty: "100 - 120 ml" },
      { name: "A6 C7 / C8 (2011+)", gas: "R134a", weight: "650 ± 25 gr", oil: "PAG 46", oilQty: "130 - 150 ml" }
    ],
    toyota: [
      { name: "Corolla E160 / E210", gas: "R134a / R1234yf", weight: "470 ± 20 gr", oil: "ND-OIL 8 (PAG 46)", oilQty: "90 - 110 ml" },
      { name: "Yaris / Auris", gas: "R134a", weight: "420 ± 20 gr", oil: "ND-OIL 8", oilQty: "80 - 100 ml" },
      { name: "C-HR Hybrid", gas: "R1234yf", weight: "450 ± 20 gr", oil: "POE (Elektrikli Kompresör)", oilQty: "100 - 120 ml" }
    ],
    hyundai: [
      { name: "i20 (2014 - 2023)", gas: "R134a / R1234yf", weight: "450 ± 25 gr", oil: "PAG 46", oilQty: "100 - 120 ml" },
      { name: "i30 / Elantra", gas: "R134a", weight: "500 ± 25 gr", oil: "PAG 46", oilQty: "110 - 130 ml" },
      { name: "Tucson / Sportage", gas: "R134a / R1234yf", weight: "550 ± 25 gr", oil: "PAG 46", oilQty: "120 - 140 ml" }
    ],
    opel: [
      { name: "Astra J (2009 - 2016)", gas: "R134a", weight: "600 ± 25 gr", oil: "PAG 46", oilQty: "120 - 140 ml" },
      { name: "Astra K (2015 - 2021)", gas: "R1234yf", weight: "480 ± 20 gr", oil: "PAG 46", oilQty: "100 - 120 ml" },
      { name: "Corsa D / E / F", gas: "R134a / R1234yf", weight: "450 ± 25 gr", oil: "PAG 46", oilQty: "90 - 110 ml" },
      { name: "Insignia A / B", gas: "R134a / R1234yf", weight: "600 ± 25 gr", oil: "PAG 46", oilQty: "130 - 150 ml" }
    ],
    peugeot: [
      { name: "3008 / 5008 (2016+)", gas: "R1234yf", weight: "450 ± 25 gr", oil: "PAG 46", oilQty: "100 - 120 ml" },
      { name: "208 / 308 (2013+)", gas: "R134a / R1234yf", weight: "425 ± 25 gr", oil: "PAG 46", oilQty: "90 - 110 ml" },
      { name: "Citroën C-Elysée / 301", gas: "R134a", weight: "450 ± 20 gr", oil: "PAG 46", oilQty: "100 - 115 ml" }
    ],
    honda: [
      { name: "Civic FC5 / FK7 (2016 - 2021)", gas: "R1234yf / R134a", weight: "450 ± 20 gr", oil: "PAG 46", oilQty: "90 - 110 ml" },
      { name: "Civic FB7 (2012 - 2016)", gas: "R134a", weight: "475 ± 25 gr", oil: "PAG 46", oilQty: "100 - 120 ml" },
      { name: "CR-V 1.6 i-DTEC", gas: "R134a", weight: "510 ± 25 gr", oil: "PAG 46", oilQty: "120 - 140 ml" }
    ]
  };

  const acBrandSelect = document.getElementById('acBrandSelect');
  const acModelSelect = document.getElementById('acModelSelect');
  const acResultCarName = document.getElementById('acResultCarName');
  const acResultGasType = document.getElementById('acResultGasType');
  const acResultGasWeight = document.getElementById('acResultGasWeight');
  const acResultOilType = document.getElementById('acResultOilType');
  const acResultOilQty = document.getElementById('acResultOilQty');
  const acWaBtn = document.getElementById('acWaBtn');

  function updateAcModels() {
    if (!acBrandSelect || !acModelSelect) return;
    const brand = acBrandSelect.value;
    const models = acDatabase[brand] || [];

    acModelSelect.innerHTML = '';
    models.forEach((item, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.textContent = item.name;
      acModelSelect.appendChild(opt);
    });

    updateAcSpecs();
  }

  function updateAcSpecs() {
    if (!acBrandSelect || !acModelSelect) return;
    const brand = acBrandSelect.value;
    const models = acDatabase[brand] || [];
    const selectedIdx = parseInt(acModelSelect.value, 10) || 0;
    const car = models[selectedIdx] || models[0];

    if (car) {
      if (acResultCarName) acResultCarName.textContent = `${acBrandSelect.options[acBrandSelect.selectedIndex].text} ${car.name}`;
      if (acResultGasType) acResultGasType.textContent = car.gas;
      if (acResultGasWeight) acResultGasWeight.textContent = car.weight;
      if (acResultOilType) acResultOilType.textContent = car.oil;
      if (acResultOilQty) acResultOilQty.textContent = car.oilQty;

      if (acWaBtn) {
        const query = `Merhaba Fatih Usta, ${acBrandSelect.options[acBrandSelect.selectedIndex].text} ${car.name} aracım için klima gaz dolumu, vakum testi ve kaçak kontrolü yaptırmak istiyorum. Fiyat ve randevu alabilir miyim?`;
        acWaBtn.href = `https://wa.me/905300755282?text=${encodeURIComponent(query)}`;
      }
    }
  }

  if (acBrandSelect) acBrandSelect.addEventListener('change', updateAcModels);
  if (acModelSelect) acModelSelect.addEventListener('change', updateAcSpecs);
  updateAcModels();

  // Battery & Alternator Diagnosis
  const restingVoltageRange = document.getElementById('restingVoltageRange');
  const restingVoltageInput = document.getElementById('restingVoltageInput');
  const runningVoltageRange = document.getElementById('runningVoltageRange');
  const runningVoltageInput = document.getElementById('runningVoltageInput');
  const batteryDiagnosisSummary = document.getElementById('batteryDiagnosisSummary');
  const batteryStatusIndicator = document.getElementById('batteryStatusIndicator');
  const batteryStatusIcon = document.getElementById('batteryStatusIcon');
  const batteryStatusTitle = document.getElementById('batteryStatusTitle');
  const batteryStatusDesc = document.getElementById('batteryStatusDesc');
  const batterySocText = document.getElementById('batterySocText');
  const batterySocFill = document.getElementById('batterySocFill');
  const altRegText = document.getElementById('altRegText');
  const altRegFill = document.getElementById('altRegFill');
  const batteryWaBtn = document.getElementById('batteryWaBtn');
  const presetBtns = document.querySelectorAll('.preset-btn');

  function calculateBatteryState() {
    if (!restingVoltageRange || !runningVoltageRange) return;
    const restV = parseFloat(restingVoltageRange.value);
    const runV = parseFloat(runningVoltageRange.value);

    // Sync input displays
    if (restingVoltageInput) restingVoltageInput.value = restV.toFixed(1);
    if (runningVoltageInput) runningVoltageInput.value = runV.toFixed(1);

    // Calculate State of Charge (SOC)
    let soc = 0;
    if (restV >= 12.65) soc = 100;
    else if (restV >= 12.45) soc = 75 + ((restV - 12.45) / 0.20) * 25;
    else if (restV >= 12.25) soc = 50 + ((restV - 12.25) / 0.20) * 25;
    else if (restV >= 12.05) soc = 25 + ((restV - 12.05) / 0.20) * 25;
    else if (restV >= 11.8) soc = 5 + ((restV - 11.8) / 0.25) * 20;
    else soc = 0;
    soc = Math.round(Math.max(0, Math.min(100, soc)));

    if (batterySocText) {
      let socLabel = 'Mükemmel';
      if (soc < 30) socLabel = 'Kritik / Deşarj';
      else if (soc < 65) socLabel = 'Zayıf';
      batterySocText.textContent = `%${soc} (${socLabel})`;
    }
    if (batterySocFill) {
      batterySocFill.style.width = `${soc}%`;
      batterySocFill.style.backgroundColor = soc > 60 ? '#10b981' : (soc > 30 ? '#f59e0b' : '#e50914');
    }

    // Alternator analysis
    let altState = 'normal'; // 'low', 'normal', 'high', 'danger'
    let altDesc = '';
    let altTitle = '';
    let altIndicatorClass = 'status-green';
    let altIcon = '✓';

    if (runV < 13.2) {
      altState = 'low';
      altIndicatorClass = 'status-red';
      altIcon = '⚠️';
      altTitle = 'Alternatör Şarj Etmiyor / Aküden Yiyor!';
      altDesc = `Motor çalışırken voltaj ${runV}V seviyesinde. Şarj dinamosu diyot tablası delinmiş veya kömürler bitmiş. Araç seyir halindeyken aniden stop edebilir.`;
      if (altRegText) altRegText.textContent = `Yetersiz (${runV}V)`;
      if (altRegFill) {
        altRegFill.style.width = '30%';
        altRegFill.style.backgroundColor = '#e50914';
      }
    } else if (runV >= 13.2 && runV < 13.75) {
      altState = 'medium';
      altIndicatorClass = 'status-yellow';
      altIcon = '⚡';
      altTitle = 'Şarj Voltajı Sınırda / Düşük';
      altDesc = `Şarj voltajı ${runV}V ile standartın biraz altında. Farlar, klima veya rezistans açıldığında akü boşalabilir. Şarj kömürleri kontrol edilmeli.`;
      if (altRegText) altRegText.textContent = `Düşük Şarj (${runV}V)`;
      if (altRegFill) {
        altRegFill.style.width = '60%';
        altRegFill.style.backgroundColor = '#f59e0b';
      }
    } else if (runV >= 13.75 && runV <= 14.5) {
      altState = 'normal';
      altIndicatorClass = 'status-green';
      altIcon = '✓';
      altTitle = 'Akü & Şarj Sistemi Mükemmel Seviyede';
      altDesc = `Dinlenme voltajı ${restV}V, alternatör regülatörü ${runV}V ile fabrikasyon referans değerleri içerisinde. Elektriksel sistem tam sağlıklı.`;
      if (altRegText) altRegText.textContent = `İdeal (${runV}V)`;
      if (altRegFill) {
        altRegFill.style.width = '95%';
        altRegFill.style.backgroundColor = '#10b981';
      }
    } else if (runV > 14.5 && runV <= 14.85) {
      altState = 'high';
      altIndicatorClass = 'status-yellow';
      altIcon = '⚠️';
      altTitle = 'Yüksek Şarj Seviyesi';
      altDesc = `Voltaj ${runV}V seviyesinde. Akü sıvısının kaynamasına ve kutup başlarının sülfatlaşmasına neden olabilir. Konjektör kontrol edilmeli.`;
      if (altRegText) altRegText.textContent = `Yüksek (${runV}V)`;
      if (altRegFill) {
        altRegFill.style.width = '80%';
        altRegFill.style.backgroundColor = '#f59e0b';
      }
    } else {
      altState = 'danger';
      altIndicatorClass = 'status-red';
      altIcon = '🔥';
      altTitle = 'TEHLİKELİ AŞIRI ŞARJ! BEYİNLER YANABİLİR';
      altDesc = `Şarj voltajı ${runV}V ile kritik tehlike sınırında! Alternatör voltaj regülatörü çökmüş. Motor beyni (ECU), ABS ve multimedya çiplerinin yanma riski çok yüksek. Aracı çalıştırmadan atölyeye başvurun.`;
      if (altRegText) altRegText.textContent = `KRİTİK AŞIRI ŞARJ (${runV}V)`;
      if (altRegFill) {
        altRegFill.style.width = '100%';
        altRegFill.style.backgroundColor = '#e50914';
      }
    }

    if (batteryDiagnosisSummary) batteryDiagnosisSummary.textContent = altTitle;
    if (batteryStatusIndicator) {
      batteryStatusIndicator.className = `diag-status-indicator ${altIndicatorClass}`;
    }
    if (batteryStatusIcon) batteryStatusIcon.textContent = altIcon;
    if (batteryStatusTitle) batteryStatusTitle.textContent = altTitle;
    if (batteryStatusDesc) batteryStatusDesc.textContent = altDesc;

    if (batteryWaBtn) {
      const q = `Merhaba Fatih Usta, aracımın akü dinlenme voltajını ${restV}V, çalışan şarj voltajını ise ${runV}V olarak ölçtüm. ${altTitle} durumu çıktı. Kontrol ve tamir için bilgi alabilir miyim?`;
      batteryWaBtn.href = `https://wa.me/905300755282?text=${encodeURIComponent(q)}`;
    }
  }

  if (restingVoltageRange) {
    restingVoltageRange.addEventListener('input', calculateBatteryState);
  }
  if (restingVoltageInput) {
    restingVoltageInput.addEventListener('change', () => {
      if (restingVoltageRange) {
        restingVoltageRange.value = restingVoltageInput.value;
        calculateBatteryState();
      }
    });
  }
  if (runningVoltageRange) {
    runningVoltageRange.addEventListener('input', calculateBatteryState);
  }
  if (runningVoltageInput) {
    runningVoltageInput.addEventListener('change', () => {
      if (runningVoltageRange) {
        runningVoltageRange.value = runningVoltageInput.value;
        calculateBatteryState();
      }
    });
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const rest = btn.getAttribute('data-rest');
      const run = btn.getAttribute('data-run');
      if (restingVoltageRange && runningVoltageRange) {
        restingVoltageRange.value = rest;
        runningVoltageRange.value = run;
        calculateBatteryState();
      }
    });
  });

  calculateBatteryState();


  /* ==========================================================================
     22. DİJİTAL GARANTİ BELGESİ & SERVİS FİŞİ SİSTEMİ (#garantiModal)
     ========================================================================== */
  const garantiModal = document.getElementById('garantiModal');
  const garantiModalClose = document.getElementById('garantiModalClose');
  const garantiModalBackdrop = document.getElementById('garantiModalBackdrop');
  const openGarantiBtns = document.querySelectorAll('.open-garanti-modal-btn');

  const recCustName = document.getElementById('recCustName');
  const recPlate = document.getElementById('recPlate');
  const recVehicle = document.getElementById('recVehicle');
  const recServiceType = document.getElementById('recServiceType');
  const recWarranty = document.getElementById('recWarranty');
  const recParts = document.getElementById('recParts');

  const prtCustName = document.getElementById('prtCustName');
  const prtPlate = document.getElementById('prtPlate');
  const prtVehicle = document.getElementById('prtVehicle');
  const prtServiceType = document.getElementById('prtServiceType');
  const prtWarranty = document.getElementById('prtWarranty');
  const prtParts = document.getElementById('prtParts');
  const recDocNumber = document.getElementById('recDocNumber');
  const recDate = document.getElementById('recDate');

  const receiptPrintBtn = document.getElementById('receiptPrintBtn');
  const receiptWhatsAppBtn = document.getElementById('receiptWhatsAppBtn');

  function openGarantiModal(e) {
    if (e) e.preventDefault();
    if (!garantiModal) return;

    // Set today's date and random receipt no
    const today = new Date();
    const dateStr = today.toLocaleDateString('tr-TR');
    if (recDate) recDate.textContent = dateStr;

    if (recDocNumber && (!recDocNumber.textContent || recDocNumber.textContent.includes('148'))) {
      const randNum = Math.floor(100 + Math.random() * 900);
      recDocNumber.textContent = `AYG-2026-${randNum}`;
    }

    syncReceiptData();
    garantiModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeGarantiModal() {
    if (!garantiModal) return;
    garantiModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function syncReceiptData() {
    if (prtCustName && recCustName) prtCustName.textContent = recCustName.value || 'Belirtilmedi';
    if (prtPlate && recPlate) prtPlate.textContent = (recPlate.value || '').toUpperCase();
    if (prtVehicle && recVehicle) prtVehicle.textContent = recVehicle.value || 'Belirtilmedi';
    if (prtServiceType && recServiceType) prtServiceType.textContent = recServiceType.value;
    if (prtWarranty && recWarranty) prtWarranty.textContent = recWarranty.value;
    if (prtParts && recParts) prtParts.textContent = recParts.value;
  }

  [recCustName, recPlate, recVehicle, recServiceType, recWarranty, recParts].forEach(el => {
    if (el) {
      el.addEventListener('input', syncReceiptData);
      el.addEventListener('change', syncReceiptData);
    }
  });

  openGarantiBtns.forEach(btn => {
    btn.addEventListener('click', openGarantiModal);
  });

  if (garantiModalClose) garantiModalClose.addEventListener('click', closeGarantiModal);
  if (garantiModalBackdrop) garantiModalBackdrop.addEventListener('click', closeGarantiModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && garantiModal && garantiModal.classList.contains('active')) {
      closeGarantiModal();
    }
  });

  if (receiptPrintBtn) {
    receiptPrintBtn.addEventListener('click', () => {
      syncReceiptData();
      window.print();
    });
  }

  if (receiptWhatsAppBtn) {
    receiptWhatsAppBtn.addEventListener('click', () => {
      syncReceiptData();
      const docNo = recDocNumber ? recDocNumber.textContent : 'AYG-2026';
      const cName = recCustName ? recCustName.value : '';
      const plate = recPlate ? recPlate.value.toUpperCase() : '';
      const veh = recVehicle ? recVehicle.value : '';
      const sType = recServiceType ? recServiceType.value : '';
      const warr = recWarranty ? recWarranty.value : '';
      const prt = recParts ? recParts.value : '';

      const msg = `📋 *AYGÜN OTO ELEKTRONİK 2 - RESMİ GARANTİ & SERVİS FİŞİ*\n\n*Fiş No:* ${docNo}\n*Müşteri:* ${cName}\n*Plaka:* ${plate}\n*Araç:* ${veh}\n\n🔧 *Yapılan İşlem:* ${sType}\n🛡️ *Garanti Süresi:* ${warr}\n⚡ *Kullanılan Parçalar:* ${prt}\n\n*Servis Yetkilisi:* Fatih Usta (0530 075 52 82)\n*Adres:* Kocasinan Mah. Lüleburgaz Eski Sanayi Sitesi 20. Sokak No: 4/1\n\n_Bu belge ile onarılan üniteniz mühürlü test güvencemiz altındadır._`;
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

