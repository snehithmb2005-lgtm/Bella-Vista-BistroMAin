/* ============================================================
   BELLA VISTA BISTRO — script.js
   All interactive features bundled for direct browser use
   ============================================================ */

// ─────────────────────────────────────────────
// MENU DATA
// ─────────────────────────────────────────────
const MENU_ITEMS = [
    { id: 1, name: 'Burrata Truffle Crostini', cat: 'antipasti', tags: ['vegetarian'], price: '$28', img: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=600&q=80', desc: 'Creamy Pugliese burrata on toasted sourdough, black truffle shavings, aged balsamic.', wine: 'Soave Classico 2021', nutr: { cal: 320, fat: '18g', carb: '22g', prot: '12g' } },
    { id: 2, name: 'Carpaccio di Manzo', cat: 'antipasti', tags: ['gluten-free'], price: '$34', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80', desc: 'Thinly sliced prime beef tenderloin, arugula, Parmigiano Reggiano, lemon oil.', wine: 'Barolo DOCG 2019', nutr: { cal: 210, fat: '12g', carb: '4g', prot: '22g' } },
    { id: 3, name: 'Octopus "Alla Griglia"', cat: 'antipasti', tags: ['gluten-free'], price: '$38', img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80', desc: 'Char-grilled Galician octopus, Calabrian chilli, potato cream, micro herbs.', wine: 'Vermentino di Sardegna 2022', nutr: { cal: 260, fat: '9g', carb: '18g', prot: '28g' } },
    { id: 4, name: 'Cacio e Pepe Classico', cat: 'pasta', tags: ['vegetarian'], price: '$32', img: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=600&q=80', desc: 'Hand-rolled tonnarelli, aged Pecorino Romano, Parmigiano, generous black pepper.', wine: 'Frascati Superiore 2021', nutr: { cal: 520, fat: '19g', carb: '68g', prot: '18g' }, badge: 'seasonal' },
    { id: 5, name: 'Tagliatelle al Ragù', cat: 'pasta', tags: [], price: '$36', img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&q=80', desc: 'Egg pasta, slow-braised Bolognese of veal & pork, nutmeg, red Lambrusco reduction.', wine: 'Sangiovese di Romagna 2020', nutr: { cal: 580, fat: '24g', carb: '62g', prot: '32g' } },
    { id: 6, name: 'Lobster Linguine', cat: 'pasta', tags: ['gluten-free'], price: '$58', img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80', desc: 'Saffron linguine, Breton lobster, garlic, cherry tomato, white wine bisque.', wine: 'Gavi di Gavi DOCG 2022', nutr: { cal: 490, fat: '16g', carb: '56g', prot: '38g' }, badge: 'new' },
    { id: 7, name: 'Bistecca Fiorentina', cat: 'mains', tags: ['gluten-free'], price: '$92', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80', desc: '900g Chianina T-bone, aged 45 days, grilled over vine wood, rosemary butter, Maldon salt.', wine: 'Brunello di Montalcino 2017', nutr: { cal: 840, fat: '52g', carb: '2g', prot: '88g' } },
    { id: 8, name: 'Branzino in Crosta di Sale', cat: 'mains', tags: ['gluten-free'], price: '$64', img: 'https://images.unsplash.com/photo-1519708227418-a8a552bfe992?w=600&q=80', desc: 'Mediterranean seabass baked in Sicilian sea salt crust, fennel, lemon, capers.', wine: 'Greco di Tufo 2021', nutr: { cal: 380, fat: '14g', carb: '8g', prot: '52g' } },
    { id: 9, name: 'Risotto al Tartufo Nero', cat: 'mains', tags: ['vegetarian', 'gluten-free'], price: '$54', img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80', desc: 'Carnaroli risotto, Umbrian black truffle, triple-butter mount, 36-month Parmigiano.', wine: 'Sagrantino di Montefalco 2018', nutr: { cal: 560, fat: '28g', carb: '58g', prot: '16g' }, badge: 'seasonal' },
    { id: 10, name: 'Panna Cotta alla Vaniglia', cat: 'dolci', tags: ['vegetarian', 'gluten-free'], price: '$18', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80', desc: 'Madagascan vanilla panna cotta, wild strawberry coulis, crystallised rose petals.', wine: 'Moscato d\'Asti DOCG 2023', nutr: { cal: 310, fat: '20g', carb: '28g', prot: '5g' } },
    { id: 11, name: 'Tiramisù del Chef', cat: 'dolci', tags: ['vegetarian'], price: '$22', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80', desc: 'Classic Savoiardi, estate espresso, Marsala-whipped mascarpone, Valrhona cocoa.', wine: 'Vin Santo del Chianti 2018', nutr: { cal: 420, fat: '26g', carb: '36g', prot: '9g' } },
    { id: 12, name: 'Cannoli Siciliani', cat: 'dolci', tags: ['vegetarian'], price: '$16', img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80', desc: 'Crisp fried shells, sheep\'s milk ricotta, candied orange peel, Bronte pistachios.', wine: 'Passito di Pantelleria 2020', nutr: { cal: 340, fat: '18g', carb: '38g', prot: '9g' } }
];

const GALLERY_IMGS = [
    { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80', label: 'The Kitchen' },
    { src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80', label: 'Wine Cellar' },
    { src: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=600&q=80', label: 'Truffle Risotto' },
    { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', label: 'Signature Plating' },
    { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80', label: 'The Dining Room' },
    { src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80', label: 'Dolci Selection' }
];

const CONCIERGE_REPLIES = {
    default: ["I'd be happy to help! Could you tell me more?", "Of course! Our team will take care of everything for you.", "Wonderful choice! Let me connect you with our sommelier.", "Certainly! We love personalising your experience."],
    hours: "We're open Mon–Fri 6–11 PM and Sat–Sun 5:30–11:30 PM.",
    reserve: "You can reserve directly on this page — scroll down to 'Reservations'. I can also note any special requirements for you!",
    menu: "Our menu celebrated Italian tradition with modern artistry. Highlights include our Bistecca Fiorentina, Lobster Linguine, and the legendary Truffle Risotto.",
    wine: "Our sommelier Adriana curates pairings from our 1,200-bottle cellar. Every dish on our menu comes with a recommended pairing.",
    park: "We offer complimentary valet parking for all dinner guests.",
    veg: "Absolutely! We have dedicated vegetarian and vegan preparations. Please mention at booking and our chefs will create a bespoke experience for you.",
    dress: "Smart elegant — jackets preferred for gentlemen. We want you to feel wonderful!"
};

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function $(s, ctx) { return (ctx || document).querySelector(s); }
function $$(s, ctx) { return [...(ctx || document).querySelectorAll(s)]; }

// ─────────────────────────────────────────────
// 1. CURSOR
// ─────────────────────────────────────────────
(function initCursor() {
    const dot = $('#cursor-dot');
    const ring = $('#cursor-ring');
    const trail = $('#cursor-trail');
    if (!dot) return;
    const ctx = trail.getContext('2d');
    let W = trail.width = innerWidth;
    let H = trail.height = innerHeight;
    let mx = W / 2, my = H / 2, rx = W / 2, ry = H / 2;
    const particles = [];

    addEventListener('resize', () => { W = trail.width = innerWidth; H = trail.height = innerHeight; });

    class P {
        constructor(x, y) {
            this.x = x; this.y = y; this.alpha = 1;
            this.r = Math.random() * 3 + 1;
            this.vx = (Math.random() - .5) * 1.5;
            this.vy = (Math.random() - .5) * 1.5 - .4;
            this.life = 0; this.max = 28 + Math.random() * 22;
            this.c = Math.random() > .5 ? '#C5A059' : '#E6C875';
        }
        tick() { this.x += this.vx; this.y += this.vy; this.life++; this.alpha = 1 - this.life / this.max; }
        draw(c) { c.save(); c.globalAlpha = this.alpha * .7; c.fillStyle = this.c; c.shadowColor = this.c; c.shadowBlur = 4; c.beginPath(); c.arc(this.x, this.y, this.r, 0, Math.PI * 2); c.fill(); c.restore(); }
    }

    let lx = 0, ly = 0, frame = 0;
    addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px'; dot.style.top = my + 'px';
        if (frame % 2 === 0 && (Math.abs(mx - lx) > 2 || Math.abs(my - ly) > 2)) { particles.push(new P(mx, my)); if (particles.length > 80) particles.shift(); }
        lx = mx; ly = my; frame++;
        $$('.magnetic-btn').forEach(btn => {
            const r = btn.getBoundingClientRect();
            const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
            const dx = mx - cx, dy = my - cy, dist = Math.hypot(dx, dy);
            btn.style.transform = dist < 90 ? `translate(${dx * (1 - dist / 90) * 12 / dist}px,${dy * (1 - dist / 90) * 12 / dist}px)` : '';
        });
    });

    (function loop() {
        ctx.clearRect(0, 0, W, H);
        rx += (mx - rx) * .12; ry += (my - ry) * .12;
        ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].tick(); particles[i].draw(ctx);
            if (particles[i].life >= particles[i].max) particles.splice(i, 1);
        }
        requestAnimationFrame(loop);
    })();

    $$('a,button,.menu-card,.vip-card,.gallery-item,.filter-btn').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
})();

// ─────────────────────────────────────────────
// 2. LOADING SCREEN
// ─────────────────────────────────────────────
const loadingScreen = $('#loading-screen');
addEventListener('load', () => { setTimeout(() => { loadingScreen.classList.add('hidden'); init(); }, 2700); });

// ─────────────────────────────────────────────
// 3. MAIN INIT
// ─────────────────────────────────────────────
function init() {
    setGreeting();
    initNav();
    initOrbCanvas();
    initGlitch();
    initTicker();
    initScrollReveal();
    initMenu();
    initGallery();
    initTestimonials();
    initStarCanvas();
    initReservation();
    initConcierge();
    initAudio();
    initEasterEgg();
    initExitPopup();
    initSocialProof();
    initMobileMenu();
}

// ─────────────────────────────────────────────
// GREETING
// ─────────────────────────────────────────────
function setGreeting() {
    const h = new Date().getHours();
    const g = $('#hero-greeting');
    if (!g) return;
    if (h >= 5 && h < 12) g.textContent = 'Good Morning';
    else if (h >= 12 && h < 17) g.textContent = 'Good Afternoon';
    else if (h >= 17 && h < 21) g.textContent = 'Good Evening';
    else g.textContent = 'Good Night';
}

// ─────────────────────────────────────────────
// NAV SCROLL
// ─────────────────────────────────────────────
function initNav() {
    const nav = $('#main-nav');
    addEventListener('scroll', () => { nav.classList.toggle('scrolled', scrollY > 60); });
    const langBtn = $('#lang-toggle');
    let it = false;
    if (langBtn) langBtn.addEventListener('click', () => {
        it = !it;
        langBtn.textContent = it ? '🇬🇧 ENG' : '🇮🇹 ITA';
    });
}

// ─────────────────────────────────────────────
// MOBILE MENU
// ─────────────────────────────────────────────
function initMobileMenu() {
    const ham = $('#nav-hamburger');
    const mob = $('#mobile-menu');
    if (!ham || !mob) return;
    ham.addEventListener('click', () => { mob.classList.toggle('open'); });
    $$('.mob-link').forEach(l => l.addEventListener('click', () => mob.classList.remove('open')));
}

// ─────────────────────────────────────────────
// ORB CANVAS (floating gold balls)
// ─────────────────────────────────────────────
function initOrbCanvas() {
    const c = $('#orb-canvas'); if (!c) return;
    const ctx = c.getContext('2d');
    let W = c.width = innerWidth, H = c.height = innerHeight;
    addEventListener('resize', () => { W = c.width = innerWidth; H = c.height = innerHeight; });
    const orbs = Array.from({ length: 10 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 60 + 20,
        vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
        alpha: Math.random() * .12 + .03,
        hue: Math.random() * 30 + 30
    }));
    (function loopOrb() {
        ctx.clearRect(0, 0, W, H);
        orbs.forEach(o => {
            o.x += o.vx; o.y += o.vy;
            if (o.x < -o.r) o.x = W + o.r; if (o.x > W + o.r) o.x = -o.r;
            if (o.y < -o.r) o.y = H + o.r; if (o.y > H + o.r) o.y = -o.r;
            const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
            g.addColorStop(0, `hsla(${o.hue},70%,55%,${o.alpha})`);
            g.addColorStop(1, 'transparent');
            ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        });
        requestAnimationFrame(loopOrb);
    })();
}

// ─────────────────────────────────────────────
// GLITCH EFFECT
// ─────────────────────────────────────────────
function initGlitch() {
    const el = $('#hero-brand'); if (!el) return;
    setInterval(() => {
        el.classList.add('glitching');
        setTimeout(() => el.classList.remove('glitching'), 350);
    }, 5000);
}

// ─────────────────────────────────────────────
// TICKER
// ─────────────────────────────────────────────
function initTicker() {
    // CSS handles it — nothing needed
}

// ─────────────────────────────────────────────
// SCROLL REVEAL
// ─────────────────────────────────────────────
function initScrollReveal() {
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: .15 });
    $$('.fade-in').forEach(el => io.observe(el));
}

// ─────────────────────────────────────────────
// MENU
// ─────────────────────────────────────────────
let recentlyViewed = [];
let favorites = JSON.parse(localStorage.getItem('bvb_favs') || '[]');

function initMenu() {
    renderMenu('all');
    $$('.filter-btn').forEach(btn => btn.addEventListener('click', function () {
        $$('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderMenu(this.dataset.filter);
    }));
}

function renderMenu(filter) {
    const grid = $('#menu-grid'); if (!grid) return;
    let items = MENU_ITEMS;
    if (filter !== 'all') items = MENU_ITEMS.filter(i => i.cat === filter || i.tags.includes(filter));
    if (items.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--text-muted);font-size:.9rem">No items in this category.</div>`;
        return;
    }
    grid.innerHTML = items.map(item => `
    <div class="menu-card" data-id="${item.id}">
      <div class="menu-card-img-wrap">
        <img class="menu-card-img" src="${item.img}" alt="${item.name}" loading="lazy"/>
        <div class="menu-card-badges">
          ${item.badge === 'seasonal' ? '<span class="menu-badge seasonal">🍂 Seasonal</span>' : ''}
          ${item.tags.includes('vegetarian') ? '<span class="menu-badge veg">🌿 Veg</span>' : ''}
          ${item.tags.includes('gluten-free') ? '<span class="menu-badge gf">🌾 GF</span>' : ''}
          ${item.badge === 'new' ? '<span class="menu-badge new">✨ New</span>' : ''}
        </div>
        <button class="menu-fav${favorites.includes(item.id) ? ' liked' : ''}" data-id="${item.id}" title="Save to favourites">${favorites.includes(item.id) ? '❤️' : '🤍'}</button>
      </div>
      <div class="menu-card-body">
        <div class="menu-card-cat">${item.cat.charAt(0).toUpperCase() + item.cat.slice(1)}</div>
        <div class="menu-card-name">${item.name}</div>
        <div class="menu-card-desc">${item.desc}</div>
        <div class="menu-card-footer">
          <div class="menu-price">${item.price}</div>
          <div class="menu-actions">
            <button class="menu-action-btn" title="Wine pairing">🍷
              <div class="action-tip"><strong>🍷 Sommelier's Choice</strong>${item.wine}<em>— Adriana's recommendation</em></div>
            </button>
            <button class="menu-action-btn" title="Nutrition">📊
              <div class="action-tip"><strong>📊 Nutrition (per serving)</strong>
                <div style="margin-top:6px">Cal: ${item.nutr.cal} · Fat: ${item.nutr.fat} · Carbs: ${item.nutr.carb} · Protein: ${item.nutr.prot}</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

    // Fav buttons
    $$('.menu-fav').forEach(btn => btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const id = +this.dataset.id;
        if (favorites.includes(id)) {
            favorites = favorites.filter(f => f !== id);
            this.textContent = '🤍'; this.classList.remove('liked');
        } else {
            favorites.push(id);
            this.textContent = '❤️'; this.classList.add('liked');
            this.style.transform = 'scale(1.4)';
            setTimeout(() => this.style.transform = '', 300);
        }
        localStorage.setItem('bvb_favs', JSON.stringify(favorites));
    }));

    // Recently viewed
    $$('.menu-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            const id = +this.dataset.id;
            const item = MENU_ITEMS.find(i => i.id === id);
            if (!item) return;
            recentlyViewed = recentlyViewed.filter(r => r !== item.name);
            recentlyViewed.unshift(item.name);
            if (recentlyViewed.length > 3) recentlyViewed = recentlyViewed.slice(0, 3);
            updateRecentlyViewed();
        });
    });

    // Re-observe hover elements for cursor
    $$('.menu-card,.menu-fav,.menu-action-btn').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
}

function updateRecentlyViewed() {
    const wrap = $('#recently-viewed'), items = $('#rv-items');
    if (!wrap || !items) return;
    wrap.style.display = 'block';
    items.innerHTML = recentlyViewed.map(n => `<div class="rv-chip">${n}</div>`).join('');
}

// ─────────────────────────────────────────────
// GALLERY
// ─────────────────────────────────────────────
function initGallery() {
    const grid = $('#gallery-grid'); if (!grid) return;
    grid.innerHTML = GALLERY_IMGS.map(g => `
    <div class="gallery-item fade-in">
      <img src="${g.src}" alt="${g.label}" loading="lazy"/>
      <div class="gallery-overlay"><div class="gallery-overlay-text">${g.label}</div></div>
    </div>
  `).join('');
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: .1 });
    $$('.gallery-item').forEach(el => {
        io.observe(el);
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
}

// ─────────────────────────────────────────────
// TESTIMONIALS CAROUSEL
// ─────────────────────────────────────────────
function initTestimonials() {
    const cards = $$('.testimonial-card');
    const dotsWrap = $('#t-dots');
    if (!cards.length || !dotsWrap) return;
    let cur = 0;
    dotsWrap.innerHTML = cards.map((_, i) => `<div class="t-dot${i === 0 ? ' active' : ''}" data-i="${i}"></div>`).join('');
    const dots = $$('.t-dot');
    function show(idx) {
        cards[cur].classList.remove('active'); dots[cur].classList.remove('active');
        cur = idx; cards[cur].classList.add('active'); dots[cur].classList.add('active');
    }
    dots.forEach(d => d.addEventListener('click', () => show(+d.dataset.i)));
    setInterval(() => show((cur + 1) % cards.length), 5000);
}

// ─────────────────────────────────────────────
// STAR CANVAS (floating gold stars behind testimonials)
// ─────────────────────────────────────────────
function initStarCanvas() {
    const c = $('#star-canvas'); if (!c) return;
    const ctx = c.getContext('2d');
    const sec = $('#testimonials');
    let W = c.width = sec.offsetWidth, H = c.height = sec.offsetHeight;
    addEventListener('resize', () => { W = c.width = sec.offsetWidth; H = c.height = sec.offsetHeight; });
    const stars = Array.from({ length: 60 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.2 + .3, vy: -(Math.random() * .4 + .1), alpha: Math.random() }));
    (function loop() {
        ctx.clearRect(0, 0, W, H);
        stars.forEach(s => {
            s.y += s.vy; if (s.y < 0) s.y = H;
            ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(197,160,89,${s.alpha * .5})`; ctx.fill();
        });
        requestAnimationFrame(loop);
    })();
}

// ─────────────────────────────────────────────
// RESERVATION FORM
// ─────────────────────────────────────────────
function initReservation() {
    const form = $('#reservation-form'); if (!form) return;

    // Set min date to today
    const dateInput = $('#res-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = $('#res-name').value.trim();
        const email = $('#res-email').value.trim();
        const date = $('#res-date').value;
        const time = $('#res-time').value;
        const guests = $('#res-guests').value;
        if (!name || !email || !date || !time || !guests) {
            $$('.form-underline').forEach(u => u.style.background = 'var(--wine)');
            setTimeout(() => $$('.form-underline').forEach(u => u.style.background = ''), 2000);
            return;
        }
        const btn = $('#reservation-form .btn-primary');
        btn.querySelector('span').textContent = '✓ Confirmed!';
        btn.style.background = 'linear-gradient(135deg,#4CAF50,#388E3C)';
        const occasion = $('#res-occasion').value;
        launchConfetti(occasion === 'birthday' || occasion === 'anniversary' || occasion === 'proposal');
        setTimeout(() => {
            btn.querySelector('span').textContent = 'Confirm Reservation';
            btn.style.background = '';
            form.reset();
        }, 4000);
    });
}

// ─────────────────────────────────────────────
// CONFETTI
// ─────────────────────────────────────────────
function launchConfetti(special = false) {
    const c = $('#confetti-canvas'); if (!c) return;
    const ctx = c.getContext('2d');
    c.width = c.parentElement.offsetWidth; c.height = c.parentElement.offsetHeight;
    const pieces = [];
    const count = special ? 200 : 100;
    const colors = special
        ? ['#C5A059', '#E6C875', '#ff69b4', '#FFD700', '#fff', '#ff4500']
        : ['#C5A059', '#E6C875', '#F0EAD6', '#9B7B3A', '#fff'];
    for (let i = 0; i < count; i++) pieces.push({
        x: Math.random() * c.width, y: -10,
        w: Math.random() * 8 + 4, h: Math.random() * 14 + 6,
        r: Math.random() * Math.PI * 2,
        vx: (Math.random() - .5) * 4, vy: Math.random() * 4 + 2,
        vr: (Math.random() - .5) * .15,
        col: colors[Math.floor(Math.random() * colors.length)]
    });
    let frame = 0;
    function draw() {
        ctx.clearRect(0, 0, c.width, c.height);
        pieces.forEach(p => {
            p.x += p.vx; p.y += p.vy; p.r += p.vr; p.vy += .05;
            ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
            ctx.fillStyle = p.col; ctx.globalAlpha = Math.max(0, 1 - frame / 90);
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });
        frame++;
        if (frame < 100) requestAnimationFrame(draw);
        else ctx.clearRect(0, 0, c.width, c.height);
    }
    draw();
}

// ─────────────────────────────────────────────
// AUDIO
// ─────────────────────────────────────────────
let audioCtx = null, gainNode = null, muted = true;
function initAudio() {
    const btn = $('#sound-toggle');
    const onI = $('#sound-on-icon'), offI = $('#sound-off-icon');
    if (!btn) return;
    btn.addEventListener('click', () => {
        if (muted) {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                gainNode = audioCtx.createGain(); gainNode.gain.value = 0; gainNode.connect(audioCtx.destination);
                [130.81, 164.81, 196, 246.94].forEach((f, i) => {
                    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.type = i % 2 === 0 ? 'sine' : 'triangle'; o.frequency.value = f;
                    g.gain.value = .018; o.connect(g); g.connect(gainNode); o.start();
                });
            }
            gainNode.gain.linearRampToValueAtTime(.18, audioCtx.currentTime + 2);
            muted = false; onI.style.display = 'block'; offI.style.display = 'none';
        } else {
            gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.5);
            muted = true; onI.style.display = 'none'; offI.style.display = 'block';
        }
    });
}

function playChime() {
    if (muted || !audioCtx) return;
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.connect(g); g.connect(audioCtx.destination);
    o.type = 'sine'; o.frequency.value = 880;
    o.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + .4);
    g.gain.setValueAtTime(.1, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(.001, audioCtx.currentTime + .5);
    o.start(); o.stop(audioCtx.currentTime + .5);
}

// ─────────────────────────────────────────────
// CONCIERGE CHAT
// ─────────────────────────────────────────────
function initConcierge() {
    const bubble = $('#chat-bubble'), win = $('#chat-window'), close = $('#chat-close');
    const input = $('#chat-input'), send = $('#chat-send'), msgs = $('#chat-messages');
    if (!bubble) return;
    bubble.addEventListener('click', () => { win.style.display = win.style.display === 'none' ? 'flex' : 'none'; win.style.flexDirection = 'column'; });
    close.addEventListener('click', () => win.style.display = 'none');
    function addMsg(text, who) {
        const d = document.createElement('div'); d.className = `chat-msg ${who}`; d.textContent = text;
        msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
    }
    function reply(msg) {
        const l = msg.toLowerCase();
        let r;
        if (l.includes('hour') || l.includes('open') || l.includes('clos')) r = CONCIERGE_REPLIES.hours;
        else if (l.includes('reserv') || l.includes('book') || l.includes('table')) r = CONCIERGE_REPLIES.reserve;
        else if (l.includes('menu') || l.includes('dish') || l.includes('food') || l.includes('eat')) r = CONCIERGE_REPLIES.menu;
        else if (l.includes('wine') || l.includes('drink') || l.includes('sommelier')) r = CONCIERGE_REPLIES.wine;
        else if (l.includes('park')) r = CONCIERGE_REPLIES.park;
        else if (l.includes('veg') || l.includes('vegan') || l.includes('plant')) r = CONCIERGE_REPLIES.veg;
        else if (l.includes('dress') || l.includes('attire') || l.includes('wear')) r = CONCIERGE_REPLIES.dress;
        else { const arr = CONCIERGE_REPLIES.default; r = arr[Math.floor(Math.random() * arr.length)]; }
        setTimeout(() => addMsg(r, 'bot'), 700);
    }
    send.addEventListener('click', () => { const v = input.value.trim(); if (!v) return; addMsg(v, 'user'); reply(v); input.value = ''; });
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { const v = input.value.trim(); if (!v) return; addMsg(v, 'user'); reply(v); input.value = ''; } });
}

// ─────────────────────────────────────────────
// EASTER EGG — type "truffle" for truffle rain
// ─────────────────────────────────────────────
function initEasterEgg() {
    let typed = '';
    document.addEventListener('keydown', e => {
        typed = (typed + e.key.toLowerCase()).slice(-7);
        if (typed === 'truffle') truffleRain();
    });
}

function truffleRain() {
    const c = $('#easter-egg-canvas');
    c.style.display = 'block';
    const ctx = c.getContext('2d');
    c.width = innerWidth; c.height = innerHeight;
    const em = ['🍄', '🍄‍🟫', '🌰', '✨', '🍂'];
    const pieces = Array.from({ length: 60 }, () => ({
        x: Math.random() * c.width, y: -50,
        vy: Math.random() * 3 + 1, vx: (Math.random() - .5) * 1,
        size: Math.random() * 24 + 16, rot: Math.random() * Math.PI * 2,
        e: em[Math.floor(Math.random() * em.length)]
    }));
    let frame = 0;
    const label = '🍄 Truffle Rain! You found the Easter Egg!';
    function loop() {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.fillStyle = 'rgba(197,160,89,0.85)'; ctx.font = 'bold 18px Inter,sans-serif';
        ctx.textAlign = 'center'; ctx.fillText(label, c.width / 2, 50);
        pieces.forEach(p => {
            p.x += p.vx; p.y += p.vy; p.rot += .02;
            if (p.y > c.height + 60) p.y = -50;
            ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
            ctx.font = p.size + 'px serif'; ctx.fillText(p.e, 0, 0);
            ctx.restore();
        });
        frame++;
        if (frame < 300) requestAnimationFrame(loop);
        else { ctx.clearRect(0, 0, c.width, c.height); c.style.display = 'none'; }
    }
    loop();
}

// ─────────────────────────────────────────────
// EXIT INTENT POPUP
// ─────────────────────────────────────────────
function initExitPopup() {
    const pop = $('#exit-popup');
    const close = $('#exit-close');
    const reserveBtn = $('#exit-reserve-btn');
    if (!pop) return;
    let shown = false;
    document.addEventListener('mouseleave', e => {
        if (e.clientY < 5 && !shown) { pop.style.display = 'flex'; shown = true; }
    });
    if (close) close.addEventListener('click', () => pop.style.display = 'none');
    if (reserveBtn) reserveBtn.addEventListener('click', () => pop.style.display = 'none');
}

// ─────────────────────────────────────────────
// SOCIAL PROOF FLASH
// ─────────────────────────────────────────────
function initSocialProof() {
    const pop = $('#social-proof-pop'); if (!pop) return;
    const msgs = ['🍽 Someone just booked a table for 4', '🥂 A table for 2 was just reserved', '🌹 Romantic dinner for 2 just booked', '✨ Chef\'s Table reserved for tonight'];
    function flash() {
        pop.textContent = msgs[Math.floor(Math.random() * msgs.length)];
        pop.classList.add('visible');
        setTimeout(() => pop.classList.remove('visible'), 3500);
    }
    setTimeout(flash, 8000);
    setInterval(flash, 30000);
}
