// Initialize all animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Remove loader after page load
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 2000);

    // Create particles
    createParticles();
    
    // Initialize 3D background
    init3DBackground();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Setup navigation
    setupNavigation();
    
    // Setup cursor trail
    setupCursorTrail();
    
    // Setup form submission
    setupContactForm();
});

// Particles system
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// 3D Background with Three.js
function init3DBackground() {
    const container = document.getElementById('threejs-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create animated geometric shapes with biomedical/chemical themes
    const geometry1 = new THREE.IcosahedronGeometry(1, 0);
    const material1 = new THREE.MeshBasicMaterial({ 
        color: 0x10b981, // Green for biomedical
        wireframe: true,
        opacity: 0.6,
        transparent: true
    });
    const mesh1 = new THREE.Mesh(geometry1, material1);
    mesh1.position.set(-3, 2, -5);
    scene.add(mesh1);

    // DNA-like double helix structure
    const geometry2 = new THREE.CylinderGeometry(0.1, 0.1, 4, 8);
    const material2 = new THREE.MeshBasicMaterial({ 
        color: 0x3b82f6, // Blue for chemistry
        wireframe: true,
        opacity: 0.4,
        transparent: true
    });
    const mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.position.set(4, -1, -8);
    mesh2.rotation.z = Math.PI / 4;
    scene.add(mesh2);

    // Industrial automation cube
    const geometry3 = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const material3 = new THREE.MeshBasicMaterial({ 
        color: 0xf59e0b, // Orange for industrial
        wireframe: true,
        opacity: 0.5,
        transparent: true
    });
    const mesh3 = new THREE.Mesh(geometry3, material3);
    mesh3.position.set(0, -3, -6);
    scene.add(mesh3);

    // Molecular structure representation
    const geometry4 = new THREE.SphereGeometry(0.8, 8, 6);
    const material4 = new THREE.MeshBasicMaterial({ 
        color: 0xec4899, // Pink for molecular
        wireframe: true,
        opacity: 0.3,
        transparent: true
    });
    const mesh4 = new THREE.Mesh(geometry4, material4);
    mesh4.position.set(-2, -2, -10);
    scene.add(mesh4);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        
        // DNA helix rotation
        mesh1.rotation.x += 0.005;
        mesh1.rotation.y += 0.01;
        
        // Chemical bond oscillation
        mesh2.rotation.x -= 0.003;
        mesh2.rotation.y += 0.008;
        mesh2.rotation.z += 0.002;
        
        // Industrial automation steady rotation
        mesh3.rotation.x += 0.008;
        mesh3.rotation.y -= 0.005;
        mesh3.rotation.z += 0.003;
        
        // Molecular vibration
        mesh4.rotation.x += 0.006;
        mesh4.rotation.y += 0.004;
        mesh4.scale.x = 1 + Math.sin(Date.now() * 0.003) * 0.1;
        mesh4.scale.y = 1 + Math.cos(Date.now() * 0.003) * 0.1;
        
        renderer.render(scene, camera);
    }
    
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Experience timeline animation
    document.querySelectorAll('.experience-item').forEach(el => {
        observer.observe(el);
    });

    // Scroll progress bar
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.getElementById('scrollProgress').style.width = scrolled + '%';
    });
}

// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section, header');

    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active section highlighting
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });
}

// Cursor trail effect
function setupCursorTrail() {
    const dots = [];
    const mouse = { x: 0, y: 0 };

    // Create cursor dots
    for (let i = 0; i < 15; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        dot.style.opacity = (15 - i) / 15;
        document.body.appendChild(dot);
        dots.push(dot);
    }

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Animate cursor trail
    function animateDots() {
        let x = mouse.x;
        let y = mouse.y;

        dots.forEach((dot, index) => {
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            
            const nextDot = dots[index + 1] || dots[0];
            x += (nextDot.offsetLeft - x) * 0.3;
            y += (nextDot.offsetTop - y) * 0.3;
        });

        requestAnimationFrame(animateDots);
    }

    animateDots();
}

(function(){
    emailjs.init("zTVZBIjWzoWsm0ndf"); 
  })();

  function setupContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      emailjs.sendForm("service_vkohg5o", "template_jtnzj7a", form)
        .then(() => {
          submitBtn.textContent = 'Message Sent! ✓';
          submitBtn.style.background = 'linear-gradient(45deg, #10b981, #34d399)';

          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = 'linear-gradient(45deg, #6366f1, #8b5cf6)';
            form.reset();
          }, 3000);
        })
        .catch((err) => {
          console.error('Email send failed:', err);
          submitBtn.textContent = 'Failed ❌';
          submitBtn.style.background = 'linear-gradient(45deg, #ef4444, #f87171)';

          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = 'linear-gradient(45deg, #6366f1, #8b5cf6)';
          }, 3000);
        });
    });
  }

// Add some interactive elements
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02) rotateY(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
    });
});

// Skill tags interactive effects
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.animation = 'pulse 0.6s ease-in-out';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.animation = '';
    });
});

// Add typing effect to hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect after loader
setTimeout(() => {
    const subtitle = document.querySelector('.hero-subtitle');
    const originalText = subtitle.textContent;
    typeWriter(subtitle, originalText, 50);
}, 2500);
