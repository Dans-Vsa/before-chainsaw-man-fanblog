// Shared interactions. `WIKI` (search/preview index) and `UI` (strings) are prepended per language by tools/build.mjs.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const base = document.documentElement.dataset.base || '';   // → language root
  const abase = document.documentElement.dataset.assets || ''; // → site root (assets)
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover: hover)').matches;
  const url = p => base + p, asset = p => abase + p;

  // ── language switch: keep the current section (#hash) when switching ID ⇄ EN
  $$('.lang a:not([aria-current])').forEach(a => a.addEventListener('click', () => {
    try { localStorage.setItem('lang', a.hreflang); } catch {}
    if (location.hash) a.href = a.href.split('#')[0] + location.hash;
  }));

  // ── scroll progress + back-to-top
  const bar = $('.progress'), top = $('.to-top');
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar && bar.style.setProperty('--p', max > 0 ? (scrollY / max).toFixed(4) : 0);
    top && top.classList.toggle('show', scrollY > innerHeight);
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  requestAnimationFrame(onScroll); // never force a layout during script init
  top && top.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

  // ── anchors (#id): sections render lazily, so re-align once scrolling/loading has settled
  const target = () => document.getElementById(decodeURIComponent(location.hash.slice(1)));
  const pad = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const align = () => { const t = target(); if (t && Math.abs(t.getBoundingClientRect().top - pad()) > 4) t.scrollIntoView({ block: 'start', behavior: 'instant' }); };
  let pending = !!location.hash, touched = false;
  ['wheel', 'touchstart', 'keydown'].forEach(t => addEventListener(t, () => { touched = true; pending = false; }, { passive: true }));
  addEventListener('hashchange', () => { pending = true; touched = false; });
  addEventListener('scrollend', () => { if (pending && !touched) { pending = false; align(); } });
  if (location.hash) addEventListener('load', () => { requestAnimationFrame(() => { if (!touched) align(); }); setTimeout(() => { if (!touched) align(); }, 500); }, { once: true });

  // ── reveal below-the-fold blocks
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  $$('.rv').forEach(el => io.observe(el));

  // ── table of contents scroll-spy: last section whose top passed 30% of the viewport
  const tocLinks = $$('.toc a');
  if (tocLinks.length) {
    const pairs = tocLinks.map(a => [a, document.getElementById(a.hash.slice(1))]).filter(([, s]) => s);
    let spyTick = false;
    const spy = () => {
      spyTick = false;
      const line = innerHeight * 0.3;
      let cur = pairs[0];
      for (const p of pairs) if (p[1].getBoundingClientRect().top <= line) cur = p;
      tocLinks.forEach(a => a.classList.toggle('on', a === cur[0]));
    };
    addEventListener('scroll', () => { if (!spyTick) { spyTick = true; requestAnimationFrame(spy); } }, { passive: true });
    requestAnimationFrame(spy);
  }
  $$('.toc-m a').forEach(a => a.addEventListener('click', () => a.closest('details').open = false));

  // ── book tilt (hover only, follows pointer inside the book)
  if (canHover && !reduce) $$('.book').forEach(b => {
    const host = b.closest('a') || b;
    host.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      b.style.setProperty('--ry', (x * 24).toFixed(1) + 'deg');
      b.style.setProperty('--rx', (-y * 14).toFixed(1) + 'deg');
      b.style.setProperty('--mx', ((x + 0.5) * 100).toFixed(0) + '%');
      b.style.setProperty('--my', ((y + 0.5) * 100).toFixed(0) + '%');
    });
  });

  // ── search (button, "/" or Ctrl/⌘+K)
  const dlg = $('#search'), input = $('#q'), list = $('#results');
  let sel = 0, hits = [];
  const norm = s => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');
  function render() {
    const q = norm(input.value.trim());
    hits = WIKI.filter(d => !q || norm(d.t + ' ' + d.jp + ' ' + d.r + ' ' + d.s + ' ' + d.k).includes(q));
    sel = 0;
    list.innerHTML = hits.length ? hits.map((d, i) =>
      `<li><a href="${url(d.u)}" class="${i ? '' : 'sel'}"><img src="${asset(d.img)}" alt="" width="44" height="58" loading="lazy"><span><strong>${d.t}</strong><span>${d.jp} · ${d.m}</span></span></a></li>`).join('')
      : `<li class="empty">${UI.noResults}</li>`;
  }
  function move(d) {
    const as = $$('a', list); if (!as.length) return;
    as[sel]?.classList.remove('sel'); sel = (sel + d + as.length) % as.length;
    as[sel].classList.add('sel'); as[sel].scrollIntoView({ block: 'nearest' });
  }
  function openSearch() { if (!dlg.open) { dlg.showModal(); input.value = ''; render(); input.focus(); } }
  $$('.search-btn').forEach(b => b.addEventListener('click', openSearch));
  input && input.addEventListener('input', render);
  input && input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Enter') { const a = $$('a', list)[sel]; if (a) location.href = a.href; }
  });
  dlg && dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  addEventListener('keydown', e => {
    const typing = /INPUT|TEXTAREA/.test(document.activeElement.tagName);
    if ((e.key === '/' && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) { e.preventDefault(); openSearch(); }
  });

  // ── hover previews on internal wiki links
  if (canHover) {
    const byId = Object.fromEntries(WIKI.map(d => [d.id, d]));
    const pv = document.createElement('div'); pv.className = 'pv'; pv.setAttribute('aria-hidden', 'true');
    document.body.append(pv);
    let timer;
    const show = a => {
      const d = byId[a.dataset.pv]; if (!d) return;
      pv.innerHTML = `<img src="${asset(d.img)}" alt="" width="96" height="126"><div><strong>${d.t}</strong><p>${d.s}</p></div>`;
      const r = a.getBoundingClientRect(), w = 320, h = 140;
      let x = Math.min(Math.max(12, r.left), innerWidth - w - 12);
      let y = r.bottom + 10; if (y + h > innerHeight) y = r.top - h - 10;
      pv.style.left = x + 'px'; pv.style.top = Math.max(12, y) + 'px';
      pv.classList.add('show');
    };
    document.addEventListener('pointerover', e => {
      const a = e.target.closest('a[data-pv]'); if (!a) return;
      clearTimeout(timer); timer = setTimeout(() => show(a), 250);
    });
    document.addEventListener('pointerout', e => {
      if (e.target.closest('a[data-pv]')) { clearTimeout(timer); pv.classList.remove('show'); }
    });
    addEventListener('scroll', () => pv.classList.remove('show'), { passive: true });
  }

  // ── lightbox for [data-lb] links (grouped per page)
  const lb = $('#lightbox');
  if (lb) {
    const items = $$('a[data-lb]'), img = $('img', lb), cap = $('figcaption', lb);
    let i = 0;
    const show = n => { i = (n + items.length) % items.length; const a = items[i]; img.src = a.href; img.alt = a.dataset.lb; cap.textContent = `${a.dataset.lb} (${i + 1}/${items.length})`; };
    items.forEach((a, n) => a.addEventListener('click', e => { e.preventDefault(); show(n); lb.showModal(); }));
    $('.lb-prev', lb).onclick = () => show(i - 1);
    $('.lb-next', lb).onclick = () => show(i + 1);
    $('.lb-close', lb).onclick = () => lb.close();
    lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); });
  }

  // ── one-shot table: filter by volume + sort by year
  const tbl = $('#oneshots');
  if (tbl) {
    const body = $('tbody', tbl);
    $$('.filters button').forEach(b => b.addEventListener('click', () => {
      $$('.filters button').forEach(x => x.setAttribute('aria-pressed', x === b));
      $$('tr', body).forEach(tr => { tr.hidden = b.dataset.f !== 'all' && tr.dataset.vol !== b.dataset.f; });
    }));
    let asc = true;
    $('#sort-year')?.addEventListener('click', e => {
      const rows = $$('tr', body).sort((a, b) => (a.dataset.year - b.dataset.year) * (asc ? 1 : -1));
      asc = !asc; rows.forEach(r => body.append(r));
      e.currentTarget.closest('th').setAttribute('aria-sort', asc ? 'descending' : 'ascending');
    });
  }

  // ── featured article shuffle
  const feat = $('#featured');
  if (feat) {
    const stories = WIKI.filter(d => d.type === 'story');
    let cur = feat.dataset.id;
    $('#shuffle').addEventListener('click', () => {
      const pool = stories.filter(d => d.id !== cur), d = pool[Math.floor(Math.random() * pool.length)];
      cur = d.id;
      $('img', feat).src = asset(d.img); $('h3', feat).textContent = d.t;
      $('.jp', feat).textContent = d.jp; $('.s', feat).textContent = d.s;
      $('.read', feat).href = url(d.u); $('.meta', feat).textContent = `${d.m}`;
    });
  }
  // ── YouTube player: facades open one shared modal; the iframe exists only while it is open
  const player = $('#player');
  if (player) {
    const frame = $('.yt-frame', player), name = $('.yt-name', player), open = $('.yt-open', player);
    let opener = null;
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-yt]'); if (!b) return;
      e.preventDefault(); opener = b;
      const id = b.dataset.yt, t = b.dataset.title || '';
      frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1" title="${t.replace(/"/g, '&quot;')}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen"></iframe>`;
      name.textContent = t; open.href = `https://www.youtube.com/watch?v=${id}`;
      player.showModal(); document.dispatchEvent(new Event('playerchange'));
    });
    const close = () => player.close();
    $('.yt-close', player).addEventListener('click', close);
    player.addEventListener('click', e => { if (e.target === player) close(); });
    player.addEventListener('close', () => { frame.innerHTML = ''; document.dispatchEvent(new Event('playerchange')); opener?.focus(); });
  }

  // ═════════ premium layer ═════════
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  // intro (home, once per session): click to skip, remember when finished
  const intro = $('.intro');
  if (intro && document.documentElement.classList.contains('intro-on')) {
    const done = () => { try { sessionStorage.setItem('intro', '1'); } catch {} intro.remove(); };
    intro.addEventListener('click', () => { document.documentElement.classList.add('intro-skip'); done(); });
    setTimeout(done, 2300);
  }

  // custom cursor ring with lerp + contextual label
  if (fine && !reduce) {
    const cur = document.createElement('div'); cur.className = 'cursor'; cur.setAttribute('aria-hidden', 'true'); cur.innerHTML = '<b></b>';
    document.body.append(cur);
    const lab = $('b', cur);
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const loop = () => { x += (tx - x) * 0.2; y += (ty - y) * 0.2; cur.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`; raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : 0; };
    addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; cur.classList.add('on'); if (!raf) raf = requestAnimationFrame(loop); }, { passive: true });
    document.addEventListener('pointerleave', () => cur.classList.remove('on'));
    document.addEventListener('pointerover', e => {
      const t = e.target.closest('[data-yt],[data-cursor],.bb-stage,.entry-kv,.cast-item,a,button');
      const label = !t ? '' : t.dataset.yt ? 'PLAY' : t.dataset.cursor || (t.matches('.bb-stage') ? 'DRAG' : t.matches('.entry-kv,.cast-item') ? 'ZOOM' : '');
      cur.classList.toggle('big', !!label); lab.textContent = label;
      cur.style.borderWidth = t && !label ? '3px' : '';
    });
  }

  // magnetic buttons + spotlight on volume cards
  if (fine && !reduce) {
    $$('.btn,.vol .go,.bb-btn,.search-btn,.lang a').forEach(el => {
      el.classList.add('mag');
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${((e.clientX - r.left) / r.width - 0.5) * 10}px,${((e.clientY - r.top) / r.height - 0.5) * 8}px)`; });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
    $$('.vol').forEach(v => v.addEventListener('pointermove', e => { const r = v.getBoundingClientRect(); v.style.setProperty('--sx', e.clientX - r.left + 'px'); v.style.setProperty('--sy', e.clientY - r.top + 'px'); }));
  }

  // scroll-velocity marquee (runs only while visible)
  const track = $('.vm-track');
  if (track && !reduce) {
    let pos = 0, vel = 0, lastY = scrollY, last = 0, on = false, half = 0, dir = -1;
    const step = t => {
      if (!on) return;
      const dt = last ? Math.min(50, t - last) : 16; last = t;
      const dy = scrollY - lastY; lastY = scrollY;
      if (dy) dir = dy > 0 ? -1 : 1;
      vel += (dy * 0.9 - vel) * 0.12;
      pos += dir * (dt * 0.06 + Math.abs(vel) * 0.6); // base drift + scroll boost, direction follows scroll
      half = half || track.scrollWidth / 2;
      if (pos <= -half) pos += half; if (pos > 0) pos -= half;
      track.style.transform = `translate3d(${pos.toFixed(1)}px,0,0) skewX(${Math.max(-12, Math.min(12, vel * -0.4)).toFixed(2)}deg)`;
      requestAnimationFrame(step);
    };
    new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on) { last = 0; requestAnimationFrame(step); } }).observe(track);
  }

  // ── billboard (tri-vision): prism slats rotate in a wave to swap key visuals
  $$('.billboard').forEach(bb => {
    const data = JSON.parse($('.bb-data', bb).textContent);
    const stage = $('.bb-stage', bb), img = $('.bb-img', bb), slatsEl = $('.bb-slats', bb);
    const info = $('.bb-info', bb), thumbs = $$('.bb-thumb', bb), cur = $('.bb-cur', bb), play = $('.bb-play', bb);
    const tag = $('.bb-tag', info), title = $('.bb-title', info), jp = $('.bb-jp', info), lede = $('.bb-lede', info), link = $('.bb-link', info), pvBtn = $('.bb-pv', info);
    const pvSuffix = pvBtn ? pvBtn.dataset.title.slice(data[0].t.length) : '';
    const wait = ms => new Promise(r => setTimeout(r, ms));
    let i = 0, busy = false, userPaused = reduce, hover = false, visible = false, builtW = 0;

    const pick = d => (stage.clientWidth * (devicePixelRatio || 1) > 560 ? d.i : d.m);
    const preload = u => new Promise(res => { const im = new Image(); im.onload = im.onerror = () => res(); im.src = u; });
    img.removeAttribute('srcset'); img.removeAttribute('loading');
    const altPre = img.alt.slice(0, img.alt.length - data[0].t.length);

    function buildSlats() {
      const W = stage.clientWidth, H = stage.clientHeight, n = W < 480 ? 8 : 14, w = W / n;
      slatsEl.style.setProperty('--sw', W + 'px'); slatsEl.style.setProperty('--sh', H + 'px');
      slatsEl.innerHTML = Array.from({ length: n }, (_, k) => `<div class="slat" style="--x:${(k * w).toFixed(2)}px;--w:${(w + 0.6).toFixed(2)}px" data-w="${w}"><i class="f1"></i><i class="f2"></i></div>`).join('');
      builtW = W;
    }
    function setThumb(n) {
      thumbs.forEach((t, k) => { t.classList.toggle('on', k === n); k === n ? t.setAttribute('aria-current', 'true') : t.removeAttribute('aria-current'); });
      thumbs[n].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
    function setText(d, n) {
      tag.textContent = `${d.v} · ${d.y}`; tag.className = 'bb-tag ' + (d.v === '22-26' ? 'v2' : 'v1');
      title.textContent = d.t; jp.textContent = d.jp; lede.textContent = d.s;
      link.href = d.u; link.dataset.pv = d.id;
      if (pvBtn) { pvBtn.dataset.yt = d.pv; pvBtn.dataset.title = d.t + pvSuffix; }
      cur.textContent = String(n + 1).padStart(2, '0');
    }
    async function go(n, dir = 1) {
      n = (n + data.length) % data.length;
      if (busy || n === i) return;
      busy = true;
      const to = data[n], fromU = img.currentSrc || img.src, toU = pick(to);
      await preload(toU);
      setThumb(n);
      info.classList.add('swap');
      setTimeout(() => { setText(to, n); info.classList.remove('swap'); }, reduce ? 0 : 380);
      if (!reduce) {
        if (stage.clientWidth !== builtW) buildSlats();
        const slats = [...slatsEl.children];
        slats.forEach(s => { s.children[0].style.backgroundImage = `url("${fromU}")`; s.children[1].style.backgroundImage = `url("${toU}")`; });
        slatsEl.classList.add('on');
        img.classList.remove('kb');
        const seq = dir > 0 ? slats : [...slats].reverse();
        await Promise.all(seq.map((s, k) => {
          const z = `translateZ(${-s.dataset.w / 2}px)`;
          return s.animate([{ transform: `${z} rotateY(0deg)` }, { transform: `${z} rotateY(-90deg)` }],
            { duration: 520, delay: k * 26, easing: 'cubic-bezier(.65,0,.3,1)', fill: 'forwards' }).finished;
        }));
        img.src = toU;
        await img.decode().catch(() => {});
        slatsEl.classList.remove('on');
        slats.forEach(s => s.getAnimations().forEach(a => a.cancel()));
      } else {
        img.style.opacity = 0; await wait(250); img.src = toU; await img.decode().catch(() => {}); img.style.opacity = 1;
      }
      img.alt = altPre + to.t;
      requestAnimationFrame(() => img.classList.add('kb'));
      i = n; busy = false;
    }
    const sync = () => bb.classList.toggle('paused', userPaused || hover || !visible || document.hidden || !!document.getElementById('player')?.open);
    thumbs.forEach((t, k) => {
      t.addEventListener('click', () => go(k, k > i ? 1 : -1));
      $('.bb-prog', t).addEventListener('animationend', () => { if (t.classList.contains('on')) go(i + 1); });
    });
    $('.bb-prev', bb).addEventListener('click', () => go(i - 1, -1));
    $('.bb-next', bb).addEventListener('click', () => go(i + 1, 1));
    const setPlay = () => { play.textContent = userPaused ? '▶' : '❚❚'; play.setAttribute('aria-label', userPaused ? play.dataset.play : play.dataset.pause); sync(); };
    play.addEventListener('click', () => { userPaused = !userPaused; setPlay(); });
    bb.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1, 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1, -1); } });
    bb.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { hover = true; sync(); } });
    bb.addEventListener('pointerleave', () => { hover = false; sync(); });
    let sx = null;
    stage.addEventListener('pointerdown', e => { sx = e.clientX; });
    stage.addEventListener('pointerup', e => { if (sx !== null && Math.abs(e.clientX - sx) > 40) go(e.clientX < sx ? i + 1 : i - 1, e.clientX < sx ? 1 : -1); sx = null; });
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { threshold: 0.35 }).observe(bb);
    document.addEventListener('visibilitychange', sync);
    document.addEventListener('playerchange', sync);
    // autoplay starts only after the visitor interacts with the page (keeps page load quiet)
    const arm = () => { bb.classList.add('armed'); ['scroll', 'pointerdown', 'pointermove', 'keydown', 'touchstart'].forEach(t => removeEventListener(t, arm)); };
    ['scroll', 'pointerdown', 'pointermove', 'keydown', 'touchstart'].forEach(t => addEventListener(t, arm, { passive: true, once: true }));
    setPlay();
    requestAnimationFrame(() => img.classList.add('kb'));
  });
})();
