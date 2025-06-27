document.addEventListener('DOMContentLoaded', function () {
  // === SEMUA KODE YANG KAMU TULIS MULAI DARI SINI BRO ===

  const navbarNav = document.querySelector('.navbar-nav');
  document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
  };

  const searchForm = document.querySelector('.search-form');
  const searchBox = document.querySelector('#search-box');
  document.querySelector('#search-button').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
  };

  const cartBtn = document.querySelector('#shopping-cart-button');
  const cartEl = document.querySelector('.shopping-cart');
  cartBtn.addEventListener('click', function (e) {
    e.preventDefault();
    cartEl.classList.toggle('active');
  });

  // 📌 Ganti yang ini supaya tombol + dan - tidak nutup cart
  document.addEventListener('click', function (e) {
    if (
      !cartEl.contains(e.target) &&
      !cartBtn.contains(e.target) &&
      !e.target.closest('.qty-increase') &&
      !e.target.closest('.qty-decrease')
    ) {
      cartEl.classList.remove('active');
    }
  });

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

  const cart = [];

  function updateCartDisplay() {
    const cartCountElement = document.querySelector('.cart-count');
    const cartContainer = document.querySelector('.shopping-cart');
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

    cartContainer.innerHTML = '';

    if (totalQty > 0) {
      cartCountElement.textContent = totalQty;
      cartCountElement.style.display = 'inline-block';
    } else {
      cartCountElement.style.display = 'none';

      const emptyMessage = document.createElement('div');
      emptyMessage.classList.add('empty-cart-message');
      emptyMessage.textContent = 'Cart is Empty';
      cartContainer.appendChild(emptyMessage);
      return;
    }

    let total = 0;
    cart.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
        <div class="cart-item-content">
          <img src="img/${item.img}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-detail">
            <h3>${item.name}</h3>
            <p>Rp ${item.price.toLocaleString()} ×
              <button class="qty-decrease" data-id="${item.id}">-</button>
              <span>${item.qty}</span>
              <button class="qty-increase" data-id="${item.id}">+</button>
              = Rp ${(item.price * item.qty).toLocaleString()}
            </p>
          </div>
        </div>
        <hr>
      `;
      cartContainer.appendChild(itemElement);
      total += item.price * item.qty;
    });

    const totalElement = document.createElement('div');
    totalElement.classList.add('cart-summary');
    totalElement.innerHTML = `<strong>Total: Rp ${total.toLocaleString()}</strong>`;
    cartContainer.appendChild(totalElement);

    // ✅ FORM CUSTOMER
    const formElement = document.createElement('div');
    formElement.classList.add('cart-form');
    formElement.innerHTML = `
      <h4 style="text-align: center;">Customer Detail</h4>
      <form id="checkout-form">
        <label>Name</label>
        <input type="text" placeholder="Nama" required />
        <label>Email</label>
        <input type="email" placeholder="Email" required />
        <label>Phone</label>
        <input type="tel" placeholder="No HP" required />
        <button type="submit" class="btn-checkout">Checkout</button>
      </form>
    `;
    cartContainer.appendChild(formElement);

    // Qty buttons
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

  // Tambah ke cart
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

  // MODAL
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
      modalImg.src = btn.dataset.image;
      modalTitle.textContent = btn.dataset.title;
      modalDesc.textContent = btn.dataset.description;
      modalPrice.innerHTML = `${btn.dataset.price} <span>${btn.dataset.oldprice}</span>`;

      const starCount = parseInt(btn.dataset.stars);
      modalStars.innerHTML = '';
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement('i');
        star.setAttribute('data-feather', 'star');
        if (i <= starCount) star.classList.add('star-full');
        modalStars.appendChild(star);
      }
      feather.replace();

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

  document.querySelector('.modal .close-icon').onclick = (e) => {
    itemDetailModal.style.display = 'none';
    e.preventDefault();
  };

  window.onclick = (e) => {
    if (e.target === itemDetailModal) {
      itemDetailModal.style.display = 'none';
    }
  };

  // 🚀 Jalankan saat halaman siap
  updateCartDisplay();
});
