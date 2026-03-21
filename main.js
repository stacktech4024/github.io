(() => {
  // Typewriter
  const phrases = [
    "Aspiring AI Engineer",
    "Full-Stack Developer",
    "Builder",
  ];

  const el = document.getElementById("tagline-type");
  if (el) {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const current = phrases[phraseIndex];
      const nextText = deleting
        ? current.slice(0, Math.max(0, charIndex - 1))
        : current.slice(0, Math.min(current.length, charIndex + 1));

      el.textContent = nextText;

      if (!deleting && nextText === current) {
        deleting = true;
        setTimeout(tick, 1100);
        return;
      }

      if (deleting && nextText === "") {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }

      charIndex = deleting ? charIndex - 1 : charIndex + 1;

      const speed = deleting ? 35 : 55;
      setTimeout(tick, speed);
    };

    tick();
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        }
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((n) => io.observe(n));
  }

  // Copy GitHub
  const btn = document.getElementById("copy-github");
  const toast = document.getElementById("toast");

  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    setTimeout(() => {
      if (toast.textContent === msg) toast.textContent = "";
    }, 1600);
  };

  if (btn) {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("https://github.com/stacktech4024");
        showToast("Copied!");
      } catch {
        showToast("Copy failed (browser blocked clipboard).");
      }
    });
  }
})();
