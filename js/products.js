//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var productsArray = [];
var minPrecio = undefined;
var maxPrecio = undefined;

const ORDER_ASC_BY_PRICE ="price->PRICE";
const ORDER_DESC_BY_PRICE ="PRICE->price";
const ORDER_DESC_BY_CANTIDAD ="CANTIDAD->cantidad";


function showProducts (array){
    
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++){
        let product = array[i];

        if(((minPrecio == undefined) || (minPrecio != undefined && parseInt(product.cost) >= minPrecio)) && 
        ((maxPrecio == undefined) || (maxPrecio != undefined && parseInt(product.cost) <= maxPrecio))){


        htmlContentToAppend +=

        `   

        <img src="`+product.imgSrc+`" alt="imagen producto"><br>
        Nombre: `+ product.name ` 
        <br>
        Precio: `+ product.currency +` `+ product.cost +`
        <br>
        Descripción: `+ product.description +`
        <a style="float: right"href="file:///C:/Users/Admin.DESKTOP-0Q23CA9/Documents/GitHub/primer_proyecto_JaP/product-info.html">Ver producto</a><br><br>
        `
        document.getElementById("prod").innerHTML = htmlContentToAppend;
    }
}
}

document.addEventListener ("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then (function(resultObj){
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;

            productsArray = sortProducts(ORDER_ASC_BY_PRICE, productsArray);

            showProducts(productsArray);
        }
    });

    document.getElementById("sortCantidad").addEventListener("click", function(){
        productsArray = sortProducts(ORDER_DESC_BY_CANTIDAD, productsArray);

        showProducts(productsArray);
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        productsArray = sortProducts(ORDER_ASC_BY_PRICE, productsArray);

        showProducts(productsArray);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        productsArray = sortProducts(ORDER_DESC_BY_PRICE, productsArray);

        showProducts(productsArray);
    });


    //-------------------------------------------------------------------------------------

    document.getElementById("limpiar").addEventListener("click", function(){
        document.getElementById("min").value = "";
        document.getElementById("max").value = "";
    
        minPrecio = undefined;
        maxPrecio = undefined;
    
        showProducts(productsArray);
    });
    
    document.getElementById("filtrar").addEventListener("click", function(){
    
        minPrecio = document.getElementById("min").value;
        maxPrecio = document.getElementById("max").value;
    
        if ((minPrecio != undefined) && (minPrecio != "") && (parseInt(minPrecio)) >= 0){
            minPrecio = parseInt(minPrecio);
        }
        else{
            minPrecio = undefined;
        }
    
        if ((maxPrecio != undefined) && (maxPrecio!= "") && (parseInt(maxPrecio)) >= 0){
            maxPrecio = parseInt(maxPrecio);
        }
        else{
            maxPrecio = undefined;
        }
    
        showProducts(productsArray);
    });
});

function sortProducts (criterio, array){
    let result = [];

    if (criterio === ORDER_ASC_BY_PRICE){
        result = array.sort(function(a,b){
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });


} else if (criterio === ORDER_DESC_BY_PRICE) {
    result = array.sort(function(a,b){
        if (a.cost > b.cost) { return -1; }
        if (a.cost < b.cost) { return 1; }
        return 0; 
     });
} else if (criterio === ORDER_DESC_BY_CANTIDAD) {
    result = array.sort(function(a,b){
        if (a.soldCount > b.soldCount) { return -1; }
        if (a.soldCount < b.soldCount) { return 1; }
        return 0; 
     });
}

return result;
}