const API_URL = 'http://localhost:3000/api/auth/';

const registerUser = async () => {
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const messageElem = document.getElementById('registerMessage');

    try {
        const response = await fetch(API_URL + 'register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        if (response.ok) {
            messageElem.style.color = 'green';
            messageElem.textContent = 'Registration successful!';
        } else {
            messageElem.style.color = 'red';
            messageElem.textContent = data.message || 'Registration failed';
        }
    } catch (error) {
        messageElem.style.color = 'red';
        messageElem.textContent = 'Error registering user';
    }
};

const loginUser = async () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const messageElem = document.getElementById('loginMessage');

    try {
        const response = await fetch(API_URL + 'login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            messageElem.style.color = 'green';
            messageElem.textContent = 'Login successful!';
            localStorage.setItem('token', data.token); // Store token for future requests
        } else {
            messageElem.style.color = 'red';
            messageElem.textContent = data.message || 'Login failed';
        }
    } catch (error) {
        messageElem.style.color = 'red';
        messageElem.textContent = 'Error logging in';
    }
};
