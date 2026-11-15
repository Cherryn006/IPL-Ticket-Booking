
/* =====================================
   ACTIVITY 5: TOAST NOTIFICATION
===================================== */

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


/* =====================================
   ACTIVITY 5: SMOOTH SCROLLING
===================================== */

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


/* =====================================
   ACTIVITY 7: LIVE BOOKING SUMMARY
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Smooth scrolling after opening the booking page

    if (window.location.hash === "#booking-form") {

        setTimeout(function () {
            scrollToBookingForm();
        }, 200);
    }


    // Select form elements using DOM selectors

    const matchSelect = document.getElementById("match");

    const standSelect = document.querySelector("#stand");

    const quantityInput = document.getElementById("tickets");


    // Select Booking Summary elements

    const summaryMatch = document.getElementById("summary-match");

    const summaryStand = document.getElementById("summary-stand");

    const summaryQuantity = document.getElementById("summary-quantity");

    const summaryPrice = document.getElementById("summary-price");

    const summaryTotal = document.getElementById("summary-total");


    // Check whether required elements exist

    if (
        !matchSelect ||
        !standSelect ||
        !quantityInput ||
        !summaryMatch ||
        !summaryStand ||
        !summaryQuantity ||
        !summaryPrice ||
        !summaryTotal
    ) {
        return;
    }


    // Function to update Booking Summary

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


        // Display Toast Notification

        showToast("Booking summary updated!");
    }


    // Add change event listeners

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


    // Form submission

    const ticketForm = document.getElementById("ticket-form");

    if (ticketForm) {

        ticketForm.addEventListener("submit", function (event) {

            event.preventDefault();

            updateBookingSummary();

            showToast("Booking details submitted successfully!");

        });


        // Reset summary when the form is reset

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

});
