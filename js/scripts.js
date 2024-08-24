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

            // Validate Full Name
            if (fullName.value.trim() === '') {
                isValid = false;
                errorMessage += 'Full Name is required.\n';
            }

            // Validate Email
            if (email.value.trim() === '' || !validateEmail(email.value)) {
                isValid = false;
                errorMessage += 'Valid Email Address is required.\n';
            }

            // Validate Quantity
            if (quantity.value <= 0) {
                isValid = false;
                errorMessage += 'Quantity must be greater than zero.\n';
            }

            // Show error messages if validation fails
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

            // Prompt the user to view the Order Sheet
            setTimeout(() => {
                if (confirm("Order has been successfully submitted! Would you like to view the Order Sheet?")) {
                    window.open('ordersheet.html', '_blank');
                }
            }, 100);
        });
    }

    // Image change functionality based on product selection
    const productSelect = document.getElementById('product-select');
    const productImage = document.getElementById('product-image');

    // Object mapping product values to image sources and alt text
    const productImages = {
        'select': { src: 'images/orders.jpg', alt: 'Custom Birthday Cake' },
        'birthday-cake': { src: 'images/Cake_Birthday3.png', alt: 'Custom Birthday Cake' },
        'wedding-cake': { src: 'images/Cake_Wedding1.png', alt: 'Elegant Wedding Cake' },
        'pastry': { src: 'images/Pastry_2.png', alt: 'Artisanal Pastry' },
        'bread': { src: 'images/Bread_3.png', alt: 'Fresh Bread' }
    };

    // Function to update the image with a fade effect
    function updateImage() {
        const selectedProduct = productSelect.value;

        // Apply fade-out effect
        productImage.classList.add('fade-out');

        // Wait for the fade-out to complete before changing the image
        setTimeout(() => {
            if (productImages[selectedProduct]) {
                productImage.src = productImages[selectedProduct].src;
                productImage.alt = productImages[selectedProduct].alt;
            } else {
                // Default image if no valid product is selected
                productImage.src = 'images/default.jpg';
                productImage.alt = 'Order Image';
            }

            // Apply fade-in effect after the image source changes
            productImage.classList.remove('fade-out');
            productImage.classList.add('fade-in');

            // Remove fade-in class after animation completes
            setTimeout(() => {
                productImage.classList.remove('fade-in');
            }, 500); // Duration should match the CSS animation time

        }, 500); // Duration of the fade-out effect in milliseconds
    }

    // Event listener for dropdown menu change
    productSelect.addEventListener('change', updateImage);

    // Ensure initial image state reflects the current selection
    updateImage();
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

    let autoFillPromptShown = false;

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
        const products = ['birthday-cake', 'wedding-cake', 'pastry', 'bread'];
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
            autoFillPromptShown = true;
        }
    });

    // When the user clicks on the "Yes" button, auto-fill the form
    confirmBtn.addEventListener('click', function () {
        const randomData = getRandomData();
        orderForm.querySelector('input[placeholder="Full Name"]').value = randomData.name;
        orderForm.querySelector('input[placeholder="Email Address"]').value = randomData.email;
        orderForm.querySelector('input[placeholder="Mobile Number"]').value = randomData.phone;
        const productDropdown = orderForm.querySelector('select[name="product"]');
        productDropdown.value = randomData.product;
        orderForm.querySelector('input[placeholder="Quantity"]').value = randomData.quantity;
        orderForm.querySelector('textarea[name="message"]').value = randomData.message;

        // Manually trigger change event to update the image
        const event = new Event('change');
        productDropdown.dispatchEvent(event);

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

// Tooltip for Menu Icon
document.addEventListener('DOMContentLoaded', function () {
    const tooltip = document.getElementById('menuTooltip');
    const menuIcon = document.getElementById('menu-icon');

    // Check if the tooltip should be shown on page load
    const shouldShowTooltip = !sessionStorage.getItem('menuTooltipDismissed');
    if (shouldShowTooltip) {
        // Position the tooltip near the menu icon
        const rect = menuIcon.getBoundingClientRect();
        tooltip.style.top = `${rect.bottom + 12}px`;
        tooltip.style.left = `${rect.left}px`;

        // Show the tooltip
        tooltip.classList.add('show');

        // Function to hide the tooltip
        const dismissTooltip = () => {
            tooltip.classList.remove('show');
            sessionStorage.setItem('menuTooltipDismissed', 'true');
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

// 3D Carousel Gallery with Infinite ScrollTrigger
document.addEventListener('DOMContentLoaded', function () {
    const galleryBoxOuter = document.querySelector('.gallery_box_outer');
    const images = document.querySelectorAll('.gallery_box_in');

    if (galleryBoxOuter) {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".gallery_box",
                start: "top center-=200px",
                end: "bottom+=3000px center-=200px",
                scrub: true,
                pin: true,
                onUpdate: self => {
                    const progress = self.progress.toFixed(5);
                    const rotation = progress * 360 * 5;
                    gsap.set(galleryBoxOuter, { rotateY: rotation });

                    // Variable to track the image closest to the center front
                    let closestImageIndex = -1;
                    let closestDistance = 360; // Max possible distance

                    images.forEach((image, index) => {
                        const normalizedRotation = (index * 25.71 + rotation) % 360;

                        // Calculate the distance from the front-center (180 degrees)
                        const distanceFromFront = Math.abs(normalizedRotation - 180);

                        // Track the closest image to the front-center
                        if (distanceFromFront < closestDistance) {
                            closestDistance = distanceFromFront;
                            closestImageIndex = index;
                        }

                        // Determine opacity based on distance from the front
                        let opacity;
                        let scale; // Variable to adjust scale

                        if (distanceFromFront < 20) {
                            opacity = 1;  // Full opacity for the center front image
                        } else if (distanceFromFront < 60) {
                            opacity = 0.8;  // 80% opacity for images close to the front
                        } else {
                            opacity = Math.max(0.05, 1 - (distanceFromFront / 180));  // Gradually fade for the rest
                        }

                        image.style.opacity = opacity;
                        image.style.transform = `rotateY(${index * 25.71}deg) translateZ(1450px) scale(1)`;
                    });

                    // Apply scaling to the closest image to the front-center
                    if (closestImageIndex !== -1) {
                        images[closestImageIndex].style.transform = `rotateY(${closestImageIndex * 25.71}deg) translateZ(1450px) scale(1.5)`;
                    }
                }
            }
        });
    }
});
