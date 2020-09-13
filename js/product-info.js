//funcion que carga y muestra la información del producto
function showProduct(resultObj) {

  let htmlContentToAppend = "";
  //cargo el contenido del JSON en el objeto product
  product = resultObj;
  //obtengo los datos necesarios del producto y los muestro
  htmlContentToAppend = `

    <div class="container-flex">
      <h2 class="text-center"><b>`+ product.name + `</b></h2><br><hr>
        
      <div class="row">
        <div class="col-6">
            <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active"><img src="`+ product.images[0] + `" class="d-block w-100" alt="..."></div>
                <div class="carousel-item"><img src="`+ product.images[1] + `" class="d-block w-100" alt="..."></div>
                <div class="carousel-item"><img src="`+ product.images[2] + `" class="d-block w-100" alt="..."></div>
                <div class="carousel-item"><img src="`+ product.images[3] + `" class="d-block w-100" alt="..."></div>
                <div class="carousel-item"><img src="`+ product.images[4] + `" class="d-block w-100" alt="..."></div>
              </div>
              <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
            
        </div>
                
        <div class="col-6">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1"><b>Precio: ` + product.currency + `</b>` + " " + `<b>` + product.cost + `</b></h5><br><br><br>
              <small class="text-muted">`+ product.soldCount + " Vendidos" + `</small>
            </div>
              <p class="text-justify">` + product.description + `</p> 
              <h6><b>Categoría:</b>`+ ` ` + `<a href="category-info.html">` + product.category + `</a></h6>
              
            </div>
          </div>
        </div><hr>`
  //despliego la información cargada en el html
  document.getElementById("product-info").innerHTML = htmlContentToAppend;


}

/* PRODUCTOS RELACIONADOS */

//se ejecuta y obtiene los indices de posicion de los productos relacionados del objeto product.

//con los indices busca los productos en el array de productos

function showRelatedProd(array) {

  //accedo a la propiedad del objeto product que contiene el array con 

  //las posiciones de los productos relacionados 

  var relProdIndex = product.relatedProducts;


  let htmlContentToAppend = "";

  // recorro el array y obtengo cada índicador de la posicion de los productos relacionados
  for (i = 0; i < relProdIndex.length; i++) {
    var index = relProdIndex[i];

    //accedo al array de productos y accedo a las posiciones obtenidas
    htmlContentToAppend += `
    <div class="col-3">
      <h3 class="text-center">`+ array[index].name + `</h3>
          <a href="product-info.html">
          <img src="` + array[index].imgSrc + `" alt="" class="img-thumbnail"></a>
          <p class="text-justify">`+ array[index].description + `</p>
          <a href="product-info.html">Ver</a>

    </div>
    `
    //muestro el contenido obtenido
    document.getElementById("related-products").innerHTML = htmlContentToAppend;

  }


}

/* COMENTARIOS */

//se ejecuta y muestra los comentarios contenidos en el array de comentarios.


function showComments(array) {

  let htmlContentToAppend = "";
  // recorro el array de comentarios
  for (i = 0; i < array.length; i++) {

    //obtengo cada comentario
    var comments = array[i];
    //obtengo la valoración para obtener la cantidad de estrellas rosadas a mostrar
    valoracion = comments.score;

    //calculo la cantidad de estrellas sin pintar
    /* starBlack = 5 - starPink; */
    //guardo el contenido html de la funcion que dibuja las estrellas
    let drawStars = showStar(valoracion);

    htmlContentToAppend +=
      `
    <div class="row">
      <div class="col">
      
      <h5><b>`+ comments.user + `</b></h5><small class="text-muted">` + comments.dateTime + `</small>
     <div name="stars" class="score float-right">`+ drawStars + `</div>
      <p class="text-justify">` + comments.description + `</p><br>

      </div> 
    
    
    </div><hr>`

    //muestro todo el contenido obtenido
    document.getElementById("comments").innerHTML = htmlContentToAppend;


  }

}

//función que se ejecuta y dibuja las estrellas según la valoración del usuario.
var valoracion = undefined;
function showStar(valoracion) {
  var starPink = valoracion;
  var starBlack = 5 - valoracion;


  var output = document.createElement("span");

  //con la valoración de cada usuario obtenida del array de comentarios
  //agrego "x" estrellas rosadas segun la valoración

  for (; starPink >= 1; starPink--) {
    var star = document.createElement("i");
    star.className = "fa fa-star fa-lg star-pink";
    output.appendChild(star);
  }
  if (starPink == .5) {
    var star = document.createElement("i");
    star.className = "fa fa-star-half-o fa-lg star-pink";
    output.appendChild(star);
  }
  //agrego "y" estrellas negras hasta un total de 5 estrellas.
  for (; starBlack >= 1; starBlack--) {
    var star = document.createElement("i");
    star.className = "fa fa-star-o fa-lg star-black";
    output.appendChild(star);
  }
  // retorno el contenido htm para ser mostrado al ejecutar showComments()
  return output.innerHTML;
}

/* NUEVO COMENTARIO */

//se ejecuta al hacer click y obtiene la valoración dada por el usuario
//defino la variable  a donde guardar la valoración del usuario
var estrella = undefined;
function getScore() {
 
  //obtengo el array con todos los input-type-radio
  var starList = document.getElementsByName("estrellas");
  for (i = 0; i < starList.length; i++) {
    //recorro el array y veo cual radio esta seleccionado
    //si está seleccionado obtengo el valor asignado
    if (starList[i].checked) {
      estrella = starList[i].value;

    }

  }

}

// agrega un nuevo comentario al array de comentarios
function addComment() {
  //creo un nuevo objeto comentario
  var newComment = {};

  // obtengo el nombre de usuario, el comentario, la hora y fecha, y la valoración
  newComment.user = document.getElementById("username").value;
  newComment.description = document.getElementById("comment").value;
  newComment.score = estrella;
  newComment.dateTime = fechaYtime;
  //si el usuario realizó valoracion agrego el objeto comentario al array de comentarios
  //y agrego la valoracion al array de ratings
  if (estrella!=undefined){
    comments.push(newComment);
    ratings.push(parseInt(estrella));
  }else{
    alert("Debe ingresar una valoración");
  }

  //muestro el nuevo array
  showComments(comments);
  //calculo nuevamente la valoracion promedio
  starAverage(ratings);


}

/* OBTENER FECHA Y HORA */
var hoy = new Date();
var fecha = hoy.getFullYear() + `-` + (hoy.getMonth() + 1) + `-` + hoy.getDate();
var time = hoy.getHours() + `:` + hoy.getMinutes() + `:` + hoy.getSeconds();
var fechaYtime = fecha + ` ` + time;

/* GENERAR VALORACION PROMEDIO */
//creo un array vacio para contener todas las valoraciones
ratings = [];

//recorro el array de comentarios y obtengo las valoraciones
function arrayRatings(array) {

  for (i = 0; i < array.length; i++) {
    rating = array[i].score;
    ratings.push(rating);

  }
  //calculo la valoracion promedio
  starAverage(ratings);
}

//se ejecuta y calcula la valoracion promedio
function starAverage(array) {
  var promedio = undefined;
  let htmlContentToAppend = "";

  //defino la variable que contiene la suma de todos los valores del array de valoraciones
  var sumatoria = array.reduce(function (acumulador, siguienteValor) {
    return acumulador + siguienteValor;
  }, 0);
  //calculo el promedio y lo redondeo al entero más cercano
  promedio = Math.round(sumatoria / array.length);

  //muestro el promedio con estrellas
  let drawStars = showStar(promedio);

  htmlContentToAppend = `
    <div class="card text-white text-center bg-secondary mb-3" style="max-width: 18rem;">
      <div class="card-header"><b>Valoración general</b></div>
      <div class="card-body">
        <h5 class="card-title"><span class="in-line block">`+ promedio + `/5</span></h5>
        <p class="card-text">` + drawStars + `</p><small >` + ratings.length + ` ` + `valoraciones</small>
      </div>
    </div>`;
  document.getElementById("valoracion-general").innerHTML = htmlContentToAppend;
}







//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

  //paso la url del JSON que contiene la información de producto
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {

    if (resultObj.status === "ok") {

      productInfo = resultObj.data;
      //Muestro informacion de producto
      showProduct(productInfo);
    }
  });
  //paso la url del JSON que contiene la la lista de productos
  getJSONData(PRODUCTS_URL).then(function (resultObj) {

    if (resultObj.status === "ok") {
      relProduct = resultObj.data;
      //Muestro informacion de productos relacionados
      showRelatedProd(relProduct);


    }
  });
  //paso la url del JSON que contiene los comentarios de los usuarios
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {

    if (resultObj.status === "ok") {
      comments = resultObj.data;
      //Muestro los comentarios
      showComments(comments);
      //obtengo las valoraciones de cada usuario
      arrayRatings(comments);

    }
  });

  document.getElementById("username").value=sessionStorage.getItem("Nombre");
});