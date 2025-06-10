// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
const hamburger = document.querySelector('#hamburger-menu');

hamburger.addEventListener('click', function () {
  navbarNav.classList.toggle('active');
});

// Klik di luar nav untuk nutup menu (opsional tapi keren)
document.addEventListener('click', function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }
});
