// --- Initialize AOS (Animate On Scroll) ---
AOS.init({
    once: true, // Animations happen only once - while scrolling down
    offset: 100, // Offset (in px) from the original trigger point
    duration: 800, // Duration of animation (in ms)
});

// --- Dark Mode Logic with localStorage ---
const toggleBtn = document.getElementById('theme-toggle');
const toggleIcon = toggleBtn.querySelector('i');
const rootElement = document.documentElement;

// Function to set icon based on theme
function updateIcon(theme) {
    if (theme === 'dark') {
        toggleIcon.classList.remove('fa-moon');
        toggleIcon.classList.add('fa-sun'); // Sun icon for when Dark mode is active (to switch to light)
    } else {
        toggleIcon.classList.remove('fa-sun');
        toggleIcon.classList.add('fa-moon'); // Moon icon for when Light mode is active
    }
}

// 1. Check local storage on load
const savedTheme = localStorage.getItem('theme');

// 2. Logic: If 'light' is saved, apply it. Otherwise, default to 'dark'.
if (savedTheme === 'light') {
    rootElement.setAttribute('data-theme', 'light');
    updateIcon('light');
} else {
    // Default is dark (matches CSS :root)
    rootElement.setAttribute('data-theme', 'dark');
    updateIcon('dark');
}

// 3. Toggle Button Event Listener
toggleBtn.addEventListener('click', () => {
    const currentTheme = rootElement.getAttribute('data-theme');
    // If current is dark, switch to light. Otherwise, switch to dark.
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    rootElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

// --- Mobile Menu Toggle ---
const menuBtn = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

function closeMenu() {
    if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
    }
}

// --- 3D Perspective Tilt Effect ---
const tiltContainer = document.querySelector('.tilt-box');
const tiltCard = document.querySelector('.tilt-card');

if (tiltContainer && tiltCard) {
    // Mouse Move Event
    tiltContainer.addEventListener('mousemove', (e) => {
        const rect = tiltContainer.getBoundingClientRect();
        const x = e.clientX - rect.left; // Mouse X position within element
        const y = e.clientY - rect.top;  // Mouse Y position within element

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation based on mouse position (max rotation 20deg)
        const rotateX = ((y - centerY) / centerY) * -20; 
        const rotateY = ((x - centerX) / centerX) * 20;

        // Apply transformation
        // perspective is handled in CSS, here we rotate
        tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    // Mouse Leave Event (Reset)
    tiltContainer.addEventListener('mouseleave', () => {
        tiltCard.style.transform = `rotateX(0) rotateY(0) scale(1)`;
    });
}