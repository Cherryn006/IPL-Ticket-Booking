
// Activity 5: JavaScript Basics and User Interaction

// Reusable Toast Notification Function
let toastTimer;

function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) {
        return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    // Clear previous timer
    clearTimeout(toastTimer);

    // Hide toast after 3 seconds
    toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}


// Smooth Scrolling to Booking Form
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


// Run when the HTML page loads
document.addEventListener("DOMContentLoaded", function () {

    // Check if the URL contains the booking form ID
    if (window.location.hash === "#booking-form") {

        setTimeout(function () {
            scrollToBookingForm();
        }, 200);

    }

});
