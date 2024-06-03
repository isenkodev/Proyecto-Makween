$(document).ready(function() {
    actualizarEstadoLogin();
 /* INTENTO DE BASE DE DATOS XD JHAJA */   
    $('#login').click(function(event) {
        if (estaLogueado()) {
            cerrarSesion();
            actualizarEstadoLogin();
            event.preventDefault();
        }
    });

    $('.message a').click(function() {
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });
});

function estaLogueado() {
    return localStorage.getItem('logueado') === 'true';
}

function actualizarEstadoLogin() {
    const enlaceLogin = $('#login');
    if (estaLogueado()) {
        enlaceLogin.text('Desconectar');
        enlaceLogin.attr('href', 'login.html');
    } else {
        enlaceLogin.text('Iniciar Sesión');
        enlaceLogin.attr('href', 'login.html');
    }
}

function cerrarSesion() {
    localStorage.setItem('logueado', 'false');
}


/* VALIDACIONES */
function loguear() {
    let email = $("#correo").val();
    let contrasena = $("#contraseña").val(); 
    let error = $("#error"); 

    if (email === "" || contrasena === "") {
        error.text("Por favor, completa todos los campos");
        setTimeout(function () {
            error.text("");
        }, 2000);
        return;
    }

    if (contrasena.length < 8) {
        error.text("La contraseña debe ser mayor a 8 caracteres");
        $("#contraseña").val("");
        setTimeout(function () {
            error.text("");
        }, 2000);
        return;
    }

    if (!email.includes("@")) {
        error.text("Ingrese un correo con @ válido");
        $("#correo").val("");
        setTimeout(function () {
            error.text("");
        }, 2000);
        return;
    }

    const caracteresInvalidosRegex = /[#!$%^&*()+=\[\]{};':"\\|,<>\/?]+/;
    if (caracteresInvalidosRegex.test(email)) {
        error.text("Caracteres inválidos en el correo");
        $("#correo").val("");
        setTimeout(function () {
            error.text("");
        }, 2000);
        return;
    }

    if ((email === "alanbrito@gmail.com" && contrasena === "123456789") || (email === "german@gmail.com" && contrasena === "123456789")) {
        localStorage.setItem('logueado', 'true');
        window.location = "index.html";
    } else {
        error.text("Los datos ingresados son incorrectos");
        $("#correo").val("");
        $("#contraseña").val("");

        setTimeout(function () {
            error.text("");
        }, 2000);
    }
}

/* SISTEMA DE BUSQUEDA */ 
function BuscadorHtml(event) {
    event.preventDefault();
    
    var terminoBusqueda = $('#termino');
    var textoBusqueda = terminoBusqueda.val().toLowerCase();

    switch (textoBusqueda) {
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
            terminoBusqueda.attr('placeholder', 'No existe categoría');
            setTimeout(function() {
                terminoBusqueda.attr('placeholder', 'Buscar por categoría');
            }, 2000);
            terminoBusqueda.val('');
    }
}
