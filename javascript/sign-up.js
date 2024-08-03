document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const strengthDisplay = document.getElementById('passwordStrength');
    let strength = 'Weak';
    if (password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        strength = 'Strong';
        strengthDisplay.className = 'password-strength strong';
    } else if (password.length >= 6 && /[A-Za-z]/.test(password) && /\d/.test(password)) {
        strength = 'Medium';
        strengthDisplay.className = 'password-strength medium';
    } else {
        strengthDisplay.className = 'password-strength weak';
    }
    strengthDisplay.textContent = `Password Strength: ${strength}`;
});

document.getElementById('signUpButton').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    let valid = true;
    document.getElementById('usernameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('mobileError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';

    if (username.length < 6 || username.length > 10) {
        document.getElementById('usernameError').textContent = 'Username must be between 6 and 10 characters long.';
        valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Invalid email address.';
        valid = false;
    }

    if (!/^\d{10}$/.test(mobile)) {
        document.getElementById('mobileError').textContent = 'Mobile number must be exactly 10 digits.';
        valid = false;
    }

    const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!passwordPattern.test(password)) {
        document.getElementById('passwordStrength').textContent = 'Password must contain at least one digit, one letter, and one special character.';
        valid = false;
    }

    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
        valid = false;
    }

    if (valid) {
        localStorage.setItem('user', JSON.stringify({ username, password }));
        window.location.href = 'main.html';
    }
});