/* ============================================
   ROMANTIC ANNIVERSARY WEBSITE - SCRIPTS.JS
   ============================================ */

(function () {
  // --- STARRY BACKGROUND ---
  function createStars() {
    const container = document.getElementById('stars');
    const count = 120;

    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 3 + 1;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.setProperty('--duration', (Math.random() * 4 + 2) + 's');
      star.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(star);
    }
  }

  createStars();

  // --- MUSIC ---
  var bgMusic = document.getElementById('bgMusic');
  var musicOverlay = document.getElementById('musicOverlay');
  var musicToggle = document.getElementById('musicToggle');
  var musicPlaying = false;

  function startMusic() {
    bgMusic.play().then(function () {
      musicPlaying = true;
      musicToggle.classList.remove('muted');
    }).catch(function () {
      // Autoplay blocked — user will use toggle
    });
  }

  musicOverlay.addEventListener('click', function () {
    musicOverlay.classList.add('hidden');
    startMusic();
  });

  musicToggle.addEventListener('click', function () {
    if (musicPlaying) {
      bgMusic.pause();
      musicPlaying = false;
      musicToggle.classList.add('muted');
    } else {
      bgMusic.play().then(function () {
        musicPlaying = true;
        musicToggle.classList.remove('muted');
      }).catch(function () {});
    }
  });

  // --- SCROLL REVEAL ---
  var revealElements = document.querySelectorAll('.reveal');

  function checkReveal() {
    var windowHeight = window.innerHeight;
    revealElements.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      if (top < windowHeight * 0.82) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkReveal);
  checkReveal();

  // --- SLIDESHOW ---
  var slides = document.querySelectorAll('.slide');
  var dotsContainer = document.getElementById('slideshowDots');
  var slideIndex = 0;

  // Create dots
  slides.forEach(function (_, i) {
    var dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', function () {
      goToSlide(i);
    });
    dotsContainer.appendChild(dot);
  });

  var dots = document.querySelectorAll('.dot');

  function goToSlide(index) {
    slides[slideIndex].classList.remove('active');
    dots[slideIndex].classList.remove('active');
    slideIndex = index;
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
  }

  setInterval(function () {
    var next = (slideIndex + 1) % slides.length;
    goToSlide(next);
  }, 3000);

  // --- TYPING EFFECT ---
  var letterSection = document.getElementById('letterSection');
  var typedEl = document.getElementById('typed');
  var cursorEl = document.getElementById('cursor');
  var loveText = "These two months with you have been amazing. I love the way you laugh, the way we talk, and the little moments we share. You turned something simple into something beautiful. Thank you for being you.";
  var charIndex = 0;
  var typingStarted = false;

  function startTyping() {
    if (typingStarted) return;
    typingStarted = true;
    typeChar();
  }

  function typeChar() {
    if (charIndex < loveText.length) {
      typedEl.textContent += loveText.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, 35);
    } else {
      cursorEl.classList.add('hidden');
    }
  }

  // Trigger typing on scroll
  function checkTyping() {
    if (typingStarted) return;
    var rect = letterSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.7) {
      startTyping();
    }
  }

  window.addEventListener('scroll', checkTyping);

  // --- ENVELOPE ---
  var openBtn = document.getElementById('openBtn');
  var envelope = document.getElementById('envelope');

  openBtn.addEventListener('click', function () {
    envelope.classList.add('open');
    openBtn.style.display = 'none';
  });

  // --- SECRET FINAL PAGE ---
  var finalBtn = document.getElementById('finalBtn');
  var secretPage = document.getElementById('secretPage');

  finalBtn.addEventListener('click', function () {
    secretPage.classList.add('visible');
    spawnHearts();
  });

  function spawnHearts() {
    var heartsContainer = document.getElementById('floatingHearts');
    var heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '🤍', '💜'];
    var heartCount = 30;

    for (var i = 0; i < heartCount; i++) {
      (function (index) {
        setTimeout(function () {
          var heart = document.createElement('span');
          heart.className = 'floating-heart';
          heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
          heart.style.left = Math.random() * 100 + '%';
          heart.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
          var duration = Math.random() * 4 + 4;
          heart.style.setProperty('--float-duration', duration + 's');
          heart.style.setProperty('--rotation', (Math.random() * 90 - 45) + 'deg');
          heartsContainer.appendChild(heart);

          setTimeout(function () {
            heart.remove();
          }, duration * 1000);
        }, index * 200);
      })(i);
    }
  }
})();
