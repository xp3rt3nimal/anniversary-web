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
  var loveText = "To the most important person in my life, I just want to say how much I love you. These past two months with you have been the happiest of my life. Every moment feels magical, and I cherish every second we spend together. You make me smile in ways I never thought possible, and even on the toughest days, just thinking about you brightens everything. Thank you for being you, and for being in my life. I love you more than words can express.";
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
  drawHeartConstellation();
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

  function animateValue(element, start, end, duration) {
  var startTimestamp = null;

  function step(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;
    var progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

  // --- RELATIONSHIP TIMER ---
var startDate = new Date("2026-01-03T16:30:00+05:30");

var counterStarted = false;
var counterAnimated = false;

function updateCounter() {

  var now = new Date();
  var diff = now - startDate;

  var days = Math.floor(diff / (1000 * 60 * 60 * 24));
  var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  var minutes = Math.floor((diff / (1000 * 60)) % 60);
  var seconds = Math.floor((diff / 1000) % 60);

  if (!counterAnimated) {

    animateValue(document.getElementById("days"),0,days,800);
    animateValue(document.getElementById("hours"),0,hours,800);
    animateValue(document.getElementById("minutes"),0,minutes,800);
    animateValue(document.getElementById("seconds"),0,seconds,800);

    counterAnimated = true;

  } else {

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

  }

}

function startCounter() {
  if (counterStarted) return;

  var section = document.getElementById("counterSection");
  if(!section) return;
  var rect = section.getBoundingClientRect();

  if (rect.top < window.innerHeight * 0.8) {
    counterStarted = true;
    updateCounter();
    setInterval(updateCounter, 1000);
  }
}

window.addEventListener("scroll", startCounter);

function drawHeartConstellation(){

  var canvas = document.getElementById("constellation");
  var ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var points = [
    [0,3],[1,1],[2,0],[3,1],[4,3],
    [3,5],[2,6],[1,5]
  ];

  var scale = 80;
  var offsetX = canvas.width/2 - 2*scale;
  var offsetY = canvas.height/2 - 3*scale;

  var stars = points.map(function(p){
    return {
      x: offsetX + p[0]*scale,
      y: offsetY + p[1]*scale
    };
  });

  ctx.fillStyle="#ffb6c1";

  stars.forEach(function(star){
    ctx.beginPath();
    ctx.arc(star.x, star.y, 4, 0, Math.PI*2);
    ctx.fill();
  });

  ctx.strokeStyle="rgba(255,182,193,0.6)";
  ctx.lineWidth=2;

  for(var i=0;i<stars.length;i++){
    var next=(i+1)%stars.length;
    ctx.beginPath();
    ctx.moveTo(stars[i].x,stars[i].y);
    ctx.lineTo(stars[next].x,stars[next].y);
    ctx.stroke();
  }
}
})();
