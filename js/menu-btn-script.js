const menuButton = document.getElementById('menu-btn');
const verticalNavbar = document.querySelector('.vertical-navbar');
menuButton.addEventListener('click', function() {
    verticalNavbar.classList.toggle('vertical-navbar-hidden');
});