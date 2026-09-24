/* =========================================================
   YEAR
========================================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("open");

        const isOpen = mobileMenu.classList.contains("open");

        document.body.style.overflow = isOpen ? "hidden" : "";

    });


    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

            document.body.style.overflow = "";

        });

    });

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;

let followerX = 0;
let followerY = 0;

if (cursor && follower && window.matchMedia("(pointer: fine)").matches) {

    document.addEventListener("mousemove", event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;

    });


    function animateFollower() {

        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;

        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;

        requestAnimationFrame(animateFollower);

    }

    animateFollower();


    const interactiveElements = document.querySelectorAll(
        "a, button, .project-card, .skill-row"
    );

    interactiveElements.forEach(element => {

        element.addEventListener("mouseenter", () => {

            follower.style.width = "55px";
            follower.style.height = "55px";

            follower.style.background = "rgba(255,255,255,.05)";

        });


        element.addEventListener("mouseleave", () => {

            follower.style.width = "34px";
            follower.style.height = "34px";

            follower.style.background = "transparent";

        });

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".project-card, .about-grid, .about-facts, .skill-row, .process-step, .contact-main"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(
    ".nav-links a, .mobile-menu a"
);


const sectionObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        `#${entry.target.id}`
                    ) {
                        link.classList.add("active");
                    }

                });

            }

        });

    },
    {
        rootMargin: "-40% 0px -50% 0px"
    }
);


sections.forEach(section => {
    sectionObserver.observe(section);
});


/* =========================================================
   PROJECT HOVER
========================================================= */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {

    const visual = card.querySelector(".project-visual");

    if (!visual) return;

    card.addEventListener("mouseenter", () => {

        visual.style.transform = "scale(.985)";

    });

    card.addEventListener("mouseleave", () => {

        visual.style.transform = "scale(1)";

    });

});


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId = link.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   MAGNETIC BUTTON EFFECT
========================================================= */

const magneticElements = document.querySelectorAll(
    ".button, .nav-contact, .project-link, .email-link"
);


if (window.matchMedia("(pointer: fine)").matches) {

    magneticElements.forEach(element => {

        element.addEventListener("mousemove", event => {

            const rect = element.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            element.style.transform =
                `translate(${x * 0.08}px, ${y * 0.08}px)`;

        });


        element.addEventListener("mouseleave", () => {

            element.style.transform = "translate(0, 0)";

        });

    });

}
