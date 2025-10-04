const form = document.getElementById('signupForm');
const nameInput = document.getElementById('companyName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');
const countrySelect = document.getElementById('country');
const submitBtn = document.getElementById('submitBtn');

// Password toggles
document.getElementById('togglePassword').addEventListener('click', function () {
    togglePasswordVisibility(passwordInput, this);
});

document.getElementById('toggleConfirm').addEventListener('click', function () {
    togglePasswordVisibility(confirmInput, this);
});

function togglePasswordVisibility(input, button) {
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;

    const icon = button.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
}

passwordInput.addEventListener('input', function () {
    const strength = checkPasswordStrength(this.value);
    const strengthBar = document.getElementById('strengthBar');
    const strengthIndicator = document.getElementById('passwordStrength');

    strengthIndicator.classList.add('show');
    strengthBar.className = 'strength-bar';

    if (this.value.length === 0) {
        strengthIndicator.classList.remove('show');
    } else if (strength <= 1) {
        strengthBar.classList.add('strength-weak');
    } else if (strength <= 2) {
        strengthBar.classList.add('strength-medium');
    } else {
        strengthBar.classList.add('strength-strong');
    }
});

// Real-time validation
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmailField);
passwordInput.addEventListener('blur', validatePassword);
confirmInput.addEventListener('input', validateConfirmPassword);
countrySelect.addEventListener('change', validateCountry);

function validateName() {
    const error = document.getElementById('nameError');
    if (nameInput.value.trim().length < 2) {
        nameInput.classList.add('error');
        nameInput.classList.remove('success');
        error.classList.add('show');
        return false;
    } else {
        nameInput.classList.remove('error');
        nameInput.classList.add('success');
        error.classList.remove('show');
        return true;
    }
}

function validateEmailField() {
    const error = document.getElementById('emailError');
    if (!validateEmail(emailInput.value)) {
        emailInput.classList.add('error');
        emailInput.classList.remove('success');
        error.classList.add('show');
        return false;
    } else {
        emailInput.classList.remove('error');
        emailInput.classList.add('success');
        error.classList.remove('show');
        return true;
    }
}

function validatePassword() {
    const error = document.getElementById('passwordError');
    if (passwordInput.value.length < 5 || passwordInput.value.length > 25) {
        passwordInput.classList.add('error');
        passwordInput.classList.remove('success');
        error.classList.add('show');
        return false;
    } else {
        passwordInput.classList.remove('error');
        passwordInput.classList.add('success');
        error.classList.remove('show');
        return true;
    }
}

function validateConfirmPassword() {
    const error = document.getElementById('confirmError');
    const success = document.getElementById('confirmSuccess');

    if (confirmInput.value.length === 0) {
        confirmInput.classList.remove('error', 'success');
        error.classList.remove('show');
        success.classList.remove('show');
        return false;
    }

    if (confirmInput.value !== passwordInput.value) {
        confirmInput.classList.add('error');
        confirmInput.classList.remove('success');
        error.classList.add('show');
        success.classList.remove('show');
        return false;
    } else {
        confirmInput.classList.remove('error');
        confirmInput.classList.add('success');
        error.classList.remove('show');
        success.classList.add('show');
        return true;
    }
}

function validateCountry() {
    const error = document.getElementById('countryError');
    if (countrySelect.value === '') {
        countrySelect.classList.add('error');
        countrySelect.classList.remove('success');
        error.classList.add('show');
        return false;
    } else {
        countrySelect.classList.remove('error');
        countrySelect.classList.add('success');
        error.classList.remove('show');
        return true;
    }
}

// Form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmailField();
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();
    const isCountryValid = validateCountry();

    if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid && isCountryValid) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating Account...';

        // Store signup data in memory
        const signupData = {
            companyName: nameInput.value,
            email: emailInput.value,
            country: countrySelect.value,
            timestamp: new Date().toISOString()
        };

        // Store in a JavaScript variable (in-memory storage)
        window.registeredUser = signupData;

        setTimeout(() => {
            alert('Account created successfully!\n\nCompany: ' + signupData.companyName + '\nEmail: ' + signupData.email + '\nCountry: ' + signupData.country);
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign Up';

            // Keep the data stored, just clear the form
            form.reset();
            document.querySelectorAll('.success').forEach(el => el.classList.remove('success'));
            document.getElementById('passwordStrength').classList.remove('show');
        }, 1500);
    } else {
        alert('Please fix all errors before submitting');
    }
});
