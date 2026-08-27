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
    strings: ["web apps", "IoT solutions", "developer tools", "things that matter"],
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

/*=================== image track carousel ====================*/
const track = document.getElementById("image-track");

if (track) {
    const handleOnDown = e => {
        track.dataset.mouseDownAt = e.clientX;
    };

    const handleOnUp = () => {
        track.dataset.mouseDownAt = "0";
        track.dataset.prevPercentage = track.dataset.percentage || "0";
    };

    const handleOnMove = e => {
        if (track.dataset.mouseDownAt === "0") return;

        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
        const maxDelta = window.innerWidth / 2;

        const percentage = (mouseDelta / maxDelta) * -100;
        const prevPercentage = parseFloat(track.dataset.prevPercentage);
        const nextPercentageUnconstrained = prevPercentage + percentage;
        const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

        track.dataset.percentage = nextPercentage;

        track.animate({
            transform: `translate(${nextPercentage}%, 0%)`
        }, { duration: 1200, fill: "forwards" });

        const images = track.querySelectorAll('.track-card img');
        for (const image of images) {
            image.animate({
                objectPosition: `${100 + nextPercentage}% center`
            }, { duration: 1200, fill: "forwards" });
        }
    };

    /* mouse events */
    track.addEventListener('mousedown', e => handleOnDown(e));
    window.addEventListener('mouseup', () => handleOnUp());
    window.addEventListener('mousemove', e => handleOnMove(e));

    /* touch events */
    track.addEventListener('touchstart', e => handleOnDown(e.touches[0]));
    window.addEventListener('touchend', () => handleOnUp());
    window.addEventListener('touchmove', e => handleOnMove(e.touches[0]));
}