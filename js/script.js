// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
// ketika hamburger menu di klik
document.querySelector('#hamburger-menu').onclick = () => {
  navbarNav.classList.toggle('active');
};

// Toggle class active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
  shoppingCart.classList.toggle('active');
  e.preventDefault();
};

// Klik di luar elemen
const hm = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove('active');
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove('active');
  }
});

// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

// Komponen di dalam modal
const modalImg = itemDetailModal.querySelector('img');
const modalTitle = itemDetailModal.querySelector('h3');
const modalDesc = itemDetailModal.querySelector('p');
const modalPrice = itemDetailModal.querySelector('.product-price');
const modalStars = itemDetailModal.querySelector('.product-stars');

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    e.preventDefault();

    // Isi modal sesuai produk
    modalImg.src = btn.dataset.image;
    modalTitle.textContent = btn.dataset.title;
    modalDesc.textContent = btn.dataset.description;
    modalPrice.innerHTML = `${btn.dataset.price} <span>${btn.dataset.oldprice}</span>`;

    // Render bintang
    const starCount = parseInt(btn.dataset.stars);
    modalStars.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('i');
      star.setAttribute('data-feather', 'star');
      if (i <= starCount) {
        star.classList.add('star-full');
      }
      modalStars.appendChild(star);
    }

    // Tampilkan modal
    itemDetailModal.style.display = 'flex';
    feather.replace(); // render ulang icon feather
  };
});

// klik tombol close modal
document.querySelector('.modal .close-icon').onclick = (e) => {
  itemDetailModal.style.display = 'none';
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = 'none';
  }
};
