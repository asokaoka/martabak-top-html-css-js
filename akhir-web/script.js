// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// Sticky Navbar
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-md', 'shadow-orange-100');
        backToTop.classList.remove('opacity-0', 'pointer-events-none');
    } else {
        navbar.classList.remove('shadow-md');
        backToTop.classList.add('opacity-0', 'pointer-events-none');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Active Nav Link based on current page
const navLinks = document.querySelectorAll('.nav-link');
let currentPage = window.location.pathname.split('/').pop();
if (!currentPage) currentPage = 'index.html';
navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});

// Fade In Animation on Scroll
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
fadeElements.forEach(el => fadeObserver.observe(el));

// Menu Category Filter (only runs on menu.html)
const categoryTabs = document.querySelectorAll('#category-tabs button');
const menuItems = document.querySelectorAll('.menu-item');
const noResults = document.getElementById('no-results');
const menuSearch = document.getElementById('menu-search');
let currentCategory = 'all';

function filterMenu() {
    const searchTerm = menuSearch.value.toLowerCase();
    let visibleCount = 0;
    menuItems.forEach(item => {
        const category = item.getAttribute('data-category');
        const name = item.getAttribute('data-name');
        const matchesCategory = currentCategory === 'all' || category === currentCategory;
        const matchesSearch = name.includes(searchTerm);
        if (matchesCategory && matchesSearch) {
            item.classList.remove('hidden');
            visibleCount++;
        } else {
            item.classList.add('hidden');
        }
    });
    if (visibleCount === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
    }
}

if (menuSearch) {
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => {
                t.classList.remove('tab-active');
                t.classList.add('tab-inactive');
            });
            tab.classList.remove('tab-inactive');
            tab.classList.add('tab-active');
            currentCategory = tab.getAttribute('data-category');
            filterMenu();
        });
    });

    menuSearch.addEventListener('input', filterMenu);
}

// Contact Form Validation (only runs on kontak.html)
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    const namaInput = document.getElementById('nama');
    const nohpInput = document.getElementById('nohp');
    const pesanInput = document.getElementById('pesan');
    const emailInput = document.getElementById('email');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        document.querySelectorAll('[id^="error-"]').forEach(el => el.classList.add('hidden'));

        if (!namaInput.value.trim()) {
            document.getElementById('error-nama').classList.remove('hidden');
            isValid = false;
        }
        if (!nohpInput.value.trim()) {
            document.getElementById('error-nohp').classList.remove('hidden');
            isValid = false;
        }
        if (!pesanInput.value.trim()) {
            document.getElementById('error-pesan').classList.remove('hidden');
            isValid = false;
        }

        if (isValid) {
            const message = 'Halo Martabak Lezat!%0A%0ANama: ' + encodeURIComponent(namaInput.value) +
                '%0ANo HP: ' + encodeURIComponent(nohpInput.value) +
                (emailInput.value ? '%0AEmail: ' + encodeURIComponent(emailInput.value) : '') +
                '%0A%0APesan:%0A' + encodeURIComponent(pesanInput.value);
            window.open('https://wa.me/6285959732077?text=' + message, '_blank');
        }
    });
}

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
});
