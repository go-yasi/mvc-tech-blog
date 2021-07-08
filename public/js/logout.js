const logout = async () => {
    const response = await fetch('/api/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      alert(`Thank you for visting the Tech Blog! See you next time...`);
      document.location.replace('/login');
    } else {
      alert(response.statusText);
    }
  };
  
document.querySelector('#logout').addEventListener('click', logout);