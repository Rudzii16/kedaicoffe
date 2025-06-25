document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'Kenangan Milk Tea', img: 'kenangan-milk-tea.jpeg', price: 30000, stars: 4 },
      { id: 2, name: 'Tiramisu Latte', img: 'tiramisu-latee.jpg', price: 35000, stars: 5 },
      { id: 3, name: 'Vanilla Latte', img: 'vanilla-late.jpeg', price: 45000, stars: 4 },
    ],
  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      console.log(newItem);
    },
  });
});


// Konversi ke Rupiah
function rupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(number);
}

document.addEventListener('alpine:initialized', () => {
  Alpine.effect(() => {
    feather.replace();
  });
});
