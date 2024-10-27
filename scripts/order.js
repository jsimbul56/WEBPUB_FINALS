import { db, cart, cartTotal, renderCart } from './script.js'; 
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';

function getElementVal(id) {
    return document.getElementById(id).value;
}

async function submitOrder(e) {
    e.preventDefault();

    var Cname = getElementVal('customer-name');
    var Cphone = getElementVal('customer-phone');

    if (!Cname || !Cphone) {
        return alert('Please enter your name and phone number.');
    }
    const orderData = {
        customerName: Cname,
        customerPhone: Cphone,
        orders: cart,
        total: parseFloat(cartTotal.innerText),
        createdAt: new Date()

    };

    try {
        const docRef = await addDoc(collection(db, "customerOrder"), orderData);
        console.log("Document written with ID: ", docRef.id);
        alert("Order submitted successfully!");
        cart.length = 0;
        renderCart();

        document.getElementById('customer-name').value = '';
        document.getElementById('customer-phone').value = '';

    } catch (e) {
        console.error("Error adding document: ", e);
        alert("Error submitting order. Please try again later.");
    }
}

const checkoutBtn = document.getElementById('checkout-btn');
checkoutBtn.addEventListener('click', submitOrder);

export { submitOrder };
