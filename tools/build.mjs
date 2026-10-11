// Renders the intro site (home + 17-21 + 22-26) in Indonesian (/) and English (/en/) into dist/.
// CSS is inlined + minified, JS is minified and content-hashed. Usage: node tools/build.mjs
import { readFile, writeFile, mkdir, cp, rm, readdir, rmdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { langs, site, volumes, stories, trivia, anime, author, ui } from '../src/content.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');

// intrinsic widths of character cutouts (all 760px tall) — keeps width/height attrs exact (no CLS)
const charW = { niwatori: [316, 240], sasaki: [237, 237], love: [241, 195], shikaku: [210, 268], mermaid: [176, 253], woke: [164, 275], nayuta: [222, 285], sisters: [263, 270] };
const order = volumes.flatMap(v => v.stories);
const storyUrl = id => `${stories[id].vol}/#${id}`; // relative to language root

const minifyCss = css => css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{};,>])\s*/g, '$1').replace(/;}/g, '}').trim();
const minifyJs = js => js.replace(/^\s*\/\/.*$/gm, '').replace(/\n\s+/g, '\n').replace(/\n{2,}/g, '\n').trim();

// Page context: lang, A = path to site root (assets), R = path to this language's root, U = ui strings
function ctx(lang, dir) {
  const depth = (lang === 'en' ? 1 : 0) + (dir ? 1 : 0);
  const A = '../'.repeat(depth), R = dir ? '../' : '';
  const L = x => (x && typeof x === 'object' && !Array.isArray(x) && 'id' in x ? x[lang] : x);
  const other = lang === 'id' ? 'en' : 'id';
  const alt = A + (other === 'en' ? 'en/' : '') + (dir ? `${dir}/` : '');
  const self = (lang === 'en' ? 'en/' : '') + (dir ? `${dir}/` : '');
  return { lang, A, R, L, U: ui[lang], alt, self };
}

function shell(c, { theme, title, desc, preload = '', body, cur, jsName, intro = false }) {
  const { lang, A, R, U, alt } = c;
  const nav = [[U.home, ''], ['17-21', '17-21/'], ['22-26', '22-26/']];
  const langLink = (l, label) => l === lang
    ? `<a href="./" hreflang="${l}" lang="${l}" aria-current="true">${label}</a>`
    : `<a href="${alt}" hreflang="${l}" lang="${l}">${label}</a>`;
  return `<!doctype html>
<html lang="${lang}" data-base="${R}" data-assets="${A}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#16140f">
<script>document.documentElement.classList.add('js')${intro ? `;try{if(!sessionStorage.getItem('intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro-on')}catch(e){}` : ''}</script>
${preload}<link rel="preload" href="${A}assets/fonts/playfair.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${A}assets/fonts/montserrat-black.woff2" as="font" type="font/woff2" crossorigin>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%2316140f'/%3E%3Ctext x='16' y='23' font-size='18' text-anchor='middle' fill='%23e9f26f' font-family='serif' font-weight='900'%3E藤%3C/text%3E%3C/svg%3E">
<style>${css.replaceAll('url(../fonts/', `url(${A}assets/fonts/`)}</style>
</head>
<body class="${theme}">
<a class="skip" href="#main">${U.skip}</a>
${intro ? `<div class="intro" aria-hidden="true"><div class="curtain c1"></div><div class="curtain c2"></div><div class="stage"><div class="intro-in"><div class="intro-kanji">${[...'藤本タツキ'].map((ch, i) => `<span style="--i:${i}">${ch}</span>`).join('')}</div><div class="intro-num"></div><div class="intro-sub">BEFORE CHAINSAW MAN</div></div></div></div>` : ''}
<div class="progress" aria-hidden="true"></div>
<header class="site-head">
  <div class="wrap">
    <a class="logo" href="${R || './'}"><b>藤本</b><span>${site.name}</span></a>
    <nav class="site-nav" aria-label="${U.main}">${nav.map(([l, h]) => `<a href="${R}${h}"${cur === l ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav>
    <div class="lang" role="group" aria-label="Bahasa / Language">${langLink('id', 'ID')}${langLink('en', 'EN')}</div>
    <button class="search-btn" type="button" aria-label="${U.searchLabel}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><span class="lbl">${U.search}</span><kbd>/</kbd></button>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-foot">
  <div class="wrap">
    <div>
      <p><strong>${site.name}</strong> — ${c.L(site.tagline)}. ${U.fanSite}</p>
      <p>${U.credits}</p>
    </div>
    <nav aria-label="Footer"><a href="${R || './'}">${U.home}</a><a href="${R}17-21/">17-21</a><a href="${R}22-26/">22-26</a></nav>
  </div>
</footer>
<button class="to-top" type="button" aria-label="${U.toTop}">↑</button>
<dialog id="search" class="search-dlg" aria-label="${U.searchDlg}">
  <div class="search-box">
    <label class="sr" for="q">${U.searchSr}</label>
    <input id="q" type="search" placeholder="${U.searchPh}" autocomplete="off">
    <ul id="results" role="listbox"></ul>
    <div class="hint"><span>${U.hintPick}</span><span>${U.hintOpen}</span><span>${U.hintClose}</span></div>
  </div>
</dialog>
<dialog id="lightbox" class="lb-dlg" aria-label="${U.gallery}">
  <figure><img alt=""><figcaption></figcaption></figure>
  <button class="lb-btn lb-prev" type="button" aria-label="${U.prev}">‹</button>
  <button class="lb-btn lb-next" type="button" aria-label="${U.next}">›</button>
  <button class="lb-close" type="button" aria-label="${U.close}">✕</button>
</dialog>
<dialog id="player" class="yt-dlg" aria-label="${U.player}">
  <div class="yt-box">
    <div class="yt-frame"></div>
    <div class="yt-bar"><strong class="yt-name"></strong><a class="yt-open" href="https://www.youtube.com/" target="_blank" rel="noopener">${U.openYt}</a><button class="yt-close" type="button" aria-label="${U.close}">✕</button></div>
  </div>
</dialog>
<script src="${A}assets/js/${jsName}" defer></script>
</body>
</html>
`;
}

const toc = (U, secs) => `<aside class="toc" aria-label="${U.toc}"><h2>${U.toc}</h2><ol>${secs.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ol></aside>`;
const tocM = (U, secs) => `<details class="toc-m"><summary>${U.toc}</summary><ol>${secs.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ol></details>`;
const sec = (U, id, t, inner, rv = true) => `<section id="${id}" aria-labelledby="h-${id}"${rv ? ' class="rv"' : ''}><h2 id="h-${id}">${t}<a class="anc" href="#${id}" aria-label="${U.anchor} ${t}">#</a></h2>${inner}</section>`;
const dl = rows => `<dl>${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
const coverSet = (A, v) => `${A}assets/img/${v.cover}-400.webp 400w, ${A}assets/img/${v.cover}-520.webp 520w, ${A}assets/img/${v.cover}-760.webp 760w`;
const book = (c, v, sizes, eager) => `<div class="book"><div class="b"><img src="${c.A}assets/img/${v.cover}-400.webp" srcset="${coverSet(c.A, v)}" sizes="${sizes}" width="400" height="630" alt="${c.U.volCover} ${v.title}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'}></div></div>`;
const preloadImg = (href, srcset, sizes) => `<link rel="preload" as="image" href="${href}" imagesrcset="${srcset}" imagesizes="${sizes}" fetchpriority="high">\n`;
// YouTube facade: self-hosted thumbnail + play button; the iframe (youtube-nocookie) loads only on click
const yt = (c, id, title, label, big) => `<button type="button" class="yt${big ? ' big' : ''}" data-yt="${id}" data-title="${title}" aria-label="${c.U.watch}: ${title}">
  <img src="${c.A}assets/img/yt-${id}-400.webp" srcset="${c.A}assets/img/yt-${id}-400.webp 400w, ${c.A}assets/img/yt-${id}-800.webp 800w" sizes="${big ? '(max-width:820px) 92vw, 640px' : '(max-width:560px) 92vw, 300px'}" width="400" height="225" alt="" loading="lazy" decoding="async">
  <span class="yt-play" aria-hidden="true"></span><span class="yt-label">${label}</span></button>`;
const videoGrid = (c, ids) => `<div class="yt-grid">${ids.map(id => `<figure>${yt(c, stories[id].pv, `${stories[id].title} — ${c.U.pv}`, c.U.pv)}<figcaption><a href="${c.R}${storyUrl(id)}" data-pv="${id}">${stories[id].title}</a></figcaption></figure>`).join('')}</div>`;
const linkStory = (c, id) => `<a href="${c.R}${storyUrl(id)}" data-pv="${id}">${stories[id].title}</a>`;
const storyCard = (c, id) => { const s = stories[id], A = c.A; return `<a class="card" href="#${id}" data-pv="${id}" data-cursor="OPEN">
  <div class="ci"><img src="${A}assets/img/${s.img}-card-480.webp" srcset="${A}assets/img/${s.img}-card-480.webp 480w, ${A}assets/img/${s.img}-card-800.webp 800w" sizes="(max-width:560px) 92vw, (max-width:1100px) 45vw, 380px" width="480" height="297" alt="" loading="lazy" decoding="async"></div>
  <div class="cb"><span class="meta">No.${s.no} · ${s.year}</span><h3>${s.title}</h3><span class="jp" style="font-size:14px;color:var(--muted)">${s.jp}</span><p>${c.L(s.lede)}</p></div></a>`; };

// ── one-shot entry (lives inside its volume page; the dedicated site comes later via `site`)
function entry(c, id) {
  const { A, U, L } = c, s = stories[id];
  const kv = n => `${A}assets/img/${s.img}-kv-${n}.webp`;
  const cta = s.site
    ? `<a class="btn" href="${s.site}">${U.openSite} ${s.short} →</a>`
    : `<span class="soon" title="${U.soonTitle}">${U.soon}</span>`;
  return `<section id="${id}" class="entry rv" aria-labelledby="h-${id}">
  <h2 id="h-${id}"><span class="no">${String(s.no).padStart(2, '0')}</span><span>${s.title}</span><a class="anc" href="#${id}" aria-label="${U.anchor} ${s.title}">#</a></h2>
  <p class="entry-jp"><span class="jp">${s.jp}</span> · <i>${s.romaji}</i></p>
  <div class="entry-grid">
    <div class="entry-side">
      <a class="entry-kv" href="${kv(1000)}" data-lb="${s.title} — ${U.kvAnime}"><img src="${kv(520)}" srcset="${kv(520)} 520w, ${kv(680)} 680w" sizes="(max-width:560px) 40vw, 220px" width="520" height="731" alt="${U.kvAlt} ${s.title}" loading="lazy" decoding="async"></a>
      ${yt(c, s.pv, `${s.title} — ${U.pv}`, U.watchPv)}
    </div>
    <div class="entry-body">
      <ul class="entry-meta"><li><b>${U.year}</b>${s.year}</li><li><b>${U.published}</b>${L(s.pub)}</li><li><b>${U.genre}</b>${L(s.genre)}</li></ul>
      <div class="prose">${L(s.synopsis).map(p => `<p>${p}</p>`).join('')}</div>
      <p class="why"><b>${U.why}</b> ${L(s.why)}</p>
      <div class="cast">${s.chars.map(ch => `<a class="cast-item" href="${A}assets/img/${s.img}-c${ch.k}.webp" data-lb="${ch.name} — ${s.short}"><span class="av"><img src="${A}assets/img/${s.img}-c${ch.k}.webp" width="${charW[s.img][ch.k - 1]}" height="760" alt="" loading="lazy" decoding="async"></span><span><strong>${ch.name}</strong><small>${L(ch.desc)}</small></span></a>`).join('')}</div>
      <div class="entry-foot"><ul class="tags">${L(s.themes).map(t => `<li>${t}</li>`).join('')}</ul>${cta}</div>
    </div>
  </div>
</section>`;
}

// ── billboard: tri-vision style rotating display of one-shot key visuals
// local = true → links jump within the current volume page (#id)
function billboard(c, ids, local) {
  const { A, R, U, L } = c;
  const img = (id, n) => `${A}assets/img/${stories[id].img}-card-${n}.webp`;
  const href = id => (local ? `#${id}` : `${R}${storyUrl(id)}`);
  const slides = ids.map(id => { const s = stories[id]; return { id, pv: s.pv, t: s.title, jp: s.jp, v: s.vol, y: s.year, s: L(s.lede), u: href(id), i: img(id, 800), m: img(id, 480) }; });
  const s0 = stories[ids[0]], n = String(ids.length).padStart(2, '0');
  const ticker = ids.map(id => `<span>${stories[id].title} <i class="jp">${stories[id].jp}</i> ${stories[id].year}</span>`).join('');
  return `<div class="billboard" role="region" aria-roledescription="carousel" aria-label="${U.bbAria}" tabindex="0">
  <div class="bb-head"><span class="bb-live">${U.bbTitle}</span><span class="bb-count"><b class="bb-cur">01</b> / ${n}</span></div>
  <div class="bb-frame">
    <div class="bb-stage">
      <img class="bb-img" src="${img(ids[0], 480)}" srcset="${img(ids[0], 480)} 480w, ${img(ids[0], 800)} 800w" sizes="(max-width:820px) 92vw, 760px" width="800" height="496" alt="${U.kvAlt} ${s0.title}" loading="lazy" decoding="async">
      <div class="bb-slats" aria-hidden="true"></div>
    </div>
    <div class="bb-info" aria-live="polite">
      <span class="bb-tag v${s0.vol === '22-26' ? 2 : 1}">${s0.vol} · ${s0.year}</span>
      <p class="bb-title">${s0.title}</p>
      <p class="bb-jp jp">${s0.jp}</p>
      <p class="bb-lede">${L(s0.lede)}</p>
      <div class="bb-ctas"><a class="btn bb-link" href="${href(ids[0])}" data-pv="${ids[0]}">${U.seeIntro} →</a><button type="button" class="btn bb-pv" data-yt="${s0.pv}" data-title="${s0.title} — ${U.pv}">▶ ${U.watchPv}</button></div>
    </div>
  </div>
  <div class="bb-bar">
    <button class="bb-btn bb-prev" type="button" aria-label="${U.bbPrev}">‹</button>
    <ol class="bb-thumbs">${ids.map((id, i) => `<li><button type="button" class="bb-thumb${i ? '' : ' on'}" aria-label="${U.bbSlide} ${i + 1} ${U.bbOf} ${ids.length}: ${stories[id].title}"${i ? '' : ' aria-current="true"'}><img src="${A}assets/img/${stories[id].img}-thumb.webp" width="144" height="180" alt="" loading="lazy" decoding="async"><span class="bb-prog"></span></button></li>`).join('')}</ol>
    <button class="bb-btn bb-next" type="button" aria-label="${U.bbNext}">›</button>
    <button class="bb-btn bb-play" type="button" aria-label="${U.bbPause}" data-pause="${U.bbPause}" data-play="${U.bbPlay}">❚❚</button>
  </div>
  <div class="bb-ticker" aria-hidden="true"><div><b>${U.bbTicker}</b>${ticker}<b>${U.bbTicker}</b>${ticker}</div></div>
  <script type="application/json" class="bb-data">${JSON.stringify(slides).replace(/</g, '\\u003c')}</script>
</div>`;
}

// ── volume page
function volumePage(lang, v, css, jsName) {
  const c = ctx(lang, v.dir), { A, R, U, L } = c;
  const sizes = '(max-width:820px) 240px, 290px';
  const secs = [['ringkasan', U.summary], ['isi', U.contents], ...v.stories.map(id => [id, `${stories[id].no}. ${stories[id].short}`]), ['garis-waktu', U.timeline], ['cover', U.cover], ['anime', U.animeSec], ['lihat-juga', U.seeAlso]];
  const other = volumes.find(x => x !== v);
  const byYear = [...v.stories].sort((a, b) => stories[a].year - stories[b].year);
  const body = `<div class="banner">
  <div class="wrap">
    <div>
      <ol class="crumbs" aria-label="Breadcrumb"><li><a href="${R}">${U.home}</a></li><li aria-current="page">${U.vol} ${v.title}</li></ol>
      <h1 class="cover-title"><span class="series">藤本タツキ短編集</span><span class="num">${v.title}</span></h1>
      <p class="lede">${L(v.lede)}</p>
    </div>
    ${book(c, v, sizes, true)}
  </div>
</div>
<div class="bb-band"><div class="wrap">${billboard(c, v.stories, true)}</div></div>
<div class="wrap layout">
  ${toc(U, secs)}
  <article class="article">
    ${tocM(U, secs)}
    <aside class="infobox" aria-label="${U.infobox}">
      <div class="ib-title">${U.vol} ${v.title}<span class="jp">${v.jp}</span></div>
      ${dl(v.facts.map(([k, val]) => [L(k), L(val)]))}
      <div class="ib-sub">${U.inside}</div>
      ${dl(v.stories.map(id => [`No.${stories[id].no}`, `<a href="#${id}" data-pv="${id}">${stories[id].title}</a>`]))}
    </aside>
    ${sec(U, 'ringkasan', U.summary, `<div class="prose">${L(v.summary).map(p => `<p>${p}</p>`).join('')}</div>`, false)}
    ${sec(U, 'isi', U.contents, `<p>${U.contentsHint}</p><div class="cards">${v.stories.map(id => storyCard(c, id)).join('')}</div>`)}
    ${v.stories.map(id => entry(c, id)).join('\n    ')}
    ${sec(U, 'garis-waktu', U.timeline, `<ol class="timeline">${byYear.map(id => `<li><span class="yr">${stories[id].year}</span>${linkStory(c, id)} — ${L(stories[id].pub)}</li>`).join('')}</ol>`)}
    ${sec(U, 'cover', U.cover, `<div class="prose"><p>${L(v.coverNote)}</p><p><a href="${A}assets/img/${v.cover}-760.webp" data-lb="${U.volCover} ${v.title}">${U.zoomCover}</a></p></div>`)}
    ${sec(U, 'anime', U.animeSec, `<div class="prose"><p>${L(anime.volText)}</p></div>
      <h3 class="vid-h">${U.trailer}</h3>${yt(c, anime.trailer, `${anime.title} — ${U.trailer}`, U.trailer, true)}
      <h3 class="vid-h">${U.pv}</h3>${videoGrid(c, v.stories)}<p class="yt-note">${U.ytNote}</p>`)}
    ${sec(U, 'lihat-juga', U.seeAlso, `<ul class="seealso"><li><a href="${R}${other.dir}/" data-pv="${other.id}"><small>${U.otherVol}</small><strong>${other.title}</strong></a></li><li><a href="${R}"><small>${U.portal}</small><strong>${U.portalHome}</strong></a></li></ul>`)}
  </article>
</div>`;
  return shell(c, { theme: v.theme, title: `${v.title} — ${site.name}`, desc: L(v.lede), preload: preloadImg(`${A}assets/img/${v.cover}-400.webp`, coverSet(A, v), sizes), body, cur: v.title, jsName });
}

// ── home / portal
function homePage(lang, css, jsName) {
  const c = ctx(lang, ''), { A, U, L } = c;
  const sizes = '(max-width:560px) 150px, (max-width:820px) 210px, 15vw';
  const secs = [['daftar', U.list], ['pilihan', U.random], ['tahukah', U.didYouKnow], ['anime', U.animeSec], ['tentang', U.about]];
  const fid = order[6], f = stories[fid];
  const body = `<div class="home-hero"><div class="wrap">
  <h1 aria-label="Tatsuki Fujimoto Before Chainsaw Man">${[['Tatsuki'], ['Fujimoto'], ['Before', 1], ['Chainsaw', 1], ['Man', 1]].map(([w, em], i) => `<span class="w" aria-hidden="true"><span style="--i:${i}">${em ? `<em>${w}</em>` : w}</span></span>`).join(' ')}</h1>
  <p>${U.heroText}</p>
</div>
<div class="vmarq" aria-hidden="true"><div class="vm-track">${Array(2).fill(`<span>BEFORE CHAINSAW MAN</span><i>✦</i><span class="o">17-21</span><i>✦</i><span class="j">藤本タツキ短編集</span><i>✦</i><span class="o">22-26</span><i>✦</i>`).join('')}</div></div>
</div>
<div class="vols">
  ${volumes.map((v, i) => `<a class="vol ${v.theme}" href="${v.dir}/" data-cursor="OPEN">
    <div><div class="cover-title"><span class="series">藤本タツキ短編集</span><span class="num">${v.title}</span></div><p>${L(v.lede)}</p><span class="go">${U.openVol} ${v.title} →</span></div>
    ${book(c, v, sizes, i === 0)}
  </a>`).join('')}
</div>
<div class="bb-band"><div class="wrap">${billboard(c, order, false)}</div></div>
<div class="wrap layout">
  ${toc(U, secs)}
  <article class="article">
    ${tocM(U, secs)}
    <aside class="infobox" aria-label="${U.aboutAuthor}">
      <div class="ib-title">Tatsuki Fujimoto<span class="jp">藤本タツキ</span></div>
      ${dl([[U.born, L(author.born)], [U.job, U.jobVal], [U.works, author.works]])}
      <div class="ib-sub">${U.collections}</div>
      ${dl(volumes.map(v => [v.title, `<a href="${v.dir}/" data-pv="${v.id}">${v.stories.length} ${U.stories}</a>`]))}
    </aside>
    ${sec(U, 'daftar', U.list, `<div class="filters" role="group" aria-label="${U.filterVol}"><button type="button" data-f="all" aria-pressed="true">${U.all}</button><button type="button" data-f="17-21" aria-pressed="false">17-21</button><button type="button" data-f="22-26" aria-pressed="false">22-26</button></div>
      <div class="tbl-wrap"><table class="wt" id="oneshots"><thead><tr><th scope="col">${U.title}</th><th scope="col"><button type="button" id="sort-year">${U.year}</button></th><th scope="col">${U.vol}</th><th scope="col" class="col-genre">${U.genre}</th></tr></thead><tbody>
      ${order.map(id => { const s = stories[id]; return `<tr data-vol="${s.vol}" data-year="${s.year}"><td>${linkStory(c, id)}<br><span class="jp">${s.jp}</span></td><td>${s.year}</td><td><span class="vtag${s.vol === '22-26' ? ' v2' : ''}">${s.vol}</span></td><td class="col-genre">${L(s.genre)}</td></tr>`; }).join('')}
      </tbody></table></div>`, false)}
    ${sec(U, 'pilihan', U.random, `<div class="featured" id="featured" data-id="${fid}"><img src="${A}assets/img/${f.img}-kv-520.webp" width="520" height="731" alt="" loading="lazy" decoding="async"><div><span class="meta" style="font:700 11px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--muted)">${f.vol} · ${f.year}</span><h3>${f.title}</h3><p class="jp" style="color:var(--muted);margin:0 0 8px">${f.jp}</p><p class="s" style="margin:0">${L(f.lede)}</p><div class="btns"><a class="btn read" href="${storyUrl(fid)}">${U.seeIntro}</a><button class="btn ghost" type="button" id="shuffle">${U.shuffle}</button></div></div></div>`)}
    ${sec(U, 'tahukah', U.didYouKnow, `<ul class="facts-list">${L(trivia).map(t => `<li>${t}</li>`).join('')}</ul>`)}
    ${sec(U, 'anime', U.animeSec, `<div class="split"><a class="anime-img" href="${A}assets/img/anime-kv-1400.webp" data-lb="${U.kvAlt} ${anime.title}"><img src="${A}assets/img/anime-kv-700.webp" srcset="${A}assets/img/anime-kv-700.webp 700w, ${A}assets/img/anime-kv-1400.webp 1400w" sizes="(max-width:820px) 92vw, 440px" width="700" height="490" alt="${U.kvAlt} ${anime.title}" loading="lazy" decoding="async"></a><div class="prose"><p>${L(anime.text)}</p></div></div>
      <h3 class="vid-h">${U.trailer}</h3>${yt(c, anime.trailer, `${anime.title} — ${U.trailer}`, U.trailer, true)}
      <h3 class="vid-h">${U.pv}</h3>${videoGrid(c, order)}<p class="yt-note">${U.ytNote}</p>`)}
    ${sec(U, 'tentang', U.about, `<div class="prose"><p>${U.aboutText}</p></div>`)}
  </article>
</div>`;
  const v1 = volumes[0];
  return shell(c, { theme: 't-home', title: `${site.name} — 17-21 & 22-26`, desc: U.descHome, preload: preloadImg(`${A}assets/img/${v1.cover}-400.webp`, coverSet(A, v1), sizes), body, cur: U.home, jsName, intro: true });
}

// ── search / preview index per language (u = relative to language root, img = relative to site root)
const indexFor = lang => {
  const L = x => (x && typeof x === 'object' && !Array.isArray(x) && 'id' in x ? x[lang] : x), U = ui[lang];
  return [
    ...volumes.map(v => ({ id: v.id, type: 'vol', t: `${U.vol} ${v.title}`, jp: v.jp, r: 'tankobon', k: [U.vol, 'cover', ...v.stories.map(id => stories[id].title), ...L(v.summary)].join(' '), m: U.vol, s: L(v.lede), u: `${v.dir}/`, img: `assets/img/${v.cover}-400.webp` })),
    ...order.map(id => { const s = stories[id]; return { id, type: 'story', t: s.title, jp: s.jp, r: s.romaji, k: [L(s.genre), s.year, ...L(s.themes), ...s.chars.map(ch => ch.name), ...L(s.synopsis)].join(' '), m: `${s.vol} · ${s.year}`, s: L(s.lede), u: storyUrl(id), img: `assets/img/${s.img}-kv-520.webp` }; }),
  ];
};

// ── write
// empty dist/ without failing on directories another process has open (e.g. a terminal cd'd into dist)
async function clean(dir) {
  let entries = [];
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { await clean(p); await rmdir(p).catch(() => {}); }
    else await rm(p, { force: true });
  }
}
await clean(dist);
for (const d of ['assets/img', 'assets/fonts']) await cp(join(root, d), join(dist, d), { recursive: true });
await mkdir(join(dist, 'assets/js'), { recursive: true });
const css = minifyCss(await readFile(join(root, 'src/styles.css'), 'utf8'));
const mainJs = minifyJs(await readFile(join(root, 'src/main.js'), 'utf8'));
const out = async (p, html) => { await mkdir(dirname(join(dist, p)), { recursive: true }); await writeFile(join(dist, p), html); };

let pages = 0;
for (const lang of langs) {
  const js = `const WIKI=${JSON.stringify(indexFor(lang))},UI=${JSON.stringify({ noResults: ui[lang].noResults })};\n${mainJs}`;
  const jsName = `main.${lang}.js?v=${createHash('sha1').update(js).digest('hex').slice(0, 8)}`;
  await writeFile(join(dist, `assets/js/main.${lang}.js`), js);
  const pre = lang === 'en' ? 'en/' : '';
  await out(`${pre}index.html`, homePage(lang, css, jsName)); pages++;
  for (const v of volumes) { await out(`${pre}${v.dir}/index.html`, volumePage(lang, v, css, jsName)); pages++; }
}
console.log(`Built ${pages} pages (${langs.join(' + ')}) → dist/`);
