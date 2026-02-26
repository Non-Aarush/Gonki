document.addEventListener('DOMContentLoaded', () => {
    const clock = document.getElementById('sys-time');
    const dragHandle = document.getElementById('window-drag-handle');
    const appWindow = document.getElementById('app-window');

    const inputView = document.getElementById('view-input');
    const scanView = document.getElementById('view-analysis');
    const resultView = document.getElementById('view-result');

    const urlInput = document.getElementById('url-input');
    const roastBtn = document.getElementById('btn-roast');
    const resetBtn = document.getElementById('btn-reset');

    const modals = {
        systemPropertiesModal: document.getElementById('modal-system'),
        networkStatusModal: document.getElementById('modal-network'),
        recycleBinModal: document.getElementById('modal-recycle')
    };

    const icons = {
        systemPropertiesIcon: document.getElementById('icon-system'),
        networkStatusIcon: document.getElementById('icon-network'),
        recycleBinIcon: document.getElementById('icon-recycle')
    };

    const progressBar = document.getElementById('scan-progress');
    const terminalLog = document.getElementById('terminal-output');
    const scoreDisplay = document.getElementById('final-score');
    const roastText = document.getElementById('roast-text');

    const roasts = [
        "I've seen ransomeware with better UX than this. Did you write the CSS with your eyes closed, or do you just genuinely hate your users?",
        "Oh look, another identical SaaS template that promises to 'revolutionize workflow'. The only thing revolutionized here is my definition of disappointment.",
        "Your font hierarchy is a crime against typography. It looks like a ransom note compiled by a very confused junior developer.",
        "This DOM structure is so deeply nested it requires a caving expedition to find the actual content. A true masterpiece of spaghetti architecture.",
        "Ah, I see we're relying entirely on padding to hide the fact that this layout has zero structural integrity. Bold choice.",
        "This layout has that classic 'doing too much and still somehow saying nothing' energy. The hero looks confident, the content below looks confused, and the spacing is just there trying to keep the peace.",
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
        "The call-to-action looks optional, which is an interesting choice for something that's supposed to be the main action.",
        "The structure suggests there was once a design system, but it now lives only in memory.",
        "The shadows are dramatic enough to deserve their own soundtrack but don't actually add depth.",
        "This interface looks modern in the same way a fresh coat of paint looks modern — surface-level optimism.",
        "The spacing scale feels like it was generated by vibes instead of rules.",
        "The navigation flow is giving 'choose your own confusion' but with nicer fonts.",
        "This page scrolls like a highlight reel — lots happening, not much resolving.",
        "The CSS specificity battle in this file probably deserves a documentary.",
        "The hero section has more confidence than the entire product journey combined.",
        "The button styles look like cousins, not siblings — related but clearly raised differently.",
        "The layout alignment is almost perfect everywhere, which makes the slightly-off parts even louder.",
        "This design is giving 'I saw something cool once and tried to recreate the feeling.'",
        "The UX feels like it assumes users already know what to do before arriving.",
        "The page is visually calm but structurally stressed — like a duck gliding while paddling furiously underneath.",
        "This UI has the rhythm of a meme edit: fast cuts, big moments, and a little disorienting after a while.",
        "The color choices are confident, but the contrast decisions are having second thoughts.",
        "The structure works until you inspect it, then it becomes an adventure story.",
        "The form design feels polite but distant, like it doesn't really want input.",
        "The layout looks custom, but the interaction patterns feel borrowed from three different eras.",
        "The scrolling experience has that 'just one more section' energy but never quite pays off.",
        "The z-index values in this project probably go higher than anyone wants to admit.",
        "The site gives strong 'launch first, refactor later' vibes — and later hasn't arrived yet.",
        "The typography scale looks good until two headings meet and start arguing about who's in charge.",
        "This UI feels like it wants to be clever but is still figuring out where clarity fits in.",
        "The spacing between elements feels like awkward small talk — technically fine, slightly uncomfortable.",
        "The components look like they share a design language but speak different dialects.",
        "The layout almost snaps into alignment everywhere, which somehow makes the chaos more noticeable.",
        "The animations are confident enough to suggest there's logic behind them. The logic remains mysterious.",
        "This page has 'polished prototype' energy — clean presentation, uncertain long-term stability.",
        "The CSS file probably has comments like 'temporary fix' that are now permanent lore.",
        "The icon choices feel like they were made by scrolling quickly and trusting intuition.",
        "The UI has that 'high effort aesthetic, medium effort usability' balance.",
        "The hero copy talks big while the information architecture whispers quietly in the corner.",
        "The layout feels like it learned flexbox yesterday and is still processing the experience.",
        "The content blocks line up like they almost had a meeting before launch.",
        "The structure is technically valid but emotionally unpredictable.",
        "This site looks like it was built with enthusiasm and maintained with determination.",
        "The dropdown menus behave like they're surprised anyone clicked them.",
        "The visual rhythm is smooth until a random spacing decision interrupts the flow.",
        "The code behind this probably has a very interesting story involving late nights.",
        "The page has enough movement to feel alive but not enough direction to feel intentional.",
        "The interface gives 'cool demo' vibes more than 'daily use' vibes.",
        "The hierarchy is mostly clear, except when it suddenly decides not to be.",
        "This layout feels like it wants praise for trying new things — and honestly, fair enough.",
        "The design system is present in spirit but occasionally takes spontaneous breaks.",
        "The transitions are elegant, but the user journey still asks you to figure things out alone.",
        "The UI feels like it's midway through a redesign that paused for lunch and never resumed.",
        "The structure works best when you don't ask too many questions.",
        "The alignment is mostly good, which makes the slightly wrong parts feel personal.",
        "The mobile view feels like it's doing its absolute best with limited instructions.",
        "The interface has a very confident first impression and a more cautious second impression.",
        "The spacing is generous in some areas and deeply philosophical in others.",
        "The cards look consistent until you start comparing them side by side.",
        "This site feels like a modern template that grew opinions.",
        "The animations say 'premium experience' while the layout says 'under construction'.",
        "The UI looks calm but reacts like it wasn't expecting interaction.",
        "The flex containers are clearly trying their hardest to hold everything together.",
        "The typography works until it suddenly decides to experiment mid-page.",
        "The call-to-action is present, but it's more of a suggestion than a command.",
        "The structure reads like someone solving problems in real time with admirable persistence.",
        "The page has strong 'design-first, logic-later' energy.",
        "The interaction patterns feel familiar but slightly altered in ways your brain notices.",
        "The layout appears stable until content length changes and everything renegotiates positions.",
        "This interface looks like it would make a great case study titled 'iteration in progress'.",
        "The visual balance is close enough to correct that it becomes emotionally confusing.",
        "The CSS architecture feels like it evolved organically in the wild.",
        "The site loads quickly, which is good because you'll need time to understand the flow.",
        "The design hints at minimalism but occasionally relapses into maximalism.",
        "The components look like they were designed in batches across multiple moods.",
        "The page is clean in the way a room is clean right before guests arrive — surface perfection, hidden chaos.",
        "The spacing decisions feel intentional until the moment they don't.",
        "The layout has a confident posture and slightly nervous internals.",
        "The UX is one clear guiding thread away from being genuinely strong.",
        "This interface feels like it's trying very hard to be friendly but forgot to introduce itself properly.",
        "The structure almost follows a rhythm, then improvises unexpectedly.",
        "The page gives strong 'version 0.9 but emotionally version 1.0' vibes.",
        "The hierarchy works best when you scroll quickly and don't overthink it.",
        "The animations are smooth enough to make you believe everything is fine.",
        "The component sizing suggests a long conversation that ended in compromise.",
        "The design looks current, but the interaction logic feels nostalgic.",
        "The UI feels like it would shine with one really decisive refactor.",
        "The layout has ambition — and ambition is half the battle.",
        "The structure is solid enough to stand, interesting enough to question.",
        "The whole experience feels like a confident draft that just needs one more pass.",
        "The interface has personality — slightly chaotic, but memorable.",
        "The design makes a strong impression, even if you're not entirely sure what the impression is.",
        "The page feels like it wants feedback and honestly, that's the most relatable part."
    ];

    const scanMessages = [
        "Digesting terrible markup...",
        "Judging color contrast ratios severely...",
        "Finding borrowed code snippets...",
        "Questioning life choices...",
        "Simulating artificial disgust...",
        "Preparing the final insult..."
    ];

    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        let mins = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;
        mins = mins < 10 ? '0' + mins : mins;

        clock.textContent = `${hours}:${mins} ${ampm}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    dragHandle.addEventListener('mousedown', (e) => {
        isDragging = true;
        const rect = appWindow.getBoundingClientRect();

        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;

        appWindow.style.transform = 'none';
        appWindow.style.left = rect.left + 'px';
        appWindow.style.top = rect.top + 'px';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        let newX = e.clientX - dragOffsetX;
        let newY = e.clientY - dragOffsetY;

        appWindow.style.left = newX + 'px';
        appWindow.style.top = newY + 'px';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        isModalDragging = false;
    });

    let isModalDragging = false;
    let activeModal = null;
    let modalOffsetX = 0;
    let modalOffsetY = 0;

    document.querySelectorAll('.modal-drag-handle').forEach(handle => {
        handle.addEventListener('mousedown', (e) => {
            isModalDragging = true;
            activeModal = e.target.closest('.modal');

            document.querySelectorAll('.window').forEach(win => win.style.zIndex = '50');
            activeModal.style.zIndex = '150';

            const rect = activeModal.getBoundingClientRect();
            modalOffsetX = e.clientX - rect.left;
            modalOffsetY = e.clientY - rect.top;

            activeModal.style.transform = 'none';
            activeModal.style.left = rect.left + 'px';
            activeModal.style.top = rect.top + 'px';
        });
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            let newX = e.clientX - dragOffsetX;
            let newY = e.clientY - dragOffsetY;
            appWindow.style.left = newX + 'px';
            appWindow.style.top = newY + 'px';
        }

        if (isModalDragging && activeModal) {
            let newX = e.clientX - modalOffsetX;
            let newY = e.clientY - modalOffsetY;
            activeModal.style.left = newX + 'px';
            activeModal.style.top = newY + 'px';
        }
    });

    function toggleModal(name) {
        const modal = modals[name];
        if (!modal) return;

        if (modal.classList.contains('hidden')) {
            const offset = Math.floor(Math.random() * 40) - 20;

            modal.classList.remove('hidden');
            modal.style.transform = 'translate(-50%, -50%)';
            modal.style.top = `calc(50% + ${offset}px)`;
            modal.style.left = `calc(50% + ${offset}px)`;

            document.querySelectorAll('.window').forEach(win => win.style.zIndex = '50');
            modal.style.zIndex = '150';
        } else {
            modal.classList.add('hidden');
        }
    }

    icons.systemPropertiesIcon.addEventListener('click', () => toggleModal('systemPropertiesModal'));

    icons.networkStatusIcon.addEventListener('click', () => {
        const networkModal = modals.networkStatusModal;
        if (networkModal.classList.contains('hidden')) {
            toggleModal('networkStatusModal');

            const replies = networkModal.querySelectorAll('.network-reply');
            replies.forEach(r => r.classList.add('hidden'));

            setTimeout(() => replies[0].classList.remove('hidden'), 1500);
            setTimeout(() => replies[1].classList.remove('hidden'), 2500);
        } else {
            toggleModal('networkStatusModal');
        }
    });

    icons.recycleBinIcon.addEventListener('click', () => toggleModal('recycleBinModal'));

    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            modal.classList.add('hidden');
        });
    });

    const emptyBtn = document.getElementById('btn-empty-recycle');
    const trashList = document.getElementById('recycle-list');
    const emptyMsg = document.getElementById('recycle-empty-msg');

    if (emptyBtn) {
        emptyBtn.addEventListener('click', () => {
            trashList.classList.add('hidden');
            emptyBtn.classList.add('hidden');
            emptyMsg.classList.remove('hidden');

            icons.recycleBinIcon.querySelector('.icon').textContent = '🗑️';
            icons.recycleBinIcon.style.opacity = '0.5';
        });
    }

    function showView(view) {
        [inputView, scanView, resultView].forEach(v => {
            v.classList.remove('active');
            v.classList.add('hidden');
        });

        view.classList.remove('hidden');
        view.classList.add('active');
    }

    roastBtn.addEventListener('click', () => {
        const url = urlInput.value.trim();
        if (!url) {
            urlInput.style.borderColor = 'var(--clr-error)';
            setTimeout(() => { urlInput.style.borderColor = 'var(--clr-border)'; }, 500);
            return;
        }

        showView(scanView);
        runFakeScan();
    });

    resetBtn.addEventListener('click', () => {
        urlInput.value = '';
        progressBar.style.width = '0%';
        terminalLog.innerHTML = '<li>> System recalibrating for more disappointment...</li>';
        showView(inputView);
    });

    function runFakeScan() {
        let progress = 0;
        let msgIndex = 0;

        progressBar.style.width = '0%';
        terminalLog.innerHTML = '<li>> Sniffing target URL...</li>';

        const timer = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;

            progressBar.style.width = `${progress}%`;

            if (Math.random() > 0.5 && msgIndex < scanMessages.length) {
                const li = document.createElement('li');
                li.textContent = `> ${scanMessages[msgIndex]}`;
                terminalLog.appendChild(li);
                terminalLog.parentElement.scrollTop = terminalLog.parentElement.scrollHeight;
                msgIndex++;
            }

            if (progress === 100) {
                clearInterval(timer);
                setTimeout(() => {
                    showResult();
                }, 800);
            }

        }, 400);
    }

    function showResult() {
        const score = Math.floor(Math.random() * 40) + 1;
        scoreDisplay.textContent = `${score}/100`;
        scoreDisplay.className = 'score-value score-bad';

        const roast = roasts[Math.floor(Math.random() * roasts.length)];

        showView(resultView);
        typewriterEffect(roast);
    }

    function typewriterEffect(text) {
        roastText.textContent = '';
        let i = 0;

        function type() {
            if (i < text.length) {
                roastText.textContent += text.charAt(i);
                i++;
                setTimeout(type, 15);
            }
        }

        type();
    }
});