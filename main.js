document.addEventListener('DOMContentLoaded', () => {
    const clk = document.getElementById('sys-time');
    const hdl = document.getElementById('window-drag-handle');
    const app = document.getElementById('app-window');

    const vIn = document.getElementById('view-input');
    const vScan = document.getElementById('view-analysis');
    const vRes = document.getElementById('view-result');

    const uIn = document.getElementById('url-input');
    const rBtn = document.getElementById('btn-roast');
    const rstBtn = document.getElementById('btn-reset');

    const mods = {
        sys: document.getElementById('modal-system'),
        net: document.getElementById('modal-network'),
        bin: document.getElementById('modal-recycle')
    };

    const ics = {
        sys: document.getElementById('icon-system'),
        net: document.getElementById('icon-network'),
        bin: document.getElementById('icon-recycle')
    };

    const bar = document.getElementById('scan-progress');
    const tLog = document.getElementById('terminal-output');
    const scr = document.getElementById('final-score');
    const rTxt = document.getElementById('roast-text');

    function updClock() {
        const d = new Date();
        let h = d.getHours();
        let m = d.getMinutes();
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12;
        h = h ? h : 12;
        m = m < 10 ? '0' + m : m;
        clk.textContent = `${h}:${m} ${ampm}`;
    }
    setInterval(updClock, 1000);
    updClock();

    let drag = false;
    let dx = 0;
    let dy = 0;

    function startDrag(e) {
        drag = true;
        const pointer = e.type.startsWith('touch') ? e.touches[0] : e;
        const r = app.getBoundingClientRect();
        dx = pointer.clientX - r.left;
        dy = pointer.clientY - r.top;
        app.style.transform = 'none';
        app.style.left = r.left + 'px';
        app.style.top = r.top + 'px';
    }

    hdl.addEventListener('mousedown', startDrag);
    hdl.addEventListener('touchstart', (e) => {
        startDrag(e);
    }, { passive: true });

    function onMove(e) {
        const pointer = e.type.startsWith('touch') ? e.touches[0] : e;
        if (drag) {
            app.style.left = (pointer.clientX - dx) + 'px';
            app.style.top = (pointer.clientY - dy) + 'px';
        }
        if (mDrag && activeM) {
            activeM.style.left = (pointer.clientX - mx) + 'px';
            activeM.style.top = (pointer.clientY - my) + 'px';
        }
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: true });

    document.addEventListener('mouseup', () => {
        drag = false;
        mDrag = false;
    });
    document.addEventListener('touchend', () => {
        drag = false;
        mDrag = false;
    });

    let mDrag = false;
    let activeM = null;
    let mx = 0;
    let my = 0;

    function startMDrag(e) {
        mDrag = true;
        activeM = e.target.closest('.modal');
        document.querySelectorAll('.window').forEach(w => w.style.zIndex = '50');
        activeM.style.zIndex = '150';
        const pointer = e.type.startsWith('touch') ? e.touches[0] : e;
        const r = activeM.getBoundingClientRect();
        mx = pointer.clientX - r.left;
        my = pointer.clientY - r.top;
        activeM.style.transform = 'none';
        activeM.style.left = r.left + 'px';
        activeM.style.top = r.top + 'px';
    }

    document.querySelectorAll('.modal-drag-handle').forEach(h => {
        h.addEventListener('mousedown', startMDrag);
        h.addEventListener('touchstart', startMDrag, { passive: true });
    });

    function showMod(n) {
        const m = mods[n];
        if (!m) return;
        if (m.classList.contains('hidden')) {
            const o = Math.floor(Math.random() * 40) - 20;
            m.classList.remove('hidden');
            m.style.transform = 'translate(-50%, -50%)';
            m.style.top = `calc(50% + ${o}px)`;
            m.style.left = `calc(50% + ${o}px)`;
            document.querySelectorAll('.window').forEach(w => w.style.zIndex = '50');
            m.style.zIndex = '150';
        } else {
            m.classList.add('hidden');
        }
    }

    ics.sys.addEventListener('click', () => showMod('sys'));

    ics.net.addEventListener('click', () => {
        const nm = mods.net;
        if (nm.classList.contains('hidden')) {
            showMod('net');
            const reps = nm.querySelectorAll('.network-reply');
            reps.forEach(r => r.classList.add('hidden'));
            setTimeout(() => reps[0].classList.remove('hidden'), 1500);
            setTimeout(() => reps[1].classList.remove('hidden'), 2500);
        } else {
            showMod('net');
        }
    });

    ics.bin.addEventListener('click', () => showMod('bin'));

    document.querySelectorAll('.modal-close').forEach(b => {
        b.addEventListener('mousedown', (e) => {
            e.stopPropagation();
        });
        b.addEventListener('click', (e) => {
            e.stopPropagation();
            const m = e.target.closest('.modal');
            m.classList.add('hidden');
        });
    });

    const eBtn = document.getElementById('btn-empty-recycle');
    const tLst = document.getElementById('recycle-list');
    const eMsg = document.getElementById('recycle-empty-msg');

    if (eBtn) {
        eBtn.addEventListener('click', () => {
            tLst.classList.add('hidden');
            eBtn.classList.add('hidden');
            eMsg.classList.remove('hidden');
            ics.bin.querySelector('.icon').textContent = '🗑️';
            ics.bin.style.opacity = '0.5';
        });
    }

    function swapV(v) {
        [vIn, vScan, vRes].forEach(x => {
            x.classList.remove('active');
            x.classList.add('hidden');
        });
        v.classList.remove('hidden');
        v.classList.add('active');
    }

    const roasts = [
        "I've seen ransomware with better UX than this. Did you write the CSS with your eyes closed, or do you just genuinely hate your users?",
        "Oh look, another identical SaaS template that promises to 'revolutionize workflow'. The only thing revolutionized here is my definition of disappointment.",
        "Your font hierarchy is a crime against typography. It looks like a ransom note compiled by a very confused junior developer.",
        "This DOM structure is so deeply nested it requires a caving expedition to find the actual content. A true masterpiece of spaghetti architecture.",
        "Ah, I see we're relying entirely on padding to hide the fact that this layout has zero structural integrity. Bold choice.",
        "This layout has that classic 'doing too much and still somehow saying nothing' energy. The hero looks confident, the content looks confused, and the spacing is just there trying to keep the peace.",
        "The CSS reads like someone discovered three new tricks in one night and refused to sleep until all of them were used. Bold experimentation, questionable outcomes.",
        "This page feels like a tutorial project that gained self-awareness halfway through and decided it was production-ready.",
        "The visual hierarchy is giving 'main character energy' while the actual CTA quietly hides in the background hoping nobody notices.",
        "This UI moves like it drank three coffees — fast animations everywhere — but somehow still feels slow when you're trying to actually do something.",
        "The layout looks clean until you start resizing the window and suddenly it's survival-of-the-fittest for the components.",
        "This design has strong 'trust the process' vibes, except the process never finished the last 20%.",
        "The DOM structure is so nested that debugging it feels like climbing down a ladder you're not sure goes back up.",
        "The typography says professional, the spacing says experimental, and the combined result says 'we'll refine this later'.",
        "This interface feels like it was optimized for screenshots first and user flow sometime later, maybe next sprint.",
        "The hover effects feel like they're trying to impress me instead of helping me understand what's clickable.",
        "This UI is one vague gradient away from becoming a startup pitch deck background.",
        "The responsive design technically works, but emotionally it seems unsure of itself.",
        "The padding is doing all the heavy lifting because the layout structure quietly resigned.",
        "The components look reusable until you realize each one behaves slightly differently for reasons unknown.",
        "The animations are smooth enough to distract you from the fact that the navigation logic is still thinking about its purpose.",
        "This feels like 'minimalism' interpreted as 'remove clarity until only vibes remain'.",
        "The grid system shows up occasionally like a guest star and then disappears again.",
        "This layout has the same energy as someone saying 'it works on my machine' with complete confidence.",
        "The CSS specificity battle in this file probably deserves a documentary.",
        "The hero section has more confidence than the entire product journey combined.",
        "The z-index values in this project probably go higher than anyone wants to admit.",
        "The site gives strong 'launch first, refactor later' vibes — and later hasn't arrived yet.",
        "The spacing between elements feels like awkward small talk — technically fine, slightly uncomfortable."
    ];

    rBtn.addEventListener('click', () => {
        const u = uIn.value.trim();

        if (!u) {
            uIn.style.borderColor = 'var(--clr-error)';
            setTimeout(() => { uIn.style.borderColor = 'var(--clr-border)'; }, 500);
            const emptyRoasts = [
                "A URL. You need to enter a URL. That's what the box is for.",
                "Roasting nothing. Bold approach. Unfortunately we require an actual website.",
                "The input field is lonely. It was put there for a reason. Please use it.",
                "We can't roast air. Type a URL. Any URL. Even a bad one — especially a bad one.",
                "No URL detected. We can't judge what doesn't exist. Yet."
            ];
            showRes(emptyRoasts[Math.floor(Math.random() * emptyRoasts.length)], 0);
            return;
        }

        let tgt = u;
        if (!tgt.startsWith('http://') && !tgt.startsWith('https://')) {
            tgt = 'https://' + tgt;
        }

        const valid = tgt.includes('.') && !tgt.includes(' ') && tgt.length > 8;

        if (!valid) {
            const junkRoasts = [
                `"${u}"? That's not a URL. That's a cry for help.`,
                `Ah yes, the famous website known as "${u}". My favorite place to find absolutely nothing.`,
                "Did your cat walk across the keyboard, or do you genuinely believe that's a valid web address?",
                "I'm a code analysis tool, not a cryptographer for your gibberish. Try an actual domain name.",
                "You're testing me, aren't you? Fine. I roast your typing skills: 0/10. Now enter a real URL."
            ];
            showRes(junkRoasts[Math.floor(Math.random() * junkRoasts.length)], 0);
            return;
        }

        swapV(vScan);
        goScan(tgt);
    });

    rstBtn.addEventListener('click', () => {
        uIn.value = '';
        bar.style.width = '0%';
        tLog.innerHTML = '> System recalibrating for more disappointment...';
        swapV(vIn);
    });

    function txtLog(m) {
        const li = document.createElement('li');
        li.textContent = '> ' + m;
        tLog.appendChild(li);
        tLog.parentElement.scrollTop = tLog.parentElement.scrollHeight;
    }

    function setP(p) {
        bar.style.width = p + '%';
    }

    async function goScan(u) {
        bar.style.width = '0%';
        tLog.innerHTML = '';
        txtLog('Initializing Gonki scanner...');

        const PRX = 'https://api.allorigins.win/get?url=';
        let html = null;

        setP(10);
        txtLog('Reaching out to target...');

        try {
            const ctrl = new AbortController();
            const t = setTimeout(() => ctrl.abort(), 12000);

            const res = await fetch(PRX + encodeURIComponent(u), { signal: ctrl.signal });
            clearTimeout(t);

            if (!res.ok) throw new Error('proxy error');
            const d = await res.json();
            html = d.contents;

            if (!html || html.length < 50) throw new Error('empty');
            txtLog('Target acquired. Parsing markup...');
        } catch (err) {
            setP(100);
            txtLog('Connection failed.');
            await delay(800);
            showRes(failRoast(u), 12);
            return;
        }

        setP(25);

        const p = new DOMParser();
        const doc = p.parseFromString(html, 'text/html');

        const finds = runFix(doc, u, txtLog, setP);

        setP(95);
        txtLog('Compiling insults...');
        await delay(600);
        setP(100);
        await delay(300);

        const { s, r } = makeRoast(finds, u);
        showRes(r, s);
    }

    function delay(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    function runFix(doc, url, log, set) {
        const f = {};

        log('Checking security...');
        f.noS = !url.startsWith('https://');
        set(32);

        log('Checking viewport...');
        f.noV = !doc.querySelector('meta[name="viewport"]');

        log('Inspecting title...');
        const t = doc.querySelector('title');
        const tt = t ? t.textContent.trim() : '';
        f.noT = !tt;
        f.badT = tt.length > 0 && (tt.length < 5 || tt.length > 70 || tt.toLowerCase() === 'home' || tt.toLowerCase() === 'index');
        f.tt = tt;
        set(45);

        log('Checking meta description...');
        const d = doc.querySelector('meta[name="description"]');
        f.noD = !d || !d.getAttribute('content') || d.getAttribute('content').trim().length < 10;

        log('Auditing images...');
        const imgs = doc.querySelectorAll('img');
        const noAlt = [...imgs].filter(i => !i.getAttribute('alt') && i.getAttribute('alt') !== '');
        f.alt = noAlt.length;
        f.tImg = imgs.length;
        set(58);

        log('Measuring structure...');
        const ds = doc.querySelectorAll('div').length;
        const sem = doc.querySelectorAll('header, main, nav, section, article, footer, aside').length;
        f.divs = ds;
        f.sem = sem;
        f.divObs = ds > 10 && sem === 0;
        f.divHvy = ds > 20 && ds / (sem + 1) > 8;
        set(68);

        log('Checking inline styles...');
        const ist = doc.querySelectorAll('[style]').length;
        f.ist = ist;
        f.istAbu = ist > 10;

        log('Auditing scripts...');
        const scs = doc.querySelectorAll('script[src]').length;
        f.scs = scs;
        f.scHvy = scs > 8;
        set(78);

        log('Checking headings...');
        const hs = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const emH = [...hs].filter(h => !h.textContent.trim());
        f.emH = emH.length;

        log('Checking H1s...');
        const h1s = doc.querySelectorAll('h1').length;
        f.mH1 = h1s > 1;
        f.h1c = h1s;
        f.nH1 = h1s === 0;
        set(86);

        log('Checking favicon...');
        f.noFav = !doc.querySelector('link[rel*="icon"]');

        log('Checking body styles...');
        f.bSty = doc.querySelectorAll('body link[rel="stylesheet"]').length;

        log('Checking tables...');
        const ts = doc.querySelectorAll('table').length;
        const gts = doc.querySelectorAll('table[role="grid"]').length;
        f.tbl = ts > 0 && (ts - gts) > 0;
        set(93);

        log('Finalizing...');

        return f;
    }

    function makeRoast(f, url) {
        let p = 0;
        const pts = [];

        if (f.noS) { p += 15; pts.push("http"); }
        if (f.noV) { p += 12; pts.push("mobile"); }
        if (f.noT || f.badT) { p += 8; pts.push("title"); }
        if (f.noD) { p += 8; pts.push("meta"); }
        if (f.alt > 0) { p += 10; pts.push("alt"); }
        if (f.divObs || f.divHvy) { p += 12; pts.push("divs"); }
        if (f.istAbu) { p += 8; pts.push("styles"); }
        if (f.scHvy) { p += 7; pts.push("js"); }
        if (f.mH1 || f.nH1) { p += 6; pts.push("h1"); }
        if (f.emH > 0) { p += 5; pts.push("empty"); }
        if (f.noFav) { p += 3; pts.push("favicon"); }
        if (f.tbl) { p += 8; pts.push("tables"); }

        const s = Math.max(2, 100 - p);

        const pool = {
            http: [
                "Serving over HTTP in 2024 is like leaving your front door wide open and then being surprised when people walk in.",
                "Your security protocol is effectively 'thoughts and prayers'.",
                "HTTPS isn't a premium feature, it's a basic survival requirement."
            ],
            mobile: [
                "Your site looks like it was designed exclusively for desktop monitors from 2005. Mobile users will love the horizontal scrolling marathon.",
                "No viewport tag? Are you trying to save bytes or just genuinely hate phones?",
                "Responsive design called. It said it misses you."
            ],
            title: [
                `"${f.tt || 'Untitled'}" — truly a masterclass in generic page naming. I'm sure SEO will love this absolute void of information.`,
                "Your page title has about as much personality as a damp sponge.",
                "A title is meant to summarize the page, not describe the developer's enthusiasm."
            ],
            meta: [
                "No meta description? I guess search engines should just use their imagination. It's probably better than the reality anyway.",
                "Your SEO strategy seems to be 'hide and seek', and you're winning.",
                "A meta description is like a first date. Yours is just silence."
            ],
            alt: [
                `${f.alt} images without alt text. Screen readers probably think this page is an abstract art gallery of 'image.jpg'.`,
                "Accessibility called. It's disappointed, but not surprised.",
                "Choosing not to use alt tags is a bold statement against the concept of an inclusive web."
            ],
            divs: [
                `${f.divs} divs and basically zero semantic tags. It's like you discovered building blocks but refused to use anything but the generic squares.`,
                "This DOM structure is a literal nightmare for anyone attempting to read it. It's just divs all the way down.",
                "HTML5 introduced semantic tags for a reason. You ignored all of them."
            ],
            styles: [
                `${f.ist} inline styles? CSS files are free, but clearly you prefer the chaos of ad-hoc formatting crimes.`,
                "Inline styles are the architectural equivalent of using duct tape for the entire foundation.",
                "Your stylesheet must be very lonely given how much work you're doing directly in the HTML."
            ],
            js: [
                `${f.scs} external scripts. Your users' browsers are working overtime to process whatever bloat you've decided is essential.`,
                "This isn't a website, it's a delivery mechanism for a browser crash.",
                "You're loading more JS than a modern banking app for what appears to be a basic landing page."
            ],
            h1: [
                f.mH1 ? "Multiple H1 tags. Because why have one clear heading when you can have three competing for attention?" : "No H1 tag. The page has no idea what its own name is. Relatable.",
                "Heading hierarchy is a suggestion you chose to ignore.",
                "Your H1 status is a mess. It's okay, we've all been there."
            ],
            tables: [
                "Using tables for layout? Welcome back to 1998. How's the dial-up connection treating you?",
                "Layout tables are a vintage aesthetic I didn't think anyone still used unironically.",
                "Tables are for data. Grids and Flexbox are for layout. It's been a while, but we should probably catch up."
            ],
            empty: [
                "Empty heading tags. You've created the structure but forgot the soul. Deep.",
                "Nothing says 'I gave up halfway through' like a bunch of blank h3 tags.",
                "Structural decorations are cool, I guess."
            ],
            favicon: [
                "No favicon. That sad little blank square in the tab perfectly captures the overall vibe.",
                "A favicon is the bowtie of a website. You forgot yours.",
                "Iconless tabs are the hallmark of a project that was finished at 3 AM."
            ]
        };

        const chosenArr = pts.length > 0 ? pool[pts[Math.floor(Math.random() * pts.length)]] : ["This site is suspiciously fine. I'm choosing to be offended by its lack of obvious flaws."];
        const r = chosenArr[Math.floor(Math.random() * chosenArr.length)];

        return { s, r };
    }

    function failRoast(u) {
        return roasts[Math.floor(Math.random() * roasts.length)];
    }

    function showRes(r, s) {
        scr.textContent = s + '/100';
        scr.className = 'score-value score-bad';
        swapV(vRes);
        type(r);
    }

    function type(t) {
        rTxt.textContent = '';
        let i = 0;
        function f() {
            if (i < t.length) {
                rTxt.textContent += t.charAt(i);
                i++;
                setTimeout(f, 12);
            }
        }
        f();
    }
});
