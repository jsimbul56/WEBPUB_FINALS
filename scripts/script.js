import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyATwwskOTNusM5upnI2Qwr7XPV8ZjWWhtQ",
    authDomain: "millet-s-bbq-house.firebaseapp.com",
    projectId: "millet-s-bbq-house",
    storageBucket: "millet-s-bbq-house.appspot.com",
    messagingSenderId: "371340325689",
    appId: "1:371340325689:web:ffd28fcb1d70c996f56ee8",
    measurementId: "G-3YTXEEG8E3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function enlargeImage(img) {
    const modal = document.getElementById('image-modal');
    const modalImg = modal.querySelector('img');
    modalImg.src = img.src;
    modal.style.display = 'block'; 
}

function closeModal() {
    const modal = document.getElementById('image-modal');
    modal.style.display = 'none'; 
}

const cart = [];
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

cartIcon.addEventListener('click', () => {
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
});

function attachAddToCartButtons() {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.closest('.gallery-item');
            const name = parent.querySelector('p').textContent;
            const priceText = parent.querySelector('span').textContent;

            const price = parseFloat(priceText.replace(/[^0-9.-]/g, '')) || 0; 
            const quantity = parseInt(parent.querySelector('.quantity-input').value) || 1; 
            addToCart(name, price, quantity);
        });
    });
}

function addToCart(name, price, quantity) {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }
    renderCart();
}

function renderCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = `P${item.price.toFixed(2)}`;
        row.appendChild(priceCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = item.quantity;
        row.appendChild(quantityCell);

        const subtotalCell = document.createElement('td');
        const subtotal = (item.price * item.quantity).toFixed(2);
        subtotalCell.textContent = `P${subtotal}`;
        row.appendChild(subtotalCell);

        cartItems.appendChild(row);
        total += parseFloat(subtotal);
    });

    cartTotal.innerText = `${total.toFixed(2)}`;
}

const orderBtn = document.getElementById('order-btn');
orderBtn.addEventListener('click', () => {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.style.display = 'inline-block';
    });
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.style.display = 'inline-block';
    });
});

attachAddToCartButtons();

renderCart();


export { db, cart, cartTotal, renderCart }; 