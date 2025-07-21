document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    if (!email) {
        alert('Please enter your email address.');
        return;
    }
        alert('A password reset link has been sent to ' + email + '. Please check your inbox.');
    });