// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    menuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Testimonial slider functionality
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }

    if (prevBtn && nextBtn && testimonials.length > 1) {
        showTestimonial(currentTestimonial);

        nextBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        });

        prevBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
    }

    // Scroll animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animation
    document.querySelectorAll('.feature-card, .gallery-item, .testimonial').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Additional testimonial data for future expansion
const testimonialData = [
    {
        text: "Avian World helped us find the perfect parrot for our family. Their expertise and care made the adoption process smooth and enjoyable. Our new feathered friend has brought so much joy to our home!",
        author: "Sarah Johnson, Parrot Owner"
    },
    {
        text: "The veterinary care at Avian World is exceptional. They saved my cockatiel's life with their expert knowledge and quick response. I wouldn't trust anyone else with my birds!",
        author: "Michael Chen, Cockatiel Owner"
    },
    {
        text: "The training programs transformed my parrot's behavior. From being shy and nervous to confident and social - the trainers at Avian World are truly amazing!",
        author: "Emily Rodriguez, Bird Enthusiast"
    }
];

// Function to initialize testimonial slider with data
function initTestimonialSlider() {
    const testimonialContainer = document.querySelector('.testimonial-slider');
    if (testimonialContainer) {
        testimonialContainer.innerHTML = '';
        
        testimonialData.forEach((testimonial, index) => {
            const testimonialElement = document.createElement('div');
            testimonialElement.className = 'testimonial';
            testimonialElement.style.display = index === 0 ? 'block' : 'none';
            testimonialElement.innerHTML = `
                <p class="testimonial-text">"${testimonial.text}"</p>
                <p class="testimonial-author">- ${testimonial.author}</p>
            `;
            testimonialContainer.appendChild(testimonialElement);
        });

        // Add slider controls
        const controls = document.createElement('div');
        controls.className = 'slider-controls';
        controls.innerHTML = `
            <button class="slider-btn prev">←</button>
            <button class="slider-btn next">→</button>
        `;
        testimonialContainer.appendChild(controls);

        // Reinitialize slider functionality
        initSliderFunctionality();
    }
}

// Initialize slider functionality
function initSliderFunctionality() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }

    if (prevBtn && nextBtn && testimonials.length > 1) {
        showTestimonial(currentTestimonial);

        nextBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        });

        prevBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
    }
}

// Image loading error handling
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.backgroundColor = '#f0f0f0';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = '#666';
            this.style.fontSize = '14px';
            this.style.textAlign = 'center';
            this.innerHTML = 'Image not available';
        });
    });
});

// Form enhancement with local storage
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Load saved form data if exists
        const savedFormData = localStorage.getItem('contactFormData');
        if (savedFormData) {
            const formData = JSON.parse(savedFormData);
            document.getElementById('name').value = formData.name || '';
            document.getElementById('email').value = formData.email || '';
            document.getElementById('phone').value = formData.phone || '';
            document.getElementById('message').value = formData.message || '';
        }

        // Save form data on input change
        contactForm.addEventListener('input', function() {
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };
            localStorage.setItem('contactFormData', JSON.stringify(formData));
        });

        // Clear saved data on successful submission
        contactForm.addEventListener('submit', function(e) {
            localStorage.removeItem('contactFormData');
        });
    }
});

// Parallax effect for hero section
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.backgroundPositionY = rate + 'px';
        });
    }
});

// Mobile menu close on outside click
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
        }
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', function() {
                this.style.transition = 'opacity 0.3s ease';
                this.style.opacity = '1';
            });
        }
    });
});

