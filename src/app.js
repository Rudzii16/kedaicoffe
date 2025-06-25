document.addEventListener('alpine:init', () => {
Alpine.data('products', () => ({
items : [
    { id: 1, name: ' Kenangan Milk Tea', img: 'kenangan milk tea .jpeg', price: 30000 },
    { id: 1, name: ' Tiramisu Latte', img: 'tiramisu-latee.jpg', price: 35000 },
    { id: 1, name: ' Vanilla Latte', img: 'vanilla-late', price: 45000 },
],
}));
});

// Konversi ke Rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumIntegerDigits: 0,
    }).format(number);
};
