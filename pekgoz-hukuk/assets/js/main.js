// ====== Mobil menü ======
const menuButton = document.querySelector(".mobile-menu-btn");
const navbarMenu = document.querySelector(".navbar-menu");

if (menuButton && navbarMenu) {
    menuButton.addEventListener("click", () => {
        navbarMenu.classList.toggle("active");
    });
}

// Açılır menü (mobilde tıklayınca aç/kapat)
document.querySelectorAll(".dropdown").forEach((dropdown) => {
    dropdown.addEventListener("click", (event) => {
        if (window.innerWidth <= 1100) {
            event.preventDefault();
            dropdown.classList.toggle("open");
        }
    });
});

// ====== Header scroll efekti ======
const header = document.querySelector(".site-header");
if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
}

// ====== Scroll reveal animasyonu ======
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // hafif kademeli geçiş
                entry.target.style.transitionDelay = `${(i % 4) * 80}ms`;
                entry.target.classList.add("in");
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
} else {
    revealEls.forEach((el) => el.classList.add("in"));
}

// ====== İstatistik count-up animasyonu ======
const sealRow = document.querySelector(".seal-row");
if (sealRow && "IntersectionObserver" in window) {
    const animateNum = (el) => {
        const target = parseInt(el.dataset.to, 10) || 0;
        const prefix = el.dataset.prefix || "";
        const suffix = el.dataset.suffix || "";
        const duration = 1600;
        const start = performance.now();
        const step = (now) => {
            const p = Math.min((now - start) / duration, 1);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = prefix + Math.round(eased * target) + suffix;
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = prefix + target + suffix;
        };
        requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                sealRow.querySelectorAll(".num").forEach(animateNum);
                io.disconnect();
            }
        });
    }, { threshold: 0.4 });
    io.observe(sealRow);
}

// ====== Footer yılı ======
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ====== İletişim formu (demo gönderim) ======
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const status = document.getElementById("formStatus");
        if (status) {
            status.textContent = "Talebiniz alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.";
            status.style.display = "block";
        }
        contactForm.reset();
    });
}
