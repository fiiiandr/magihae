document.addEventListener('DOMContentLoaded', () => {

    // --- Hero Slider Code ---

    // Find the slider element on the page.
    const slider = document.querySelector('.slider');

    // Only run the slider code if the slider element actually exists on the page.
    if (slider) {
        // Select all the necessary elements for the slider.
        const slides = document.querySelectorAll('.slide');
        const prevButton = document.querySelector('.slider-arrow.prev');
        const nextButton = document.querySelector('.slider-arrow.next');
        const dotsContainer = document.querySelector('.slider-dots');
        
        // State variables
        const totalSlides = slides.length;
        let currentIndex = 0;

        // Dynamically create a navigation dot for each slide.
        if (dotsContainer) {
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                // When a dot is clicked, go to that specific slide.
                dot.addEventListener('click', () => {
                    goToSlide(i);
                });
                dotsContainer.appendChild(dot);
            }
        }
        const dots = document.querySelectorAll('.dot');

        /**
         * The main function to move the slider and update the navigation dots.
         * @param {number} index - The index of the slide to display.
         */
        function goToSlide(index) {
            // Handle looping: if going past the last slide, loop to the first.
            if (index >= totalSlides) {
                index = 0;
            } 
            // If going before the first slide, loop to the last.
            else if (index < 0) {
                index = totalSlides - 1;
            }
            
            // Move the slider container horizontally using CSS transform.
            slider.style.transform = `translateX(-${index * 100}%)`;
            
            // Update the current index state.
            currentIndex = index;

            // Update the active state on the navigation dots.
            if (dots.length > 0) {
                dots.forEach((dot, i) => {
                    // The 'active' class is added only if the dot's index matches the current slide index.
                    dot.classList.toggle('active', i === currentIndex);
                });
            }
        }

        // Add click event listeners for the arrow buttons.
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                // Go to the previous slide.
                goToSlide(currentIndex - 1);
            });

            nextButton.addEventListener('click', () => {
                // Go to the next slide.
                goToSlide(currentIndex + 1);
            });
        }

        // Initialize the slider to show the first slide when the page loads.
        goToSlide(0);
    }

    // --- Mobile Sidebar Logic (Updated) ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const sidebarClose = document.querySelector('.sidebar-close');

    if (mobileNavToggle && sidebar) {
        const openSidebar = () => document.body.classList.add('sidebar-open');
        const closeSidebar = () => document.body.classList.remove('sidebar-open');

        mobileNavToggle.addEventListener('click', openSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);
        sidebarClose.addEventListener('click', closeSidebar);

        const sidebarDropdowns = sidebar.querySelectorAll('.has-dropdown > a, .has-submenu > a');
        sidebarDropdowns.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault(); 
                link.parentElement.classList.toggle('open');
            });
        });
    }

    // --- FAQ Animation Code (from before) ---
    const allDetails = document.querySelectorAll('details');
    if (allDetails.length > 0) {
        allDetails.forEach(details => {
            details.setAttribute('open', '');
        });
        setTimeout(() => {
            allDetails.forEach(details => {
                details.removeAttribute('open');
            });
        }, 1);
        
        allDetails.forEach(details => {
            const summary = details.querySelector('summary');
            summary.addEventListener('click', (event) => {
                if (details.open) {
                    event.preventDefault();
                    details.classList.add('closing');
                    setTimeout(() => {
                        details.removeAttribute('open');
                        details.classList.remove('closing');
                    }, 150);
                }
            });
        });
    }

    // --- Scrolled Header Logic ---
    const header = document.querySelector('.main-header');
    if (header) {
        // Listen for the 'scroll' event on the entire window
        window.addEventListener('scroll', () => {
            // Check if the user has scrolled more than 50 pixels down
            if (window.scrollY >= 120) {
                // If yes, add the 'scrolled' class to the header
                header.classList.add('scrolled');
            } else {
                // If not (they are near the top), remove the 'scrolled' class
                header.classList.remove('scrolled');
            }
        });
    }
});