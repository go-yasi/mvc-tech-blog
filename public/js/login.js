const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ 
          username: username, 
          password: password 
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        alert(`Welcome back, @${username}! 
Logging you in...`);
        document.location.replace('/dashboard');
      } else {
        alert('Login failed ☹︎ Please try again!');
        document.location.reload();
      }
    }
  };
  
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  