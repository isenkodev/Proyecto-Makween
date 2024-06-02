$(document).ready(function() {
    updateLoginStatus();
    
    $('#login').click(function(event) {
        if (isLoggedIn()) {
            logout();
            updateLoginStatus();
            event.preventDefault();
        }
    });

    $('#supportForm').submit(function(e) {
        e.preventDefault();
        validateSupportForm();
    });

    $('.message a').click(function() {
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });
});

function isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
}

function updateLoginStatus() {
    const loginLink = $('#login');
    if (isLoggedIn()) {
        loginLink.text('Desconectar');
        loginLink.attr('href', 'login.html');
    } else {
        loginLink.text('Iniciar Sesión');
        loginLink.attr('href', 'login.html');
    }
}

function logout() {
    localStorage.setItem('loggedIn', 'false');
}

function BuscadorHtml(event) {
    event.preventDefault();
    
    var searchInput = $('#termino');
    var searchText = searchInput.val().toLowerCase();

    switch (searchText) {
        case "inicio":
            window.location.href = "index.html";
            break;
        case "trabajos":
            window.location.href = "trabajos.html";
            break;
        case "trabajadores":
            window.location.href = "trabajadores.html";
            break;
        case "ventas":
            window.location.href = "ventas.html";
            break;
        case "soporte":
            window.location.href = "soporte.html";
            break;
        default:
            searchInput.attr('placeholder', 'No existe categoria');
            setTimeout(function() {
                searchInput.attr('placeholder', 'Buscar por categoria');
            }, 2000);
            searchInput.val('');
    }
}

function loguear() {
    let username = $(".login-form input[type='email']").val();
    let password = $(".login-form input[type='password']").val();
    let error = $("#error");

    if (username === "" || password === "") {
        error.text("Por favor, completa todos los campos");
        setTimeout(function () {
            error.text("");
        }, 2000);
        return;
    }

    if (password.length < 8) {
        error.text("La contraseña debe ser mayor a 8 caracteres");
        $(".login-form input[type='password']").val("");
        setTimeout(function () {
            error.text("");
        }, 2000);
        return;
    }

    if ((username === "alanbrito@gmail.com" && password === "123456789") || (username === "german@gmail.com" && password === "123456789")) {
        localStorage.setItem('loggedIn', 'true');
        window.location = "index.html";
    } else {
        error.text("Los datos ingresados son incorrectos");
        $(".login-form input[type='email']").val("");
        $(".login-form input[type='password']").val("");

        setTimeout(function () {
            error.text("");
        }, 2000);
    }
}

function validateSupportForm() {
    let isValid = true;
    const correo = $('#correo').val();
    const nombre = $('#nombre').val();
    const mensaje = $('#mensaje').val();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s]{30,}$/;
    const invalidCharsRegex = /[#!<>.{}+]/;
    
    $('#correo-error').text('');
    $('#nombre-error').text('');
    $('#mensaje-error').text('');
    
    if (!correo) {
        isValid = false;
        $('#correo-error').text('Por favor, ingrese su correo.');
    } else if (!emailRegex.test(correo)) {
        isValid = false;
        $('#correo-error').text('Ingrese un correo válido.');
    }

    if (!nombre) {
        isValid = false;
        $('#nombre-error').text('Por favor, ingrese su nombre.');
    } else if (nameRegex.test(nombre)) {
        isValid = false;
        $('#nombre-error').text('El nombre no debe contener números y debe tener más de 30 caracteres.');
    } else if (invalidCharsRegex.test(nombre)) {
        isValid = false;
        $('#nombre-error').text('El nombre contiene caracteres inválidos.');
    }

    if (!mensaje) {
        isValid = false;
        $('#mensaje-error').text('Por favor, ingrese un mensaje.');
    }

    if (isValid) {
    }
}