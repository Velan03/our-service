    
    // Initialize AOS Animation
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize AOS
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });

        // Loading Screen
        window.addEventListener('load', function() {
            const loadingOverlay = document.getElementById('loadingOverlay');
            setTimeout(function() {
                loadingOverlay.style.opacity = '0';
                setTimeout(function() {
                    loadingOverlay.style.display = 'none';
                }, 500);
            }, 1000);
        });

        // Navbar Scroll Effect
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Back to Top Button
        const backToTopButton = document.getElementById('backToTop');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });

        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        
        // Check for saved theme preference or respect OS preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark');
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-fill');
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark');
            
            if (document.body.classList.contains('dark')) {
                themeIcon.classList.remove('bi-sun-fill');
                themeIcon.classList.add('bi-moon-fill');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('bi-moon-fill');
                themeIcon.classList.add('bi-sun-fill');
                localStorage.setItem('theme', 'light');
            }
        });

        // Form Validation
        const form = document.getElementById('bookingForm');
        
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (!form.checkValidity()) {
                event.stopPropagation();
                form.classList.add('was-validated');
                return;
            }
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value;
            
            // Show success message (you can replace this with your own logic)
            const formHTML = form.innerHTML;
            form.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
                    <h3 class="mt-4">Thank You, ${name}!</h3>
                    <p class="lead">Your booking for ${guests} guests has been confirmed.</p>
                    <p>We've sent a confirmation email to ${email}.</p>
                    <button id="resetForm" class="btn btn-outline-primary mt-3">Make Another Booking</button>
                </div>
            `;
            
            // Reset form button
            document.getElementById('resetForm').addEventListener('click', function() {
                form.innerHTML = formHTML;
                form.reset();
                form.classList.remove('was-validated');
                
                // Reinitialize form validation
                initFormValidation();
            });
        });
        
        function initFormValidation() {
            const form = document.getElementById('bookingForm');
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            });
        }
        
        initFormValidation();

        // Countdown Timer
        const countdownDate = new Date("December 31, 2025 23:59:59").getTime();

        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            
            // If the countdown is over
            if (distance < 0) {
                document.getElementById("countdown-days").innerHTML = "00";
                document.getElementById("countdown-hours").innerHTML = "00";
                document.getElementById("countdown-minutes").innerHTML = "00";
                document.getElementById("countdown-seconds").innerHTML = "00";
                return;
            }
            
            // Time calculations
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the result
            document.getElementById("countdown-days").innerHTML = days < 10 ? "0" + days : days;
            document.getElementById("countdown-hours").innerHTML = hours < 10 ? "0" + hours : hours;
            document.getElementById("countdown-minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("countdown-seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;
        }
        
        // Update the countdown every 1 second
        updateCountdown();
        setInterval(updateCountdown, 1000);

        // Smooth scrolling for all links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        document.querySelector('.navbar-toggler').click();
                    }
                }
            });
        });
    }); 