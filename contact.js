document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('contact-form');
    
    fetch('/.netlify/functions/formspree-url')
        .then(response => response.text())
        .then(formspreeUrl => {
            form.action = formspreeUrl;
        })
        .catch(error => {
            console.error('Error fetching Formspree URL:', error);
        });
});