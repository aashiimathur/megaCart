document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Clear previous error messages
        usernameError.textContent = '';
        passwordError.textContent = '';

        // Get form values
        const username = usernameField.value.trim();
        const password = passwordField.value.trim();
        const rememberMe = rememberMeCheckbox.checked;

        // Simple validation
        if (username === '' || password === '') {
            if (username === '') {
                usernameError.textContent = 'Username is required.';
            }
            if (password === '') {
                passwordError.textContent = 'Password is required.';
            }
            return;
        }

        // Check if user exists in localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && username === storedUser.username && password === storedUser.password) {
            // Store username in localStorage
            localStorage.setItem('currentUser', JSON.stringify({ username }));

            if (rememberMe) {
                // Example of saving user info or token in a cookie or longer-term storage
                // Here you might want to set a cookie or handle remember-me functionality
                console.log('Remember me checked. Handle long-term storage if necessary.');
            }

            // Redirect to main.html
            window.location.href = 'main.html';
        } else {
            alert('Invalid username or password.');
        }
    });
});
