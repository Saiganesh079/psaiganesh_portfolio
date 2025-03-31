// Smooth Scrolling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50, // Offset for header
                behavior: 'smooth'
            });
        }
    });
});

// Highlight Active Section
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

function highlightActiveSection() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset
        const sectionBottom = sectionTop + section.clientHeight;

        if (pageYOffset >= sectionTop && pageYOffset < sectionBottom) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(navLink => {
        navLink.classList.remove('active');
        if (navLink.getAttribute('href').substring(1) === current) {
            navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'light'; // Get saved theme or default to light

// Set initial theme
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
});

function setTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('fas', 'fa-sun');
        themeIcon.classList.add('fas', 'fa-moon');
    } else {
        body.classList.remove('dark-mode');
        themeIcon.classList.remove('fas', 'fa-moon');
        themeIcon.classList.add('fas', 'fa-sun');
    }
    localStorage.setItem('theme', theme); // Save the theme
}