
document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("siteHeader");
    const menuButton = document.getElementById("menuButton");
    const nav = document.getElementById("mainNav");

    if (header) {
        const updateHeader = () => {
            header.classList.toggle("scrolled", window.scrollY > 30);
        };
        updateHeader();
        window.addEventListener("scroll", updateHeader, { passive: true });
    }

    if (menuButton && nav) {
        menuButton.addEventListener("click", () => {
            const open = nav.classList.toggle("open");
            menuButton.classList.toggle("active", open);
            menuButton.setAttribute("aria-expanded", String(open));
        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                menuButton.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
            });
        });
    }

    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealItems.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealItems.forEach(item => observer.observe(item));
    } else {
        revealItems.forEach(item => item.classList.add("visible"));
    }

    document.querySelectorAll("[data-current-year]").forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    document.querySelectorAll(".booking-form").forEach(form => {
        form.addEventListener("submit", event => {
            event.preventDefault();

            const status = form.querySelector(".form-status");
            if (status) {
                status.textContent = "Az űrlap kitöltése kész. Az elküldéshez a weboldal e-mail/backend bekötése szükséges.";
            }

            form.classList.add("submitted");
        });
    });

    document.querySelectorAll(".contact-form").forEach(form => {
        form.addEventListener("submit", event => {
            event.preventDefault();

            const status = form.querySelector(".form-status");
            if (status) {
                status.textContent = "Köszönjük! A kapcsolatfelvételi űrlap frontendje működik. Az e-mailes küldéshez backend szükséges.";
            }

            form.classList.add("submitted");
        });
    });

    const dateInput = document.querySelector("#bookingDate");
    if (dateInput) {
        const today = new Date();
        const local = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
            .toISOString().split("T")[0];
        dateInput.min = local;
    }

    document.querySelectorAll(".slot").forEach(slot => {
        slot.addEventListener("click", () => {
            if (slot.classList.contains("disabled")) return;

            document.querySelectorAll(".slot").forEach(item => item.classList.remove("active"));
            slot.classList.add("active");

            const hidden = document.querySelector("#bookingTime");
            if (hidden) hidden.value = slot.dataset.time || slot.textContent.trim();
        });
    });

    const year = document.querySelector("[data-current-year]");
    if (year) year.textContent = new Date().getFullYear();
});
