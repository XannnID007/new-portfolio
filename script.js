// CONFIG
const whatsappNumber = '62895707866020'; 

// ELEMENTS
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenuDropdown = document.getElementById('mobileMenuDropdown');

// 1. THEME TOGGLE
const savedTheme = localStorage.getItem('theme') || 'dark';
if(savedTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
}
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    themeIcon.classList.replace(isLight ? 'fa-sun' : 'fa-moon', isLight ? 'fa-moon' : 'fa-sun');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// 2. MOBILE MENU
mobileMenuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenuDropdown.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!mobileMenuDropdown.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenuDropdown.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

document.querySelectorAll('.nav-link-mobile').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuDropdown.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// 3. TEXT ROTATOR (SLIDE FROM TOP EFFECT)
function startTextRotator() {
    const rotateTexts = document.querySelectorAll('.rotate-text');
    let currentIndex = 0;

    setInterval(() => {
        rotateTexts[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % rotateTexts.length;
        rotateTexts[currentIndex].classList.add('active');
    }, 3000);
}

// 4. ACTIVE NAV LINK ON SCROLL
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// 5. SMOOTH SCROLL WITH ACTIVE STATE
document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            
            // Update active state immediately
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            document.querySelectorAll(`.nav-link[href="${targetId}"]`).forEach(l => l.classList.add('active'));
        }
    });
});

// 6. LOAD MORE PORTFOLIO
const loadMoreBtn = document.getElementById('loadMoreBtn');
const hiddenProjects = document.querySelectorAll('.hidden-project');
let isExpanded = false;

if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        if (!isExpanded) {
            // Show all hidden projects
            hiddenProjects.forEach(project => {
                project.classList.remove('hidden-project');
                project.style.display = 'block';
                setTimeout(() => project.style.opacity = '1', 100);
            });
            
            // Change button text
            loadMoreBtn.querySelector('span').textContent = 'Show Less';
            loadMoreBtn.querySelector('i').classList.replace('fa-chevron-down', 'fa-chevron-up');
            isExpanded = true;
        } else {
            // Hide projects again
            hiddenProjects.forEach(project => {
                project.style.opacity = '0';
                setTimeout(() => {
                    project.style.display = 'none';
                    project.classList.add('hidden-project');
                }, 300);
            });
            
            // Change button text back
            loadMoreBtn.querySelector('span').textContent = 'Load More Projects';
            loadMoreBtn.querySelector('i').classList.replace('fa-chevron-up', 'fa-chevron-down');
            isExpanded = false;
            
            // Scroll back to portfolio section
            document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// 7. SPOTLIGHT EFFECT (MOUSE TRACKING)
document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// 8. SCROLL ANIMATION
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
        }
    });
}, { threshold: 0.1 });

// 9. INIT ON PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {
    startTextRotator();
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    updateActiveNavLink(); // Initial check
});

// 10. WHATSAPP FUNCTION
function openWhatsApp() {
    const message = encodeURIComponent('Hi Muhammad Ihsan, I would like to discuss a potential opportunity with you.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
}

// 11. SCROLL TO CONTACT
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}