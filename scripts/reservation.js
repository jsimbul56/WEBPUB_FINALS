import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

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


window.db = db;

function getElementVal(id) {
    return document.getElementById(id).value;
}

async function submitReservation(e) {
    e.preventDefault();

    var reservationDate = getElementVal('rdate');
    var numOfGuests = +getElementVal('quantity');
    var pref = getElementVal('note');
    var cName = getElementVal('name');
    var cPhone = getElementVal('phone');
    

    const reservationData = {
        reservationDate: reservationDate,
        numberOfGuests: numOfGuests
        
    };

    const customerData = {
        customerName: cName,
        phoneNumber: cPhone,
        preferences: pref
    }

    try{

        const customerDocRef = await addDoc(collection(db, "customers"), customerData);
        console.log("Document written with ID: ", customerDocRef.id);
        reservationData.customerId = customerDocRef.id;

        const reservationDocRef = await addDoc(collection(db, "reservations"), reservationData);
        console.log("Document written with ID: ", reservationDocRef.id);
        alert("Reservation submitted successfully!");

        

    } catch (e) {
        console.error("Error adding document: ", e);
        alert("Error submitting reservation. Please try again later.");
    }
   
};

document.querySelector('.reservation-form').addEventListener('submit', submitReservation);