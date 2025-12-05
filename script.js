/**
 * AI Secretary Test Plan - Interactive JavaScript
 * ASRO Team - Group 8
 * Enhances user experience with smooth animations and interactive features
 */

// =============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    // Handle smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Only prevent default if it's a valid anchor (not just "#")
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // =============================================
    // FADE-IN ANIMATION ON SCROLL
    // =============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply fade-in to specific elements
    const fadeElements = document.querySelectorAll(
        '.feature-card, .build-section, .content-card, .test-case, .validation-test-case, .team-member-card'
    );

    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(element);
    });

    // =============================================
    // ACTIVE NAVIGATION HIGHLIGHT
    // =============================================
    function updateActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-menu a');

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    updateActiveNav();

    // =============================================
    // TABLE ENHANCEMENTS
    // =============================================
    const tables = document.querySelectorAll('.traceability-table, .comparison-table, .metadata-table');

    tables.forEach(table => {
        // Add hover effect to table rows
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.style.transition = 'background-color 0.2s ease';
        });

        // Make tables responsive on small screens
        if (window.innerWidth < 768) {
            table.style.fontSize = '0.85rem';
        }
    });

    // =============================================
    // COVERAGE BAR ANIMATION
    // =============================================
    const coverageBars = document.querySelectorAll('.coverage-fill');

    const coverageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.style.width;

                // Animate from 0 to target width
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);

                coverageObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    coverageBars.forEach(bar => {
        coverageObserver.observe(bar);
    });

    // =============================================
    // STAT NUMBER COUNTER ANIMATION
    // =============================================
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateNumber(element) {
        const text = element.textContent;
        const match = text.match(/(\d+)/);

        if (match) {
            const targetNumber = parseInt(match[1]);
            const duration = 2000; // 2 seconds
            const steps = 50;
            const increment = targetNumber / steps;
            const stepDuration = duration / steps;
            let current = 0;

            const counter = setInterval(() => {
                current += increment;
                if (current >= targetNumber) {
                    element.textContent = text;
                    clearInterval(counter);
                } else {
                    element.textContent = text.replace(/\d+/, Math.floor(current).toString());
                }
            }, stepDuration);
        }
    }

    const numberObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                numberObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        numberObserver.observe(stat);
    });

    // =============================================
    // BUILD TIMELINE ANIMATION
    // =============================================
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    });

    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // =============================================
    // COLLAPSIBLE TEST CASES (Optional Enhancement)
    // =============================================
    const testCases = document.querySelectorAll('.test-case, .validation-test-case');

    testCases.forEach(testCase => {
        // Add click-to-expand functionality for better mobile experience
        const header = testCase.querySelector('h4');
        if (header && window.innerWidth < 768) {
            header.style.cursor = 'pointer';
            header.addEventListener('click', function() {
                const details = testCase.querySelector('.test-case-details, .test-details');
                if (details) {
                    const isExpanded = details.style.display !== 'none';
                    details.style.display = isExpanded ? 'none' : 'block';
                    header.textContent = (isExpanded ? '▶ ' : '▼ ') + header.textContent.replace(/^[▶▼] /, '');
                }
            });
        }
    });

    // =============================================
    // BACK TO TOP BUTTON
    // =============================================
    const backToTopButton = document.createElement('button');
    backToTopButton.textContent = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #2563eb, #7c3aed);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.2s ease;
        z-index: 999;
    `;

    document.body.appendChild(backToTopButton);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    backToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // =============================================
    // SEARCH FUNCTIONALITY (Optional)
    // =============================================
    function addSearchHighlight() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('search');

        if (searchTerm) {
            const bodyText = document.body.innerHTML;
            const regex = new RegExp(searchTerm, 'gi');
            document.body.innerHTML = bodyText.replace(regex, match => {
                return `<mark style="background-color: #fef08a; padding: 2px 4px; border-radius: 2px;">${match}</mark>`;
            });
        }
    }

    // Uncomment to enable search highlighting
    // addSearchHighlight();

    // =============================================
    // PRINT PREPARATION
    // =============================================
    window.addEventListener('beforeprint', function() {
        // Expand all collapsed elements before printing
        const collapsedElements = document.querySelectorAll('[style*="display: none"]');
        collapsedElements.forEach(el => {
            el.setAttribute('data-was-hidden', 'true');
            el.style.display = 'block';
        });
    });

    window.addEventListener('afterprint', function() {
        // Restore collapsed state after printing
        const expandedElements = document.querySelectorAll('[data-was-hidden="true"]');
        expandedElements.forEach(el => {
            el.style.display = 'none';
            el.removeAttribute('data-was-hidden');
        });
    });

    // =============================================
    // MOBILE MENU TOGGLE (if needed for responsive)
    // =============================================
    function createMobileMenuToggle() {
        if (window.innerWidth < 768) {
            const navMenu = document.querySelector('.nav-menu');
            const navContainer = document.querySelector('.nav-container');

            if (navMenu && !document.querySelector('.mobile-menu-toggle')) {
                const toggleButton = document.createElement('button');
                toggleButton.className = 'mobile-menu-toggle';
                toggleButton.innerHTML = '☰';
                toggleButton.style.cssText = `
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    display: block;
                `;

                // Insert before nav menu
                navContainer.insertBefore(toggleButton, navMenu);

                // Hide menu initially on mobile
                navMenu.style.display = 'none';

                toggleButton.addEventListener('click', function() {
                    if (navMenu.style.display === 'none') {
                        navMenu.style.display = 'flex';
                        navMenu.style.flexDirection = 'column';
                        navMenu.style.width = '100%';
                        navMenu.style.marginTop = '1rem';
                        toggleButton.innerHTML = '✕';
                    } else {
                        navMenu.style.display = 'none';
                        toggleButton.innerHTML = '☰';
                    }
                });
            }
        }
    }

    createMobileMenuToggle();

    // Recreate mobile menu on resize
    window.addEventListener('resize', function() {
        const existingToggle = document.querySelector('.mobile-menu-toggle');
        if (existingToggle) {
            existingToggle.remove();
        }

        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && window.innerWidth >= 768) {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'row';
        }

        createMobileMenuToggle();
    });

    // =============================================
    // ACCESSIBILITY ENHANCEMENTS
    // =============================================
    // Add aria labels to buttons without text
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (!button.textContent.trim()) {
            button.setAttribute('aria-label', 'Button');
        }
    });

    // Add skip to content link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        left: -9999px;
        z-index: 999;
        padding: 1rem;
        background: #2563eb;
        color: white;
        text-decoration: none;
        border-radius: 0.5rem;
    `;
    skipLink.addEventListener('focus', function() {
        this.style.left = '10px';
        this.style.top = '10px';
    });
    skipLink.addEventListener('blur', function() {
        this.style.left = '-9999px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content ID if not exists
    const mainContent = document.querySelector('main');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }

    // =============================================
    // PERFORMANCE: LAZY LOAD IMAGES (if any)
    // =============================================
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // =============================================
    // CONSOLE MESSAGE
    // =============================================
    console.log('%c🎯 AI Secretary Test Plan', 'font-size: 20px; font-weight: bold; color: #2563eb;');
    console.log('%cASRO Team - Group 8', 'font-size: 14px; color: #7c3aed;');
    console.log('Agentic Slurm Resource Optimizer');
    console.log('Comprehensive Integration & Validation Testing');
    console.log('-------------------------------------------');
    console.log('Team Members:');
    console.log('• Gaurav Srivastava');
    console.log('• Aafiya Hussain');
    console.log('• Najibul Haque Sarker');
    console.log('• Zaber Ibn Abdul Hakim');
    console.log('• Ali Asgarov');
    console.log('-------------------------------------------');
    console.log('Website loaded successfully! ✓');

});

// =============================================
// UTILITY FUNCTIONS
// =============================================

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Get contrast color for accessibility
 */
function getContrastColor(hexColor) {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
}
