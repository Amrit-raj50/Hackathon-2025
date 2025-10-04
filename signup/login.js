const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Password visibility toggle
togglePassword.addEventListener('click', function () {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;

    const icon = this.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Real-time validation
emailInput.addEventListener('blur', function () {
    if (!validateEmail(this.value)) {
        this.classList.add('error');
        this.classList.remove('success');
        emailError.classList.add('show');
    } else {
        this.classList.remove('error');
        this.classList.add('success');
        emailError.classList.remove('show');
    }
});

passwordInput.addEventListener('blur', function () {
    if (this.value.length < 5) {
        this.classList.add('error');
        this.classList.remove('success');
        passwordError.classList.add('show');
    } else {
        this.classList.remove('error');
        this.classList.add('success');
        passwordError.classList.remove('show');
    }
});

// Form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    // Validate email
    if (!validateEmail(emailInput.value)) {
        emailInput.classList.add('error');
        emailError.classList.add('show');
        isValid = false;
    }

    // Validate password
    if (passwordInput.value.length < 5) {
        passwordInput.classList.add('error');
        passwordError.classList.add('show');
        isValid = false;
    }

    if (isValid) {
        // Store login data in memory
        const loginData = {
            email: emailInput.value,
            timestamp: new Date().toISOString()
        };

        // Store in a JavaScript variable (in-memory storage)
        window.currentUser = loginData;

        alert('Login successful!\nEmail: ' + loginData.email);

    }
});