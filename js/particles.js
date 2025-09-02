// particles.js - Creates a subtle particle effect for the hero section

class ParticleEffect {
    constructor(container, options = {}) {
        this.container = container;
        this.particles = [];
        
        // Default options
        this.options = {
            count: options.count || 30,
            color: options.color || '#00ffd5',
            minSize: options.minSize || 2,
            maxSize: options.maxSize || 6,
            speed: options.speed || 1,
            opacity: options.opacity || 0.2
        };
        
        this.width = container.offsetWidth;
        this.height = container.offsetHeight;
        
        this.init();
    }
    
    init() {
        // Create particle container
        this.particleContainer = document.createElement('div');
        this.particleContainer.className = 'particles';
        this.container.appendChild(this.particleContainer);
        
        // Create particles
        for (let i = 0; i < this.options.count; i++) {
            this.createParticle();
        }
        
        // Start animation
        this.animate();
        
        // Handle resize
        window.addEventListener('resize', () => {
            this.width = this.container.offsetWidth;
            this.height = this.container.offsetHeight;
        });
    }
    
    createParticle() {
        const particle = document.createElement('span');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize;
        const x = Math.random() * this.width;
        const y = Math.random() * this.height;
        const speedX = (Math.random() - 0.5) * this.options.speed;
        const speedY = (Math.random() - 0.5) * this.options.speed;
        
        // Set styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = this.options.color;
        particle.style.opacity = this.options.opacity;
        
        // Add to DOM
        this.particleContainer.appendChild(particle);
        
        // Store particle data
        this.particles.push({
            element: particle,
            x,
            y,
            speedX,
            speedY,
            size
        });
    }
    
    animate() {
        // Update each particle position
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Check boundaries and reverse direction if needed
            if (particle.x < 0 || particle.x > this.width) {
                particle.speedX *= -1;
            }
            
            if (particle.y < 0 || particle.y > this.height) {
                particle.speedY *= -1;
            }
            
            // Apply new position
            particle.element.style.left = `${particle.x}px`;
            particle.element.style.top = `${particle.y}px`;
        });
        
        // Continue animation
        requestAnimationFrame(this.animate.bind(this));
    }
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select all hero sections
    const heroSections = document.querySelectorAll('.home-hero, .about-hero, .projects-hero, .contact-hero, .team-hero');
    
    // Initialize particles for each hero section
    heroSections.forEach(heroSection => {
        new ParticleEffect(heroSection, {
            count: 30,
            color: '#00ffd5',
            opacity: 0.2,
            speed: 0.5
        });
    });
});