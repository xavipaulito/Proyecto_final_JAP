
const envio_check = "envio";
const credit_card = "credit-card";
const bank_number = "bank_number";
var card_ok = false;
var bank_ok = false;
const country_id = "country";
const bank_id = "banks";
const datos_envio = "datos_envio";


// CONFIRMACIÓN FINAL DE COMPRA
function buy_confirm() {
    let cantidad = sessionStorage.getItem("cant_items");
    let country_valid = selectValidation(country_id);
    let envio_tipo=radioChecked(envio_check);
    let envio_datos=formCheck(datos_envio);
    
    //Chequeo si el carrito está vacio
    if (cantidad == 0) {
        //lanzo alerta y detengo la función
        Swal.fire({
            title: '<strong>Agrega productos a tu carrito primero! </strong>',
           
            icon: 'error',
            showCancelButton: true,
            showConfirmButton: false,

            html:
                '<a href="products.html" class="btn btn-success btn-lg">Ver productos</a>',

        })
        return false;

    //chequeo si no se haya seleccionado algún método de envio y detengo la funcion
    }  if (envio_tipo==false) {
        window.location.href = '#metodo_envio';
        return false;
        
    //chequeo si los campos de datos de envío estpan vacios 
    } if (!envio_datos && !country_valid) {
        window.location.href = '#envio';
    }
    //chequeo si al menos se ha completado los campos de un método de pago
    if (bank_ok == false && card_ok == false) {
        htmlContenttoAppend = '<p style="color:red">Seleccione un método de pago</p>'
        window.location.href = '#pago_alert';
        document.getElementById("pago_alert").innerHTML = htmlContenttoAppend;


    //si no se cumple lo anterior entonces finalizo la compra y redirijo
    //a la página de categorias de producto
    } else {
        var username = sessionStorage.getItem("Nombre");
        document.getElementById("pago_alert").innerHTML = "";
        Swal.fire({
            title: '<strong>Compra exitosa! </strong>',
             icon: 'success',
            timer: 3000,
            html:'<strong>Gracias'+' '+username+'</strong>'


        })
        
        setTimeout(function () {
            window.location.href = 'categories.html'
        }, 3000);


    }

}


//funcion que evalua si los campos del método de pago
//banco están vacíos
function bank_Ok() {
    //chequeo que se seleccione un banco
    b_select = selectValidation(bank_id);
    //chequeo que se ingrese un numero de cuenta
    b_number = formCheck(bank_number);

    //si los campos estan llenos, cambio la variable bank_ok a true
    if (b_select && b_number) {

        bank_ok = true;
        Swal.fire({
            title: '<strong>Datos guardados </strong>',
            showConfirmButton: false,
            icon: 'success',
            timer: 2000,



        })
        //cierro el modal
        $('#pay_form').modal('hide');
        document.getElementById("pago_alert").innerHTML = "";
    }
}


//funcion que evalua si los campos del método de pago
//credito están vacíos
function credit_Ok() {
    //chequeo los campos
    credit_inputs = formCheck(credit_card);
    //si no están vacíos cambio card_ok a true
    if (credit_inputs) {
        
        card_ok = true;
        Swal.fire({
            title: '<strong>Datos guardados </strong>',
            showConfirmButton: false,
            icon: 'success',
            timer: 2000,



        })
        //cierro el modal
        $('#pay_form').modal('hide');
        //elimino alerta de pago no seleccionado
        document.getElementById("pago_alert").innerHTML = "";
    }
}

//funcion que valida los campos de un formulario, a partir de
//pasarle el atributo name de los campos a evaluar
function formCheck(input_name) {
    let campo_vacio = undefined;
    let campo_lleno=undefined;
    forms = document.getElementsByName(input_name);
    for (form of forms) {
        if (!form.checkValidity()) {


            form.classList.add("is-invalid");
            form.classList.remove("is-valid");
            campo_vacio = false;

        } else {

            form.classList.add("is-valid");
            form.classList.remove("is-invalid");
            campo_lleno = true;
        }


    }
    if (campo_lleno == true && campo_vacio==undefined) {
        return true;
    } else {
        return false;
    }
}
//funcion que chequea que un radiobutton esté marcado, a partir de
//pasarle el atributo name de los campos a evaluar
function radioChecked(radio_name) {
    radio_btn = document.querySelector('input[name=' + radio_name + ']:checked');
    radios = document.getElementsByName(radio_name);

    if (!radio_btn) {
        for (radio of radios) {
            radio.classList.add("is-invalid");
            radio.classList.remove("is-valid");
            
        }return false;
    } else {
        for (radio of radios) {
            radio.classList.remove("is-invalid");
            radio_btn.classList.add("is-valid");
            
        } return true;



    }

}

//funcion que luego de marcados como inválidos los radiobuttons
//al marcar una opcion elimina la classe is-invalid
function removeValidation(radio_name) {
    radios = document.getElementsByName(radio_name);
    for (radio of radios) { radio.classList.remove("is-invalid"); }

}

//funcion que valida los elementos select, usando como
//parámetro el id del select que quiero chequear
function selectValidation(select_id) {
    country = document.getElementById(select_id);

    if (country.value == 0) {
        country.classList.add("is-invalid");
        country.classList.remove("is-valid");
        return false;
    } else {
        country.classList.add("is-valid");
        country.classList.remove("is-invalid");

    } return true;
}

//deshabilita los campos del método de pago
//que no fue confirmado
function disablePayMethod(pay) {
    paymethod = document.getElementsByName(pay);

    for (input of paymethod) {
        input.disabled = true;
    }
}

//escuho el evento click del boton confirmar del método pago credito
document.getElementById("credit_confirm").addEventListener("click", function (e) {
    e.preventDefault();
    //deshabilito los campos del metodo banco
    disablePayMethod(bank_number)
    //compruebo todos los campos
    credit_Ok();

});
//escuho el evento click del boton confirmar del método pago banco
document.getElementById("bank_confirm").addEventListener("click", function (e) {
    e.preventDefault();
    //deshabilito los campos del metodo credito
    disablePayMethod(credit_card)
    //compruebo todos los campos
    bank_Ok();


});

