// DOMContentLoaded event to initialize scripts after the document is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Select necessary elements from the DOM for form handling and modal control
    const orderForm = document.querySelector('form[action="#"]');
    const confirmationModal = document.getElementById("confirmationModal");
    const orderSubmittedModal = document.getElementById("orderSubmittedModal");
    const updateOrderModal = document.getElementById("updateOrderModal");
    const productPriceDisplay = document.getElementById('product-price');

    // Form submission handler with validation checks
    if (orderForm) {
        orderForm.addEventListener('submit', function (e) {
            e.preventDefault();

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

            // Show error messages or display confirmation modal
            if (!isValid) {
                alert(errorMessage);
            } else {
                confirmationModal.style.display = "block";
            }
        });
    }

    // Confirm or cancel order through modal buttons
    const confirmOrderBtn = document.getElementById("confirmOrder");
    const cancelOrderBtn = document.getElementById("cancelOrder");

    if (confirmOrderBtn) {
        confirmOrderBtn.addEventListener('click', function () {
            const order = {
                fullName: orderForm.querySelector('input[placeholder="Full Name"]').value.trim(),
                email: orderForm.querySelector('input[placeholder="Email Address"]').value.trim(),
                product: orderForm.querySelector('select[name="product"]').value,
                quantity: orderForm.querySelector('input[placeholder="Quantity"]').value,
                message: orderForm.querySelector('textarea[name="message"]').value.trim()
            };

            // Save order to localStorage and reset form
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));
            orderSubmittedModal.style.display = "block";
            confirmationModal.style.display = "none";
            orderForm.reset();
        });
    }

    if (cancelOrderBtn) {
        cancelOrderBtn.addEventListener('click', function () {
            confirmationModal.style.display = "none";
            updateOrderModal.style.display = "block";
        });
    }

    // Close modals and prompt user to view the Ordersheet
    const closeOrderSubmittedBtn = document.getElementById("closeOrderSubmitted");
    const closeUpdateOrderBtn = document.getElementById("closeUpdateOrder");

    if (closeOrderSubmittedBtn) {
        closeOrderSubmittedBtn.addEventListener('click', function () {
            orderSubmittedModal.style.display = "none";
            setTimeout(() => {
                if (confirm("NOTE to Teaching Team:\nThe absence of a Cart is an intentional Feature, not a Bug.\nMore details are in the report.\nWould you like to view the Order sheet?")) {
                    window.open('ordersheet.html', '_blank');
                }
            }, 100);
        });
    }

    if (closeUpdateOrderBtn) {
        closeUpdateOrderBtn.addEventListener('click', function () {
            updateOrderModal.style.display = "none";
        });
    }

    // Function to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Functionality to change image and price display based on product selection
    const productSelect = document.getElementById('product-select');
    const productImage = document.getElementById('product-image');

    const productDetails = {
        // Object mapping product values to image sources, alt text, and prices
        'select': { src: 'images/orders.jpg', alt: 'Custom Order', price: '$--' },
        'chocolate-cake': { src: 'images/Cakes/Chocolate.png', alt: 'Chocolate Cake', price: '$80.00 each' },
        'vanilla-cake': { src: 'images/Cakes/Vanilla.png', alt: 'Vanilla Cake', price: '$80.00 each' },
        'red-velvet-cake': { src: 'images/Cakes/Velvet.png', alt: 'Red Velvet Cake', price: '$120.00 each' },
        'lemon-cake': { src: 'images/Cakes/Lemon.png', alt: 'Lemon Cake', price: '$70.00 each' },
        'farm': { src: 'images/Cakes/Birthday1.png', alt: 'Birthday Cake 1', price: '$100.00 each' },
        'seal': { src: 'images/Cakes/Birthday2.png', alt: 'Birthday Cake 2', price: '$150.00 each' },
        'dino1': { src: 'images/Cakes/Birthday3.png', alt: 'Birthday Cake 3', price: '$180.00 each' },
        'dog': { src: 'images/Cakes/Birthday4.png', alt: 'Birthday Cake 4', price: '$280.00 each' },
        'tiered-cake1': { src: 'images/Cakes/Tiered3.png', alt: 'Tiered Cake 1', price: '$250.00 each' },
        'tiered-cake2': { src: 'images/Cakes/Tiered2.png', alt: 'Tiered Cake 2', price: '$185.00 each' },
        'tiered-cake3': { src: 'images/Cakes/Tiered1.png', alt: 'Tiered Cake 2', price: '$385.00 each' },
        'naked-cake': { src: 'images/Cakes/Naked.png', alt: 'Naked Cake', price: '$180.00 each' },
        'croissant': { src: 'images/Pastries/Croissant.png', alt: 'Croissant', price: '$6.00 each' },
        'danish': { src: 'images/Pastries/Danish.png', alt: 'Danish Pastry', price: '$6.50 each' },
        'eclair': { src: 'images/Pastries/Eclair.png', alt: 'Eclair', price: '$6.00 each' },
        'tart': { src: 'images/Pastries/Tarts.png', alt: 'Fruit Tart', price: '$6.50 each' },
        'baguette': { src: 'images/Bread/Baguette.png', alt: 'Baguette', price: '$5.50 each' },
        'sourdough': { src: 'images/Bread/Sourdough.png', alt: 'Sourdough', price: '$6.50 each' },
        'rye': { src: 'images/Bread/Rye.png', alt: 'Rye Bread', price: '$5.50 each' },
        'multigrain': { src: 'images/Bread/Multigrain.png', alt: 'Multigrain Bread', price: '$4.50 each' },
    };

    // Update image and price with fade effect
    function updateImageAndPrice() {
        const selectedProduct = productSelect.value;
        productImage.classList.add('fade-out');

        setTimeout(() => {
            if (productDetails[selectedProduct]) {
                productImage.src = productDetails[selectedProduct].src;
                productImage.alt = productDetails[selectedProduct].alt;
                productPriceDisplay.textContent = `Price: ${productDetails[selectedProduct].price}`;
            } else {
                productImage.src = 'images/orders.jpg';
                productImage.alt = 'Order Image';
                productPriceDisplay.textContent = '';
            }
            productImage.classList.remove('fade-out');
            productImage.classList.add('fade-in');
            setTimeout(() => {
                productImage.classList.remove('fade-in');
            }, 500);
        }, 500);
    }

    // Add event listener to update image and price on product selection change
    productSelect.addEventListener('change', updateImageAndPrice);
    updateImageAndPrice();  // Initialize with the default selection

});

// Slideshow initialization and functionality
document.addEventListener('DOMContentLoaded', function () {
    const slideshows = document.querySelectorAll('.slideshow-container');

    slideshows.forEach((slideshow, index) => {
        let slides = slideshow.getElementsByClassName('slides');
        let currentSlide = 0;

        slides[currentSlide].classList.add('fade-in');
        slides[currentSlide].style.display = 'block';

        let timing = 2500 + (index * 500);

        // Function to show the next slide
        function showNextSlide() {
            slides[currentSlide].classList.remove('fade-in');
            slides[currentSlide].classList.add('fade-out');

            setTimeout(() => {
                slides[currentSlide].style.display = 'none';
                slides[currentSlide].classList.remove('fade-out');

                currentSlide = (currentSlide + 1) % slides.length;

                slides[currentSlide].style.display = 'block';
                slides[currentSlide].classList.add('fade-in');
            }, 500);
        }

        setInterval(showNextSlide, timing);
    });
});

// Navigation menu toggle for mobile view
document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const nav = document.querySelector('.nav');

    menuIcon.addEventListener('click', function (e) {
        nav.classList.toggle('active');
        e.stopPropagation();
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

// Expand and collapse blog post content
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

// Auto-fill form functionality and modal control
document.addEventListener('DOMContentLoaded', function () {
    const orderForm = document.querySelector('form[action="#"]');
    const fullNameField = orderForm.querySelector('input[placeholder="Full Name"]');
    const modal = document.getElementById("autoFillModal");
    const confirmBtn = document.getElementById("confirmAutoFill");
    const cancelBtn = document.getElementById("cancelAutoFill");

    let autoFillPromptShown = false;

    // Generate random Australian-like phone number
    function getRandomPhoneNumber() {
        const prefix = ["041", "042", "043", "044"];
        const randomPrefix = prefix[Math.floor(Math.random() * prefix.length)];
        const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
        return `${randomPrefix}${randomNumber}`;
    }

    // Generate random data for form auto-fill
    function getRandomData() {
        const names = ['John Doe', 'Jane Smith', 'Alex Johnson'];
        const emails = ['john@example.com', 'jane@example.com', 'alex@example.com'];
        const products = ['chocolate-cake', 'vanilla-cake', 'red-velvet-cake', 'lemon-cake', 'farm', 'seal', 'dino1', 'dog', 'tiered-cake1', 'tiered-cake2', 'naked-cake', 'croissant', 'danish', 'eclair', 'tart', 'baguette', 'sourdough', 'rye', 'multigrain'];
        const quantities = [1, 2, 3, 6];
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

    // Display modal for auto-fill confirmation
    fullNameField.addEventListener('focus', function () {
        if (!autoFillPromptShown) {
            modal.style.display = "block";
            autoFillPromptShown = true;
        }
    });

    // Confirm auto-fill and populate the form with random data
    confirmBtn.addEventListener('click', function () {
        const randomData = getRandomData();
        orderForm.querySelector('input[placeholder="Full Name"]').value = randomData.name;
        orderForm.querySelector('input[placeholder="Email Address"]').value = randomData.email;
        orderForm.querySelector('input[placeholder="Mobile Number"]').value = randomData.phone;
        const productDropdown = orderForm.querySelector('select[name="product"]');
        productDropdown.value = randomData.product;
        orderForm.querySelector('input[placeholder="Quantity"]').value = randomData.quantity;
        orderForm.querySelector('textarea[name="message"]').value = randomData.message;

        const event = new Event('change');
        productDropdown.dispatchEvent(event);
        modal.style.display = "none";
    });

    // Cancel auto-fill and close the modal
    cancelBtn.addEventListener('click', function () {
        modal.style.display = "none";
    });

    // Close the modal when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

// Tooltip for Menu Icon functionality
document.addEventListener('DOMContentLoaded', function () {
    const tooltip = document.getElementById('menuTooltip');
    const menuIcon = document.getElementById('menu-icon');

    // Show tooltip if not dismissed
    const shouldShowTooltip = !sessionStorage.getItem('menuTooltipDismissed');
    if (shouldShowTooltip) {
        const rect = menuIcon.getBoundingClientRect();
        tooltip.style.top = `${rect.bottom + 12}px`;
        tooltip.style.left = `${rect.left}px`;

        tooltip.classList.add('show');

        const dismissTooltip = () => {
            tooltip.classList.remove('show');
            sessionStorage.setItem('menuTooltipDismissed', 'true');
        };

        menuIcon.addEventListener('click', dismissTooltip);
        menuIcon.addEventListener('mouseover', dismissTooltip);

        setTimeout(function () {
            if (tooltip.classList.contains('show')) {
                dismissTooltip();
            }
        }, 4000);
    }

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

                    // Calculate the closest image to the front-center
                    let closestImageIndex = -1;
                    let closestDistance = 360;

                    images.forEach((image, index) => {
                        const normalizedRotation = (index * 25.71 + rotation) % 360;
                        const distanceFromFront = Math.abs(normalizedRotation - 180);

                        if (distanceFromFront < closestDistance) {
                            closestDistance = distanceFromFront;
                            closestImageIndex = index;
                        }

                        let opacity;
                        if (distanceFromFront < 20) {
                            opacity = 1;
                        } else if (distanceFromFront < 60) {
                            opacity = 0.8;
                        } else {
                            opacity = Math.max(0.05, 1 - (distanceFromFront / 180));
                        }

                        image.style.opacity = opacity;
                        image.style.transform = `rotateY(${index * 25.71}deg) translateZ(1450px) scale(1)`;
                    });

                    if (closestImageIndex !== -1) {
                        images[closestImageIndex].style.transform = `rotateY(${closestImageIndex * 25.71}deg) translateZ(1450px) scale(1.5)`;
                    }
                }
            }
        });
    }
});