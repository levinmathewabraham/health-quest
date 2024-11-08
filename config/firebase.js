const { initializeApp } = require('firebase/app');
const { getDatabase } = require('firebase/database');

const firebaseConfig = {
    apiKey: "AIzaSyAgAs_FoaiqgzZ2hIbQZPj-OSceIPdYYgo",
    authDomain: "healthquest-7869b.firebaseapp.com",
    databaseURL: "https://healthquest-7869b-default-rtdb.firebaseio.com",
    projectId: "healthquest-7869b",
    storageBucket: "healthquest-7869b.firebasestorage.app",
    messagingSenderId: "193229780703",
    appId: "1:193229780703:web:fd3c7252e4917393eb5b6a",
    measurementId: "G-FERB6DQF9P"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

module.exports = { database }; 

