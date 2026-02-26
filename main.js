document.addEventListener('DOMContentLoaded', () => {
    const systemTimeDisplayElement = document.getElementById('sys-time');
    const applicationWindowDragHandle = document.getElementById('window-drag-handle');
    const mainApplicationWindow = document.getElementById('app-window');

    const inputPhaseViewContainer = document.getElementById('view-input');
    const scanningPhaseViewContainer = document.getElementById('view-analysis');
    const resultPhaseViewContainer = document.getElementById('view-result');

    const targetWebsiteUrlInput = document.getElementById('url-input');
    const triggerRoastActionButton = document.getElementById('btn-roast');
    const resetApplicationStateButton = document.getElementById('btn-reset');

    const desktopModalWindows = {
        systemPropertiesModal: document.getElementById('modal-system'),
        networkStatusModal: document.getElementById('modal-network'),
        recycleBinModal: document.getElementById('modal-recycle')
    };

    const desktopShortcutIcons = {
        systemPropertiesIcon: document.getElementById('icon-system'),
        networkStatusIcon: document.getElementById('icon-network'),
        recycleBinIcon: document.getElementById('icon-recycle')
    };

    const scanningProgressBarFillElement = document.getElementById('scan-progress');
    const parsingTerminalOutputListArea = document.getElementById('terminal-output');
    const finalWebsiteIntegrityScoreDisplay = document.getElementById('final-score');
    const artificialIntelligenceRoastTextDisplay = document.getElementById('roast-text');

    const aggressiveWebsiteRoasts = [
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
        "The DOM structure is so nested that debugging it feels like climbing down a ladder you’re not sure goes back up.",
        "The typography says professional, the spacing says experimental, and the combined result says ‘we’ll refine this later’.",
        "This interface feels like it was optimized for screenshots first and user flow sometime later, maybe next sprint.",
        "The hover effects feel like they’re trying to impress me instead of helping me understand what’s clickable.",
        "This UI is one vague gradient away from becoming a startup pitch deck background.",
        "The responsive design technically works, but emotionally it seems unsure of itself.",
        "The padding is doing all the heavy lifting because the layout structure quietly resigned.",
        "The components look reusable until you realize each one behaves slightly differently for reasons unknown.",
        "The animations are smooth enough to distract you from the fact that the navigation logic is still thinking about its purpose.",
        "This feels like ‘minimalism’ interpreted as ‘remove clarity until only vibes remain’.",
        "The grid system shows up occasionally like a guest star and then disappears again.",
        "This layout has the same energy as someone saying ‘it works on my machine’ with complete confidence.",
        "The call-to-action looks optional, which is an interesting choice for something that’s supposed to be the main action.",
        "The structure suggests there was once a design system, but it now lives only in memory.",
        "The shadows are dramatic enough to deserve their own soundtrack but don’t actually add depth.",
        "This interface looks modern in the same way a fresh coat of paint looks modern — surface-level optimism.",
        "The spacing scale feels like it was generated by vibes instead of rules.",
        "The navigation flow is giving ‘choose your own confusion’ but with nicer fonts.",
        "This page scrolls like a highlight reel — lots happening, not much resolving.",
        "The CSS specificity battle in this file probably deserves a documentary.",
        "The hero section has more confidence than the entire product journey combined.",
        "The button styles look like cousins, not siblings — related but clearly raised differently.",
        "The layout alignment is almost perfect everywhere, which makes the slightly-off parts even louder.",
        "This design is giving ‘I saw something cool once and tried to recreate the feeling.’",
        "The UX feels like it assumes users already know what to do before arriving.",
        "The page is visually calm but structurally stressed — like a duck gliding while paddling furiously underneath.",
        "This UI has the rhythm of a meme edit: fast cuts, big moments, and a little disorienting after a while.",
        "The color choices are confident, but the contrast decisions are having second thoughts.",
        "The structure works until you inspect it, then it becomes an adventure story.",
        "The form design feels polite but distant, like it doesn’t really want input.",
        "The layout looks custom, but the interaction patterns feel borrowed from three different eras.",
        "The scrolling experience has that ‘just one more section’ energy but never quite pays off.",
        "The z-index values in this project probably go higher than anyone wants to admit.",
        "The site gives strong ‘launch first, refactor later’ vibes — and later hasn’t arrived yet.",
        "The typography scale looks good until two headings meet and start arguing about who’s in charge.",
        "This UI feels like it wants to be clever but is still figuring out where clarity fits in.",
        "The spacing between elements feels like awkward small talk — technically fine, slightly uncomfortable.",
        "The components look like they share a design language but speak different dialects.",
        "The layout almost snaps into alignment everywhere, which somehow makes the chaos more noticeable.",
        "The animations are confident enough to suggest there’s logic behind them. The logic remains mysterious.",
        "This page has ‘polished prototype’ energy — clean presentation, uncertain long-term stability.",
        "The CSS file probably has comments like ‘temporary fix’ that are now permanent lore.",
        "The icon choices feel like they were made by scrolling quickly and trusting intuition.",
        "The UI has that ‘high effort aesthetic, medium effort usability’ balance.",
        "The hero copy talks big while the information architecture whispers quietly in the corner.",
        "The layout feels like it learned flexbox yesterday and is still processing the experience.",
        "The content blocks line up like they almost had a meeting before launch.",
        "The structure is technically valid but emotionally unpredictable.",
        "This site looks like it was built with enthusiasm and maintained with determination.",
        "The dropdown menus behave like they’re surprised anyone clicked them.",
        "The visual rhythm is smooth until a random spacing decision interrupts the flow.",
        "The code behind this probably has a very interesting story involving late nights.",
        "The page has enough movement to feel alive but not enough direction to feel intentional.",
        "The interface gives ‘cool demo’ vibes more than ‘daily use’ vibes.",
        "The hierarchy is mostly clear, except when it suddenly decides not to be.",
        "This layout feels like it wants praise for trying new things — and honestly, fair enough.",
        "The design system is present in spirit but occasionally takes spontaneous breaks.",
        "The transitions are elegant, but the user journey still asks you to figure things out alone.",
        "The UI feels like it’s midway through a redesign that paused for lunch and never resumed.",
        "The structure works best when you don’t ask too many questions.",
        "The alignment is mostly good, which makes the slightly wrong parts feel personal.",
        "The mobile view feels like it’s doing its absolute best with limited instructions.",
        "The interface has a very confident first impression and a more cautious second impression.",
        "The spacing is generous in some areas and deeply philosophical in others.",
        "The cards look consistent until you start comparing them side by side.",
        "This site feels like a modern template that grew opinions.",
        "The animations say ‘premium experience’ while the layout says ‘under construction’.",
        "The UI looks calm but reacts like it wasn’t expecting interaction.",
        "The flex containers are clearly trying their hardest to hold everything together.",
        "The typography works until it suddenly decides to experiment mid-page.",
        "The call-to-action is present, but it’s more of a suggestion than a command.",
        "The structure reads like someone solving problems in real time with admirable persistence.",
        "The page has strong ‘design-first, logic-later’ energy.",
        "The interaction patterns feel familiar but slightly altered in ways your brain notices.",
        "The layout appears stable until content length changes and everything renegotiates positions.",
        "This interface looks like it would make a great case study titled ‘iteration in progress’.",
        "The visual balance is close enough to correct that it becomes emotionally confusing.",
        "The CSS architecture feels like it evolved organically in the wild.",
        "The site loads quickly, which is good because you’ll need time to understand the flow.",
        "The design hints at minimalism but occasionally relapses into maximalism.",
        "The components look like they were designed in batches across multiple moods.",
        "The page is clean in the way a room is clean right before guests arrive — surface perfection, hidden chaos.",
        "The spacing decisions feel intentional until the moment they don’t.",
        "The layout has a confident posture and slightly nervous internals.",
        "The UX is one clear guiding thread away from being genuinely strong.",
        "This interface feels like it’s trying very hard to be friendly but forgot to introduce itself properly.",
        "The structure almost follows a rhythm, then improvises unexpectedly.",
        "The page gives strong ‘version 0.9 but emotionally version 1.0’ vibes.",
        "The hierarchy works best when you scroll quickly and don’t overthink it.",
        "The animations are smooth enough to make you believe everything is fine.",
        "The component sizing suggests a long conversation that ended in compromise.",
        "The design looks current, but the interaction logic feels nostalgic.",
        "The UI feels like it would shine with one really decisive refactor.",
        "The layout has ambition — and ambition is half the battle.",
        "The structure is solid enough to stand, interesting enough to question.",
        "The whole experience feels like a confident draft that just needs one more pass.",
        "The interface has personality — slightly chaotic, but memorable.",
        "The design makes a strong impression, even if you’re not entirely sure what the impression is.",
        "The page feels like it wants feedback and honestly, that’s the most relatable part."
    ];

    const cynicalScanningLogMessages = [
        "Digesting terrible markup...",
        "Judging color contrast ratios severely...",
        "Finding borrowed code snippets...",
        "Questioning life choices...",
        "Simulating artificial disgust...",
        "Preparing the final insult..."
    ];

    function updateSystemClockTick() {
        const currentTimeObject = new Date();
        let currentHourValue = currentTimeObject.getHours();
        let currentMinuteValue = currentTimeObject.getMinutes();
        const antePostMeridiemString = currentHourValue >= 12 ? 'PM' : 'AM';

        currentHourValue = currentHourValue % 12;
        currentHourValue = currentHourValue ? currentHourValue : 12;
        currentMinuteValue = currentMinuteValue < 10 ? '0' + currentMinuteValue : currentMinuteValue;

        systemTimeDisplayElement.textContent = `${currentHourValue}:${currentMinuteValue} ${antePostMeridiemString}`;
    }
    setInterval(updateSystemClockTick, 1000);
    updateSystemClockTick();

    let primaryWindowCurrentlyDragging = false;
    let primaryWindowDragOffsetXPoint = 0;
    let primaryWindowDragOffsetYPoint = 0;

    applicationWindowDragHandle.addEventListener('mousedown', (mouseEventObject) => {
        primaryWindowCurrentlyDragging = true;
        const mainApplicationWindowBoundingRectangle = mainApplicationWindow.getBoundingClientRect();

        primaryWindowDragOffsetXPoint = mouseEventObject.clientX - mainApplicationWindowBoundingRectangle.left;
        primaryWindowDragOffsetYPoint = mouseEventObject.clientY - mainApplicationWindowBoundingRectangle.top;

        mainApplicationWindow.style.transform = 'none';
        mainApplicationWindow.style.left = mainApplicationWindowBoundingRectangle.left + 'px';
        mainApplicationWindow.style.top = mainApplicationWindowBoundingRectangle.top + 'px';
    });

    document.addEventListener('mousemove', (mouseEventObject) => {
        if (!primaryWindowCurrentlyDragging) return;

        let calculatedNewXPosition = mouseEventObject.clientX - primaryWindowDragOffsetXPoint;
        let calculatedNewYPosition = mouseEventObject.clientY - primaryWindowDragOffsetYPoint;

        mainApplicationWindow.style.left = calculatedNewXPosition + 'px';
        mainApplicationWindow.style.top = calculatedNewYPosition + 'px';
    });

    document.addEventListener('mouseup', () => {
        primaryWindowCurrentlyDragging = false;
        isModalWindowCurrentlyDragging = false;
    });

    let isModalWindowCurrentlyDragging = false;
    let currentlyActiveModalWindowNode = null;
    let modalWindowDragOffsetXPoint = 0;
    let modalWindowDragOffsetYPoint = 0;

    document.querySelectorAll('.modal-drag-handle').forEach(modalDragHandleElement => {
        modalDragHandleElement.addEventListener('mousedown', (mouseEventObject) => {
            isModalWindowCurrentlyDragging = true;
            currentlyActiveModalWindowNode = mouseEventObject.target.closest('.modal');

            document.querySelectorAll('.window').forEach(windowElementNode => windowElementNode.style.zIndex = '50');
            currentlyActiveModalWindowNode.style.zIndex = '150';

            const activeModalBoundingRectangle = currentlyActiveModalWindowNode.getBoundingClientRect();
            modalWindowDragOffsetXPoint = mouseEventObject.clientX - activeModalBoundingRectangle.left;
            modalWindowDragOffsetYPoint = mouseEventObject.clientY - activeModalBoundingRectangle.top;

            currentlyActiveModalWindowNode.style.transform = 'none';
            currentlyActiveModalWindowNode.style.left = activeModalBoundingRectangle.left + 'px';
            currentlyActiveModalWindowNode.style.top = activeModalBoundingRectangle.top + 'px';
        });
    });

    document.addEventListener('mousemove', (mouseEventObject) => {
        if (primaryWindowCurrentlyDragging) {
            let calculatedNewXPosition = mouseEventObject.clientX - primaryWindowDragOffsetXPoint;
            let calculatedNewYPosition = mouseEventObject.clientY - primaryWindowDragOffsetYPoint;
            mainApplicationWindow.style.left = calculatedNewXPosition + 'px';
            mainApplicationWindow.style.top = calculatedNewYPosition + 'px';
        }

        if (isModalWindowCurrentlyDragging && currentlyActiveModalWindowNode) {
            let calculatedNewModalXPosition = mouseEventObject.clientX - modalWindowDragOffsetXPoint;
            let calculatedNewModalYPosition = mouseEventObject.clientY - modalWindowDragOffsetYPoint;
            currentlyActiveModalWindowNode.style.left = calculatedNewModalXPosition + 'px';
            currentlyActiveModalWindowNode.style.top = calculatedNewModalYPosition + 'px';
        }
    });

    function toggleDesktopModalWindow(targetModalWindowIdentifier) {
        const targetModalWindowNode = desktopModalWindows[targetModalWindowIdentifier];
        if (!targetModalWindowNode) return;

        if (targetModalWindowNode.classList.contains('hidden')) {
            const randomStaggerOffsetValue = Math.floor(Math.random() * 40) - 20;

            targetModalWindowNode.classList.remove('hidden');
            targetModalWindowNode.style.transform = 'translate(-50%, -50%)';
            targetModalWindowNode.style.top = `calc(50% + ${randomStaggerOffsetValue}px)`;
            targetModalWindowNode.style.left = `calc(50% + ${randomStaggerOffsetValue}px)`;

            document.querySelectorAll('.window').forEach(windowElementNode => windowElementNode.style.zIndex = '50');
            targetModalWindowNode.style.zIndex = '150';
        } else {
            targetModalWindowNode.classList.add('hidden');
        }
    }

    desktopShortcutIcons.systemPropertiesIcon.addEventListener('click', () => toggleDesktopModalWindow('systemPropertiesModal'));

    desktopShortcutIcons.networkStatusIcon.addEventListener('click', () => {
        const networkModalReference = desktopModalWindows.networkStatusModal;
        if (networkModalReference.classList.contains('hidden')) {
            toggleDesktopModalWindow('networkStatusModal');

            const mockNetworkTerminalReplies = networkModalReference.querySelectorAll('.network-reply');
            mockNetworkTerminalReplies.forEach(replyElement => replyElement.classList.add('hidden'));

            setTimeout(() => mockNetworkTerminalReplies[0].classList.remove('hidden'), 1500);
            setTimeout(() => mockNetworkTerminalReplies[1].classList.remove('hidden'), 2500);
        } else {
            toggleDesktopModalWindow('networkStatusModal');
        }
    });

    desktopShortcutIcons.recycleBinIcon.addEventListener('click', () => toggleDesktopModalWindow('recycleBinModal'));

    document.querySelectorAll('.modal-close').forEach(closeButtonElement => {
        closeButtonElement.addEventListener('click', (mouseEventObject) => {
            const parentModalElementNode = mouseEventObject.target.closest('.modal');
            parentModalElementNode.classList.add('hidden');
        });
    });

    const emptyRecycleBinActionButton = document.getElementById('btn-empty-recycle');
    const deletedItemsListContainer = document.getElementById('recycle-list');
    const emptyStateMessageContainer = document.getElementById('recycle-empty-msg');

    if (emptyRecycleBinActionButton) {
        emptyRecycleBinActionButton.addEventListener('click', () => {
            deletedItemsListContainer.classList.add('hidden');
            emptyRecycleBinActionButton.classList.add('hidden');
            emptyStateMessageContainer.classList.remove('hidden');

            desktopShortcutIcons.recycleBinIcon.querySelector('.icon').textContent = '🗑️';
            desktopShortcutIcons.recycleBinIcon.style.opacity = '0.5';
        });
    }

    function transitionToVisibleApplicationView(targetViewContainerNode) {
        [inputPhaseViewContainer, scanningPhaseViewContainer, resultPhaseViewContainer].forEach(viewSectionElement => {
            viewSectionElement.classList.remove('active');
            viewSectionElement.classList.add('hidden');
        });

        targetViewContainerNode.classList.remove('hidden');
        targetViewContainerNode.classList.add('active');
    }

    triggerRoastActionButton.addEventListener('click', () => {
        const parsedTargetUrlString = targetWebsiteUrlInput.value.trim();
        if (!parsedTargetUrlString) {
            targetWebsiteUrlInput.style.borderColor = 'var(--clr-error)';
            setTimeout(() => { targetWebsiteUrlInput.style.borderColor = 'var(--clr-border)'; }, 500);
            return;
        }

        transitionToVisibleApplicationView(scanningPhaseViewContainer);
        executeFakeScanningSimulationSequence();
    });

    resetApplicationStateButton.addEventListener('click', () => {
        targetWebsiteUrlInput.value = '';
        scanningProgressBarFillElement.style.width = '0%';
        parsingTerminalOutputListArea.innerHTML = '<li>> System recalibrating for more disappointment...</li>';
        transitionToVisibleApplicationView(inputPhaseViewContainer);
    });

    function executeFakeScanningSimulationSequence() {
        let simulatedProgressPercentage = 0;
        let logMessageArrayPointerIndex = 0;

        scanningProgressBarFillElement.style.width = '0%';
        parsingTerminalOutputListArea.innerHTML = '<li>> Sniffing target URL...</li>';

        const simulationIntervalId = setInterval(() => {
            simulatedProgressPercentage += Math.random() * 15;
            if (simulatedProgressPercentage > 100) simulatedProgressPercentage = 100;

            scanningProgressBarFillElement.style.width = `${simulatedProgressPercentage}%`;

            if (Math.random() > 0.5 && logMessageArrayPointerIndex < cynicalScanningLogMessages.length) {
                const newLogListItemElement = document.createElement('li');
                newLogListItemElement.textContent = `> ${cynicalScanningLogMessages[logMessageArrayPointerIndex]}`;
                parsingTerminalOutputListArea.appendChild(newLogListItemElement);
                parsingTerminalOutputListArea.parentElement.scrollTop = parsingTerminalOutputListArea.parentElement.scrollHeight;
                logMessageArrayPointerIndex++;
            }

            if (simulatedProgressPercentage === 100) {
                clearInterval(simulationIntervalId);
                setTimeout(() => {
                    transitionToFinalResultView();
                }, 800);
            }

        }, 400);
    }

    function transitionToFinalResultView() {
        const calculatedDismalScoreValue = Math.floor(Math.random() * 40) + 1;
        finalWebsiteIntegrityScoreDisplay.textContent = `${calculatedDismalScoreValue}/100`;
        finalWebsiteIntegrityScoreDisplay.className = 'score-value score-bad';

        const randomlySelectedRoastString = aggressiveWebsiteRoasts[Math.floor(Math.random() * aggressiveWebsiteRoasts.length)];

        transitionToVisibleApplicationView(resultPhaseViewContainer);
        executeRetroTypewriterEffectForRoast(randomlySelectedRoastString);
    }

    function executeRetroTypewriterEffectForRoast(fullRoastTextString) {
        artificialIntelligenceRoastTextDisplay.textContent = '';
        let characterStringIndexPointer = 0;

        function appendNextCharacterGraphic() {
            if (characterStringIndexPointer < fullRoastTextString.length) {
                artificialIntelligenceRoastTextDisplay.textContent += fullRoastTextString.charAt(characterStringIndexPointer);
                characterStringIndexPointer++;
                setTimeout(appendNextCharacterGraphic, 15);
            }
        }

        appendNextCharacterGraphic();
    }
});
