//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

// document.addEventListener("DOMContentLoaded", function(e){
//});


document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("submitBtn").addEventListener("click",function(e){

        let inputUser = document.getElementById("inputUser");
        let inputPassword = document.getElementById("inputPassword");
        let camposCompletos = true;

        if (inputUser.value === ''){
          inputUser.classList.add("invalid" );
          camposCompletos = false;
          
        }
        
        if (inputPassword.value ===''){
            inputPassword.classList.add("invalid");
            camposCompletos = false;
        }
        if (camposCompletos) {
            
            localStorage.setItem('user-logged',JSON.stringify({user: inputUser.value}));
                        window.location = 'inicio.html';
                
        }else{

            alert("Debes ingresar los datos!")
        }
        
    });
});