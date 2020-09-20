var product2 = {};

var arrayProductos = [];

var product = {};

var commentsArray = [];

//---------------------------------------------Mostrar producto
function showProduct(product, rray) {


         let info = "";
         let comments = "";



            info += '<h2>' + product.name + '</h2>';
            info += '<p> Descripción: ' + product.description + '</p><br>';
            info += '<p>Precio: ' + product.currency + ' ' + product.cost +'</p>';
            info += '<p>Cantidad vendidos: ' + product.soldCount +'</p>';
            info += '<p>Categoría: ' + product.category +'</p>';



         for(i=0; i<product.images.length;i++){
         info += '<img src="'+product.images[i]+'">';
            
        }


            


      for (i = 0; i < rray.length; i++) {

        let puntos = "";

        for( a = 1;a <= rray[i].score; a++){
            puntos += '<span class="fa fa-star checked"></span>';
        }
        for( a = rray[i].score + 1;a <= 5; a++){
          puntos += '<span class="fa fa-star"></span>';
      }
        comments += '<div>'+puntos+'</div><br>'
        comments += '<p> Usuario: ' + rray[i].user + '</p>';
        comments += '<p>' + rray[i].description + '</p>';
        comments += '<p>' + rray[i].dateTime + '</p><br>';
    }
   
          document.getElementById("contenido").innerHTML = info;
          document.getElementById("cont-comments").innerHTML = comments;
      
    
}
//---------------------------------------------Productos realcionados

function mostrarProdRel(array, arrayRelacionados){
    let info = "";
    arrayRelacionados.forEach(function(i){

        info += '<h2>' + array[i].name + '</h2>';
        info += '<p> Descripción: ' + array[i].description + '</p><br>';
        info += '<p>Precio: ' + array[i].currency + ' ' + array[i].cost +'</p>';
        info += '<p>Cantidad vendidos: ' + array[i].soldCount +'</p>';
        info += '<p>Categoría: ' + array[i].category +'</p>';
        info+= '<img src="'+array[i].imgSrc+'">';
        info += '<a href="product-info.html"><button style="float: right;">Ver producto</button></a><br><br>'

        
    });

    document.getElementById("prodRel").innerHTML = info;

}

//----------------------------------------------Enviar comentario
document.getElementById("envComm").addEventListener("click", function(){
    let d = new Date();

    let newComment = {
        score: parseInt(document.getElementById("calificacion").value),
        description: document.getElementById("newComm").value,
        user: JSON.parse(localStorage.getItem('user-logged')).user,
        dateTime: d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+'  '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()
    };
    commentsArray.push(newComment);
    document.getElementById("newComm").value = "";
    showProduct(product, commentsArray);
});

//-------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === 'ok'){
            commentsArray = resultObj.data;
        }
     });
     getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            arrayProductos = resultObj.data;
        }
    });
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            product = resultObj.data;
            showProduct(product, commentsArray);
            mostrarProdRel(arrayProductos, product.relatedProducts)
        }
    });

}); 



