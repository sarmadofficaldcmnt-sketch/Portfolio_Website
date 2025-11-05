// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize animations
    initAnimations();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize form handling
    initContactForm();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize skill animations
    initSkillAnimations();
}

// Navigation
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.getElementById('navbar');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Skill Animations
function initSkillAnimations() {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress-bar');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-category').forEach(category => {
        skillObserver.observe(category);
    });
}

// Scroll Effects
function initScrollEffects() {
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitText = document.getElementById('submitText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        submitText.style.display = 'none';
        loadingSpinner.style.display = 'flex';
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        try {
            // Simulate API call (replace with actual endpoint)
            await simulateAPICall(formData);
            
            // Show success message
            showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            
        } catch (error) {
            // Show error message
            showFormMessage('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset loading state
            submitText.style.display = 'inline';
            loadingSpinner.style.display = 'none';
        }
    });

    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    function simulateAPICall(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                Math.random() > 0.2 ? resolve() : reject();
            }, 2000);
        });
    }
}

// Project Modal
function showProjectDetails(projectId) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    
    const projectDetails = {
        'bz-mart': {
            title: 'BZ Mart - Smart Grocery App',
            description: 'A comprehensive grocery shopping application with AI-powered features for enhanced user experience.',
            features: [
                'Smart product search and recommendations',
                'Recipe suggestions based on available ingredients',
                'Real-time delivery tracking',
                'Secure payment integration',
                'User-friendly interface with dark/light mode'
            ],
            technologies: ['Java', 'Firebase', 'XML', 'SQL', 'Android SDK'],
            images: ['project1-1.jpg', 'project1-2.jpg']
        },
        'parking-system': {
            title: 'Smart Parking System',
            description: 'Web-based parking management system with real-time slot availability and booking features.',
            features: [
                'Real-time parking slot monitoring',
                'Online booking and payment',
                'Admin dashboard for management',
                'User authentication and profiles',
                'Mobile-responsive design'
            ],
            technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
            images: ['project2-1.jpg', 'project2-2.jpg']
        },
        'solar-website': {
            title: 'Solar Panel Company Website',
            description: 'Informative website for a solar panel company showcasing products and services.',
            features: [
                'Product catalog with filtering',
                'Service information and pricing',
                'Contact forms and lead generation',
                'Blog section for content marketing',
                'SEO optimized pages'
            ],
            technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
            images: ['project3-1.jpg', 'project3-2.jpg']
        },
        'calculator': {
            title: 'Console Calculator App',
            description: 'Simple yet efficient console-based calculator application.',
            features: [
                'Basic arithmetic operations',
                'Clean console interface',
                'Error handling and validation',
                'Modular code structure',
                'Cross-platform compatibility'
            ],
            technologies: ['C++'],
            images: ['project4-1.jpg']
        }
    };

    const project = projectDetails[projectId];
    
    if (project) {
        modalContent.innerHTML = `
            <h2>${project.title}</h2>
            <p class="project-description">${project.description}</p>
            
            <div class="project-features">
                <h3>Key Features</h3>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="project-technologies">
                <h3>Technologies Used</h3>
                <div class="tech-tags">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div class="project-actions">
                <button class="cta-button" onclick="closeModal()">Close</button>
            </div>
        `;
        
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typing effect for hero section (optional enhancement)
function initTypingEffect() {
    const taglines = [
        'Android Developer',
        'Full Stack Developer',
        'Project Leader',
        'Freelancer'
    ];
    
    let currentTagline = 0;
    const taglineElement = document.querySelector('.hero-tagline');
    
    function typeWriter(text, i, callback) {
        if (i < text.length) {
            taglineElement.innerHTML = text.substring(0, i + 1);
            setTimeout(() => typeWriter(text, i + 1, callback), 100);
        } else if (callback) {
            setTimeout(callback, 2000);
        }
    }
    
    function startTyping() {
        typeWriter(taglines[currentTagline], 0, () => {
            currentTagline = (currentTagline + 1) % taglines.length;
            setTimeout(startTyping, 500);
        });
    }
    
    // Uncomment to enable typing effect
    // startTyping();
}

// Initialize typing effect (optional)
// initTypingEffect();

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Export functions for global access
window.showProjectDetails = showProjectDetails;
window.closeModal = closeModal;
// Google Apps Script Web App URL - YAHAN APNA NAYA URL PASTE KAREN
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwR3GqyqGXkPtwJAfaaF8pm38LeR1E8d937M0S9MZIAB-iBCaVoeKbNQhmgeyAVZhDgnQ/exec";

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitText = document.getElementById('submitText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Loading state show karen
            submitText.style.display = 'none';
            loadingSpinner.style.display = 'inline-block';
            formMessage.textContent = '';
            formMessage.className = 'form-message';
            
            // Form data collect karen
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            // Validation
            if (!formData.name || !formData.email || !formData.message) {
                formMessage.textContent = '❌ Please fill all required fields.';
                formMessage.className = 'form-message error';
                submitText.style.display = 'inline-block';
                loadingSpinner.style.display = 'none';
                return;
            }
            
            console.log('Sending data to Google Script:', formData);
            
            try {
                // Google Apps Script ko data send karen
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8',
                    },
                    body: JSON.stringify(formData)
                });
                
                console.log('Response received:', response);
                
                const result = await response.json();
                console.log('Parsed result:', result);
                
                if (result.status === 'success') {
                    // Success message
                    formMessage.textContent = '✅ Message sent successfully! I will get back to you soon.';
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                } else {
                    throw new Error(result.message);
                }
                
            } catch (error) {
                // Error message
                console.error('Form submission error:', error);
                formMessage.textContent = '❌ Error sending message. Please try again or contact me directly.';
                formMessage.className = 'form-message error';
            } finally {
                // Loading state hide karen
                submitText.style.display = 'inline-block';
                loadingSpinner.style.display = 'none';
            }
        });
    }
});