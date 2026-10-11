import os,sys
OUT=sys.argv[1]
V='?v=7'

TPL='''<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>@@TITLE@@ · @@VOL@@ · Tatsuki Fujimoto</title>
<meta name="description" content="@@DESC@@">
<meta name="theme-color" content="@@BG@@">
<link rel="preload" as="image" href="../assets/img/@@SLUG@@-kv-520.webp" imagesrcset="../assets/img/@@SLUG@@-kv-520.webp 520w, ../assets/img/@@SLUG@@-kv-680.webp 680w, ../assets/img/@@SLUG@@-kv-1000.webp 1000w" imagesizes="(max-width:900px) min(80vw,380px), 420px" fetchpriority="high">
<link rel="stylesheet" href="../assets/css/main.css@@V@@">
<link rel="stylesheet" href="../assets/css/story.css@@V@@">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='@@BGURL@@'/%3E%3C/svg%3E">
<style>
@@CSS@@
</style>
</head>
<body class="@@THEME@@">
<a class="skip" href="#main">Lewati ke konten</a>
<div class="progress" aria-hidden="true"></div>
<header class="nav">
  <div class="wrap">
    <a class="brand" href="../"><span class="jp">藤本タツキ</span> Before Chainsaw Man</a>
    <nav aria-label="Navigasi"><ul><li><a class="pill" href="./">← @@VOL@@</a></li><li><a class="pill" href="#main-stage">Interaktif</a></li></ul></nav>
  </div>
</header>

<main id="main">
  <section class="s-hero">
    <div class="wrap s-hero-grid">
      <div>
        <span class="tag">@@VOL@@ · No.@@NO@@ · @@YEAR@@</span>
        <h1>@@TITLE@@</h1>
        <p class="jp jp-title">@@JP@@</p>
        <p class="lede">@@LEDE@@</p>
        <a class="btn" href="#main-stage">Coba interaksinya ↓</a>
      </div>
      <figure class="poster" data-tilt>
        <img src="../assets/img/@@SLUG@@-kv-520.webp" srcset="../assets/img/@@SLUG@@-kv-520.webp 520w, ../assets/img/@@SLUG@@-kv-680.webp 680w, ../assets/img/@@SLUG@@-kv-1000.webp 1000w" sizes="(max-width:900px) min(80vw,380px), 420px" width="520" height="731" alt="Key visual anime @@TITLE@@" fetchpriority="high">
        <figcaption>Key visual anime 藤本タツキ 17-26</figcaption>
      </figure>
    </div>
  </section>

  <section class="block">
    <div class="wrap">
      <div class="sec-head"><span class="idx">01</span><h2 data-split>Sinopsis singkat</h2></div>
      <div class="cols">
        <div class="prose rv">@@SYN@@</div>
        <aside class="facts rv" aria-label="Info karya">
          <dl>
            <div><dt>Judul JP</dt><dd class="jp">@@JP@@</dd></div>
            <div><dt>Tahun</dt><dd>@@YEAR@@</dd></div>
            <div><dt>Terbit di</dt><dd>@@PUB@@</dd></div>
            <div><dt>Jilid</dt><dd><a href="./">@@VOL@@</a></dd></div>
            <div><dt>Nuansa</dt><dd>@@MOOD@@</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  </section>

  <section class="block" id="main-stage">
    <div class="wrap">
      <div class="sec-head"><span class="idx">02</span><h2 data-split>@@STAGE_TITLE@@</h2></div>
      <p class="stage-intro rv">@@STAGE_INTRO@@</p>
@@STAGE@@
    </div>
  </section>

  <section class="block">
    <div class="wrap">
      <div class="sec-head"><span class="idx">03</span><h2 data-split>Karakter</h2></div>
      <div class="chars">
@@CHARS@@
      </div>
      <blockquote class="pull rv" style="margin-top:56px">@@QUOTE@@</blockquote>
      <ul class="themes rv">@@THEMES@@</ul>
    </div>
  </section>

  <nav class="pager" aria-label="One-shot lain">
    <a href="@@PREV_HREF@@"><small>← Sebelumnya</small><strong>@@PREV@@</strong></a>
    <a href="@@NEXT_HREF@@"><small>Berikutnya →</small><strong>@@NEXT@@</strong></a>
  </nav>
</main>

<footer>
  <div class="wrap">
    <div class="big jp">@@JP_SHORT@@</div>
    <p>Fan blog non-resmi. Cerita © Tatsuki Fujimoto / Shueisha. Key visual &amp; karakter anime © 藤本タツキ／集英社・「藤本タツキ 17-26」製作委員会. Digunakan untuk keperluan ulasan.</p>
  </div>
</footer>
<script src="../assets/js/main.js@@V@@" defer></script>
<script>
@@JS@@
</script>
</body>
</html>
'''

def char(slug,k,name,role):
    return f'''        <figure class="char rv" tabindex="0">
          <span class="char-name jp" aria-hidden="true">{name}</span>
          <img src="../assets/img/{slug}-c{k}.webp" alt="{name}" width="300" height="760" loading="lazy" decoding="async">
          <figcaption><strong>{name}</strong><span>{role}</span></figcaption>
        </figure>'''

SMALL='.btn.small{padding:10px 14px;font-size:12px}\n'
S=[]
# ───────────────────────── 1 NIWATORI
S.append(dict(slug='niwatori',file='niwatori.html',vol='17-21',dir='17-21',no='01',year='2011',theme='t-niwa',bg='#fff4d6',
 title="A Couple Clucking Chickens Were Still Kickin' in the Schoolyard",short='Niwatori',jp='庭には二羽ニワトリがいた',jpshort='庭には二羽<br>ニワトリがいた',
 desc="Pengenalan one-shot Tatsuki Fujimoto: A Couple Clucking Chickens Were Still Kickin' in the Schoolyard (2011).",
 lede='Bumi sudah kalah. Dua manusia terakhir bersembunyi di sekolah alien dengan cara paling absurd: menyamar jadi ayam.',
 pub='Jump Rookie! (debut)',mood='Absurd, lucu, lalu sedih',
 syn='<p>Alien telah menaklukkan Bumi dan manusia hampir punah. Di sebuah sekolah yang kini penuh murid alien, dua penyintas bertahan hidup dengan memakai kepala ayam dan berpura-pura jadi hewan peliharaan sekolah.</p><p>Seorang murid alien yang rajin akhirnya tahu rahasia mereka. Bukannya melapor, ia memutuskan untuk melindungi mereka. Dari premis konyol ini, Fujimoto muda sudah menunjukkan triknya: membuat kita tertawa dulu, lalu menusuk perasaan.</p>',
 stage_title='Temukan manusianya',stage_intro='Dua dari ayam-ayam ini sebenarnya manusia. Klik kepala ayam untuk mengintip. Hati-hati, mata alien sedang mengawasi.',
 chars=[(1,'Ami','Penyintas berjubah, bersembunyi di balik kepala ayam.'),(2,'Yūto','Penyintas kedua. Kepala ayamnya tidak pernah lepas.')],
 quote='"Kalau mau selamat, jadilah ayam."',themes=['Invasi alien','Persahabatan lintas spesies','Komedi gelap','Debut'],
 stage='''      <div class="stage coop rv" id="coop">
        <svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="chk" viewBox="0 0 100 100"><circle cx="50" cy="54" r="40" fill="#fff" stroke="#1d1a12" stroke-width="5"/><path d="M42 16l8-12 8 12" fill="#c4321c" stroke="#1d1a12" stroke-width="4"/><circle cx="38" cy="48" r="5" fill="#1d1a12"/><circle cx="62" cy="48" r="5" fill="#1d1a12"/><path d="M44 60h12l-6 9z" fill="#e2b11b" stroke="#1d1a12" stroke-width="3"/><path d="M28 86c10 8 34 8 44 0" stroke="#1d1a12" stroke-width="4" fill="none"/></symbol></svg>
        <div class="eye" aria-hidden="true"><span></span></div>
        <div class="masks" role="group" aria-label="Kepala ayam"></div>
      </div>
      <div class="stage-cap"><span id="coop-msg" aria-live="polite">Manusia ditemukan: 0 / 2</span><button class="btn ghost small" id="coop-reset" type="button">Acak ulang</button></div>''',
 css=SMALL+'''.coop{background:repeating-linear-gradient(0deg,#fff4d6 0 38px,#f7e9c2 38px 40px);padding:clamp(16px,3vw,32px)}
.masks{display:grid;grid-template-columns:repeat(6,1fr);gap:clamp(8px,2vw,20px);max-width:820px;margin:70px auto 0;position:relative;z-index:1}
.mask{aspect-ratio:1;border:0;background:none;padding:0;cursor:pointer;position:relative;animation:peck 1.6s ease-in-out infinite;animation-delay:calc(var(--i)*-.27s)}
.mask svg{width:100%;height:100%;transition:transform .5s var(--ease),opacity .4s}
.mask:hover svg{transform:rotate(-8deg) scale(1.08)}
.mask.open svg{transform:translateY(-60%) rotate(-20deg);opacity:0}
.mask.human{background:var(--img) 50% 4%/150% auto no-repeat #fff;border:4px solid #c4321c;border-radius:50%}
.mask.cluck::after{content:"コケッ!";position:absolute;left:50%;top:-6px;transform:translateX(-50%);font:900 15px/1 var(--jp);background:#1d1a12;color:#fff4d6;padding:4px 6px;white-space:nowrap;animation:pop .9s var(--ease) forwards}
@keyframes peck{50%{transform:translateY(-6px)}}
@keyframes pop{from{opacity:0;transform:translate(-50%,10px)}to{opacity:1;transform:translate(-50%,-14px)}}
.eye{position:absolute;right:clamp(16px,4vw,48px);top:12px;width:120px;height:72px;background:#7bd36a;border:4px solid #1d1a12;border-radius:50%;display:grid;place-items:center;z-index:0}
.eye span{width:34px;height:34px;border-radius:50%;background:#fff;border:4px solid #1d1a12;position:relative;transform:translate(var(--ex,0),var(--ey,0));transition:transform .15s}
.eye span::after{content:"";position:absolute;inset:7px;border-radius:50%;background:#1d1a12}
@media(max-width:600px){.masks{grid-template-columns:repeat(4,1fr)}}''',
 js='''(()=>{const box=document.querySelector('#coop .masks'),msg=document.getElementById('coop-msg'),stage=document.getElementById('coop'),pupil=stage.querySelector('.eye span');
let humans=[],found=0;
function deal(){box.innerHTML='';found=0;msg.textContent='Manusia ditemukan: 0 / 2';
 const a=[...Array(12).keys()].sort(()=>Math.random()-.5);humans=a.slice(0,2);
 for(let i=0;i<12;i++){const b=document.createElement('button');b.className='mask';b.type='button';b.style.setProperty('--i',i);b.setAttribute('aria-label','Kepala ayam '+(i+1));b.innerHTML='<svg><use href="#chk"/></svg>';b.onclick=()=>flip(b,i);box.append(b);}}
function flip(b,i){if(b.classList.contains('open'))return;b.classList.add('open');const h=humans.indexOf(i);
 if(h>-1){b.classList.add('human');b.style.setProperty('--img','url(../assets/img/niwatori-c'+(h+1)+'.webp)');found++;
  msg.textContent=found<2?'Manusia ditemukan: '+found+' / 2':'Dua-duanya ketemu! Jangan bilang ke alien.';}
 else{b.classList.add('cluck');setTimeout(()=>{b.classList.remove('open','cluck')},1300);}}
stage.addEventListener('pointermove',e=>{const r=pupil.parentElement.getBoundingClientRect();const dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),d=Math.hypot(dx,dy)||1;pupil.style.setProperty('--ex',(dx/d*30).toFixed(1)+'px');pupil.style.setProperty('--ey',(dy/d*12).toFixed(1)+'px');});
document.getElementById('coop-reset').onclick=deal;deal();})();'''))

# ───────────────────────── 2 SASAKI
S.append(dict(slug='sasaki',file='sasaki.html',vol='17-21',dir='17-21',no='02',year='2013',theme='t-sasaki',bg='#20352b',
 title='Sasaki Stopped a Bullet',short='Sasaki',jp='佐々木くんが銃弾止めた',jpshort='佐々木くんが<br>銃弾止めた',
 desc='Pengenalan one-shot Tatsuki Fujimoto: Sasaki Stopped a Bullet (2013).',
 lede='Seorang murid yang memuja gurunya, satu peluru, dan keyakinan bahwa hal mustahil bisa dilakukan kalau kamu cukup nekat.',
 pub='Hasil lomba Crown, Jump SQ',mood='Komedi nekat yang tulus',
 syn='<p>Sasaki mengidolakan Kawaguchi-sensei, guru yang mengajarinya untuk berani mengejar mimpi. Ketika masa lalu sang guru mengancam nama baiknya, Sasaki memutuskan untuk melindunginya dengan cara apa pun.</p><p>Caranya? Melakukan sesuatu yang mustahil secara harfiah. Ceritanya pendek, berlebihan, dan sangat Fujimoto: logika aksi absurd yang dijalankan dengan wajah serius.</p>',
 stage_title='Tahan pelurunya',stage_intro='Tekan TEMBAK, lalu tekan STOP (atau spasi, atau klik di area) tepat saat ujung peluru masuk ke zona tangan Sasaki. Setiap berhasil, pelurunya makin cepat.',
 chars=[(1,'Sasaki','Murid berkacamata yang percaya pada gurunya lebih dari apa pun.'),(2,'Kawaguchi','Guru yang mengajarkan Sasaki untuk bermimpi.')],
 quote='"Kalau Sensei bilang bisa, berarti bisa."',themes=['Guru & murid','Aksi absurd','Pengorbanan','Lomba Crown'],
 stage='''      <div class="stage range rv" id="range">
        <div class="board" aria-hidden="true">佐々木くんが<br>銃弾止めた</div>
        <img class="sasaki" src="../assets/img/sasaki-c1.webp" alt="" width="237" height="760" loading="lazy">
        <div class="zone" aria-hidden="true"></div>
        <div class="bullet" aria-hidden="true"></div>
        <div class="result" aria-live="polite"></div>
      </div>
      <div class="stage-cap"><span id="range-score">Berhasil: 0 · Level 1</span><span><button class="btn small" id="fire" type="button">Tembak!</button> <button class="btn ghost small" id="stop" type="button" disabled>Stop</button></span></div>''',
 css=SMALL+'''.range{background:#20352b;min-height:460px}
.board{position:absolute;left:24px;top:20px;font:900 clamp(26px,4vw,52px)/1.1 var(--jp);color:rgba(241,238,226,.18);transform:rotate(-3deg)}
.sasaki{position:absolute;right:6%;bottom:0;height:92%;width:auto}
.zone{position:absolute;right:calc(6% + 80px);top:22%;bottom:22%;width:80px;border:3px dashed var(--accent);opacity:.75}
.bullet{position:absolute;left:0;top:50%;width:56px;height:22px;margin-top:-11px;background:linear-gradient(90deg,#8a6c25,#e3b85a);border:3px solid #111;border-radius:0 50% 50% 0;transform:translateX(var(--bx,-80px))}
.bullet::before{content:"";position:absolute;right:100%;top:6px;width:var(--trail,0px);height:4px;background:linear-gradient(90deg,transparent,rgba(241,238,226,.8))}
.result{position:absolute;inset:auto 0 24px 0;text-align:center;font:900 clamp(30px,6vw,72px)/1 var(--jp);color:var(--accent);opacity:0;transform:scale(.6);transition:all .4s var(--ease)}
.result.show{opacity:1;transform:none}
.range.hit .bullet{animation:shake .3s 3}
@keyframes shake{50%{margin-top:-14px}}
.btn[disabled]{opacity:.4;cursor:not-allowed}''',
 js='''(()=>{const st=document.getElementById('range'),b=st.querySelector('.bullet'),z=st.querySelector('.zone'),res=st.querySelector('.result'),fire=document.getElementById('fire'),stop=document.getElementById('stop'),score=document.getElementById('range-score');
let x=-80,run=false,lvl=1,ok=0,raf,last=0;
function end(t,good){run=false;cancelAnimationFrame(raf);stop.disabled=true;fire.disabled=false;res.textContent=t;res.classList.add('show');st.classList.toggle('hit',good);if(good){ok++;lvl++;}score.textContent='Berhasil: '+ok+' · Level '+lvl;b.style.setProperty('--trail','0px');fire.focus();}
function zone(){const zr=z.getBoundingClientRect(),sr=st.getBoundingClientRect();return[zr.left-sr.left,zr.right-sr.left];}
function tick(t){const dt=last?Math.min(40,t-last):16;last=t;x+=dt*(.35+lvl*.12);b.style.setProperty('--bx',x+'px');b.style.setProperty('--trail',Math.min(160,Math.max(0,x))+'px');
 if(x+56>zone()[1]+10){end('Kena… 💥',false);return;}raf=requestAnimationFrame(tick);}
fire.onclick=()=>{if(run)return;x=-80;last=0;run=true;res.classList.remove('show');st.classList.remove('hit');fire.disabled=true;stop.disabled=false;stop.focus();raf=requestAnimationFrame(tick);};
function doStop(){if(!run)return;const[l,r]=zone(),tip=x+56;if(tip>=l&&tip<=r+10)end('止めた!!',true);else end('Terlalu cepat!',false);}
stop.onclick=doStop;st.addEventListener('pointerdown',doStop);
addEventListener('keydown',e=>{if(e.code==='Space'&&run){e.preventDefault();doStop();}});})();'''))

# ───────────────────────── 3 LOVE IS BLIND
S.append(dict(slug='love',file='love-is-blind.html',vol='17-21',dir='17-21',no='03',year='2013',theme='t-love',bg='#fde8ea',
 title='Love Is Blind',short='Love Is Blind',jp='恋は盲目',jpshort='恋は盲目',
 desc='Pengenalan one-shot Tatsuki Fujimoto: Love Is Blind (2013).',
 lede='Ketua OSIS punya satu misi sebelum lulus: menyatakan cinta. Dunia boleh kacau, yang penting kata-katanya sampai.',
 pub='Hasil lomba Crown, Jump SQ',mood='Rom-com cepat dan kacau',
 syn='<p>Ibuki, ketua OSIS yang sempurna, yakin semua keberhasilannya berkat Kōnosu, satu-satunya anggota OSIS selain dirinya. Sebelum berangkat kuliah, ia bertekad menyatakan perasaannya.</p><p>Masalahnya, ia mendahulukan misi pribadi itu di atas tugasnya sendiri, dan semuanya jadi makin heboh. Ini rom-com Fujimoto paling manis: cepat, berisik, dan penuh energi remaja.</p>',
 stage_title='Cinta itu buta',stage_intro='Semuanya kabur saat jatuh cinta. Gerakkan kursor (atau sentuh) untuk melihat dengan jelas, lalu nyatakan perasaanmu.',
 chars=[(1,'Ibuki','Ketua OSIS yang ingin menyatakan cinta sebelum lulus.'),(2,'Kōnosu','Satu-satunya anggota OSIS lain, alasan Ibuki bisa sukses.')],
 quote='"Aku harus bilang sekarang, sebelum semuanya berakhir."',themes=['Pengakuan cinta','OSIS','Rom-com','Lomba Crown'],
 stage='''      <div class="stage blind rv" id="blind">
        <img class="base" src="../assets/img/love-kv-520.webp" alt="" width="1000" height="1406" loading="lazy" decoding="async">
        <img class="clear" src="../assets/img/love-kv-1000.webp" srcset="../assets/img/love-kv-520.webp 520w, ../assets/img/love-kv-1000.webp 1000w" sizes="(max-width:900px) 92vw, 1160px" alt="Key visual Love Is Blind" width="1000" height="1406" loading="lazy" decoding="async">
        <div class="hearts" aria-hidden="true"></div>
        <p class="reply" aria-live="polite"></p>
      </div>
      <div class="stage-cap"><span>恋は盲目 · arahkan kursor</span><button class="btn small" id="confess" type="button">Nyatakan cinta ♥</button></div>''',
 css=SMALL+'''.blind{height:min(78vh,620px);cursor:none;--x:50%;--y:40%}
.blind img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 25%}
.blind .base{filter:blur(16px) saturate(.6);transform:scale(1.08)}
.blind .clear{-webkit-mask-image:radial-gradient(circle at var(--x) var(--y),#000 0 90px,transparent 170px);mask-image:radial-gradient(circle at var(--x) var(--y),#000 0 90px,transparent 170px)}
.blind.open .clear{-webkit-mask-image:none;mask-image:none}
.hearts span{position:absolute;bottom:-40px;font-size:var(--s);color:var(--accent);animation:rise var(--d) linear forwards}
@keyframes rise{to{transform:translateY(-760px) rotate(var(--r));opacity:0}}
.reply{position:absolute;left:50%;bottom:24px;transform:translateX(-50%);margin:0;background:#fff;border:3px solid #2a0f16;padding:10px 16px;font:800 18px/1.3 var(--jp);opacity:0;transition:opacity .4s;white-space:nowrap}
.reply.show{opacity:1}''',
 js='''(()=>{const st=document.getElementById('blind'),hearts=st.querySelector('.hearts'),reply=st.querySelector('.reply');
function mv(e){const r=st.getBoundingClientRect();st.style.setProperty('--x',(e.clientX-r.left)+'px');st.style.setProperty('--y',(e.clientY-r.top)+'px');}
st.addEventListener('pointermove',mv);st.addEventListener('pointerdown',mv);
const lines=['Kōnosu: "……Eh?!"','Kōnosu: "Ketua, kita lagi rapat!"','Kōnosu: "……Aku juga."'];let n=0;
document.getElementById('confess').onclick=()=>{st.classList.add('open');reply.textContent=lines[n++%lines.length];reply.classList.add('show');
 for(let i=0;i<26;i++){const h=document.createElement('span');h.textContent='♥';h.style.left=Math.random()*100+'%';h.style.setProperty('--s',(18+Math.random()*34)+'px');h.style.setProperty('--d',(2+Math.random()*2.5)+'s');h.style.setProperty('--r',(Math.random()*90-45)+'deg');hearts.append(h);setTimeout(()=>h.remove(),4600);}
 clearTimeout(st._t);st._t=setTimeout(()=>{st.classList.remove('open');reply.classList.remove('show')},4200);};})();'''))

# ───────────────────────── 4 SHIKAKU
S.append(dict(slug='shikaku',file='shikaku.html',vol='17-21',dir='17-21',no='04',year='2014',theme='t-shikaku',bg='#0a0a0c',
 title='Shikaku',short='Shikaku',jp='シカク',jpshort='シカク',
 desc='Pengenalan one-shot Tatsuki Fujimoto: Shikaku (2014).',
 lede='Pembunuh bayaran yang aneh disewa untuk membunuh vampir abadi. Masalahnya, sang vampir memang ingin mati.',
 pub='Suplemen Jump SQ, Juli 2014',mood='Gelap, sepi, ganjil, lembut',
 syn='<p>Shikaku adalah pembunuh bayaran yang kaku dan sulit ditebak. Targetnya kali ini Yugel, vampir abadi yang sudah lelah hidup dan justru ingin mati.</p><p>Shikaku gagal membunuhnya, lalu meminta maaf atas penderitaannya. Yugel memaafkannya. Dari empati yang aneh itu tumbuh hubungan yang mungkin menyalakan lagi keinginannya untuk hidup. Banyak pembaca melihat bibit karakter-karakter <i>Chainsaw Man</i> di sini.</p>',
 stage_title='Di dalam gelap',stage_intro='Gerakkan senter untuk mencari Yugel. Klik untuk menyerang. Cobalah sebanyak yang kamu mau.',
 chars=[(1,'Shikaku','Pembunuh bayaran berambut merah muda, ganjil dan polos.'),(2,'Yugel','Vampir abadi yang sudah terlalu lama hidup.')],
 quote='"Maaf, aku tidak bisa membunuhmu."',themes=['Vampir','Pembunuh bayaran','Keabadian','Empati'],
 stage='''      <div class="stage dark rv" id="dark">
        <img class="yugel" src="../assets/img/shikaku-c2.webp" alt="Yugel" width="268" height="760" loading="lazy">
        <div class="slashes" aria-hidden="true"></div>
        <div class="torch" aria-hidden="true"></div>
        <p class="kills" aria-live="polite">Percobaan membunuh: 0</p>
      </div>
      <div class="stage-cap"><span id="dark-msg">Yugel menunggu.</span><span>シカク</span></div>''',
 css='''.dark{height:min(78vh,600px);background:#141418;cursor:crosshair;--x:50%;--y:50%}
.yugel{position:absolute;left:50%;bottom:0;height:94%;width:auto;transform:translateX(-50%)}
.dark.hurt .yugel{animation:hurt .35s}
@keyframes hurt{30%{transform:translateX(calc(-50% - 10px));filter:brightness(2) saturate(0)}60%{transform:translateX(calc(-50% + 8px))}}
.torch{position:absolute;inset:0;background:radial-gradient(circle at var(--x) var(--y),transparent 0 80px,rgba(5,5,7,.97) 170px);pointer-events:none}
.slashes i{position:absolute;width:260px;height:6px;background:#e0313b;transform-origin:left;animation:slash .6s var(--ease) forwards;z-index:2}
@keyframes slash{from{transform:rotate(var(--r)) scaleX(0)}40%{transform:rotate(var(--r)) scaleX(1);opacity:1}to{transform:rotate(var(--r)) scaleX(1);opacity:0}}
.kills{position:absolute;top:16px;left:16px;margin:0;font:800 12px/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:#e0313b;z-index:2}''',
 js='''(()=>{const st=document.getElementById('dark'),sl=st.querySelector('.slashes'),k=st.querySelector('.kills'),msg=document.getElementById('dark-msg');let n=0;
const lines=['Tidak mati.','Masih tidak mati.','Yugel menguap.','"Lagi?"','Yugel justru tersenyum.','「ごめんなさい」 Shikaku minta maaf.','Yugel memaafkannya.'];
function pos(e){const r=st.getBoundingClientRect();st.style.setProperty('--x',(e.clientX-r.left)+'px');st.style.setProperty('--y',(e.clientY-r.top)+'px');return[e.clientX-r.left,e.clientY-r.top];}
st.addEventListener('pointermove',pos);
st.addEventListener('pointerdown',e=>{const[x,y]=pos(e);const s=document.createElement('i');s.style.left=(x-130)+'px';s.style.top=y+'px';s.style.setProperty('--r',(Math.random()*60-30)+'deg');sl.append(s);setTimeout(()=>s.remove(),700);
 n++;k.textContent='Percobaan membunuh: '+n;msg.textContent=lines[Math.min(n-1,lines.length-1)];st.classList.remove('hurt');void st.offsetWidth;st.classList.add('hurt');});})();'''))

# ───────────────────────── 5 MERMAID
S.append(dict(slug='mermaid',file='mermaid-rhapsody.html',vol='22-26',dir='22-26',no='01',year='2014',theme='t-mermaid',bg='#062a43',
 title='Mermaid Rhapsody',short='Mermaid Rhapsody',jp='人魚ラプソディ',jpshort='人魚<br>ラプソディ',
 desc='Pengenalan one-shot Tatsuki Fujimoto: Mermaid Rhapsody (2014).',
 lede='Sebuah piano di dasar laut, anak laki-laki yang menahan napas untuk memainkannya, dan putri duyung yang mendengarkan.',
 pub='Suplemen Jump SQ, Januari 2015',mood='Melankolis, magis, musikal',
 syn='<p>Toshihide punya kebiasaan aneh: menyelam ke dasar laut dan bermain piano di sana sambil menahan napas lama sekali. Suatu hari ia kehabisan udara, dan seorang putri duyung bernama Shiju menyelamatkannya.</p><p>Mereka jadi dekat lewat pelajaran piano di bawah air. Tapi Toshihide mulai curiga: apakah Shiju benar-benar menyukainya, atau sebenarnya melihatnya sebagai mangsa? Cerita yang indah sekaligus sedikit menyeramkan.</p>',
 stage_title='Piano dasar laut',stage_intro='Mainkan pianonya dengan klik/sentuh tuts, atau pakai keyboard: A S D F G H J K L untuk tuts putih, W E T Y U O untuk tuts hitam. Nyalakan suara perangkatmu.',
 chars=[(1,'Toshihide','Anak yang bermain piano di dasar laut.'),(2,'Shiju','Putri duyung yang belajar piano darinya.')],
 quote='"Kalau aku berhenti main, apa kamu akan pergi?"',themes=['Putri duyung','Musik','Laut','Rasa takut'],
 stage='''      <div class="stage sea rv" id="sea">
        <img class="shiju" src="../assets/img/mermaid-c2.webp" alt="Shiju" width="253" height="760" loading="lazy">
        <div class="bubbles" aria-hidden="true"></div>
        <div class="piano" role="group" aria-label="Piano"></div>
      </div>
      <div class="stage-cap"><span id="note" aria-live="polite">♪ Tekan tuts</span><span>人魚ラプソディ</span></div>''',
 css='''.sea{height:min(80vh,600px);background:linear-gradient(#0b3757,#062a43 60%,#031a2b);overflow:hidden}
.sea::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(100deg,rgba(155,231,255,.06) 0 40px,transparent 40px 120px);animation:rays 9s linear infinite}
@keyframes rays{to{background-position:400px 0}}
.shiju{position:absolute;right:6%;top:4%;height:62%;width:auto;animation:swim 5s ease-in-out infinite alternate}
.sea.play .shiju{animation-duration:1.4s}
@keyframes swim{to{transform:translate(-30px,18px) rotate(-4deg)}}
.piano{position:absolute;left:50%;bottom:24px;transform:translateX(-50%);display:flex;width:min(92%,760px);height:38%;border:4px solid #111;background:#111}
.piano button{flex:1;border:0;border-right:2px solid #111;background:#f4f8fb;cursor:pointer;position:relative;font:700 11px/1 var(--sans);color:#345;display:flex;align-items:flex-end;justify-content:center;padding-bottom:8px;transition:background .08s;touch-action:manipulation}
.piano button.k{position:absolute;top:0;width:calc(100%/9*.6);height:60%;background:#111;color:#9be7ff;z-index:2;border:2px solid #111}
.piano button.on{background:#4ad6e0}
.piano button.k.on{background:#1c83c1}
.bubbles i{position:absolute;bottom:40%;width:var(--s);height:var(--s);border:2px solid #9be7ff;border-radius:50%;animation:bub var(--d) ease-in forwards}
@keyframes bub{to{transform:translate(var(--dx),-420px);opacity:0}}''',
 js='''(()=>{const st=document.getElementById('sea'),pi=st.querySelector('.piano'),bub=st.querySelector('.bubbles'),out=document.getElementById('note');let ac,tm;
const W=[['C4',261.63,'a'],['D4',293.66,'s'],['E4',329.63,'d'],['F4',349.23,'f'],['G4',392,'g'],['A4',440,'h'],['B4',493.88,'j'],['C5',523.25,'k'],['D5',587.33,'l']];
const K=[['C#4',277.18,'w',1],['D#4',311.13,'e',2],['F#4',369.99,'t',4],['G#4',415.3,'y',5],['A#4',466.16,'u',6],['C#5',554.37,'o',8]];
const map={};
W.forEach(([n,f,key])=>{const b=document.createElement('button');b.type='button';b.textContent=key.toUpperCase();b.setAttribute('aria-label','Nada '+n);pi.append(b);map[key]=[b,f,n];});
K.forEach(([n,f,key,pos])=>{const b=document.createElement('button');b.type='button';b.className='k';b.textContent=key.toUpperCase();b.setAttribute('aria-label','Nada '+n);b.style.left='calc(100%/9*'+pos+' - 100%/9*.3)';pi.append(b);map[key]=[b,f,n];});
function play(key){const m=map[key];if(!m)return;const[b,f,n]=m;ac=ac||new (window.AudioContext||window.webkitAudioContext)();
 const o=ac.createOscillator(),o2=ac.createOscillator(),g=ac.createGain(),lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1400;
 o.type='triangle';o.frequency.value=f;o2.type='sine';o2.frequency.value=f*2;const t=ac.currentTime;
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.32,t+.01);g.gain.exponentialRampToValueAtTime(.001,t+1.8);
 o.connect(g);o2.connect(g);g.connect(lp).connect(ac.destination);o.start(t);o2.start(t);o.stop(t+1.9);o2.stop(t+1.9);
 b.classList.add('on');setTimeout(()=>b.classList.remove('on'),160);out.textContent='♪ '+n;st.classList.add('play');clearTimeout(tm);tm=setTimeout(()=>st.classList.remove('play'),900);
 const r=b.getBoundingClientRect(),sr=st.getBoundingClientRect();for(let i=0;i<4;i++){const e=document.createElement('i');const s=6+Math.random()*16;e.style.left=(r.left-sr.left+r.width/2-s/2)+'px';e.style.setProperty('--s',s+'px');e.style.setProperty('--d',(1.6+Math.random()*1.4)+'s');e.style.setProperty('--dx',(Math.random()*60-30)+'px');bub.append(e);setTimeout(()=>e.remove(),3200);}}
Object.entries(map).forEach(([k,[b]])=>{b.addEventListener('pointerdown',e=>{e.preventDefault();play(k);});b.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();play(k);}});});
addEventListener('keydown',e=>{if(e.repeat||e.ctrlKey||e.metaKey||e.altKey)return;const k=e.key.toLowerCase();if(map[k]&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName)){play(k);}});})();'''))

# ───────────────────────── 6 WOKE UP
S.append(dict(slug='woke',file='woke-up-girl.html',vol='22-26',dir='22-26',no='02',year='2017',theme='t-woke',bg='#efe8ff',
 title='Woke-Up-as-a-Girl Syndrome',short='Woke-Up-as-a-Girl',jp='目が覚めたら女の子になっていた病',jpshort='目が覚めたら<br>女の子に<br>なっていた病',
 desc='Pengenalan one-shot Tatsuki Fujimoto: Woke-Up-as-a-Girl Syndrome (2017).',
 lede='Suatu pagi Toshihide bangun dalam tubuh perempuan. Penyakitnya tidak bisa disembuhkan. Yang bisa ia ubah hanyalah cara menghadapinya.',
 pub='Akun Twitter Jump SQ (rilis terbatas)',mood='Canggung, jujur, menghangatkan',
 syn='<p>Setelah divonis mengidap penyakit yang tidak bisa disembuhkan, Toshihide terbangun sebagai perempuan. Teman sekelas menjauhi dan mengganggunya, dan hubungannya dengan pacarnya, Rie, jadi serba canggung.</p><p>Perasaannya pada kakak Rie, Akira, juga ikut berubah. Pelan-pelan Toshihide belajar menghadapi masalahnya secara langsung dan mendefinisikan ulang siapa dirinya. Cerita paling personal di jilid ini.</p>',
 stage_title='Hari demi hari',stage_intro='Geser slider untuk melewati hari-hari Toshihide setelah bangun di tubuh baru. Perhatikan cermin dan catatan hariannya.',
 chars=[(1,'Toshihide','Bangun sebagai perempuan dan harus belajar menerima dirinya.'),(2,'Rie','Pacar Toshihide yang ikut bingung harus bersikap bagaimana.')],
 quote='"Aku tetap aku. Cuma cerminnya yang berubah."',themes=['Identitas','Tubuh','Hubungan','Penerimaan'],
 stage='''      <div class="stage mirror rv" id="mirror">
        <div class="glass" aria-hidden="true"><img src="../assets/img/woke-c1.webp" alt="" width="164" height="760" loading="lazy"></div>
        <img class="me" src="../assets/img/woke-c1.webp" alt="Toshihide" width="164" height="760" loading="lazy">
        <div class="diary"><span class="day">Hari 1</span><p id="diary-text"></p></div>
      </div>
      <div class="stage-cap"><label for="days">Geser hari</label><input id="days" type="range" min="1" max="30" value="1" aria-describedby="diary-text"></div>''',
 css='''.mirror{height:min(78vh,580px);--t:0;background:linear-gradient(135deg,color-mix(in srgb,#ff8fb1 calc(var(--t)*100%),#7fb8ff),#efe8ff)}
.glass{position:absolute;left:8%;top:8%;bottom:8%;width:min(30%,260px);border:6px solid #1e1630;border-radius:140px 140px 8px 8px;background:linear-gradient(160deg,rgba(255,255,255,.7),rgba(255,255,255,.15));overflow:hidden;display:grid;place-items:end center}
.glass img{height:90%;width:auto;transform:scaleX(-1);opacity:calc(.25 + var(--t)*.75);filter:blur(calc((1 - var(--t))*6px))}
.me{position:absolute;left:calc(8% + min(30%,260px) + 5%);bottom:0;height:90%;width:auto}
.diary{position:absolute;right:4%;top:10%;width:min(40%,360px);background:#fff;border:3px solid #1e1630;padding:18px 20px;transform:rotate(1.5deg)}
.diary .day{font:900 40px/1 var(--heavy);color:var(--accent)}
.diary p{margin:10px 0 0;font:italic 400 18px/1.5 var(--display);min-height:5.5em}
#days{flex:1;max-width:520px;accent-color:#7a3fd1;height:28px}
.mirror + .stage-cap{align-items:center}
@media(max-width:700px){.diary{left:4%;right:4%;top:auto;bottom:4%;width:auto}.glass{display:none}.me{left:50%;transform:translateX(-50%);height:62%;bottom:auto;top:2%}}''',
 js='''(()=>{const st=document.getElementById('mirror'),r=document.getElementById('days'),d=st.querySelector('.day'),p=document.getElementById('diary-text');
const L=[[1,'Bangun. Badan terasa asing. Ini mimpi, kan?'],[4,'Dokter bilang tidak ada obatnya. Tidak ada.'],[8,'Di kelas semua menatap. Ada yang tertawa.'],[13,'Rie tidak tahu harus memanggilku apa.'],[18,'Jantung berdebar saat bicara dengan Akira. Kenapa?'],[24,'Berhenti lari. Aku bicara langsung pada mereka.'],[30,'Cermin itu masih asing. Tapi itu tetap aku.']];
function u(){const v=+r.value;st.style.setProperty('--t',((v-1)/29).toFixed(3));d.textContent='Hari '+v;let t=L[0][1];for(const[k,s]of L)if(v>=k)t=s;p.textContent=t;}
r.addEventListener('input',u);u();})();'''))

# ───────────────────────── 7 NAYUTA
S.append(dict(slug='nayuta',file='nayuta.html',vol='22-26',dir='22-26',no='03',year='2015',theme='t-nayuta',bg='#0d181e',
 title='Nayuta of the Prophecy',short='Nayuta',jp='予言のナユタ',jpshort='予言の<br>ナユタ',
 desc='Pengenalan one-shot Tatsuki Fujimoto: Nayuta of the Prophecy (2015), gadis bertanduk di cover 22-26.',
 lede='Ia lahir bertanduk dan diramalkan akan mengakhiri dunia. Kakaknya tetap menggandeng tangannya.',
 pub='Jump SQ, edisi Agustus 2015',mood='Gelap, hangat, tragis',
 syn='<p>Nayuta lahir dengan tanduk, tanpa jantung manusia, dan dengan suara yang terkutuk. Ramalan menyebut dialah yang akan membawa kehancuran dunia.</p><p>Kakaknya, Kenji, tetap merawatnya dengan setia sementara ketakutan orang-orang terus membesar, meski ia sendiri bergulat dengan apa sebenarnya adiknya itu. Nayuta jugalah gadis di cover <a href="./">22-26</a>, dan namanya akan terdengar akrab bagi pembaca <i>Chainsaw Man</i>.</p>',
 stage_title='Baca ramalannya',stage_intro='Klik bulan untuk membaca ramalan. Gerakkan kursor dan bulan akan mengikuti.',
 chars=[(1,'Nayuta','Gadis bertanduk yang diramalkan mengakhiri dunia.'),(2,'Kenji','Kakak yang tidak pernah melepaskan adiknya.')],
 quote='"Dunia boleh takut padamu. Aku tidak."',themes=['Ramalan','Kakak-adik','Iblis','Cover 22-26'],
 stage='''      <div class="stage prophecy rv" id="prophecy">
        <button class="moon" type="button" aria-label="Baca ramalan"></button>
        <img class="kenji" src="../assets/img/nayuta-c2.webp" alt="Kenji" width="285" height="760" loading="lazy">
        <img class="nayuta" src="../assets/img/nayuta-c1.webp" alt="Nayuta" width="222" height="760" loading="lazy">
        <div class="sea2" aria-hidden="true"></div>
        <p class="type" aria-live="polite"></p>
      </div>
      <div class="stage-cap"><span>予言のナユタ</span><button class="btn ghost small" id="read" type="button">Baca ramalan</button></div>''',
 css=SMALL+'''.prophecy{height:min(80vh,620px);background:radial-gradient(ellipse at 50% 30%,#186682,#0d2e49 50%,#0d181e)}
.moon{position:absolute;left:50%;top:8%;width:min(46vw,360px);aspect-ratio:1;margin-left:calc(min(46vw,360px)/-2);border-radius:50%;border:3px solid #111;background:radial-gradient(circle at 40% 35%,#f3c766,#e0a83a 60%,#b77b1c);cursor:pointer;transform:translate(var(--mx,0),var(--my,0));transition:transform .4s var(--ease),box-shadow .6s}
.moon:hover{box-shadow:0 0 0 24px rgba(242,182,64,.18),0 0 0 60px rgba(242,182,64,.08)}
.nayuta{position:absolute;left:50%;bottom:6%;height:72%;width:auto;transform:translateX(-50%);transition:filter .6s}
.prophecy.on .nayuta{filter:drop-shadow(0 0 18px rgba(233,166,184,.8))}
.kenji{position:absolute;left:18%;bottom:5%;height:66%;width:auto;opacity:0;transform:translateX(-40px);transition:all .9s var(--ease)}
.prophecy.done .kenji{opacity:1;transform:none}
.sea2{position:absolute;left:0;right:0;bottom:0;height:14%;background:repeating-linear-gradient(170deg,#e9f7f5 0 3px,#186682 3px 14px,#0d2e49 14px 30px);border-top:3px solid #111}
.type{position:absolute;left:4%;top:6%;max-width:min(40%,340px);margin:0;font:700 clamp(15px,1.5vw,19px)/1.6 var(--display);color:#e8f1f3;white-space:pre-line;text-shadow:0 2px 0 #0d181e;z-index:2}
.type::after{content:"▍";animation:blink 1s steps(1) infinite;color:#e9a6b8}
@keyframes blink{50%{opacity:0}}
@media(max-width:700px){.type{max-width:none;right:4%;font-size:14px}.kenji{left:2%}}''',
 js='''(()=>{const st=document.getElementById('prophecy'),moon=st.querySelector('.moon'),out=st.querySelector('.type');let busy=false;
const T=['Seorang anak akan lahir dengan tanduk.','Ia tidak memiliki jantung manusia.','Suaranya membawa malapetaka.','Dunia akan berakhir karenanya.','…tapi kakaknya tetap menggandeng tangannya.'];
const wait=ms=>new Promise(r=>setTimeout(r,window.__reduce?0:ms));
async function read(){if(busy)return;busy=true;out.textContent='';st.classList.add('on');st.classList.remove('done');
 for(const line of T){for(const ch of line){out.textContent+=ch;await wait(38);}out.textContent+='\\n';await wait(320);}
 st.classList.add('done');busy=false;}
moon.onclick=read;document.getElementById('read').onclick=read;
st.addEventListener('pointermove',e=>{const r=st.getBoundingClientRect();moon.style.setProperty('--mx',((e.clientX-r.left)/r.width-.5)*40+'px');moon.style.setProperty('--my',((e.clientY-r.top)/r.height-.5)*24+'px');});})();'''))

# ───────────────────────── 8 SISTERS
S.append(dict(slug='sisters',file='sisters.html',vol='22-26',dir='22-26',no='04',year='2018',theme='t-sisters',bg='#f4efe6',
 title='Sisters',short='Sisters',jp='妹の姉',jpshort='妹の姉',
 desc='Pengenalan one-shot Tatsuki Fujimoto: Sisters (2018).',
 lede='Kakaknya menang lomba lukis. Lukisannya: adiknya sendiri, telanjang, dipajang di sekolah selama setahun.',
 pub='Jump SQ, 2018',mood='Pahit, lucu, penuh rasa malu',
 syn='<p>Lukisan karya Kyōko memenangkan penghargaan tertinggi, dan karena itu dipajang di sekolah selama setahun penuh. Masalahnya, objek lukisan itu adalah adiknya, Mitsuko, tanpa busana.</p><p>Diejek tanpa henti, Mitsuko bersumpah membuat kakaknya merasakan penderitaan yang sama. Cerita tentang seni, rasa malu, dan persaingan kakak-adik ini terasa seperti saudara dekat <i>Look Back</i>.</p>',
 stage_title='Lukis kanvasnya',stage_intro='Gosok kanvas dengan kursor atau jari untuk "melukis" dan menyingkap karyanya. Setelah cukup terbuka, lukisan akan dipajang.',
 chars=[(1,'Mitsuko','Adik yang jadi objek lukisan dan bahan ejekan.'),(2,'Kyōko','Kakak jenius yang lukisannya memenangkan penghargaan.')],
 quote='"Aku akan membuatmu merasakan malu yang sama."',themes=['Seni','Kakak-adik','Rasa malu','Balas dendam'],
 stage='''      <div class="stage easel rv" id="easel">
        <img src="../assets/img/sisters-kv-1000.webp" srcset="../assets/img/sisters-kv-520.webp 520w, ../assets/img/sisters-kv-1000.webp 1000w" sizes="(max-width:900px) 92vw, 1160px" alt="Key visual Sisters" width="1000" height="1406" loading="lazy" decoding="async">
        <canvas aria-hidden="true"></canvas>
        <span class="plaque" aria-live="polite">Kanvas kosong · 0%</span>
      </div>
      <div class="stage-cap"><span>妹の姉 · 美術部</span><button class="btn ghost small" id="repaint" type="button">Kanvas baru</button></div>''',
 css=SMALL+'''.easel{height:min(80vh,640px);border:14px solid #b8893a;outline:3px solid #1c1712;outline-offset:-3px;cursor:crosshair;touch-action:none;background:#f4efe6}
.easel img,.easel canvas{position:absolute;inset:0;width:100%;height:100%}
.easel img{object-fit:cover;object-position:50% 30%}
.easel canvas{transition:opacity 1s}
.easel.done canvas{opacity:0}
.plaque{position:absolute;right:16px;bottom:16px;background:#b8893a;color:#1c1712;border:3px solid #1c1712;padding:8px 12px;font:800 12px/1 var(--sans);letter-spacing:.15em;text-transform:uppercase}''',
 js='''(()=>{const st=document.getElementById('easel'),cv=st.querySelector('canvas'),pl=st.querySelector('.plaque'),cx=cv.getContext('2d',{willReadFrequently:true});let down=false,lp=null,chk=0;
function fresh(){const r=st.getBoundingClientRect();cv.width=Math.max(1,Math.round(r.width/2));cv.height=Math.max(1,Math.round(r.height/2));cx.globalCompositeOperation='source-over';cx.fillStyle='#f4efe6';cx.fillRect(0,0,cv.width,cv.height);
 cx.strokeStyle='rgba(28,23,18,.12)';for(let i=0;i<40;i++){cx.beginPath();cx.moveTo(Math.random()*cv.width,0);cx.lineTo(Math.random()*cv.width,cv.height);cx.stroke();}
 cx.fillStyle='#1c1712';cx.font='900 '+Math.round(cv.width/10)+'px "Playfair Display",serif';cx.textAlign='center';cx.fillText('Gosok di sini',cv.width/2,cv.height/2);
 st.classList.remove('done');pl.textContent='Kanvas kosong · 0%';}
function at(e){const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*cv.width/r.width,(e.clientY-r.top)*cv.height/r.height];}
function paint(e){const p=at(e);cx.globalCompositeOperation='destination-out';cx.lineCap='round';cx.lineJoin='round';cx.lineWidth=28+Math.random()*14;cx.beginPath();cx.moveTo(...(lp||p));cx.lineTo(...p);cx.stroke();lp=p;
 if(++chk%12===0)measure();}
function measure(){const d=cx.getImageData(0,0,cv.width,cv.height).data;let c=0,t=0;for(let i=3;i<d.length;i+=64){t++;if(d[i]<40)c++;}const pct=Math.round(c/t*100);
 pl.textContent=pct>=55?'Dipajang di sekolah · 1 tahun':'Melukis · '+pct+'%';if(pct>=55)st.classList.add('done');}
cv.addEventListener('pointerdown',e=>{down=true;lp=null;cv.setPointerCapture(e.pointerId);paint(e);});
cv.addEventListener('pointermove',e=>{if(down)paint(e);});
addEventListener('pointerup',()=>{down=false;lp=null;});
document.getElementById('repaint').onclick=fresh;
let ro,w0=0;new ResizeObserver(([en])=>{const w=Math.round(en.contentRect.width);if(w===w0)return;w0=w;clearTimeout(ro);ro=setTimeout(fresh,120);}).observe(st);})();'''))

for i,s in enumerate(S):
    prev=S[i-1]; nxt=S[(i+1)%len(S)]
    def href(o): return o['file'] if o['dir']==s['dir'] else f"../{o['dir']}/{o['file']}"
    html=TPL
    rep={'TITLE':s['title'],'VOL':s['vol'],'DESC':s['desc'],'BG':s['bg'],'BGURL':s['bg'].replace('#','%23'),'SLUG':s['slug'],'V':V,'CSS':s['css'],'THEME':s['theme'],
         'NO':s['no'],'YEAR':s['year'],'JP':s['jp'],'LEDE':s['lede'],'SYN':s['syn'],'PUB':s['pub'],'MOOD':s['mood'],'STAGE_TITLE':s['stage_title'],'STAGE_INTRO':s['stage_intro'],
         'STAGE':s['stage'],'CHARS':'\n'.join(char(s['slug'],k,n,r) for k,n,r in s['chars']),'QUOTE':s['quote'],'THEMES':''.join(f'<li>{t}</li>' for t in s['themes']),
         'PREV_HREF':href(prev),'PREV':prev['short'],'NEXT_HREF':href(nxt),'NEXT':nxt['short'],'JP_SHORT':s['jpshort'],'JS':s['js']}
    for k,v in rep.items(): html=html.replace('@@'+k+'@@',v)
    assert '@@' not in html, s['slug']
    p=os.path.join(OUT,s['dir'],s['file']); open(p,'w',encoding='utf-8',newline='\n').write(html); print('wrote',p)
