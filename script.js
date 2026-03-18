// =============================================
// KATY'S GROOMING WIEN - JAVASCRIPT
// Interactive Elements & Functionality
// ============================================= 

document.addEventListener('DOMContentLoaded', function() {
    initializeHamburgerMenu();
    initializeFormSubmission();
    initializeScrollAnimations();
});

// =============================================
// HAMBURGER MENU
// ============================================= 

function initializeHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

function closeMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.remove('active');
}

// =============================================
// FORM SUBMISSION
// ============================================= 

function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const pet = document.getElementById('pet').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    // Validate form
    if (!name || !email || !pet || !service) {
        alert('Please fill in all required fields!');
        return;
    }

    // Create email body
    const emailBody = `
        New appointment request from Katy's Grooming Website
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Pet Name: ${pet}
        Service: ${getServiceName(service)}
        Message: ${message || 'No additional message'}
    `;

    // In a real scenario, you would send this to your backend
    // For now, we'll just show a success message
    showSuccessMessage();
    
    // Reset form
    document.querySelector('.contact-form').reset();
}

function getServiceName(serviceCode) {
    const services = {
        'bath': 'Bath & Care',
        'cut': 'Hair Cut & Styling',
        'nails': 'Nail Care',
        'analysis': 'Coat Analysis',
        'wellness': 'Premium Wellness',
        'other': 'Other'
    };
    return services[serviceCode] || serviceCode;
}

function showSuccessMessage() {
    // Create success modal
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="success-modal-content">
            <div class="success-icon">✓</div>
            <h3>Thank You!</h3>
            <p>Your appointment request has been submitted successfully.</p>
            <p>We will contact you shortly at the provided phone number or email address.</p>
            <button onclick="this.closest('.success-modal').remove()">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add styles for modal if not already present
    if (!document.querySelector('style[data-modal]')) {
        const style = document.createElement('style');
        style.setAttribute('data-modal', 'true');
        style.innerHTML = `
            .success-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                animation: fadeIn 0.3s ease;
            }

            .success-modal-content {
                background: white;
                padding: 2rem;
                border-radius: 15px;
                text-align: center;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                animation: slideInUp 0.3s ease;
            }

            .success-icon {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #8B4513, #DC143C);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                color: white;
                margin: 0 auto 1.5rem;
                font-weight: bold;
            }

            .success-modal-content h3 {
                font-size: 1.8rem;
                color: #2C1810;
                margin-bottom: 1rem;
            }

            .success-modal-content p {
                color: #666;
                margin-bottom: 1rem;
                line-height: 1.6;
            }

            .success-modal-content button {
                background: linear-gradient(135deg, #8B4513, #DC143C);
                color: white;
                border: none;
                padding: 0.75rem 2rem;
                font-size: 1rem;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
                margin-top: 1rem;
            }

            .success-modal-content button:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 20px rgba(139, 69, 19, 0.3);
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        const modals = document.querySelectorAll('.success-modal');
        if (modals.length > 0) {
            modals[0].remove();
        }
    }, 5000);
}

// =============================================
// SCROLL ANIMATIONS
// ============================================= 

function initializeScrollAnimations() {
    // Observe elements for fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards, review cards, and feature cards
    const elementsToObserve = document.querySelectorAll(
        '.service-card, .review-card, .feature, .gallery-item, .info-item'
    );

    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// =============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================= 

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-link')) {
        const href = e.target.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                closeMenu();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }
});

// =============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================= 

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.background = 'linear-gradient(135deg, rgba(44, 24, 16, 0.95) 0%, rgba(139, 69, 19, 0.95) 100%)';
    } else {
        navbar.style.backdropFilter = 'none';
        navbar.style.background = 'linear-gradient(135deg, var(--dark-color) 0%, var(--primary-color) 100%)';
    }
});

// =============================================
// COUNTER ANIMATION (Optional Enhancement)
// ============================================= 

function animateCounters() {
    const stats = document.querySelectorAll('.stat h3');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        if (!isNaN(target)) {
            let current = 0;
            const increment = target / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current).toLocaleString();
                }
            }, 30);
        }
    });
}

// Trigger counter animation when stats section comes into view
window.addEventListener('scroll', function() {
    const statsSection = document.querySelector('.stats');
    if (statsSection && !statsSection.hasAttribute('data-animated')) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statsSection.setAttribute('data-animated', 'true');
            animateCounters();
        }
    }
}, { once: false });

// =============================================
// UTILITY FUNCTIONS
// ============================================= 

// Get element function
function getElement(selector) {
    return document.querySelector(selector);
}

// Add class to element
function addClass(element, className) {
    if (element) {
        element.classList.add(className);
    }
}

// Remove class from element
function removeClass(element, className) {
    if (element) {
        element.classList.remove(className);
    }
}

// Toggle class on element
function toggleClass(element, className) {
    if (element) {
        element.classList.toggle(className);
    }
}

// Log for debugging (can be removed in production)
console.log('Katy\'s Grooming - Website loaded successfully!');
console.log('Language: English');
console.log('Theme: Soft Modern Design');
