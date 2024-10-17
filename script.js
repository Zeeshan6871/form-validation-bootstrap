document.querySelector('#email').addEventListener('input', validateEmail);
document.querySelector('#password').addEventListener('input', validatePassword);
document.querySelector('#confirmPassword').addEventListener('input', validateConfirmPassword);
document.querySelector('#username').addEventListener('input', validateUsername);
document.querySelector('#phone').addEventListener('input', validatePhone);
document.querySelector('#terms').addEventListener('change', validateTerms);

const reSpaces = /^\S*$/;

function validateUsername() {
    const username = document.querySelector('#username');
    if (reSpaces.test(username.value) && username.value.length > 0) {
        username.classList.remove('is-invalid');
        username.classList.add('is-valid');
        return true;
    } else {
        username.classList.add('is-invalid');
        username.classList.remove('is-valid');
        return false;
    }
}

function validateEmail() {
    const email = document.querySelector('#email');
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (re.test(email.value)) {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
        return true;
    } else {
        email.classList.add('is-invalid');
        email.classList.remove('is-valid');
        return false;
    }
}

function validatePassword() {
    const password = document.querySelector('#password');
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})(?=.*[!@#$%^&*])/;
    if (re.test(password.value) && reSpaces.test(password.value)) {
        password.classList.remove('is-invalid');
        password.classList.add('is-valid');
        console.log("no password error");
        
        return true;
    } else {
        password.classList.add('is-invalid');
        password.classList.remove('is-valid');
        console.log("password error");
        return false;
    }
}

function validateConfirmPassword() {
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirmPassword').value;
    const confirmPassField = document.querySelector('#confirmPassword');

    if (password === confirmPassword) {
        confirmPassField.classList.remove('is-invalid');
        confirmPassField.classList.add('is-valid');
        return true;
    } else {
        confirmPassField.classList.add('is-invalid');
        confirmPassField.classList.remove('is-valid');
        return false;
    }
}

function validatePhone() {
    const phone = document.querySelector('#phone');
    const iti = window.intlTelInputGlobals.getInstance(phone);
    const phoneNumber = iti.getNumber();

    console.log(phoneNumber);
    phone.value = phoneNumber
    if (iti.isValidNumber()) {
        phone.classList.remove('is-invalid');
        phone.classList.add('is-valid');
        return true;
    } else {
        phone.classList.add('is-invalid');
        phone.classList.remove('is-valid');
        return false;
    }
}

function validateTerms() {
    const terms = document.querySelector('#terms');
    if (terms.checked) {
        terms.classList.remove('is-invalid');
        return true;
    } else {
        terms.classList.add('is-invalid');
        return false;
    }
}

(function () {
    const forms = document.querySelectorAll('.needs-validation');

    for (let form of forms) {
        form.addEventListener('submit', function (event) {
            const isUsernameValid = validateUsername();
            const isEmailValid = validateEmail();
            const isPasswordValid = validatePassword();
            const isConfirmPasswordValid = validateConfirmPassword();
            const isPhoneValid = validatePhone();
            const isTermsValid = validateTerms();

            if (
                !isUsernameValid ||
                !isEmailValid ||
                !isPasswordValid ||
                !isConfirmPasswordValid ||
                !isPhoneValid ||
                !isTermsValid
            ) {
                console.log("Error");
                event.preventDefault(); 
                event.stopPropagation(); 
                form.classList.add('was-validated');
            } else {
                event.preventDefault();
                form.classList.add('was-validated');
                console.log('Form submitted successfully!');

                // Collect form data here if needed
                const formData = {
                    username: document.querySelector('#username').value,
                    firstname: document.querySelector('#firstname').value,
                    lastname: document.querySelector('#lastname').value,
                    email: document.querySelector('#email').value,
                    password: document.querySelector('#password').value,
                    phone: document.querySelector('#phone').value,
                    address: {
                        street: document.querySelector('#street').value,
                        address2: document.querySelector('#address2').value,
                        city: document.querySelector('#city').value,
                        state: document.querySelector('#state').value,
                        zip: document.querySelector('#zip').value
                    },
                    termsAccepted: document.querySelector('#terms').checked
                };
                console.log('Form Data:', formData);
            }
        }, false);
    }
})();

// Toggle password visibility
document.querySelector('#togglePassword').addEventListener('click', function () {
    const passwordField = document.querySelector('#password');
    const confirmPasswordField = document.querySelector('#confirmPassword');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    confirmPasswordField.setAttribute('type', type);
    this.textContent = type === 'password' ? '👁️' : '🙈';
});


window.intlTelInput(document.querySelector("#phone"), {
    initialCountry: "in",
    geoIpLookup: function(callback) {
        fetch("https://ipinfo.io") // Replace with your token
            .then((resp) => resp.json())
            .then((resp) => {
                const countryCode = (resp && resp.country) ? resp.country : "us"; // Default to "us"
                callback(countryCode);
            });
    },
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });
  