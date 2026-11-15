
// =====================================
// ACTIVITY 5: TOAST NOTIFICATION
// =====================================

let toastTimer;

function showToast(message) {
    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}


// =====================================
// ACTIVITY 5: SMOOTH SCROLLING
// =====================================

function scrollToBookingForm() {
    const bookingForm = document.getElementById("booking-form");

    if (bookingForm) {
        bookingForm.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        showToast("Welcome! Please complete your ticket booking.");
    }
}


// =====================================
// RUN AFTER HTML PAGE LOADS
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // =================================
    // ACTIVITY 8: HAMBURGER MENU
    // =================================

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

        });

        // Close menu after clicking a navigation link

        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
            });

        });
    }


    // =================================
    // ACTIVITY 8: TEAM FILTER
    // =================================

    const teamFilter = document.getElementById("team-filter");

    const matchCards = document.querySelectorAll(".match-card");

    const noMatches = document.getElementById("no-matches");

    if (teamFilter && matchCards.length > 0) {

        teamFilter.addEventListener("change", function () {

            const selectedTeam = teamFilter.value;

            let visibleCount = 0;

            matchCards.forEach(function (card) {

                const teams = card.dataset.team.split(" ");

                const shouldShow =
                    selectedTeam === "all" ||
                    teams.includes(selectedTeam);

                card.hidden = !shouldShow;

                if (shouldShow) {
                    visibleCount++;
                }

            });

            if (noMatches) {
                noMatches.hidden = visibleCount !== 0;
            }

            showToast("Match list updated!");
        });
    }


    // =================================
    // ACTIVITY 8: GRID AND LIST VIEW
    // =================================

    const matchContainer = document.getElementById("match-container");

    const gridButton = document.getElementById("grid-view");

    const listButton = document.getElementById("list-view");

    if (matchContainer && gridButton && listButton) {

        gridButton.addEventListener("click", function () {

            matchContainer.classList.remove("list-view");

            gridButton.classList.add("active");

            listButton.classList.remove("active");

            showToast("Grid view selected!");
        });


        listButton.addEventListener("click", function () {

            matchContainer.classList.add("list-view");

            listButton.classList.add("active");

            gridButton.classList.remove("active");

            showToast("List view selected!");
        });
    }


    // =================================
    // ACTIVITY 5: BOOKING PAGE SCROLL
    // =================================

    if (window.location.hash === "#booking-form") {

        setTimeout(function () {
            scrollToBookingForm();
        }, 200);
    }


    // =================================
    // ACTIVITY 7: LIVE BOOKING SUMMARY
    // =================================

    const matchSelect = document.getElementById("match");

    const standSelect = document.querySelector("#stand");

    const quantityInput = document.getElementById("tickets");

    const summaryMatch = document.getElementById("summary-match");

    const summaryStand = document.getElementById("summary-stand");

    const summaryQuantity = document.getElementById("summary-quantity");

    const summaryPrice = document.getElementById("summary-price");

    const summaryTotal = document.getElementById("summary-total");


    // Run only when the booking form and summary exist

    if (
        matchSelect &&
        standSelect &&
        quantityInput &&
        summaryMatch &&
        summaryStand &&
        summaryQuantity &&
        summaryPrice &&
        summaryTotal
    ) {

        // Update Booking Summary

        function updateBookingSummary() {

            const match = matchSelect.value;

            const standOption = standSelect.selectedOptions[0];

            const stand = standSelect.value;

            const price = Number(standOption.dataset.price) || 0;

            const quantity = Math.max(
                1,
                Math.min(10, Number(quantityInput.value) || 1)
            );

            const total = price * quantity;


            // Display selected details

            summaryMatch.textContent = match || "Not selected";

            summaryStand.textContent = stand || "Not selected";

            summaryQuantity.textContent = quantity;

            summaryPrice.textContent =
                "₹" + price.toLocaleString("en-IN");

            summaryTotal.textContent =
                "₹" + total.toLocaleString("en-IN");


            showToast("Booking summary updated!");
        }


        // Change event listeners

        matchSelect.addEventListener(
            "change",
            updateBookingSummary
        );

        standSelect.addEventListener(
            "change",
            updateBookingSummary
        );

        quantityInput.addEventListener(
            "change",
            updateBookingSummary
        );

        quantityInput.addEventListener(
            "input",
            updateBookingSummary
        );


        // =================================
        // BOOKING FORM SUBMISSION
        // =================================

        const ticketForm = document.getElementById("ticket-form");

        if (ticketForm) {

            ticketForm.addEventListener("submit", function (event) {

                event.preventDefault();

                updateBookingSummary();

                showToast("Booking details submitted successfully!");

            });


            // Reset summary when form is reset

            ticketForm.addEventListener("reset", function () {

                setTimeout(function () {

                    summaryMatch.textContent = "Not selected";
                    summaryStand.textContent = "Not selected";
                    summaryQuantity.textContent = "0";
                    summaryPrice.textContent = "₹0";
                    summaryTotal.textContent = "₹0";

                    showToast("Booking form reset!");

                }, 0);

            });
        }
    }

});
