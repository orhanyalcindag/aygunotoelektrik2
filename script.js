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

});
