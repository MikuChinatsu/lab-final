const form = document.getElementById('registration-form');

form.addEventListener('submit', function(event) {
    // Clear previous error messages
    clearErrorMessages();

    // Validate inputs
    const nombreInput = document.querySelector('#nombre');
    const primerApellidoInput = document.querySelector('#primer_apellido');
    const segundoApellidoInput = document.querySelector('#segundo_apellido');
    const emailInput = document.querySelector('#email');
    const loginInput = document.querySelector('#login');
    const passwordInput = document.querySelector('#password');

    let isValid = true;

    if (!nombreInput.value) {
        displayErrorMessage(nombreInput, 'El campo Nombre es requerido.');
        isValid = false;
    }

    if (!primerApellidoInput.value) {
        displayErrorMessage(primerApellidoInput, 'El campo Primer Apellido es requerido.');
        isValid = false;
    }

    if (!segundoApellidoInput.value) {
        displayErrorMessage(segundoApellidoInput, 'El campo Segundo Apellido es requerido.');
        isValid = false;
    }

    if (!emailInput.value) {
        displayErrorMessage(emailInput, 'El campo Email es requerido.');
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        displayErrorMessage(emailInput, 'El campo Email debe tener un formato de correo electrónico válido.');
        isValid = false;
    }

    if (!loginInput.value) {
        displayErrorMessage(loginInput, 'El campo Login es requerido.');
        isValid = false;
    }

    if (!passwordInput.value) {
        displayErrorMessage(passwordInput, 'El campo Password es requerido.');
        isValid = false;
    } else if (!validatePasswordLength(passwordInput.value)) {
        displayErrorMessage(passwordInput, 'El campo Password debe tener una extensión entre 4-8 caracteres.');
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
        return;
    }
});

function displayErrorMessage(input, message) {
    var errorDiv = document.getElementById(input.id + '-error');
    errorDiv.textContent = message;
    input.classList.add('input-error');
}

function clearErrorMessages() {
    var errorDivs = document.querySelectorAll('.input-error');
    errorDivs.forEach(function (errorDiv) {
        errorDiv.textContent = '';
    });

    var formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(function (input) {
        input.classList.remove('input-error');
    });
}

function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePasswordLength(password) {
    return password.length >= 4 && password.length <= 8;
}
