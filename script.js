// INITIAL SETUP & INTERSECTION OBSERVER
document.addEventListener("DOMContentLoaded", () => {
    
    // Set up intersection observer for scroll-fading content
    const scrollElements = document.querySelectorAll(".scroll-fade");
    
    const observerOptions = {
        root: null, // Viewport
        threshold: 0.1 // 10%
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollElements.forEach((el) => {
        scrollObserver.observe(el);
    });
});


// SINGLE-PAGE VIEW NAVIGATION CONTROL (SPA ROUTER)
function navigateTo(viewId) {
    // Hide all subpages
    const views = document.querySelectorAll(".page-view");
    views.forEach((v) => {
        v.classList.add("hidden");
    });

    // Show selected view
    const targetView = document.getElementById(`page-${viewId}`);
    if (targetView) {
        targetView.classList.remove("hidden");
        // Immediately check if elements inside need to trigger their observer states
        const newScrollElements = targetView.querySelectorAll(".scroll-fade");
        newScrollElements.forEach((el) => {
            el.classList.add("is-visible");
        });
    }

    // Scroll cleanly to top
    window.scrollTo({ top: 0, behavior: 'instant' });
}

// switches to home page and scrolls to element anchor
function navigateToAndScroll(viewId, elementAnchorId) {
    navigateTo(viewId);
    setTimeout(() => {
        const targetElement = document.getElementById(elementAnchorId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            // Give a subtle highlight pulse
            targetElement.classList.add("pulse-highlight");
            setTimeout(() => {
                targetElement.classList.remove("pulse-highlight");
            }, 2500);
        }
    }, 100);
}


// WORK LOGBOOK TOGGLE ACCORDION
function toggleLogbook(logId) {
    const logBox = document.getElementById(logId);
    const button = document.getElementById(`btn-${logId}`);
    
    if (logBox.classList.contains("hidden")) {
        logBox.classList.remove("hidden");
        logBox.classList.add("block");
        if (button) {
            button.querySelector("span").innerHTML = "⚡ SEAL PERSONAL LOGBOOK";
            button.querySelector(".arrow-indicator").innerHTML = "▲";
        }
    } else {
        logBox.classList.add("hidden");
        logBox.classList.remove("block");
        if (button) {
            button.querySelector("span").innerHTML = "⚡ EXTRACT PERSONAL LOGBOOK";
            button.querySelector(".arrow-indicator").innerHTML = "▼";
        }
    }
}


// TRACING LINKS FROM SKILL SECTOR DOWN TO CORRESPONDING HOME
function highlightTargetExperience(elementId) {
    navigateToAndScroll('home', elementId);
}


// PDF COPIER SIMULATION
function simulatePdfDownload() {
    const pdfOverlay = document.getElementById("pdf-notif");
    if (pdfOverlay) {
        pdfOverlay.classList.remove("hidden");
        pdfOverlay.classList.add("flex");
    }
}

function dismissPdfSimulator() {
    const pdfOverlay = document.getElementById("pdf-notif");
    if (pdfOverlay) {
        pdfOverlay.classList.add("hidden");
        pdfOverlay.classList.remove("flex");
    }
}


// FORM SUBMIT HANDLER
function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById("contact-form");
    const successBanner = document.getElementById("form-success-banner");
    
    if (successBanner) {
        successBanner.classList.remove("hidden");
        form.reset();
        
        successBanner.scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
            successBanner.classList.add("hidden");
        }, 8000);
    }
}