// Shared interactions: scroll progress, reveal, split headings, panel tilt, parallax.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  // split headings into animated characters (keeps accessible label)
  document.querySelectorAll('[data-split]').forEach(el => {
    const text = el.textContent.trim();
    el.setAttribute('aria-label', text);
    let i = 0;
    el.innerHTML = text.split(' ').map(word =>
      `<span class="w" aria-hidden="true">${[...word].map(c => `<span class="ch" style="--i:${i++}">${c}</span>`).join('')}</span>`
    ).join(' ');
    el.classList.add('split');
  });

  // reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.rv,.split').forEach(el => io.observe(el));

  // progress bar + scroll-linked parallax, one rAF loop
  const bar = document.querySelector('.progress');
  const layers = [...document.querySelectorAll('[data-depth]')];
  let mx = 0, my = 0, ticking = false;
  const frame = () => {
    ticking = false;
    const max = root.scrollHeight - innerHeight;
    const y = scrollY;
    if (bar) bar.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
    if (reduce) return;
    for (const l of layers) {
      const d = +l.dataset.depth;
      l.style.transform = `translate3d(${(mx * d * 30).toFixed(1)}px,${(my * d * 30 + y * d * 0.35).toFixed(1)}px,0)`;
    }
    root.style.setProperty('--sy', y.toFixed(0));
  };
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener('scroll', req, { passive: true });
  addEventListener('pointermove', e => {
    mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; req();
  }, { passive: true });
  frame();

  // 3D tilt + glare on panels
  if (!reduce && matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.panel,[data-tilt]').forEach(p => {
      p.addEventListener('pointermove', e => {
        const r = p.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        p.style.setProperty('--mx', x * 100 + '%');
        p.style.setProperty('--my', y * 100 + '%');
        p.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 10}deg) translateZ(0)`;
      });
      p.addEventListener('pointerleave', () => { p.style.transform = ''; });
    });
  }

  // real-cover books follow the pointer
  if (!reduce) {
    const books = [...document.querySelectorAll('.book')];
    if (books.length) addEventListener('pointermove', e => {
      for (const b of books) {
        const r = b.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (innerWidth / 2)));
        const y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (innerHeight / 2)));
        b.style.setProperty('--ry', (x * 22 - 8).toFixed(1) + 'deg');
        b.style.setProperty('--rx', (-y * 12).toFixed(1) + 'deg');
        b.style.setProperty('--mx', (50 + x * 50) + '%');
        b.style.setProperty('--my', (50 + y * 50) + '%');
      }
    }, { passive: true });
  }

  // timeline: highlight age on hover/focus
  document.querySelectorAll('.timeline .yr').forEach(yr => {
    const on = () => { yr.parentElement.querySelectorAll('.yr').forEach(o => o.classList.toggle('on', o === yr)); };
    yr.addEventListener('pointerenter', on); yr.addEventListener('focus', on);
  });

  window.__reduce = reduce;
})();
