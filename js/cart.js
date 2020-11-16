

var cartArray = [];
var moneda = "UYU";


//Cambiar dolar a peso y viceversa --------------------------------------------------------------


function dolarPeso() {
    if (moneda === "USD") {
        moneda = "UYU"

    } else  if (moneda === "UYU") {
        moneda = "USD"

    } 
showCart(cartArray); 
envio();
}
// Calcular total productos------------------------------------------------------------------------
     
function Total(){
    let total = 0;
    let subtotales = document.getElementsByClassName("subtotal");
    for (let i = 0; i < subtotales.length; i++){
        total += parseInt(subtotales[i].innerHTML);
    }
    document.getElementById("total").innerHTML = total;
    
}

// Calcular subtotal de cada producto--------------------------------------------------------------
function Subtotal(precio, i){

    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
    subtotal = cantidad * precio; 
    document.getElementById(`productSubtotal${i}`).innerHTML = subtotal;
    Total();
}

//--------------------------------------------------------------------------------------------------
function envio(){
    var envio = document.getElementById("formaEnvio").value


    if (envio === "p"){
        document.getElementById("tipoEnvio").innerHTML = `Premium (2-5 días) Costo del 15% sobre el total.` 
        let total = document.getElementById("total");
        total = parseInt(total.innerHTML);
        total += total * 0.15; 
        document.getElementById("totalEnvio").innerHTML = total;
    }else if (envio === "e"){
        document.getElementById("tipoEnvio").innerHTML = `Express (5-8 días) Costo del 7% sobre el total.`
        let total = document.getElementById("total");
        total = parseInt(total.innerHTML);
        total += total * 0.07; 
        document.getElementById("totalEnvio").innerHTML = total;
    }else if (envio === "s"){
        document.getElementById("tipoEnvio").innerHTML = `Standard (12 a 15 días) Costo del 5% sobre el total.`
        let total = document.getElementById("total");
        total = parseInt(total.innerHTML);
        total += total * 0.05; 
        document.getElementById("totalEnvio").innerHTML = total;
    }
}

//{ } Mostrar productos y carrito ---------------------------------------------------------------------

function showCart(array) {

    let contenido = "";


    for (let i = 0; i < array.length; i++) {
        
        let product = array[i];

        let moneda2 = moneda;
        let currency = product.currency;
        let cost = product.unitCost;

        if (moneda === "USD" && currency === "UYU") {
            cost = cost / 40;
            currency ="USD";
        }

        if (moneda === "UYU" && currency === "USD") {
            cost = cost * 40;
            currency = "UYU";
        }


        let sub = cost * product.count;

        contenido += `
        <tr>
            <td><img src='${product.src}' width="50px"></td>

            <td>'${product.name}'</td>

            <td><input style="width:60px;" onchange="Subtotal(${cost}, ${i})" 
                type="number" id="cantidad${i}" value="${product.count}" min="1"></td>

            <td >${moneda2}</td>

            <td >${ cost}</td>

            <td><span class="subtotal" id="productSubtotal${i}" style="font-weight:bold;">${sub}</span></td>
            
            
        </tr>
        `

        document.getElementById("listado").innerHTML = contenido;
    }
    Total()
}

// Radio buttons del modal-------------------------------------------------------------------------

function formularioModal(){
var x = document.getElementsByName("formaPago");
for (let i=0; i<x.length; i++){
    if(x[i].checked && (x[i].value) =="1"){
        document.getElementById("divFormCuenta").classList.add("d-none");
        document.getElementById("divFormTarjeta").classList.remove("d-none");

    }else if (x[i].checked && (x[i].value) =="2"){
        document.getElementById("divFormTarjeta").classList.add("d-none");
        document.getElementById("divFormCuenta").classList.remove("d-none");
 
    }
}
}

let pagos = document.getElementsByName("formaPago");
for (let i=0; i<pagos.length; i++){
    pagos[i].addEventListener("change", function(){
        formularioModal();
    });
}

// Validar la forma de Pago ---------------------------------------------------------------------
function validarPago(){


    let  pagoValido = true;
    let nombreTrj = document.getElementById("nombreTrj").value;
    let numeroTrj = document.getElementById("numeroTrj").value;
    let mesTrj = document.getElementById("mesTrj").value;
    let anioTrj = document.getElementById("anioTrj").value;
    let codigoTrj = document.getElementById("codigoTrj").value;
    let nombreCuenta = document.getElementById("nombreCuenta").value;
    let numeroCuenta = document.getElementById("numeroCuenta").value;
 
 
    
    if (document.getElementById("pagoTarjeta").checked) {
     if (nombreTrj == "" || numeroTrj == "" || mesTrj == "" || anioTrj == "" || codigoTrj == "") {
         pagoValido = false;
         document.getElementById("alertaModal").innerHTML = `Por favor ingrese los datos!`
     } else {
         pagoValido = true;
     }
   } else if (document.getElementById("pagoCuenta").checked) {
   
     if (nombreCuenta == "" || numeroCuenta == "") {
         pagoValido = false;
         document.getElementById("alertaModal").innerHTML = `Por favor ingrese los datos!`
     } else {
         pagoValido = true;
     }
   
   }
 return pagoValido;
 }
 
 // Agregar poder cerrar el modal cuando estén completos los datos ---------------------------------------------------------------------
  var botonTrj = document.getElementById("btnTrj")
  var botonCuenta = document.getElementById("btnCuenta")
 
 function pago(){
     if(validarPago()){
         botonTrj.setAttribute("data-dismiss", "modal");
         botonCuenta.setAttribute("data-dismiss", "modal");
     }
 }
 
// Mostrar carrito  ---------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_INFO_URL_2).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArray = resultObj.data.articles;

            showCart(cartArray);
            formularioModal();


        }

    });
    

});

//Alertas de forma de pago ---------------------------------------------------------------------

function alertFormaPago(){
    if (validarPago() === false){
        document.getElementById("alertaPago").innerHTML = `Por favor ingrese forma de pago!`
        document.getElementById("alertaPagoSucc").innerHTML = ``
    }else if(validarPago()){
        document.getElementById("alertaPagoSucc").innerHTML = `Modo de pago ingresado`
        document.getElementById("alertaPago").innerHTML = ``
    }
}
// Todas las funciones para el boton del modal ---------------------------------------------------------------------
function todos(){
    alertFormaPago();
    pago();
}

//Validar todo envio y modal ---------------------------------------------------------------------
(function() {
    'use strict';
    window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
    if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    }
    form.classList.add('was-validated');
    }, false);
    });
    }, false);
    })();


