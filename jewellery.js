
document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Header ---
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu ---
    const menuToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Toggle icon shape (hamburger to X) - optional, visual only
            menuToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.textContent = '☰';
            });
        });
    }

    // --- Testimonial Slider (Auto Fade) ---
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    if (testimonials.length > 0) {
        // Show first one
        testimonials[0].classList.add('active');

        setInterval(() => {
            // Remove active from current
            testimonials[currentTestimonial].classList.remove('active');

            // Move to next
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;

            // Add active to next
            testimonials[currentTestimonial].classList.add('active');
        }, 5000); // Change every 5 seconds
    }

    // --- Lightbox Functionality ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="close-lightbox">&times;</span>
        <img src="" alt="Gallery Preview">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const highResSrc = img.src; // Using same src for demo, ideally data-src
            lightboxImg.src = highResSrc;
            lightbox.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // --- Contact Form Validation ---
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('Please fill in all required fields.');
                return;
            }

            // Simple email validation
            if (!email.includes('@') || !email.includes('.')) {
                alert('Please enter a valid email address.');
                return;
            }

            // Fake Success
            alert(`Thank you, ${name}! Your message has been sent to Aurora Jewels. We will contact you shortly.`);
            contactForm.reset();
        });
    }
});
