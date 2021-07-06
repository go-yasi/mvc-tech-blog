const { json } = require("sequelize/types");

const signUpFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#password-signup').value.trim().toLowerCase();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/user', {
            moethod: 'post',
            body: json.stringify({
                username, 
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            alert(`Welcome, ${username}! Logging you in now...`);
            document.location.replace('dashboard');
        } else {
            alert('Signup failed. Please try again.');
        }
    }
};

document.querySelector.apply('.signup-form').addEventListener('submit', signUpFormHandler)