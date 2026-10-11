# Tatsuki Fujimoto Before Chainsaw Man

Situs pengenalan semi-wiki untuk dua kumpulan one-shot Tatsuki Fujimoto: **17-21** dan **22-26**.
Dua bahasa: Indonesia di `/`, `/17-21/`, `/22-26/` dan Inggris di `/en/…` (tombol ID | EN di header).
Tiap one-shot dikenalkan singkat di halaman jilidnya; situs khusus tiap one-shot dibuat terpisah nanti.

```bash
npm run dev      # build + serve di http://localhost:4321
npm run build    # hasil produksi → dist/ (deploy folder ini)
```

## Struktur
- `src/content.mjs` — semua teks/data. Teks dua bahasa ditulis `{ id: '…', en: '…' }`; teks antarmuka ada di `ui`.
- `src/styles.css`, `src/main.js` — tampilan & interaksi (billboard tri-vision, pencarian `/`, pratinjau link, daftar isi, lightbox, filter tabel).
- `tools/build.mjs` — merender 6 halaman (ID + EN) ke `dist/` (CSS di-inline, JS per bahasa diberi hash).
- `assets/img`, `assets/fonts` — gambar WebP & font self-host.
- `_lab/v1/` — arsip versi pertama (mini-game per one-shot) untuk dipakai ulang di situs one-shot nanti.

## Video
ID video YouTube ada di `src/content.mjs` (`anime.trailer` dan `pv` tiap one-shot). Thumbnail disimpan lokal di
`assets/img/yt-<id>-400.webp` / `-800.webp`; kalau mengganti ID video, buat juga thumbnail-nya.
Iframe (`youtube-nocookie.com`) baru dimuat saat tombol putar diklik.

## Menautkan situs one-shot nanti
Isi field `site` pada one-shot di `src/content.mjs`, misalnya `site: 'https://…/sasaki/'`, lalu `npm run build`.
Label "Situs khusus · segera hadir" otomatis berubah jadi tombol link.

Gambar: cover resmi (Shueisha) dan key visual/karakter anime (「藤本タツキ 17-26」製作委員会), untuk keperluan ulasan.
