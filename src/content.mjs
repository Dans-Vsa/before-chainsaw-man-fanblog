// All site content lives here. Pages are rendered from this by tools/build.mjs.
// Bilingual text is written as { id: '…', en: '…' }; plain strings are shared by both languages.
// img = filename prefix in assets/img (e.g. `${img}-kv-520.webp`).
// site = URL of the dedicated one-shot website once it exists (null → shows "coming soon").
// pv = YouTube ID of the official special PV (avex pictures channel, listed on fujimototatsuki17-26.com/movie/).

export const langs = ['id', 'en'];

export const site = {
  name: 'Tatsuki Fujimoto Before Chainsaw Man',
  archive: 'https://dans-vsa.github.io/fujimoto-archive/',
  archiveEntry: 'https://dans-vsa.github.io/fujimoto-archive/karya.html?id=17-26',
  tagline: {
    id: 'Pengenalan singkat dua kumpulan one-shot awal Tatsuki Fujimoto: 17-21 dan 22-26',
    en: 'A short introduction to Tatsuki Fujimoto’s two early one-shot collections: 17-21 and 22-26',
  },
};

export const volumes = [
  {
    id: '17-21', dir: '17-21', theme: 't-1721', cover: 'cover-1721',
    title: '17-21', jp: '藤本タツキ短編集「17-21」',
    lede: {
      id: 'Jilid pertama koleksi one-shot Tatsuki Fujimoto: empat cerita yang ia gambar di usia 17 sampai 21 tahun.',
      en: 'The first volume of Tatsuki Fujimoto’s one-shot collection: four stories he drew between the ages of 17 and 21.',
    },
    summary: {
      id: [
        'Jilid ini memuat karya Fujimoto dari masa lomba pendatang baru sampai suplemen Jump SQ. Gambarnya masih kasar, tapi naluri ceritanya sudah terasa: premis absurd yang dibawakan dengan serius, lalu tiba-tiba menyentuh perasaan.',
        'Isinya beragam: manusia terakhir yang menyamar jadi ayam, murid yang menahan peluru demi gurunya, pengakuan cinta di ruang OSIS, dan pembunuh bayaran yang gagal membunuh vampir abadi.',
      ],
      en: [
        'This volume gathers Fujimoto’s work from his rookie-contest days up to the Jump SQ supplements. The art is still rough, but his storytelling instinct is already there: absurd premises played completely straight, then suddenly turning heartfelt.',
        'The mix is wide: the last humans disguised as chickens, a student who stops a bullet for his teacher, a love confession in the student council room, and an assassin who fails to kill an immortal vampire.',
      ],
    },
    coverNote: {
      id: 'Cover menampilkan seorang siswa berlari di permukaan bulan berwarna kuning, dengan Bumi di belakangnya, di atas latar oranye. Judul "17-21" ditulis kuning neon.',
      en: 'The cover shows a student running across a yellow lunar surface with Earth behind him, on an orange background. The title "17-21" is set in neon yellow.',
    },
    facts: [
      [{ id: 'Judul asli', en: 'Original title' }, '藤本タツキ短編集「17-21」'],
      [{ id: 'Pengarang', en: 'Author' }, 'Tatsuki Fujimoto'],
      [{ id: 'Penerbit', en: 'Publisher' }, 'Shueisha (Jump Comics+)'],
      [{ id: 'Rilis Jepang', en: 'Japan release' }, { id: '4 Oktober 2021', en: 'October 4, 2021' }],
      [{ id: 'Rilis Inggris', en: 'English release' }, { id: '17 Januari 2023 (VIZ Media)', en: 'January 17, 2023 (VIZ Media)' }],
      [{ id: 'Isi', en: 'Contents' }, { id: '4 one-shot (2011–2014)', en: '4 one-shots (2011–2014)' }],
    ],
    stories: ['niwatori', 'sasaki', 'love', 'shikaku'],
  },
  {
    id: '22-26', dir: '22-26', theme: 't-2226', cover: 'cover-2226',
    title: '22-26', jp: '藤本タツキ短編集「22-26」',
    lede: {
      id: 'Jilid kedua: empat cerita dari usia 22 sampai 26 tahun, periode tepat sebelum Fire Punch.',
      en: 'The second volume: four stories from ages 22 to 26, the period right before Fire Punch.',
    },
    summary: {
      id: [
        'Panel-panelnya lebih percaya diri dan temanya lebih personal: keluarga, identitas, tubuh, dan rasa malu. Di jilid inilah bibit Chainsaw Man paling mudah dikenali.',
        'Isinya: piano di dasar laut, remaja yang bangun dalam tubuh perempuan, gadis bertanduk yang diramalkan mengakhiri dunia, dan lukisan telanjang yang dipajang di sekolah.',
      ],
      en: [
        'The paneling is more confident and the themes more personal: family, identity, the body, and shame. This is where the seeds of Chainsaw Man are easiest to spot.',
        'Inside: a piano at the bottom of the sea, a teenager who wakes up in a girl’s body, a horned girl prophesied to end the world, and a nude painting put on display at school.',
      ],
    },
    coverNote: {
      id: 'Cover menampilkan Nayuta berdiri di tengah laut dengan bulan purnama keemasan di belakangnya, di atas latar krem. Judul "22-26" ditulis biru.',
      en: 'The cover shows Nayuta standing in the sea with a golden full moon behind her, on a cream background. The title "22-26" is set in blue.',
    },
    facts: [
      [{ id: 'Judul asli', en: 'Original title' }, '藤本タツキ短編集「22-26」'],
      [{ id: 'Pengarang', en: 'Author' }, 'Tatsuki Fujimoto'],
      [{ id: 'Penerbit', en: 'Publisher' }, 'Shueisha (Jump Comics+)'],
      [{ id: 'Rilis Jepang', en: 'Japan release' }, { id: '4 November 2021', en: 'November 4, 2021' }],
      [{ id: 'Rilis Inggris', en: 'English release' }, '2023 (VIZ Media)'],
      [{ id: 'Isi', en: 'Contents' }, { id: '4 one-shot (2014–2018)', en: '4 one-shots (2014–2018)' }],
    ],
    stories: ['mermaid', 'woke', 'nayuta', 'sisters'],
  },
];

export const stories = {
  niwatori: {
    vol: '17-21', no: 1, year: 2011, img: 'niwatori', site: 'https://dans-vsa.github.io/niwatori-fanblog/', pv: '9c7ItTFlmFs',
    title: "A Couple Clucking Chickens Were Still Kickin' in the Schoolyard", short: 'Niwatori',
    jp: '庭には二羽ニワトリがいた', romaji: 'Niwa ni wa Niwa Niwatori ga Ita',
    pub: { id: 'Jump Rookie! (2011)', en: 'Jump Rookie! (2011)' },
    genre: { id: 'Fiksi ilmiah, komedi gelap', en: 'Sci-fi, dark comedy' },
    lede: {
      id: 'Bumi sudah ditaklukkan alien. Dua manusia terakhir bertahan di sebuah sekolah alien dengan cara paling absurd: menyamar jadi ayam.',
      en: 'Aliens have conquered Earth. The last two humans survive in an alien school in the most absurd way possible: by pretending to be chickens.',
    },
    synopsis: {
      id: [
        'Alien telah menaklukkan Bumi dan manusia hampir punah. Di sebuah sekolah yang kini diisi murid-murid alien, dua penyintas bertahan hidup dengan memakai kepala ayam dan berpura-pura menjadi hewan peliharaan sekolah.',
        'Seorang murid alien yang rajin akhirnya mengetahui rahasia mereka. Alih-alih melapor, ia memutuskan untuk membantu mereka tetap hidup.',
      ],
      en: [
        'Aliens have conquered Earth and humanity is nearly extinct. In a school now full of alien students, two survivors stay alive by wearing chicken heads and posing as the school’s pet chickens.',
        'A diligent alien student eventually discovers their secret. Instead of reporting them, he decides to help them survive.',
      ],
    },
    why: {
      id: 'Premis konyol yang pelan-pelan berubah menjadi cerita tentang empati. Pola "tertawa dulu, lalu sedih" ini akan terus muncul di karya-karya Fujimoto berikutnya. Ini juga karya tertua di koleksi.',
      en: 'A silly premise that slowly turns into a story about empathy. This "laugh first, hurt later" pattern keeps returning in Fujimoto’s later work. It is also the oldest piece in the collection.',
    },
    chars: [
      { k: 1, name: 'Ami', desc: { id: 'Salah satu manusia terakhir. Bersembunyi di balik kepala ayam dan jubah.', en: 'One of the last humans, hiding behind a chicken head and a cape.' } },
      { k: 2, name: 'Yūto', desc: { id: 'Penyintas kedua, kepala ayamnya hampir tidak pernah lepas.', en: 'The second survivor; his chicken head almost never comes off.' } },
    ],
    themes: { id: ['Invasi alien', 'Bertahan hidup', 'Empati lintas spesies', 'Komedi gelap'], en: ['Alien invasion', 'Survival', 'Cross-species empathy', 'Dark comedy'] },
    animeDesigner: 'もああん',
  },
  sasaki: {
    vol: '17-21', no: 2, year: 2013, img: 'sasaki', site: 'https://dans-vsa.github.io/sasaki-fanblog/', pv: 'X8QT4C95p4Y',
    title: 'Sasaki Stopped a Bullet', short: 'Sasaki',
    jp: '佐々木くんが銃弾止めた', romaji: 'Sasaki-kun ga Jūdan Tometa',
    pub: { id: 'Hasil lomba Crown, Jump SQ (2013)', en: 'Crown contest results, Jump SQ (2013)' },
    genre: { id: 'Komedi, aksi', en: 'Comedy, action' },
    lede: {
      id: 'Seorang murid yang memuja gurunya, satu peluru, dan keyakinan bahwa hal mustahil bisa dilakukan kalau cukup nekat.',
      en: 'A student who worships his teacher, a single bullet, and the belief that the impossible is doable if you are reckless enough.',
    },
    synopsis: {
      id: [
        'Sasaki mengidolakan gurunya, Kawaguchi, yang mengajarinya untuk berani mengejar mimpi.',
        'Ketika masa lalu sang guru mengancam nama baiknya, Sasaki memaksa dirinya melakukan sesuatu yang tampaknya mustahil demi melindunginya.',
      ],
      en: [
        'Sasaki idolizes his teacher, Kawaguchi, who taught him to chase his dreams.',
        'When her past threatens her reputation, Sasaki pushes himself to do something seemingly impossible to protect her.',
      ],
    },
    why: {
      id: 'Logika aksi yang berlebihan tapi dijalankan dengan wajah serius. Di balik kekonyolannya ada cerita yang tulus tentang kepercayaan seorang murid pada gurunya.',
      en: 'Over-the-top action logic delivered with a straight face. Beneath the silliness is a sincere story about a student’s faith in his teacher.',
    },
    chars: [
      { k: 1, name: 'Sasaki', desc: { id: 'Murid berkacamata yang percaya pada gurunya lebih dari apa pun.', en: 'A bespectacled student who believes in his teacher more than anything.' } },
      { k: 2, name: 'Kawaguchi', desc: { id: 'Guru yang mengajari Sasaki untuk bermimpi.', en: 'The teacher who taught Sasaki to dream.' } },
    ],
    themes: { id: ['Guru & murid', 'Aksi absurd', 'Pengorbanan'], en: ['Teacher & student', 'Absurd action', 'Sacrifice'] },
    animeDesigner: '小園菜穂',
  },
  love: {
    vol: '17-21', no: 3, year: 2013, img: 'love', site: 'https://dans-vsa.github.io/love-is-blind-fanwiki/', pv: 'bnnbCdR6sIE',
    title: 'Love Is Blind', short: 'Love Is Blind',
    jp: '恋は盲目', romaji: 'Koi wa Mōmoku',
    pub: { id: 'Hasil lomba Crown, Jump SQ (2013)', en: 'Crown contest results, Jump SQ (2013)' },
    genre: { id: 'Komedi romantis', en: 'Romantic comedy' },
    lede: {
      id: 'Ketua OSIS punya satu misi sebelum lulus: menyatakan cinta, apa pun yang terjadi di sekitarnya.',
      en: 'The student council president has one mission before graduating: to confess his love, no matter what is happening around him.',
    },
    synopsis: {
      id: [
        'Ibuki, ketua OSIS, yakin semua keberhasilannya berkat Kōnosu, satu-satunya anggota OSIS selain dirinya.',
        'Sebelum berangkat kuliah, ia bertekad menyatakan perasaannya, bahkan dengan mendahulukan misi pribadi itu di atas tugas-tugasnya sendiri.',
      ],
      en: [
        'Ibuki, the student council president, credits all his success to Kōnosu, the council’s only other member.',
        'Before leaving for university he is determined to confess, even if it means putting that personal mission ahead of his own duties.',
      ],
    },
    why: {
      id: 'Rom-com yang cepat, berisik, dan penuh energi remaja. Ini sisi Fujimoto yang paling manis, dengan tempo komedi yang terasa sangat "manga Jump".',
      en: 'A fast, loud rom-com bursting with teenage energy. It is Fujimoto at his sweetest, with comedic timing that feels very "Jump manga".',
    },
    chars: [
      { k: 1, name: 'Ibuki', desc: { id: 'Ketua OSIS yang ingin menyatakan cinta sebelum lulus.', en: 'The council president who wants to confess before graduating.' } },
      { k: 2, name: 'Kōnosu', desc: { id: 'Satu-satunya anggota OSIS lain, alasan Ibuki bisa sukses.', en: 'The only other council member, and the reason for Ibuki’s success.' } },
    ],
    themes: { id: ['Pengakuan cinta', 'Kehidupan sekolah', 'Rom-com'], en: ['Love confession', 'School life', 'Rom-com'] },
    animeDesigner: 'もりともこ',
  },
  shikaku: {
    vol: '17-21', no: 4, year: 2014, img: 'shikaku', site: null, pv: 'RNXHeI0Sly8',
    title: 'Shikaku', short: 'Shikaku',
    jp: 'シカク', romaji: 'Shikaku',
    pub: { id: 'Suplemen Jump SQ, Juli 2014', en: 'Jump SQ supplement, July 2014' },
    genre: { id: 'Aksi, drama supernatural', en: 'Action, supernatural drama' },
    lede: {
      id: 'Pembunuh bayaran yang ganjil disewa untuk membunuh vampir abadi. Masalahnya, sang vampir memang ingin mati.',
      en: 'An odd assassin is hired to kill an immortal vampire. The catch: the vampire actually wants to die.',
    },
    synopsis: {
      id: [
        'Shikaku, seorang pembunuh bayaran, disewa untuk membunuh Yugel, vampir abadi yang sudah lelah hidup.',
        'Ia gagal, lalu meminta maaf atas penderitaan Yugel. Yugel memaafkannya, dan empati di antara keduanya mungkin menyalakan kembali keinginannya untuk hidup.',
      ],
      en: [
        'Shikaku, an assassin, is hired to kill Yugel, an immortal vampire who has grown tired of living.',
        'She fails, then apologizes for his suffering. Yugel forgives her, and the empathy between them may rekindle his will to live.',
      ],
    },
    why: {
      id: 'Kekerasan dan kelembutan dalam satu cerita, dengan protagonis perempuan yang polos dan ganjil. Banyak pembaca melihat bibit tokoh-tokoh Chainsaw Man di sini.',
      en: 'Violence and tenderness in one story, led by an innocent, peculiar heroine. Many readers see early versions of Chainsaw Man’s characters here.',
    },
    chars: [
      { k: 1, name: 'Shikaku', desc: { id: 'Pembunuh bayaran berambut merah muda yang polos dan sulit ditebak.', en: 'A pink-haired assassin, innocent and hard to read.' } },
      { k: 2, name: 'Yugel', desc: { id: 'Vampir abadi yang sudah terlalu lama hidup.', en: 'An immortal vampire who has lived far too long.' } },
    ],
    themes: { id: ['Vampir', 'Pembunuh bayaran', 'Keabadian', 'Empati'], en: ['Vampires', 'Assassins', 'Immortality', 'Empathy'] },
    animeDesigner: 'MYOUN',
  },
  mermaid: {
    vol: '22-26', no: 1, year: 2014, img: 'mermaid', site: null, pv: 'HfiPv1a1RqY',
    title: 'Mermaid Rhapsody', short: 'Mermaid Rhapsody',
    jp: '人魚ラプソディ', romaji: 'Ningyo Rapusodi',
    pub: { id: 'Suplemen Jump SQ, Januari 2015', en: 'Jump SQ supplement, January 2015' },
    genre: { id: 'Fantasi, romansa', en: 'Fantasy, romance' },
    lede: {
      id: 'Sebuah piano di dasar laut, anak laki-laki yang menahan napas untuk memainkannya, dan putri duyung yang mendengarkan.',
      en: 'A piano at the bottom of the sea, a boy who holds his breath to play it, and a mermaid who listens.',
    },
    synopsis: {
      id: [
        'Toshihide bermain piano di dasar laut sambil menahan napas lama sekali. Ketika kehabisan udara, seorang putri duyung bernama Shiju menyelamatkannya.',
        'Keduanya dekat lewat pelajaran piano di bawah air, tapi Toshihide mulai takut bahwa Shiju mungkin melihatnya sebagai mangsa.',
      ],
      en: [
        'Toshihide plays a piano on the seabed, holding his breath for impossibly long stretches. When he runs out of air, a mermaid named Shiju saves him.',
        'They grow close through underwater piano lessons, but Toshihide starts to fear that Shiju might see him as prey.',
      ],
    },
    why: {
      id: 'Indah sekaligus sedikit menyeramkan. Musik, laut, dan rasa curiga yang muncul justru di tengah keakraban.',
      en: 'Beautiful and a little unsettling at once: music, the sea, and suspicion creeping in right at the moment of closeness.',
    },
    chars: [
      { k: 1, name: 'Toshihide', desc: { id: 'Anak yang bermain piano di dasar laut.', en: 'The boy who plays piano on the seabed.' } },
      { k: 2, name: 'Shiju', desc: { id: 'Putri duyung yang belajar piano darinya.', en: 'The mermaid who learns piano from him.' } },
    ],
    themes: { id: ['Putri duyung', 'Musik', 'Laut', 'Rasa takut'], en: ['Mermaids', 'Music', 'The sea', 'Fear'] },
    animeDesigner: '島崎望',
  },
  woke: {
    vol: '22-26', no: 2, year: 2017, img: 'woke', site: null, pv: 'lsPRjhI-NLQ',
    title: 'Woke-Up-as-a-Girl Syndrome', short: 'Woke-Up-as-a-Girl',
    jp: '目が覚めたら女の子になっていた病', romaji: 'Me ga Sametara Onnanoko ni Natteita Yamai',
    pub: { id: 'Akun Twitter Jump SQ (rilis terbatas, 2017)', en: 'Jump SQ Twitter account (limited release, 2017)' },
    genre: { id: 'Drama, slice of life', en: 'Drama, slice of life' },
    lede: {
      id: 'Suatu pagi Toshihide bangun dalam tubuh perempuan. Penyakitnya tidak bisa disembuhkan; yang bisa ia ubah hanyalah cara menghadapinya.',
      en: 'One morning Toshihide wakes up in a girl’s body. The condition can’t be cured; the only thing he can change is how he faces it.',
    },
    synopsis: {
      id: [
        'Setelah divonis mengidap penyakit yang tidak bisa disembuhkan, Toshihide dijauhi dan diganggu teman sekelas, dan hubungannya dengan pacarnya, Rie, jadi serba canggung.',
        'Perasaannya pada kakak Rie, Akira, ikut berubah. Pelan-pelan ia belajar menghadapi masalahnya secara langsung dan mendefinisikan ulang dirinya.',
      ],
      en: [
        'Diagnosed with an incurable condition, Toshihide is shunned and harassed by classmates, and things with his girlfriend, Rie, become awkward.',
        'His feelings toward Rie’s older brother, Akira, begin to shift too. Slowly he learns to face his problems head-on and redefine who he is.',
      ],
    },
    why: {
      id: 'Tema identitas dan tubuh dibawakan dengan jujur dan canggung, tanpa ceramah. Salah satu cerita paling personal di koleksi ini.',
      en: 'Identity and the body handled honestly and awkwardly, without preaching. One of the most personal stories in the collection.',
    },
    chars: [
      { k: 1, name: 'Toshihide', desc: { id: 'Bangun sebagai perempuan dan harus belajar menerima dirinya.', en: 'Wakes up as a girl and has to learn self-acceptance.' } },
      { k: 2, name: 'Rie', desc: { id: 'Pacar Toshihide yang ikut bingung harus bersikap bagaimana.', en: 'Toshihide’s girlfriend, unsure how she should act.' } },
    ],
    themes: { id: ['Identitas', 'Tubuh', 'Hubungan', 'Penerimaan diri'], en: ['Identity', 'The body', 'Relationships', 'Self-acceptance'] },
    animeDesigner: '徳岡紘平',
  },
  nayuta: {
    vol: '22-26', no: 3, year: 2015, img: 'nayuta', site: null, pv: '5RCgDfHGG9c',
    title: 'Nayuta of the Prophecy', short: 'Nayuta',
    jp: '予言のナユタ', romaji: 'Yogen no Nayuta',
    pub: { id: 'Jump SQ, edisi Agustus 2015', en: 'Jump SQ, August 2015 issue' },
    genre: { id: 'Fantasi gelap, drama keluarga', en: 'Dark fantasy, family drama' },
    lede: {
      id: 'Ia lahir bertanduk dan diramalkan akan mengakhiri dunia. Kakaknya tetap merawatnya.',
      en: 'She was born with horns and prophesied to end the world. Her brother cares for her anyway.',
    },
    synopsis: {
      id: [
        'Nayuta lahir dengan tanduk, tanpa jantung manusia, dan dengan suara yang terkutuk. Ramalan menyebut dialah yang akan membawa kehancuran dunia.',
        'Kakaknya, Kenji, merawatnya dengan setia sementara ketakutan orang-orang terus membesar, meski ia sendiri bergulat dengan apa sebenarnya adiknya itu.',
      ],
      en: [
        'Nayuta was born with horns, no human heart, and a cursed voice. A prophecy says she will bring about the end of the world.',
        'Her brother Kenji devotedly cares for her as public fear grows, even while he struggles with what his sister might really be.',
      ],
    },
    why: {
      id: 'Hubungan kakak-adik yang penuh pengabdian di tengah dunia yang ketakutan. Nayuta adalah gadis di cover jilid 22-26, dan nama "Nayuta" kelak dipakai lagi di Chainsaw Man.',
      en: 'A devoted sibling bond in a world gripped by fear. Nayuta is the girl on the 22-26 cover, and the name "Nayuta" later reappears in Chainsaw Man.',
    },
    chars: [
      { k: 1, name: 'Nayuta', desc: { id: 'Gadis bertanduk yang diramalkan mengakhiri dunia.', en: 'The horned girl prophesied to end the world.' } },
      { k: 2, name: 'Kenji', desc: { id: 'Kakak yang tidak pernah melepaskan adiknya.', en: 'The brother who never lets go of his sister.' } },
    ],
    themes: { id: ['Ramalan', 'Kakak-adik', 'Iblis', 'Ketakutan publik'], en: ['Prophecy', 'Siblings', 'Devils', 'Public fear'] },
    animeDesigner: '東島久志',
  },
  sisters: {
    vol: '22-26', no: 4, year: 2018, img: 'sisters', site: null, pv: 'm0WFcaNcwgg',
    title: 'Sisters', short: 'Sisters',
    jp: '妹の姉', romaji: 'Imōto no Ane',
    pub: { id: 'Jump SQ (2018)', en: 'Jump SQ (2018)' },
    genre: { id: 'Drama, komedi', en: 'Drama, comedy' },
    lede: {
      id: 'Kakaknya memenangkan lomba lukis. Lukisannya: sang adik tanpa busana, dipajang di sekolah selama setahun.',
      en: 'Her older sister wins an art prize. The painting: her little sister in the nude, hung at school for a whole year.',
    },
    synopsis: {
      id: [
        'Lukisan telanjang Mitsuko karya kakaknya, Kyōko, memenangkan penghargaan tertinggi dan dipajang di sekolah selama setahun penuh.',
        'Dipermalukan dan diejek tanpa henti, Mitsuko bersumpah membuat kakaknya merasakan penderitaan yang sama.',
      ],
      en: [
        'A nude portrait of Mitsuko painted by her older sister, Kyōko, wins the top prize and is displayed at their school for a full year.',
        'Humiliated and teased without end, Mitsuko vows to make her sister suffer the same way.',
      ],
    },
    why: {
      id: 'Cerita tentang seni, rasa malu, dan persaingan saudara. Banyak pembaca menganggapnya "saudara dekat" Look Back karena sama-sama membahas dua orang yang terhubung lewat menggambar.',
      en: 'A story about art, shame, and sibling rivalry. Many readers see it as a close relative of Look Back, since both are about two people bound together by drawing.',
    },
    chars: [
      { k: 1, name: 'Mitsuko', desc: { id: 'Adik yang menjadi objek lukisan dan bahan ejekan.', en: 'The younger sister who becomes the painting’s subject and a target of mockery.' } },
      { k: 2, name: 'Kyōko', desc: { id: 'Kakak berbakat yang lukisannya memenangkan penghargaan.', en: 'The gifted older sister whose painting wins the prize.' } },
    ],
    themes: { id: ['Seni', 'Kakak-adik', 'Rasa malu', 'Persaingan'], en: ['Art', 'Siblings', 'Shame', 'Rivalry'] },
    animeDesigner: '佐川遥',
  },
};

// Links are relative to the language root (home page of that language).
export const trivia = {
  id: [
    'Judul kedua jilid adalah umur Fujimoto ketika menggambar cerita-cerita di dalamnya.',
    '<a href="17-21/#niwatori" data-pv="niwatori">Niwatori</a> (2011) adalah karya tertua di koleksi ini.',
    '<a href="17-21/#sasaki" data-pv="sasaki">Sasaki Stopped a Bullet</a> dan <a href="17-21/#love" data-pv="love">Love Is Blind</a> sama-sama berasal dari lomba Crown Jump SQ tahun 2013.',
    '<a href="22-26/#woke" data-pv="woke">Woke-Up-as-a-Girl Syndrome</a> awalnya dirilis lewat akun Twitter Jump SQ.',
    'Gadis bertanduk di cover 22-26 adalah <a href="22-26/#nayuta" data-pv="nayuta">Nayuta</a>.',
    'Anime <i>藤本タツキ 17-26</i> dikerjakan oleh enam studio dan tujuh sutradara.',
  ],
  en: [
    'Both volume titles are the ages Fujimoto was when he drew the stories inside.',
    '<a href="17-21/#niwatori" data-pv="niwatori">Niwatori</a> (2011) is the oldest work in the collection.',
    '<a href="17-21/#sasaki" data-pv="sasaki">Sasaki Stopped a Bullet</a> and <a href="17-21/#love" data-pv="love">Love Is Blind</a> both came out of Jump SQ’s Crown contest in 2013.',
    '<a href="22-26/#woke" data-pv="woke">Woke-Up-as-a-Girl Syndrome</a> was first released through Jump SQ’s Twitter account.',
    'The horned girl on the 22-26 cover is <a href="22-26/#nayuta" data-pv="nayuta">Nayuta</a>.',
    'The <i>藤本タツキ 17-26</i> anime was made by six studios and seven directors.',
  ],
};

export const anime = {
  title: '藤本タツキ 17-26',
  trailer: 'xDsN2cmAlhQ', // official trailer (予告編), avex pictures
  text: {
    id: 'Kedelapan one-shot ini diadaptasi menjadi anime antologi berjudul 藤本タツキ 17-26: satu cerita per episode, dikerjakan enam studio dan tujuh sutradara. Anime ini diputar terbatas di bioskop Jepang mulai 17 Oktober 2025, lalu tayang global di Prime Video sejak 8 November 2025.',
    en: 'All eight one-shots were adapted into an anthology anime titled 藤本タツキ 17-26: one story per episode, made by six studios and seven directors. It had a limited theatrical run in Japan from October 17, 2025, then premiered worldwide on Prime Video on November 8, 2025.',
  },
  volText: {
    id: 'Keempat cerita di jilid ini termasuk dalam anime antologi <i>藤本タツキ 17-26</i> (2025), yang diputar terbatas di bioskop Jepang mulai 17 Oktober 2025 lalu tayang global di Prime Video sejak 8 November 2025.',
    en: 'All four stories in this volume are part of the anthology anime <i>藤本タツキ 17-26</i> (2025), which had a limited theatrical run in Japan from October 17, 2025 and premiered worldwide on Prime Video on November 8, 2025.',
  },
};

export const author = {
  born: { id: '10 Oktober 1992, Akita, Jepang', en: 'October 10, 1992, Akita, Japan' },
  works: '<i>Fire Punch</i> (2016–2018), <i>Chainsaw Man</i> (2018–), <i>Look Back</i> (2021), <i>Goodbye, Eri</i> (2022)',
};

// Interface strings
export const ui = {
  id: {
    home: 'Beranda', skip: 'Lewati ke konten', main: 'Utama', search: 'Cari', searchLabel: 'Cari artikel',
    searchPh: 'Cari judul, tokoh, tema, tahun…', searchSr: 'Cari judul, tokoh, tema, atau tahun',
    hintPick: '↑↓ pilih', hintOpen: 'Enter buka', hintClose: 'Esc tutup', searchDlg: 'Pencarian',
    noResults: 'Tidak ada hasil. Coba "ayam", "piano", atau "2015".',
    gallery: 'Galeri', prev: 'Sebelumnya', next: 'Berikutnya', close: 'Tutup', toTop: 'Kembali ke atas',
    fanSite: 'Fan wiki non-resmi.', credits: 'Cover © Tatsuki Fujimoto / Shueisha. Key visual &amp; karakter anime © 藤本タツキ／集英社・「藤本タツキ 17-26」製作委員会. Digunakan untuk keperluan ulasan.',
    toc: 'Daftar isi', anchor: 'Tautan ke bagian', vol: 'Jilid', volCover: 'Cover jilid', infobox: 'Info ringkas',
    summary: 'Ringkasan', contents: 'Isi jilid', contentsHint: 'Klik salah satu untuk melompat ke perkenalannya di halaman ini.',
    timeline: 'Garis waktu', cover: 'Cover', zoomCover: 'Perbesar cover →', animeSec: 'Adaptasi anime', seeAlso: 'Lihat juga',
    otherVol: 'Jilid lain', portal: 'Portal', portalHome: 'Beranda', inside: 'Isi',
    year: 'Tahun', published: 'Terbit', genre: 'Genre', why: 'Kenapa menarik:', kvAnime: 'key visual anime', kvAlt: 'Key visual anime',
    soon: 'Situs khusus · segera hadir', soonTitle: 'Situs khusus one-shot ini sedang disiapkan', openSite: 'Buka situs',
    heroText: 'Sebelum gergaji mesin menyala, ada delapan cerita pendek. Situs ini mengenalkan dua kumpulannya, <i>17-21</i> dan <i>22-26</i>, secara singkat. Pilih salah satu jilid, tekan <kbd>/</kbd> untuk mencari, atau arahkan kursor ke tautan untuk melihat pratinjau.',
    openVol: 'Buka jilid', list: 'Daftar one-shot', random: 'One-shot acak', didYouKnow: 'Tahukah kamu?', about: 'Tentang situs ini',
    aboutText: 'Ini adalah halaman pengenalan. Setiap one-shot dikenalkan singkat di halaman jilidnya, dan ke depannya masing-masing akan punya situs khusus sendiri. Tautannya akan muncul di sini begitu situs itu siap.',
    filterVol: 'Filter jilid', all: 'Semua', title: 'Judul', seeIntro: 'Lihat perkenalannya', shuffle: 'Acak one-shot ↻',
    aboutAuthor: 'Tentang pengarang', born: 'Lahir', job: 'Profesi', jobVal: 'Mangaka', works: 'Karya', collections: 'Koleksi one-shot', stories: 'cerita',
    descHome: 'Pengenalan singkat dua kumpulan one-shot awal Tatsuki Fujimoto, 17-21 dan 22-26.',
    bbTitle: 'Sedang tayang', bbAria: 'Billboard one-shot', bbPrev: 'Slide sebelumnya', bbNext: 'Slide berikutnya',
    bbPause: 'Jeda putar otomatis', bbPlay: 'Lanjutkan putar otomatis', bbSlide: 'Tampilkan', bbOf: 'dari', bbTicker: 'Sedang tayang',
    archive: 'Arsip', archiveFull: 'Bagian dari Fujimoto Archive', archiveEntry: 'Lihat entri di Fujimoto Archive →',
    video: 'Video', trailer: 'Trailer resmi', pv: 'PV spesial', watch: 'Tonton', watchPv: 'Tonton PV', openYt: 'Buka di YouTube ↗',
    player: 'Pemutar video', ytNote: 'Video resmi dari channel YouTube avex pictures. Video baru dimuat setelah tombol putar diklik.',
  },
  en: {
    home: 'Home', skip: 'Skip to content', main: 'Main', search: 'Search', searchLabel: 'Search articles',
    searchPh: 'Search titles, characters, themes, years…', searchSr: 'Search titles, characters, themes, or years',
    hintPick: '↑↓ select', hintOpen: 'Enter open', hintClose: 'Esc close', searchDlg: 'Search',
    noResults: 'No results. Try "chicken", "piano", or "2015".',
    gallery: 'Gallery', prev: 'Previous', next: 'Next', close: 'Close', toTop: 'Back to top',
    fanSite: 'Unofficial fan wiki.', credits: 'Covers © Tatsuki Fujimoto / Shueisha. Anime key visuals &amp; characters © 藤本タツキ／集英社・「藤本タツキ 17-26」製作委員会. Used for review purposes.',
    toc: 'Contents', anchor: 'Link to section', vol: 'Volume', volCover: 'Cover of volume', infobox: 'Quick facts',
    summary: 'Overview', contents: 'In this volume', contentsHint: 'Click one to jump to its introduction on this page.',
    timeline: 'Timeline', cover: 'Cover', zoomCover: 'Enlarge cover →', animeSec: 'Anime adaptation', seeAlso: 'See also',
    otherVol: 'Other volume', portal: 'Portal', portalHome: 'Home', inside: 'Contents',
    year: 'Year', published: 'Published', genre: 'Genre', why: 'Why it stands out:', kvAnime: 'anime key visual', kvAlt: 'Anime key visual',
    soon: 'Dedicated site · coming soon', soonTitle: 'A dedicated site for this one-shot is in the works', openSite: 'Open the',
    heroText: 'Before the chainsaw roared, there were eight short stories. This site briefly introduces the two collections, <i>17-21</i> and <i>22-26</i>. Pick a volume, press <kbd>/</kbd> to search, or hover a link for a preview.',
    openVol: 'Open volume', list: 'One-shot list', random: 'Random one-shot', didYouKnow: 'Did you know?', about: 'About this site',
    aboutText: 'This is the introduction hub. Each one-shot gets a short introduction on its volume page, and each will eventually get its own dedicated site. Links will appear here as soon as those sites are ready.',
    filterVol: 'Filter by volume', all: 'All', title: 'Title', seeIntro: 'Read the introduction', shuffle: 'Random one-shot ↻',
    aboutAuthor: 'About the author', born: 'Born', job: 'Occupation', jobVal: 'Manga artist', works: 'Works', collections: 'One-shot collections', stories: 'stories',
    descHome: 'A short introduction to Tatsuki Fujimoto’s two early one-shot collections, 17-21 and 22-26.',
    bbTitle: 'Now showing', bbAria: 'One-shot billboard', bbPrev: 'Previous slide', bbNext: 'Next slide',
    bbPause: 'Pause autoplay', bbPlay: 'Resume autoplay', bbSlide: 'Show', bbOf: 'of', bbTicker: 'Now showing',
    archive: 'Archive', archiveFull: 'Part of the Fujimoto Archive', archiveEntry: 'See the entry in the Fujimoto Archive →',
    video: 'Videos', trailer: 'Official trailer', pv: 'Special PV', watch: 'Watch', watchPv: 'Watch PV', openYt: 'Open on YouTube ↗',
    player: 'Video player', ytNote: 'Official videos from the avex pictures YouTube channel. Nothing loads from YouTube until you press play.',
  },
};
