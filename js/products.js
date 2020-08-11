//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var productsArray = [];

let htmlContentToAppend = "";
function showProducts (array){

    for (let i = 0; i < array.length; i++){
        let product = array[i];

        htmlContentToAppend += `
        
        Nombre: `+ product.name +` 
        <br>
        Precio: `+ product.currency + product.cost +`
        <br>
        Descripción: `+ product.description +`
        <br>
        <br>
        `

        document.getElementById("prod").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener ("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then (function(resultObj){
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            showProducts(productsArray);
        }
    });
});