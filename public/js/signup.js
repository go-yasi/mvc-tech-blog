const signUpFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim().toLowerCase();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/user/', {
            moethod: 'POST',
            body: JSON.stringify({
                username, 
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            alert(`Welcome, ${username}! Logging you in...`);
            document.location.replace('/dashboard');
        } else {
            alert('Signup failed. Please try again.');
        }
    }
};

document.querySelector.apply('.signup-button').addEventListener('submit', signUpFormHandler);