window.onload = function() {
    const birthDate = new Date('2005-06-07');
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
        age--;
    }

    document.getElementById('age').textContent = age;
};

document.getElementById('footer-year').textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
  
    hamburger.addEventListener("click", function() {
      navMenu.classList.toggle("active");
    });
  });  