// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main Initialization Function
function initializeApp() {
    initializeDarkMode();
    initializeCounterGame();
    initializeFAQ();
    initializeServices();
    initializeContactForm();
    initializeAnimations();
    initializeDemoFeatures();
    initializeAboutPage();
}

// Dark Mode Functionality
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const theme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', theme);
    updateDarkModeIcon(theme);
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
}

function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateDarkModeIcon(newTheme);
}

function updateDarkModeIcon(theme) {
    const icon = document.querySelector('.dark-mode-toggle i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Counter Game Functionality
function initializeCounterGame() {
    const counterValue = document.getElementById('counter-value');
    const incrementBtn = document.getElementById('increment-btn');
    const decrementBtn = document.getElementById('decrement-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    let count = parseInt(localStorage.getItem('counterValue')) || 0;
    updateCounterDisplay(count);
    
    if (incrementBtn) {
        incrementBtn.addEventListener('click', () => {
            count++;
            updateCounter();
        });
    }
    
    if (decrementBtn) {
        decrementBtn.addEventListener('click', () => {
            count--;
            updateCounter();
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            count = 0;
            updateCounter();
        });
    }
    
    function updateCounter() {
        updateCounterDisplay(count);
        localStorage.setItem('counterValue', count.toString());
    }
    
    function updateCounterDisplay(value) {
        if (counterValue) {
            counterValue.textContent = value;
            counterValue.style.color = value < 0 ? '#e74c3c' : value > 0 ? '#27ae60' : '#3498db';
        }
    }
}

// FAQ Functionality
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle current question
            this.setAttribute('aria-expanded', !isExpanded);
            answer.hidden = isExpanded;
            
            // Rotate icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
    });
}

// Services Page Functionality
function initializeServices() {
    // Detail buttons
    const detailButtons = document.querySelectorAll('.detail-button');
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const detail = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            this.setAttribute('aria-expanded', !isExpanded);
            this.textContent = isExpanded ? 'Show Details' : 'Hide Details';
            detail.hidden = isExpanded;
        });
    });
    
    // Show all details button
    const showAllBtn = document.getElementById('show-all-details');
    if (showAllBtn) {
        showAllBtn.addEventListener('click', () => {
            document.querySelectorAll('.service-detail').forEach(detail => {
                detail.hidden = false;
            });
            document.querySelectorAll('.detail-button').forEach(button => {
                button.setAttribute('aria-expanded', 'true');
                button.textContent = 'Hide Details';
            });
        });
    }
    
    // Hide all details button
    const hideAllBtn = document.getElementById('hide-all-details');
    if (hideAllBtn) {
        hideAllBtn.addEventListener('click', () => {
            document.querySelectorAll('.service-detail').forEach(detail => {
                detail.hidden = true;
            });
            document.querySelectorAll('.detail-button').forEach(button => {
                button.setAttribute('aria-expanded', 'false');
                button.textContent = 'Show Details';
            });
        });
    }
    
    // Calculate price button
    const calculatePriceBtn = document.getElementById('calculate-price');
    if (calculatePriceBtn) {
        calculatePriceBtn.addEventListener('click', calculatePrintingPrice);
    }
}

function calculatePrintingPrice() {
    const pages = prompt('Enter number of pages to print:');
    const isColor = confirm('Is this color printing? (OK for Color, Cancel for Black & White)');
    
    if (pages && !isNaN(pages) && pages > 0) {
        const pricePerPage = isColor ? 20 : 5;
        const total = pages * pricePerPage;
        
        alert(`Printing ${pages} pages (${isColor ? 'Color' : 'B&W'}) will cost: KES ${total}`);
    } else {
        alert('Please enter a valid number of pages.');
    }
}

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
}

function validateForm() {
    let isValid = true;
    const fields = [
        { id: 'name', validator: validateName },
        { id: 'email', validator: validateEmail },
        { id: 'message', validator: validateMessage }
    ];
    
    fields.forEach(field => {
        if (!field.validator(field.id)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const validators = {
        'name': validateName,
        'email': validateEmail,
        'message': validateMessage
    };
    
    if (validators[field.id]) {
        validators[field.id](field.id);
    }
}

function clearError(e) {
    const errorElement = document.getElementById(e.target.id + '-error');
    if (errorElement) {
        errorElement.style.display = 'none';
        e.target.style.borderColor = '';
    }
}

function validateName(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    const value = field.value.trim();
    
    if (value.length < 2) {
        showError(field, errorElement, 'Please enter a valid name (at least 2 characters)');
        return false;
    }
    
    clearError({ target: field });
    return true;
}

function validateEmail(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    const value = field.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
        showError(field, errorElement, 'Please enter a valid email address');
        return false;
    }
    
    clearError({ target: field });
    return true;
}

function validateMessage(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    const value = field.value.trim();
    
    if (value.length < 10) {
        showError(field, errorElement, 'Please enter a message with at least 10 characters');
        return false;
    }
    
    clearError({ target: field });
    return true;
}

function showError(field, errorElement, message) {
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        field.style.borderColor = '#e74c3c';
    }
}

function submitForm() {
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('form-success');
    
    if (submitBtn && successMessage) {
        // Simulate form submission
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        setTimeout(() => {
            successMessage.hidden = false;
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            document.getElementById('contact-form').reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.hidden = true;
            }, 5000);
        }, 2000);
    }
}

// Animation Functionality
function initializeAnimations() {
    const animatedBox = document.getElementById('animated-box');
    if (!animatedBox) return;
    
    const bounceBtn = document.getElementById('bounce-btn');
    const spinBtn = document.getElementById('spin-btn');
    const colorCycleBtn = document.getElementById('color-cycle-btn');
    const resetBtn = document.getElementById('reset-animation-btn');
    
    if (bounceBtn) {
        bounceBtn.addEventListener('click', () => {
            resetAnimations();
            animatedBox.classList.add('bounce');
            animatedBox.innerHTML = '<p>Bouncing!</p>';
        });
    }
    
    if (spinBtn) {
        spinBtn.addEventListener('click', () => {
            resetAnimations();
            animatedBox.classList.add('spin');
            animatedBox.innerHTML = '<p>Spinning!</p>';
        });
    }
    
    if (colorCycleBtn) {
        colorCycleBtn.addEventListener('click', () => {
            resetAnimations();
            animatedBox.classList.add('color-cycle');
            animatedBox.innerHTML = '<p>Color Cycling!</p>';
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetAnimations);
    }
    
    function resetAnimations() {
        animatedBox.classList.remove('bounce', 'spin', 'color-cycle');
        animatedBox.innerHTML = '<p>Click buttons to animate me!</p>';
        animatedBox.style.background = '';
    }
}

// Demo Features
function initializeDemoFeatures() {
    // Welcome message button
    const welcomeBtn = document.getElementById('welcome-button');
    if (welcomeBtn) {
        welcomeBtn.addEventListener('click', () => {
            const welcomeText = document.querySelector('#home h2 + p');
            if (welcomeText) {
                welcomeText.textContent = 'Welcome to Akubrecah Entertainment! We\'re excited to serve you with the best digital solutions in Kapenguria.';
                welcomeText.style.color = '#e74c3c';
                welcomeText.style.fontWeight = 'bold';
            }
        });
    }
    
    // Color toggle button
    const colorBtn = document.getElementById('color-button');
    if (colorBtn) {
        colorBtn.addEventListener('click', () => {
            document.body.style.background = document.body.style.background === 'rgb(236, 240, 241)' ? '#34495e' : '#ecf0f1';
        });
    }
    
    // Discount button
    const discountBtn = document.getElementById('discount-button');
    if (discountBtn) {
        discountBtn.addEventListener('click', () => {
            const banner = document.getElementById('discount-banner');
            if (banner) {
                banner.hidden = !banner.hidden;
            }
        });
    }
    
    // Visitor counter
    initializeVisitorCounter();
}

function initializeVisitorCounter() {
    const visitorCount = document.getElementById('visitor-count');
    if (visitorCount) {
        let count = parseInt(localStorage.getItem('visitorCount')) || 0;
        count++;
        localStorage.setItem('visitorCount', count.toString());
        visitorCount.textContent = count;
    }
}

// About Page Functionality
function initializeAboutPage() {
    // Highlight students button
    const highlightBtn = document.getElementById('highlight-students');
    if (highlightBtn) {
        highlightBtn.addEventListener('click', () => {
            const studentItem = document.querySelector('#target-market li:first-child');
            if (studentItem) {
                studentItem.style.backgroundColor = '#3498db';
                studentItem.style.color = 'white';
                studentItem.style.padding = '10px';
                studentItem.style.borderRadius = '5px';
                studentItem.style.fontWeight = 'bold';
            }
        });
    }
    
    // Add customer type button
    const addCustomerBtn = document.getElementById('add-customer-type');
    if (addCustomerBtn) {
        addCustomerBtn.addEventListener('click', () => {
            const targetMarket = document.getElementById('target-market');
            if (targetMarket) {
                const newItem = document.createElement('li');
                newItem.innerHTML = '<strong>Tourists:</strong> Need printing and internet services while visiting';
                targetMarket.appendChild(newItem);
            }
        });
    }
}

// Utility Functions
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

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        toggleDarkMode,
        validateForm,
        calculatePrintingPrice
    };
}