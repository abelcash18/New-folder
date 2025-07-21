document.getElementById('forgotForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('firstName').value.trim();
        const phone = document.getElementById('lastName').value.trim();
        const dob = document.getElementById('dob').value;
        if (!name) {
            alert('Please enter your full name.');
            return;
        }
        if (!phone && !dob) {
            alert('Please enter either your First name or date of birth.');
            return;
        }
        // Retrieve users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const found = users.find(user => {
            return user.fullname === name && (user.phone === phone || user.dob === dob);
        });
        if (found) {
            alert('If your details match our records, you will receive instructions to recover your account.');
            window.location.href = 'login.html';
        } else {
            alert('No matching user found. Please check your details or contact support.');
        }
    });