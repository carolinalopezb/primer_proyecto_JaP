//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var productsArray = [];
var minPrecio = undefined;
var maxPrecio = undefined;


function showProducts (array){
    
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++){
        let product = array[i];

        if(((minPrecio == undefined) || (minPrecio != undefined && parseInt(product.cost) >= minPrecio)) && 
        ((maxPrecio == undefined) || (maxPrecio != undefined && parseInt(product.cost) <= maxPrecio))){


        htmlContentToAppend +=

        `   

      
        Nombre: `+ product.name +` 
        <br>
        Precio: `+ product.currency +` `+ product.cost +`
        <br>
        Descripción: `+ product.description +`
        <br>
        <br>
        `
        document.getElementById("prod").innerHTML = htmlContentToAppend;
    }
}
}

document.addEventListener ("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then (function(resultObj){
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            showProducts(productsArray);
        }
    });
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
