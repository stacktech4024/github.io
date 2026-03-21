(() => {
  // ── PARTICLE CANVAS BACKGROUND ──
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const resize = () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const PARTICLE_COUNT = 80;
  const BLUE = '79,142,247';
  const TEAL = '79,142,247';

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      color: Math.random() > 0.5 ? BLUE : TEAL,
      alpha: Math.random() * 0.5 + 0.1,
    });
  }

  const drawGrid = () => {
    ctx.strokeStyle = 'rgba(79,142,247,0.04)';
    ctx.lineWidth = 0.5;
    const step = 60;
    for (let x = 0; x < W; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, W, H);
    drawGrid();

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
    });

    // draw connection lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(79,142,247,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  };
  animate();

  // ── TYPEWRITER ──
  const phrases = [
    'AI_Engineer()',
    'Full_Stack_Dev()',
    'Builder()',
    'Automation_Architect()',
    'ML_Enthusiast()',
  ];
  const el = document.getElementById('typewriter');
  if (el) {
    let pi = 0, ci = 0, deleting = false;
    const tick = () => {
      const cur = phrases[pi];
      const next = deleting ? cur.slice(0, Math.max(0, ci - 1)) : cur.slice(0, Math.min(cur.length, ci + 1));
      el.textContent = next;
      if (!deleting && next === cur) { deleting = true; setTimeout(tick, 1200); return; }
      if (deleting && next === '') { deleting = false; pi = (pi + 1) % phrases.length; }
      ci = deleting ? ci - 1 : ci + 1;
      setTimeout(tick, deleting ? 32 : 58);
    };
    tick();
  }

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll('.proj-card, .skill-block, .edu-card, .info-card, .exp-item, .clink');
  reveals.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => io.observe(el));

  // ── SKILL BAR ANIMATION ──
  const bars = document.querySelectorAll('.bar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.style.getPropertyValue('--w');
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  bars.forEach(b => barObserver.observe(b));

  // ── CONTACT FORM ──
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  if (form && submitBtn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitBtn.textContent = 'message_sent ✓';
      submitBtn.style.background = 'linear-gradient(135deg,#1d9e75,#4f8ef7)';
      setTimeout(() => {
        submitBtn.textContent = 'send_message()';
        submitBtn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  // ── SMOOTH NAV HIGHLIGHT ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === '#' + e.target.id ? 'var(--blue)' : '';
        });
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(s => navObserver.observe(s));

})();
