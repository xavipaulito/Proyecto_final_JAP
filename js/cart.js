var products = [];
var items = 0;
var subtotal = undefined;
var cantProducts = 0;
var total = undefined;
var envio_cost = undefined;

//funcion que toma el array con productos precargados y los muestra.
function showCart(products) {

    var i = 0;
    cantProducts = products.length;


    htmlContentToAppend = "";
    if (cantProducts > 0) {

        products.forEach((product) => {
            i = i + 1;
            index = "prod_" + i;
            index_subtot = "subtot_" + i;
            names = product.name;

            htmlContentToAppend += `
    <div class="row text-center">
        <div class="col-2">
            <img src="` + product.src + `" alt="" class="img-thumbnail  w-100 ">
        </div>
        <div class="col-2">
            <div class="d-flex w-100 justify-content-between text-center">
                <h6 class="mb-1">`+ product.name + `</h6>
                
            </div>
        </div>
        <div class="col-2">
            <p>`+ product.unitCost + ` ` + product.currency + `</p>
           
            </div>
        <div class="col-2">
        
        <input type="number" step="1" max="99" min="1" value="`+ product.count + `" title="Qty" class="qty" size="4" onchange="subtotalValue();" id="` + index + `" item_price="` + product.unitCost + `" item_currency="` + product.currency + `">

        </div>
        <div class="col-1">
        
        <button type="button" class="btn btn-outline-danger btn-xs" onclick="delete_Item(\'' + names + '\');"><i class="fa fa-trash" aria-hidden="true"></i></button>

        </div>

        <div class="col-3">
       

        <div id="`+ index_subtot + `"></div>
        

        </div>

    </div><hr>

`;



        });
        document.getElementById("product-cart").innerHTML = htmlContentToAppend;


    } else {
        htmlContentToAppend = `<div class=" alert-danger " role="alert">
    Su carrito está vacío!
  </div>`;
        document.getElementById("product-cart").innerHTML = htmlContentToAppend;

    }
    subtotalValue();
}

//funcion que calcula el subtotal de cada item (precio_unitario*cantidad)
function subtotalItem() {

    subtotal_item = 0;
    for (i = 1; i <= cantProducts; i++) {

        itemID = document.getElementById("prod_" + i);

        itemCurrency = itemID.getAttribute("item_currency");
        if (typeof itemID === 'undefined' || itemID === null) {
            alert("No items " + "qnt_" + i);
        } else if (itemCurrency == "USD") {
            subtotal_item = parseInt(itemID.value) * parseInt(itemID.getAttribute("item_price"));
            document.getElementById("subtot_" + i).innerHTML = subtotal_item.toFixed(2) + " USD";
        } else {
            subtotal_item = parseInt(itemID.value) * parseFloat(itemID.getAttribute("item_price") / 40);
            document.getElementById("subtot_" + i).innerHTML = subtotal_item.toFixed(2) + " USD";
        }

    }



}
//funcion que calcula el subtotal de la compra
function subtotalValue() {
    subtotal = 0;
    subtotal_item = 0;
    for (i = 1; i <= cantProducts; i++) {

        itemID = document.getElementById("prod_" + i);

        itemCurrency = itemID.getAttribute("item_currency");
        if (typeof itemID === 'undefined' || itemID === null) {
            alert("No items - " + "qnt_" + i);
        } else if (itemCurrency == "USD") {
            subtotal = subtotal + parseInt(itemID.value) * parseInt(itemID.getAttribute("item_price"));
        } else {
            subtotal = subtotal + parseInt(itemID.value) * parseFloat(itemID.getAttribute("item_price") / 40);

        }

    }
    document.getElementById("subtotal_value").innerHTML = subtotal.toFixed(2) + " USD";
    totalValue();
    subtotalItem();
    getItemsCount();
}

//funcion que calcula el total de la compra sumando el costo de envio.
function totalValue() {

    envio_value = 0;
    //obtengo todos los tipos de envio, y veo cual está seleccionado, para determinar el costo de envio.
    envio_type = document.getElementsByName("envio");
    for (envio of envio_type) {
        if (envio.checked === true) {
            //calculo el envio como % del subtotal
            envio_value = subtotal * envio.value;
            //lo sumo al subtotal
            total = subtotal + envio_value;
            //veo que tipo de envio fue seleccionado para mostrarlo junto al costo de envio.
            switch (envio.value) {
                case '0.05':
                    document.getElementById("envio_type").innerHTML = '<span id="" class="badge badge-success py-1">Estandar</span>';
                    break;
                case '0.07':
                    document.getElementById("envio_type").innerHTML = '<span id="" class="badge badge-success py-1">Express</span>';
                    break;
                case '0.15':
                    document.getElementById("envio_type").innerHTML = '<span id="" class="badge badge-success py-1">Premium</span>';
                    break;

            }
        }
    }


    //muestro el costo de envio y el costo total
    document.getElementById("envio_value").innerHTML = envio_value.toFixed(2) + " USD";
    document.getElementById("total_value").innerHTML = `<b>` + total.toFixed(2) + ` USD</b>`;

}

//funcion que elimina todos los items del carrito
function delete_Cart(products) {
    products = [];
    subtotal = 0;
    total = 0;
    envio_value = 0;
    showCart(products);

}
//funcion que elimina el item seleccionado del carrito
/*function delete_Item(todelete){
    let indice = products.findIndex(el=> el.name ==todelete);
    alert(indice);
    products.splice(indice,1);
    

}*/

//Funcion que actualiza el numero de items a medida que el usuario cambia la cantidad
//se guardan el sessionStorage para mostrarlos el las demás páginas
function getItemsCount() {

    var cant_items = 0;
    for (i = 1; i <= cantProducts; i++) {

        itemID = document.getElementById("prod_" + i);


        if (typeof itemID === 'undefined' || itemID === null) {
            alert("No item - " + "qnt_" + i);
        } else {
            cant_items = cant_items + parseInt(itemID.value);


        }
        document.getElementById("subtotal_value").innerHTML = subtotal.toFixed(2) + " USD";


    }
    sessionStorage.setItem("cant_items", cant_items);
    showItemsCount();
}
//función que obtiene los datos de cantidad de items del carrito y los muestra.
function showItemsCount() {
    items = sessionStorage.getItem("cant_items");

    if (items === undefined || items === null) {
        items = 3;
        //intento de que si aun no hay nada el sessionstorage lea el JSON de productos del carrito
        /*for(i=0; i<array.length; i++) {
            items=items+array[i].count;
            return items; 
           
        }*/

        document.getElementById("badge_count").innerHTML = items;

    } else {
        document.getElementById("badge_count").innerHTML = items;
        document.getElementById("badge_count1").innerHTML = items;

    }


}

//funcion que lee un JSON con lista de paises y la muestra como desplegable
function choose_country(countries) {
    htmlContentToAppend = "";
    for (country of countries) {
        htmlContentToAppend += `<option value="` + country.name + `">` + country.name + `</option>`;
    }

    document.getElementById("country").innerHTML = htmlContentToAppend;
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_BUY_TWO_URL).then(function (resultObj) {

        if (resultObj.status === "ok") {
            cartProducts = resultObj.data;
            //obtengo el array de articulos
            products = cartProducts.articles;
            //Muestro los productos del carrito
            showCart(products);
        }
    });
    //obtengo la lista de paises
    getJSONData(COUNTRY_SELECT).then(function (resultObj) {

        if (resultObj.status === "ok") {
            countries = resultObj.data;
            //llamo a la funcion que muestra los paises en el desplegable
            choose_country(countries);


        }
    });
});