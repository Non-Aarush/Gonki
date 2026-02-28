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
            txtLog('Recycle Bin incinerated. All drafts purged.');
        });
    }

    tLst.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if (li) {
            const name = li.textContent.replace(/^>\s*/, '');
            li.style.textDecoration = 'line-through';
            li.style.opacity = '0.5';
            setTimeout(() => li.remove(), 400);
            txtLog(`Restored "${name}" to Desktop.`);
        }
    });

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

        const waitMsg = document.getElementById('network-wait-msg');
        const waitTimer = setTimeout(() => {
            if (waitMsg) {
                const sars = [
                    "> Still scanning... the bloat is real on this one. Please hold your breath.",
                    "> Analyzing... even the CPU is getting bored. Just wait, okay?",
                    "> Deep scan in progress. It's taking a while because there's so much junk to parse. Stay put.",
                    "> The garbage collector is working overtime on this markup. Sit tight.",
                    "> Wow, this is taking a while. Did you write this in Assembly? Just wait."
                ];
                waitMsg.textContent = sars[Math.floor(Math.random() * sars.length)];
                waitMsg.classList.remove('hidden');
                showMod('net');
            }
        }, 4500);

        const PROXIES = [
            'https://api.allorigins.win/get?url=',
            'https://api.codetabs.com/v1/proxy?quest='
        ];

        let html = null;
        let success = false;

        for (let i = 0; i < PROXIES.length; i++) {
            const PRX = PROXIES[i];
            txtLog(`Attempting connection (Proxy ${i + 1}/${PROXIES.length})...`);

            try {
                const ctrl = new AbortController();
                const timeoutMs = i === 0 ? 12000 : 10000;
                const t = setTimeout(() => ctrl.abort(), timeoutMs);

                const res = await fetch(PRX + encodeURIComponent(u), { signal: ctrl.signal });
                clearTimeout(t);

                if (!res.ok) throw new Error('proxy error');
                const d = await res.json();

                
                
                html = d.contents || d.content || (typeof d === 'string' ? d : null);

                if (html && html.length > 20) {
                    success = true;
                    txtLog('Target acquired. Parsing markup...');
                    await delay(600);
                    break;
                }
            } catch (err) {
                console.warn(`Proxy ${i + 1} failed:`, err);
                if (i < PROXIES.length - 1) {
                    txtLog('Primary route unstable. Trying secondary path...');
                    await delay(800);
                }
            }
        }

        if (!success) {
            clearTimeout(waitTimer);
            if (waitMsg) waitMsg.classList.add('hidden');
            setP(100);
            txtLog('Connection failed. Target remains elusive.');
            await delay(1000);
            showRes(failRoast(u), 12);
            return;
        }

        setP(25);

        const p = new DOMParser();
        const doc = p.parseFromString(html, 'text/html');

        const finds = await runFix(doc, u, txtLog, setP);

        setP(95);
        txtLog('Compiling insults...');
        await delay(800);
        setP(100);
        await delay(400);

        const { s, r } = makeRoast(finds, u);
        clearTimeout(waitTimer);
        if (waitMsg) waitMsg.classList.add('hidden');
        showRes(r, s);
    }

    function delay(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    async function runFix(doc, url, log, set) {
        const f = {};

        log('Checking security protocols...');
        await delay(500);
        f.noS = !url.startsWith('https://');
        set(32);

        log('Auditing mobile responsiveness...');
        await delay(600);
        f.noV = !doc.querySelector('meta[name="viewport"]');

        log('Inspecting metadata and titles...');
        await delay(500);
        const t = doc.querySelector('title');
        const tt = t ? t.textContent.trim() : '';
        f.noT = !tt;
        f.badT = tt.length > 0 && (tt.length < 5 || tt.length > 70 || tt.toLowerCase() === 'home' || tt.toLowerCase() === 'index');
        f.tt = tt;
        set(45);

        log('Measuring SEO depth...');
        await delay(400);
        const d = doc.querySelector('meta[name="description"]');
        f.noD = !d || !d.getAttribute('content') || d.getAttribute('content').trim().length < 10;

        log('Scanning asset accessibility...');
        await delay(700);
        const imgs = doc.querySelectorAll('img');
        const noAlt = [...imgs].filter(i => !i.getAttribute('alt') && i.getAttribute('alt') !== '');
        f.alt = noAlt.length;
        f.tImg = imgs.length;
        set(58);

        log('Analyzing DOM structure complexity...');
        await delay(600);
        const ds = doc.querySelectorAll('div').length;
        const sem = doc.querySelectorAll('header, main, nav, section, article, footer, aside').length;
        f.divs = ds;
        f.sem = sem;
        f.divObs = ds > 10 && sem === 0;
        f.divHvy = ds > 20 && ds / (sem + 1) > 8;
        set(68);

        log('Detecting inline style pollution...');
        await delay(500);
        const ist = doc.querySelectorAll('[style]').length;
        f.ist = ist;
        f.istAbu = ist > 10;

        log('Evaluating script payload...');
        await delay(600);
        const scs = doc.querySelectorAll('script[src]').length;
        f.scs = scs;
        f.scHvy = scs > 8;
        set(78);

        log('Parsing heading hierarchy...');
        await delay(400);
        const hs = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const emH = [...hs].filter(h => !h.textContent.trim());
        f.emH = emH.length;

        log('Checking H1 status...');
        await delay(300);
        const h1s = doc.querySelectorAll('h1').length;
        f.mH1 = h1s > 1;
        f.h1c = h1s;
        f.nH1 = h1s === 0;
        set(86);

        log('Checking visual branding...');
        await delay(400);
        f.noFav = !doc.querySelector('link[rel*="icon"]');

        log('Finalizing analysis report...');
        await delay(500);
        const ts = doc.querySelectorAll('table').length;
        const gts = doc.querySelectorAll('table[role="grid"]').length;
        f.tbl = ts > 0 && (ts - gts) > 0;
        set(93);

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
                "Your choice to use insecure HTTP in this day and age is a bold statement against personal safety.",
                "Your security protocol seems to rely entirely on hope and the kindness of strangers.",
                "Leaving the certificate at home? Your users will definitely appreciate the lack of basic encryption."
            ],
            mobile: [
                "This site treats mobile devices like they don't exist. It's a very pure approach to 2005-era web design.",
                "I hope your target audience only uses ultra-wide monitors, because this layout ignores responsive design entirely.",
                "The lack of mobile optimization suggests you prefer users to experience your site through a microscope."
            ],
            title: [
                `"${f.tt || 'Untitled'}" — a page title so generic it actually disappears into the background if you look at it too long.`,
                "Your page title has all the personality of a placeholder that someone forgot to replace.",
                "I've seen more informative error codes than the title you chose for this page."
            ],
            meta: [
                "No meta description? I guess search engines should just guess what this page is about. They'll probably be more generous than I am.",
                "Your SEO strategy is essentially 'playing hard to get' with the entire internet.",
                "I love the mystery you've created by providing zero descriptive metadata for search crawlers."
            ],
            alt: [
                "Leaving images without descriptions is a great way to ensure screen readers treat your site like a silent film.",
                "Your commitment to ignoring image accessibility is truly impressive in its thoroughness.",
                "Providing no context for your visuals really helps in maintaining that 'half-finished' aesthetic."
            ],
            divs: [
                "This layout is suffering from severe div-overload. It's like you discovered a single tag and decided it was enough for the entire internet.",
                "The DOM structure here is so unnecessarily nested it feels like a digital maze with no exit.",
                "You've managed to build a site using exclusively generic boxes. It's a masterclass in avoiding semantic meaning."
            ],
            styles: [
                "Inline styles everywhere? It's like you're trying to prove that separate CSS files are an unnecessary luxury.",
                "Your stylesheet must be very lonely given how much formatting you've decided to hardcode directly into the HTML.",
                "It's practical, I guess — if your goal is to make every single change as difficult as possible."
            ],
            js: [
                "The sheer weight of external scripts is enough to make any browser consider early retirement.",
                "You're loading so much JavaScript that the page logic is probably still trying to figure out its own purpose.",
                "It's a bold choice to rely so heavily on external bloat for what appears to be a basic landing page."
            ],
            h1: [
                f.mH1 ? "Multiple H1 tags are a great way to ensure the page doesn't have a single clear priority." : "A page without an H1 is like a book without a title — slightly confusing and probably not worth reading.",
                "Your heading hierarchy is more of a vague suggestion than a structure.",
                "It's refreshing to see someone so completely disregard the basic rules of document organization."
            ],
            tables: [
                "Using tables for layout is a wonderful tribute to the web of the late 90s.",
                "I didn't realize building layouts with data grids was still a thing. It's vintage, in a bad way.",
                "The 1990s called. They're actually okay with you keeping this layout style."
            ],
            empty: [
                "The empty heading tags really add to the overall sense of a project that was abandoned halfway through.",
                "Stretches of hollow structure with zero content. It's very poetic, but technically terrible.",
                "You've built the frames but forgot to put the art in. It's a very minimalist approach."
            ],
            favicon: [
                "No favicon. That sad little empty square in the tab is a perfect summary of the effort level here.",
                "You forgot the bowtie of the website. It looks incomplete and slightly embarrassed.",
                "The default browser icon really ties together the 'I just started this' vibe."
            ]
        };

        const validPts = pts.filter(p => pool[p]);

        if (validPts.length === 0) {
            return { s, r: "This site is suspiciously fine. I'm choosing to be offended by its lack of obvious flaws." };
        }

    
        let siteName = f.tt || url.replace(/^https?:\/\//, '').split('/')[0];
        if (siteName.length > 30) siteName = siteName.substring(0, 27) + '...';

        const openings = [
            `So, "${siteName}"... for a site that clearly wants to be taken seriously, the execution here is remarkably questionable.`,
            `Looking at "${siteName}"... it has the confident energy of a production site, but the structural integrity of a weekend hackathon project.`,
            `Ah, "${siteName}". I expected a masterclass in professional polish, but what I'm seeing suggests a very different set of priorities.`,
            `"${siteName}" - a bold name for a website that seems so fundamentally at odds with modern web standards.`,
            `"${siteName}" - It's clear someone spent a lot of time on the concept, just maybe not enough on the actual foundation.`
        ];

        const opening = openings[Math.floor(Math.random() * openings.length)];

        const shuffled = validPts.sort(() => 0.5 - Math.random());
        const issuesToUse = shuffled.slice(0, 2);

        let roastParts = issuesToUse.map(issue => {
            const arr = pool[issue];
            return arr[Math.floor(Math.random() * arr.length)];
        });

        const r = opening + " " + roastParts.join(" Also, ");

        return { s, r };
    }

    function failRoast(u) {
        return roasts[Math.floor(Math.random() * roasts.length)];
    }

    function showRes(r, s) {
        scr.textContent = s + '/100';
        scr.className = 'score-value score-bad';

        const h2 = vRes.querySelector('h2');
        if (h2) {
            h2.textContent = "Analysis Complete";
        }

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
