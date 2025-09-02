// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Add a class to body after page load for initial animations
    document.body.classList.add('page-loaded');
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message sent successfully!');
            this.reset();
        });
    }
    
    // Add click handlers for social links
    document.querySelectorAll('.team-social a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Social link clicked:', this.href);
            window.open(this.href, '_blank');
        });
    });

    // Smooth scroll for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e){
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target){
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active nav link based on current page
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        if(link.getAttribute('href') === currentPath){
            link.classList.add('active-nav');
        }   
    });

    // Enhanced fade-in animation on scroll for content sections
    const fadeElements = document.querySelectorAll('.page-content, .project-card, .team-card, .about-section, .project-details, .project-features');

    const fadeInOnScroll = () => {
        const windowBottom = window.innerHeight + window.scrollY;
        fadeElements.forEach(el => {
            const elementTop = el.offsetTop + el.offsetHeight / 4;
            if(windowBottom > elementTop){
                el.classList.add('fade-in');
            }
        });
    }

    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // initial check
    
    // Add hover effect for navigation items
    const navItems = document.querySelectorAll('nav ul li a');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

});
