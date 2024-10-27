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

async function submitFeedback(e) {
    e.preventDefault();

    var Cname = getElementVal('name');
    var email = getElementVal('email');
    var feedback = getElementVal('message');
    var serviceRating = document.querySelector('input[name="service-rating"]:checked').value;
    var foodRating = document.querySelector('input[name="food-rating"]:checked').value;
    var cleanRating = document.querySelector('input[name="cleanliness-rating"]:checked').value;



    const feedbackData = {
        name: Cname,                    
        email: email,                    
        feedbackMessage: feedback,       
        ratings: {                      
            service: parseInt(serviceRating, 10),
            food: parseInt(foodRating, 10),
            cleanliness: parseInt(cleanRating, 10)
        },
        createdAt: new Date(), 
    };

 

    try {
        const docRef = await addDoc(collection(db, 'feedbacks'), feedbackData);
        console.log('Feedback submitted with ID: ', docRef.id);

        alert('Feedback submitted successfully!');

    } catch (e) {
        console.error('Error adding document: ', e);
    }
}

document.querySelector('.feedback-form').addEventListener('submit', submitFeedback);