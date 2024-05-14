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
            // cek apakah ada barang yang sama di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // jika belum ada
            if(!cartItem){
                this.items.push({...newItem, quantity: 1, total: newItem.price});
                this.quantity++;
                this.total += newItem.price;
            }else{
                // jika barang sudah ada, cek apakah barang sama atau beda
                this.items = this.items.map((item) => {
                    // jika barang beda 
                    if(item.id !== newItem.id){
                        return item;
                    }else{
                        // jika barang sudah ada
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                })
            }
        },

        remove(id) {
            // ambil item yang ingin di remove berdasarkan id
            const cartItem = this.items.find((item) => item.id === id);
            
            // jika item lebih satu
            if(cartItem.quantity > 1){
                // telusuri satu satu
                this.items = this.items.map((item) => {
                    // jika bukan barang yang diklik
                    if(item.id !== id) {
                        return item;
                    }else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                })
            }else if (cartItem.quantity ===1 ){
                // jika barangnya sisa 1
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity --;
                this.total -= cartItem.price;
            }
        }
    });

});

// form validation
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');

form.addEventListener('keyup', function() {
    for(let i = 0; i < form.elements.length; i++) {
        if(form.elements[i].value.length !== 0) {
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        } else {
            return false
        }
    }

    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
});

// kirim data ketika tombol checkout diklik 
checkoutButton.addEventListener('click', async function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    
    // minta transaction token menggunakan ajax
    try {
        const response = await fetch('controller/placeOrder.php', {
            method: 'POST',
            body: data
        });
        const token = await response.text();
        window.snap.pay(token);
       //  console.log(token)
    } catch(err) {
        console.log(err.message);
    }

})

// konversi ke Rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};
