/*==================== toggle icon navbar ======================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');

};

/*================ scroll sections active link =================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    /*===================== sticky navbar ======================*/
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    /*===================== close navbar ======================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/*=================== scroll reveal animation ====================*/
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.heading', { origin: 'top' });
ScrollReveal().reveal('.about-img, .logo', { origin: 'left' });
ScrollReveal().reveal('.about-content', { origin: 'right' });

/*=================== typing text animation ====================*/
var typed = new Typed(".multiple-text", {
    strings: ["production IoT tooling", "dynamic dashboards", "predictive maintenance", "signal processing"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
})

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

/*=================== contact form submit ====================*/
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus && window.fetch) {
    contactForm.addEventListener('submit', async e => {
        e.preventDefault();

        const button = contactForm.querySelector('button[type="submit"]');
        formStatus.className = 'form-status';
        formStatus.textContent = 'Sending...';
        button.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(contactForm)
            });

            if (response.ok) {
                formStatus.classList.add('ok');
                formStatus.textContent = "Thanks, message sent. I'll get back to you.";
                contactForm.reset();
            } else {
                throw new Error('Request failed');
            }
        } catch (err) {
            formStatus.classList.add('err');
            formStatus.textContent = 'Something went wrong. Try again, or reach me on LinkedIn.';
        } finally {
            button.disabled = false;
        }
    });
}