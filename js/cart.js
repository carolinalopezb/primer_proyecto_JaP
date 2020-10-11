

var cartArray = [];
var moneda = "USD";


//Cambiar dolar a peso y viceversa --------------------------------------------------------------


function dolarPeso() {
    if (moneda === "USD") {
        moneda = "UYU"

    } else  if (moneda === "UYU") {
        moneda = "USD"

    } 
   // showCart(cartArray);    No funciona.
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

// Mostrar productos y carrito ---------------------------------------------------------------------

function showCart(array) {

    let contenido = "";

    for (let i = 0; i < array.length; i++) {
        
        let product = array[i];

        let moneda2 = moneda;

        if (moneda === "USD" && product.currency === "UYU") {
            product.unitCost = product.unitCost / 40;
        }

        if (moneda === "UYU" && product.currency === "USD") {
            product.unitCost = product.unitCost * 40;
        }


        let sub = product.unitCost * product.count;

        contenido += `
        <tr>
            <td><img src='${product.src}' width="50px"></td>

            <td>'${product.name}'</td>

            <td><input style="width:60px;" onchange="Subtotal(${product.unitCost}, ${i})" 
                type="number" id="cantidad${i}" value="${product.count}" min="1"></td>

            <td >${moneda2}</td>

            <td >${ product.unitCost}</td>

            <td><span class="subtotal" id="productSubtotal${i}" style="font-weight:bold;">${sub}</span></td>
            
            
        </tr>
        `

        document.getElementById("listado").innerHTML = contenido;
    }
    Total()
}


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_INFO_URL_2).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArray = resultObj.data.articles;

            
            showCart(cartArray);

        }

    });
    

});