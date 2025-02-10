document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('contact-form');
    form.action = "process.env.FORMSPREE_URL";
});