// Toggle Hamburger Menu
const navbarNav = document.querySelector('.navbar-nav');
document.querySelector('#hamburger-menu').onclick = () => {
  navbarNav.classList.toggle('active');
};

// Toggle Search Form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
document.querySelector('#search-button').onclick = (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
};

/// Toggle shopping cart
const cartBtn = document.querySelector('#shopping-cart-button');
const cartEl = document.querySelector('.shopping-cart');
cartBtn.addEventListener('click', function (e) {
  e.preventDefault(); // <-- Ini WAJIB
  cartEl.classList.toggle('active');
});

// Tutup shopping cart ketika klik di luar cart atau tombol keranjang
document.addEventListener('click', function (e) {
  if (!cartEl.contains(e.target) && !cartBtn.contains(e.target)) {
    cartEl.classList.remove('active'); // Menutup shopping cart
  }
});

// Klik di luar elemen navbar dan search form
document.addEventListener('click', function (e) {
  const hm = document.querySelector('#hamburger-menu');
  const sb = document.querySelector('#search-button');
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }
  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove('active');
  }
});

// Shopping cart array
const cart = [];

// Update isi cart
function updateCartDisplay() {
  const cartContainer = document.querySelector('.shopping-cart');
  cartContainer.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <img src="img/${item.img}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <div class="item-price">Rp ${item.price.toLocaleString()}</div>
        <div>
          Jumlah:
          <button class="qty-decrease" data-id="${item.id}">-</button>
          <span>${item.qty}</span>
          <button class="qty-increase" data-id="${item.id}">+</button>
        </div>
      </div>
    `;
    cartContainer.appendChild(itemElement);
    total += item.price * item.qty;
  });

  const totalElement = document.createElement('div');
  totalElement.classList.add('cart-summary');
  totalElement.innerHTML = `Total: Rp ${total.toLocaleString()}`;
  cartContainer.appendChild(totalElement);

  // Tombol tambah/kurang qty
  cartContainer.querySelectorAll('.qty-increase').forEach(btn => {
    btn.addEventListener('click', function () {
      const id = this.dataset.id;
      const item = cart.find(i => i.id == id);
      if (item) {
        item.qty++;
        updateCartDisplay();
      }
    });
  });

  cartContainer.querySelectorAll('.qty-decrease').forEach(btn => {
    btn.addEventListener('click', function () {
      const id = this.dataset.id;
      const item = cart.find(i => i.id == id);
      if (item && item.qty > 1) {
        item.qty--;
      } else {
        const index = cart.findIndex(i => i.id == id);
        cart.splice(index, 1);
      }
      updateCartDisplay();
    });
  });
}

// Tombol Tambah ke Keranjang dari produk langsung
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.dataset.id;
    const name = this.dataset.name;
    const price = parseInt(this.dataset.price);
    const img = this.dataset.img;

    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id, name, price, img, qty: 1 });
    }

    updateCartDisplay();
  });
});

// Modal Produk
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');
const modalImg = itemDetailModal.querySelector('img');
const modalTitle = itemDetailModal.querySelector('h3');
const modalDesc = itemDetailModal.querySelector('p');
const modalPrice = itemDetailModal.querySelector('.product-price');
const modalStars = itemDetailModal.querySelector('.product-stars');
const modalAddCartBtn = itemDetailModal.querySelector('.btn-cart');

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    e.preventDefault();

    // Isi konten modal
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
      if (i <= starCount) star.classList.add('star-full');
      modalStars.appendChild(star);
    }
    feather.replace();

    // Tombol tambah ke cart dari modal
    modalAddCartBtn.onclick = () => {
      const id = parseInt(btn.dataset.title.replace(/\D/g, '').slice(0, 5)) || Date.now();
      const name = btn.dataset.title;
      const price = parseInt(btn.dataset.price.replace(/[^\d]/g, ''));
      const img = btn.dataset.image.replace('img/', '');

      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ id, name, price, img, qty: 1 });
      }

      updateCartDisplay();
      itemDetailModal.style.display = 'none';
    };

    itemDetailModal.style.display = 'flex';
  };
});

// Tutup modal
document.querySelector('.modal .close-icon').onclick = (e) => {
  itemDetailModal.style.display = 'none';
  e.preventDefault();
};

// Klik luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = 'none';
  }
};
