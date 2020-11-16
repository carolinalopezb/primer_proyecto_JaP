
// Muestra los datos de perfil------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function (e) {

    let perfil2 = localStorage.getItem('perfilUsuario');


    if (perfil2) {
        let perfil = JSON.parse(perfil2);

        document.getElementById("imagenPerfil").src = perfil.imgURL;

        document.getElementById("perfilImagenURL").value = perfil.imgURL;
        document.getElementById("perfilNombres").value = perfil.nombres;
        document.getElementById("perfilApellidos").value = perfil.apellido;
        document.getElementById("perfilEdad").value = perfil.edad;
        document.getElementById("perfilEmail").value = perfil.email;
        document.getElementById("perfilTelefono").value = perfil.telefono;

    }


});

// Almacena los datos de perfil y hace la validación ------------------------------------------------
document.getElementById("guardarCambios").addEventListener("click", function (e) {
    let checkValidity = true;
    let ImagenURL = document.getElementById("perfilImagenURL").value;
    let Nombres = document.getElementById("perfilNombres").value;
    let Apellidos = document.getElementById("perfilApellidos").value;
    let Edad = document.getElementById("perfilEdad").value;
    let Email = document.getElementById("perfilEmail").value;
    let Telefono = document.getElementById("perfilTelefono").value;

    if (Nombres == "") {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById("perfilNombres").style.borderColor = "red";
        checkValidity = false;
    } else {
        document.getElementById("perfilNombres").removeAttribute("style");
    }
    if (Apellidos == "") {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById("perfilApellidos").style.borderColor = "red";
        checkValidity = false;
    } else {
        document.getElementById("perfilApellidos").removeAttribute("style");
    }
    if (Edad == "") {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById("perfilEdad").style.borderColor = "red";
        checkValidity = false;
    } else {
        document.getElementById("perfilEdad").removeAttribute("style");
    }
    if (Email == "") {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById("perfilEmail").style.borderColor = "red";
        checkValidity = false;
    } else {
        document.getElementById("perfilEmail").removeAttribute("style");
    }
    if (Telefono == "") {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById("perfilTelefono").style.borderColor = "red";
        checkValidity = false;
    } else {
        document.getElementById("perfilTelefono").removeAttribute("style");
    }

    if (checkValidity) {
        localStorage.setItem('perfilUsuario', JSON.stringify({
            imgURL: ImagenURL,
            nombres: Nombres,
            apellido: Apellidos,
            edad: Edad,
            email: Email,
            telefono: Telefono
        }));
        document.getElementById("validarCampos").innerHTML = ``
        window.location = "my-profile.html"

    } else {
        document.getElementById("validarCampos").innerHTML = `Por favor llenar todos los campos en rojo`
    }

});



