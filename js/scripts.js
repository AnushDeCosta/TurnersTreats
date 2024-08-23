// Order Form Validation and Submission
document.addEventListener('DOMContentLoaded', function () {
    const orderForm = document.querySelector('form[action="#"]');

    if (orderForm) {
        orderForm.addEventListener('submit', function (e) {
            const fullName = orderForm.querySelector('input[placeholder="Full Name"]');
            const email = orderForm.querySelector('input[placeholder="Email Address"]');
            const quantity = orderForm.querySelector('input[placeholder="Quantity"]');
            const product = orderForm.querySelector('select[name="product"]');
            const message = orderForm.querySelector('textarea[name="message"]');

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

            if (quantity.value <= 0) {
                isValid = false;
                errorMessage += 'Quantity must be greater than zero.\n';
            }

            if (!isValid) {
                e.preventDefault();
                alert(errorMessage);
            } else {
                e.preventDefault(); // Prevent default form submission

                // Create an order object
                const order = {
                    fullName: fullName.value.trim(),
                    email: email.value.trim(),
                    product: product.value,
                    quantity: quantity.value,
                    message: message.value.trim()
                };

                // Save the order to localStorage
                let orders = JSON.parse(localStorage.getItem('orders')) || [];
                orders.push(order);
                localStorage.setItem('orders', JSON.stringify(orders));

                // Display the custom confirmation modal
                const confirmationModal = document.getElementById("confirmationModal");
                confirmationModal.style.display = "block";

                // Reset the form
                orderForm.reset();
            }
        });
    }

    // Email Validation Function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Close the confirmation modal when "OK" is clicked
    const closeConfirmation = document.getElementById("closeConfirmation");
    if (closeConfirmation) {
        closeConfirmation.addEventListener('click', function () {
            const confirmationModal = document.getElementById("confirmationModal");
            confirmationModal.style.display = "none";

            // After the confirmation modal is closed, prompt the user to view the Order Sheet
            setTimeout(() => {
                if (confirm("Order has been successfully submitted! Would you like to view the Order Sheet?")) {
                    window.open('ordersheet.html', '_blank');
                }
            }, 100);
        });
    }
});

// Slideshow functionality
document.addEventListener('DOMContentLoaded', function () {
    const slideshows = document.querySelectorAll('.slideshow-container');

    slideshows.forEach((slideshow, index) => {
        let slides = slideshow.getElementsByClassName('slides');
        let currentSlide = 0;

        // Initialize: Show the first slide
        slides[currentSlide].classList.add('fade-in');
        slides[currentSlide].style.display = 'block';

        // Different timing for each slideshow
        let timing = 2500 + (index * 500); 

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
                currentSlide = (currentSlide + 1) % slides.length;

                // Show and fade in the next slide
                slides[currentSlide].style.display = 'block';
                slides[currentSlide].classList.add('fade-in');
            }, 500); // Adjust the delay for the fade transition
        }

        // Set interval to rotate slides with staggered timing
        setInterval(showNextSlide, timing);
    });
});

// Navigation Menu Toggle
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

// Auto-Fill Functionality
document.addEventListener('DOMContentLoaded', function () {
    const orderForm = document.querySelector('form[action="#"]');
    const fullNameField = orderForm.querySelector('input[placeholder="Full Name"]');
    const modal = document.getElementById("autoFillModal");
    const confirmBtn = document.getElementById("confirmAutoFill");
    const cancelBtn = document.getElementById("cancelAutoFill");
    const confirmationModal = document.getElementById("confirmationModal");
    const closeConfirmation = document.getElementById("closeConfirmation");

    let autoFillPromptShown = false; // Track if the autofill prompt has been shown

    // Function to generate random Australian-like phone number
    function getRandomPhoneNumber() {
        const prefix = ["041", "042", "043", "044"];
        const randomPrefix = prefix[Math.floor(Math.random() * prefix.length)];
        const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
        return `${randomPrefix}${randomNumber}`;
    }

    // Random data generator function with Latin paragraphs
    function getRandomData() {
        const names = ['John Doe', 'Jane Smith', 'Alex Johnson'];
        const emails = ['john@example.com', 'jane@example.com', 'alex@example.com'];
        const products = ['cake', 'pastry', 'bread'];
        const quantities = [1, 2, 3];
        const phoneNumber = getRandomPhoneNumber();
        const message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

        return {
            name: names[Math.floor(Math.random() * names.length)],
            email: emails[Math.floor(Math.random() * emails.length)],
            product: products[Math.floor(Math.random() * products.length)],
            quantity: quantities[Math.floor(Math.random() * quantities.length)],
            phone: phoneNumber,
            message: message
        };
    }

    // Show the modal when Full Name field is focused for the first time
    fullNameField.addEventListener('focus', function () {
        if (!autoFillPromptShown) {
            modal.style.display = "block";
            autoFillPromptShown = true; // Ensure the modal is only shown once
        }
    });

    // When the user clicks on the "Yes" button, auto-fill the form
    confirmBtn.addEventListener('click', function () {
        const randomData = getRandomData();
        orderForm.querySelector('input[placeholder="Full Name"]').value = randomData.name;
        orderForm.querySelector('input[placeholder="Email Address"]').value = randomData.email;
        orderForm.querySelector('input[placeholder="Mobile Number"]').value = randomData.phone;
        orderForm.querySelector('select[name="product"]').value = randomData.product;
        orderForm.querySelector('input[placeholder="Quantity"]').value = randomData.quantity;
        orderForm.querySelector('textarea[name="message"]').value = randomData.message;

        modal.style.display = "none";
    });

    // When the user clicks on the "No" button, close the modal
    cancelBtn.addEventListener('click', function () {
        modal.style.display = "none";
    });

    // Close the modal when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const tooltip = document.getElementById('menuTooltip');
    const menuIcon = document.getElementById('menu-icon');

    // Check if the tooltip should be shown on page load
    const shouldShowTooltip = !sessionStorage.getItem('menuTooltipDismissed');
    if (shouldShowTooltip) {
        // Position the tooltip near the menu icon
        const rect = menuIcon.getBoundingClientRect();
        tooltip.style.top = `${rect.bottom + 12}px`; // 10px below the menu icon
        tooltip.style.left = `${rect.left}px`;

        // Show the tooltip
        tooltip.classList.add('show');

        // Function to hide the tooltip
        const dismissTooltip = () => {
            tooltip.classList.remove('show');
            sessionStorage.setItem('menuTooltipDismissed', 'true'); // Store dismissal in sessionStorage
        };

        // Hide the tooltip when the user clicks or hovers over the menu icon
        menuIcon.addEventListener('click', dismissTooltip);
        menuIcon.addEventListener('mouseover', dismissTooltip);

        // Hide the tooltip after 10 seconds if no interaction
        setTimeout(function () {
            if (tooltip.classList.contains('show')) {
                dismissTooltip();
            }
        }, 4000);
    }

    // Clear the dismissal status on page load so that the tooltip shows again on refresh
    sessionStorage.removeItem('menuTooltipDismissed');
});