const ORDER_DESC_BY_COST = "max_min";
const ORDER_ASC_BY_COST = "min_max";
const ORDER_BY_SOLDCOUNT = "max_sold_to_min_sold";
var minCost = undefined;
var maxCost = undefined;
var productsArray = [];

var userInput = document.getElementById("inputSearch");

//Función que lee lo ingresado por el ususario en el campo de busqueda y busca en el array de productos (por nombre y descripción), 
//creando un nuevo array con los resultados de la busqueda.
function search(array) {
    let productSearch = userInput.value.toLowerCase();
    let searchArray = [];

    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        let productName = product.name.toLowerCase();
        let productDesc = product.description.toLowerCase();
        //Comprueba si lo ingresado se encuentra en el array original y lo agrega al nuevo array, mostrandolo en pantalla.
        if (productName.indexOf(productSearch) !== -1 || productDesc.indexOf(productSearch) !== -1) {

            searchArray.push(product);
            showProductsList(searchArray);



        } else if (searchArray.length === 0) {
            //si el array de productos filtrados es vacío muestro mensaje
            document.getElementById("product-container").innerHTML = `<p class="lead text-center">Producto no encontrado</p>`;
        }
    }
}





//Funcion que recibe un array y un criterio, y lo ordena segun el mismo

function sortProductBy(criteria, productsArray) {

    if (criteria === ORDER_DESC_BY_COST) {
        productsArray.sort((a, b) => b.cost - a.cost);
    }
    else if (criteria === ORDER_ASC_BY_COST) {
        productsArray.sort((a, b) => a.cost - b.cost);
    }
    else if (criteria === ORDER_BY_SOLDCOUNT) {
        productsArray.sort((a, b) => b.soldCount - a.soldCount);
    }
    showProductsList(productsArray);
}

//funcion que lee el json con la lista de productos y la muestra en el html
function showProductsList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {

            htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
        
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name + "    " + `<b>` + product.currency + `</b>` + ": " + `<b>` + product.cost + `</b></h4>
                        <small class="text-muted">`+ product.soldCount + " Vendidos" + `</small>
                        
                    </div>
                    <p>` + product.description + `</p>    
                </div>
            </div>
       
        </a>
        `
            document.getElementById("product-container").innerHTML = htmlContentToAppend;
        } else if (htmlContentToAppend === "") {
            //si htmlContentToAppend es vacío muestro mensaje 
            document.getElementById("product-container").innerHTML = `<p class=" lead text-center">No existen productos con el rango de precios seleccionado</p>`;
        }
    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {


    getJSONData(PRODUCTS_URL).then(function (resultObj) {

        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showProductsList(productsArray);
        }
    });
    //escucha el evento click de ordenar por cantidad de vendidos y pasa el criterio a la funcion sort.
    document.getElementById("sortByCount").addEventListener("click", function () {
        sortProductBy(ORDER_BY_SOLDCOUNT, productsArray);

    });
    //escucha el evento click de ordenar por precio de forma ascendente y pasa el criterio a la funcion sort.
    document.getElementById("sortAsc").addEventListener("click", function () {
        sortProductBy(ORDER_ASC_BY_COST, productsArray);

    });
    //escucha el evento click de ordenar por precio de forma descendente y pasa el criterio a la funcion sort.
    document.getElementById("sortDesc").addEventListener("click", function () {
        sortProductBy(ORDER_DESC_BY_COST, productsArray);

    });

    //obtengo los valores minimo y maximo de precio colocados por el usuario y muestra el array filtrado
    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if (minCost != undefined && minCost != "" && parseInt(minCost) >= 0) {
            minCost = parseInt(minCost);
        } else {
            minCost = undefined;
        }

        if (maxCost != undefined && maxCost != "" && parseInt(maxCost) >= 0) {
            maxCost = parseInt(maxCost);
        } else {
            maxCost = undefined;
        }

        showProductsList(productsArray);
    });

    //limpia los campos de los filtros y muestra la lista
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;
        showProductsList(productsArray);
    });

    document.getElementById("inputSearch").addEventListener("keyup", function () {
        search(productsArray);
    });


});