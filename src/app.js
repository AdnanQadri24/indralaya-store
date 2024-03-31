document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
                { id : 1, name: 'Changhong 32 Inch Newest Android 11', img: 'tv_1.png', price: 1779000},
                { id : 2, name: 'Samsung HD TV 32" UA32T4001 (2020)', img: 'tv_2.png', price: 2669000},
                { id : 3, name: 'AC Sharp 1/2 PK', img: 'ac_1.png', price: 3100000},
        ]
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem){
            this.items.push(newItem);
            this.quantity ++;
            this.total += newItem.price;
            console.log(this.total);
        }
    });

});


// konversi ke Rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};