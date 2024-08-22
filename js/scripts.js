// Order Form Validation
document.addEventListener('DOMContentLoaded', function () {
    const orderForm = document.querySelector('form[action="#"]');

    if (orderForm) {
        orderForm.addEventListener('submit', function (e) {
            const fullName = orderForm.querySelector('input[placeholder="Full Name"]');
            const email = orderForm.querySelector('input[placeholder="Email Address"]');
            const quantity = orderForm.querySelector('input[placeholder="Quantity"]');

            let isValid = true;
            let errorMessage = '';

            if (fullName.value.trim() === '') {
                isValid = false;
                errorMessage += 'Full Name is required.\n';
            }

            if (email.value.trim() === '' || !validateEmail(email.value)) {
                isValid = false;
                errorMessage += 'Valid Email Address is required.\n';
            }

            if (quantity.value < 0) {
                isValid = false;
                errorMessage += 'Quantity cannot be negative.\n';
            }

            if (!isValid) {
                e.preventDefault();
                alert(errorMessage);
            }
        });
    }

    // Contact Form Validation
    const contactForm = document.querySelector('form[action="#"]:not(.order-form)');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const fullName = contactForm.querySelector('input[placeholder="Full Name"]');
            const email = contactForm.querySelector('input[placeholder="Email Address"]');
            const message = contactForm.querySelector('textarea[placeholder="Your Message"]');

            let isValid = true;
            let errorMessage = '';

            if (fullName.value.trim() === '') {
                isValid = false;
                errorMessage += 'Full Name is required.\n';
            }

            if (email.value.trim() === '' || !validateEmail(email.value)) {
                isValid = false;
                errorMessage += 'Valid Email Address is required.\n';
            }

            if (message.value.trim() === '') {
                isValid = false;
                errorMessage += 'Message cannot be empty.\n';
            }

            if (!isValid) {
                e.preventDefault();
                alert(errorMessage);
            }
        });
    }

    // Email Validation Function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Select all slideshow containers
    const slideshows = document.querySelectorAll('.slideshow-container');

    slideshows.forEach((slideshow, index) => {
        let slides = slideshow.getElementsByClassName('slides');
        let currentSlide = 0;

        // Initialize: Show the first slide
        slides[currentSlide].classList.add('fade-in');
        slides[currentSlide].style.display = 'block';

        // Different timing for each slideshow
        let timing = 3000 + (index * 500); 

        // Function to show the next slide
        function showNextSlide() {
            // Fade out the current slide
            slides[currentSlide].classList.remove('fade-in');
            slides[currentSlide].classList.add('fade-out');

            setTimeout(() => {
                // Hide the current slide
                slides[currentSlide].style.display = 'none';
                slides[currentSlide].classList.remove('fade-out');

                // Move to the next slide
                currentSlide = (currentSlide + 2) % slides.length;

                // Show and fade in the next slide
                slides[currentSlide].style.display = 'block';
                slides[currentSlide].classList.add('fade-in');
            }, 500); // Adjust the delay for the fade transition
        }

        // Set interval to rotate slides with staggered timing
        setInterval(showNextSlide, timing);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const nav = document.querySelector('.nav');

    menuIcon.addEventListener('click', function (e) {
        nav.classList.toggle('active');
        e.stopPropagation(); // Prevent click event from bubbling up
    });

    document.addEventListener('click', function (e) {
        if (!nav.contains(e.target) && !menuIcon.contains(e.target)) {
            nav.classList.remove('active');
        }
    });

    nav.addEventListener('mouseleave', function () {
        nav.classList.remove('active');
    });
});

// Blog Post Expand
document.addEventListener('DOMContentLoaded', function () {
    const readMoreButtons = document.querySelectorAll('.read-more');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const fullContent = this.previousElementSibling;
            if (fullContent.style.display === 'none' || fullContent.style.display === '') {
                fullContent.style.display = 'block';
                this.textContent = 'Read Less';
            } else {
                fullContent.style.display = 'none';
                this.textContent = 'Read More';
            }
        });
    });
});

