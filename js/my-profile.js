var user_data = {};
const correo = "correo";
const telefono = "telefono";
const celular = "celular";

//tomo el objeto con los datos de perfil, lo pasa a string
//y se guarda en sessionStorage

function saveProfile() {
    var data_to_save = JSON.stringify(user_data);

    sessionStorage.setItem("data_user", data_to_save);
    Swal.fire({
        title: '<strong>Datos guardados </strong>',
        showConfirmButton: false,
        icon: 'success',
        timer: 2000,



    })

}

//Funcion que lee un objeto y muestra cada uno de los items

// en la página y los inputs correspondientes
function showProfileData(obj) {

    if (!obj.nombres == "" || !obj.nombres == undefined) {
        let username = obj.nombres[0] + ' ' + obj.nombres[2];
        let username_full = obj.nombres[0] + ' ' + obj.nombres[1] + ' ' + obj.nombres[2] + ' ' + obj.nombres[3];
        document.getElementById("username_card").innerHTML = username;
        document.getElementById("panel_username").innerHTML = username_full;
        document.getElementById("name_1").value = obj.nombres[0];
        document.getElementById("name_2").value = obj.nombres[1];
        document.getElementById("surname_1").value = obj.nombres[2];
        document.getElementById("surname_2").value = obj.nombres[3];
    } else {
        document.getElementById("username_card").innerHTML = "";
        document.getElementById("panel_username").innerHTML = "";

    }

    if (!obj.edad == "" || !obj.edad == undefined) {
        let edad = obj.edad;
        document.getElementById("panel_edad").innerHTML = edad;
        document.getElementById("edad").value = edad;
        document.getElementById("nacimiento").value = obj.fecha_nacimiento;
    } else {
        document.getElementById("panel_edad").innerHTML = "";

    }
    if (!obj.correo == "" || !obj.correo == undefined) {
        let correo = obj.correo;
        document.getElementById("panel_mail").innerHTML = correo;
        document.getElementById("mail_card").innerHTML = correo;
        document.getElementById("mail_2").value = correo;

    } else {
        document.getElementById("panel_mail").innerHTML = "";

    }

    if (!obj.telefono == "" || !obj.telefono == undefined) {
        let telefono = obj.telefono;
        document.getElementById("panel_phone").innerHTML = telefono;
        document.getElementById("phone").value = telefono;


    } else {
        document.getElementById("panel_phone").innerHTML = "";

    }

    if (!obj.celular == "" || !obj.celular == undefined) {
        let celular = obj.celular;
        document.getElementById("panel_mobile").innerHTML = celular;
        document.getElementById("mobile").value = celular;

    } else {
        document.getElementById("panel_mobile").innerHTML = "";

    }
    if (!obj.direccion == "" || !obj.direccion == undefined) {
        let direccion = obj.direccion[0];
        let localizacion = obj.direccion[1] + ', ' + obj.direccion[2];
        document.getElementById("panel_localization").innerHTML = direccion;
        document.getElementById("localization_card").innerHTML = localizacion;
        document.getElementById("direction").value = direccion;
        document.getElementById("city").value = obj.direccion[1];
        document.getElementById("country").value = obj.direccion[2];

    } else {
        document.getElementById("panel_localization").innerHTML = "";
        document.getElementById("localization_card").innerHTML = "";

    }

    if (!obj.imagen == "" || !obj.imagen == undefined) {
        let imagen = obj.imagen;


        document.getElementById("profile_img").src = imagen;

    }
}


//Función que toma la url de la imagen si se completa
//el input url, y lo agrega como src de la imagen
function getImage() {
    var url_img = document.getElementById("img_profile").value;
    if (!url_img == "") {
        document.getElementById("profile_img").src = document.getElementById("img_profile").value;
        $('#user_img').modal('hide');
    } else { $('#user_img').modal('hide'); }
}

//funcion que toma la imagen subida como file 
//y   la agrega como base64 en la etiqueta imagen
function readFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {

            document.getElementById("profile_img").src = e.target.result;
            console.log(e.target.result);


        }

        reader.readAsDataURL(input.files[0]);
    }
}

// tomo el nombre del archivo imagen subido
$(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});
//detecta cuando se cargó un archivo en el boton o zona de subir archivos
//llama a la funcion que agrega el src a la etiqueta imagen
var fileUpload = document.getElementById('file-upload');
fileUpload.onchange = function (e) {
    readFile(e.srcElement);
}
//obtengo los nombres agregados por el usuario y los agrego 
//al objeto user_data
function getNames() {
    var nombre_fields = document.getElementsByName("profile_names");
    let nombres_array = [];
    for (nombre of nombre_fields) {
        nombres_array.push(nombre.value);
    }
    user_data.nombres = nombres_array;

    /* $('#user_names').modal('hide'); */
    showProfileData(user_data);
}
//obtengo los datos de nacimiento y edad agregados por el usuario y los agrego 
//al objeto user_data
function getEdad() {
    var edad = document.getElementById("edad").value;
    var birth_date = document.getElementById("nacimiento").value;

    user_data.edad = edad;
    user_data.fecha_nacimiento = birth_date;
    showProfileData(user_data);

}
//obtengo los valores agregados por el usuario en los inputs
//que se le dan como parámetro a la funcion
//y los guardo en el objeto user_data con la clave 
//suministrada
function getInputs(id_data, propiedad) {
    var dato = document.getElementById(id_data).value;


    Object.defineProperty(user_data, propiedad, {
        value: dato,
        writable: true,
        enumerable: true,
        configurable: true
    });
    showProfileData(user_data);
    /* $('#'+id_modal).modal('hide'); */
}

//obtengo los datos de localización agregados por el usuario y los agrego 
//al objeto user_data
function getLocalization() {
    var localization_fields = document.getElementsByName("profile_localization");
    var localization = [];
    for (local_data of localization_fields) {
        localization.push(local_data.value);
    }
    user_data.direccion = localization;
    showProfileData(user_data);

}



//despliega la lista de paises 
function choose_country(countries) {
    htmlContentToAppend = `<option selected value="0">Elige un país</option>`;
    for (country of countries) {
        htmlContentToAppend += `<option value="` + country.name + `">` + country.name + `</option>`;
    }

    document.getElementById("country").innerHTML = htmlContentToAppend;
}

//escucha el evento click del boton confirmar 
//en el modal de nombres y obtiene datos
document.getElementById("btn_names").addEventListener("click", function (e) {
    e.preventDefault();
    //chekeo los campos
    //agrego los nombres al objeto
    if (formCheck("profile_names") == true) {
        getNames();
        $('#user_names').modal('hide');
    }


});
//escucha el evento click del boton confirmar 
//en el modal de edad y obtiene datos
document.getElementById("btn_edad").addEventListener("click", function (e) {
    e.preventDefault();
    //chekeo los campos
    //agrego los nombres al objeto
    if (formCheck("profile_edad") == true) {
        getEdad();
        $('#user_edad').modal('hide');
    }

});
//escucha el evento click del boton confirmar 
//en el modal de correo y obtiene datos
document.getElementById("btn_correo").addEventListener("click", function (e) {
    e.preventDefault();
    //chekeo los campos
    //agrego los nombres al objeto

    if (formCheck("profile_email") == true) {
        getInputs("mail_2", correo);
        $('#user_mail').modal('hide');
    }
});
//escucha el evento click del boton confirmar 
//en el modal de telefono y obtiene datos
document.getElementById("btn_telefono").addEventListener("click", function (e) {
    e.preventDefault();
    //chekeo los campos
    //agrego los nombres al objeto
    if (formCheck("profile_phone") == true) {
        getInputs("phone", telefono);
        $('#user_phone').modal('hide');
    }
});


//escucha el evento click del boton confirmar 
//en el modal de celular y obtiene datos
document.getElementById("btn_celular").addEventListener("click", function (e) {
    e.preventDefault();
    //chekeo los campos
    //agrego los nombres al objeto
    if (formCheck("profile_mobile") == true) {
        getInputs("mobile", celular);
        $('#user_mobile').modal('hide');
    }

});
//escucha el evento click del boton confirmar 
//en el modal de localizacion y obtiene datos
document.getElementById("btn_localization").addEventListener("click", function (e) {
    e.preventDefault();
    //chekeo los campos
    //agrego los nombres al objeto
    if (formCheck("profile_localization") == true && selectValidation("country") == true) {
        getLocalization();
        $('#user_localization').modal('hide');
    }

});

//escucha el evento click del boton guardar perfil 

document.getElementById("btn_save_profile").addEventListener("click", function (e) {
    e.preventDefault();
    //guardo el objeto con datos de ususario
    //en sessionstorage
    saveProfile();
});


document.getElementById("btn_img").addEventListener("click", function (e) {
    e.preventDefault();
    //agrego los nombres al objeto
    getImage();
});

// obtengo referencia a la etiqueta imagen
var picture = document.getElementById("profile_img");
picture.crossOrigin = "anonymous";

// cuando se carga la imagen, la convierto a base64
//se agrega al objeto user_data
picture.addEventListener("load", function () {
    var imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d");

    
    imgCanvas.width = picture.width;
    imgCanvas.height = picture.height;

   
    imgContext.drawImage(picture, 0, 0, picture.width, picture.height);

    
    var imgAsDataURL = imgCanvas.toDataURL("image/png");

    user_data.imagen = imgAsDataURL;
});


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    //obtengo la lista de paises
    getJSONData(COUNTRY_SELECT).then(function (resultObj) {

        if (resultObj.status === "ok") {
            countries = resultObj.data;
            //llamo a la funcion que muestra los paises en el desplegable
            choose_country(countries);


        }
    })
    //chekeo si existe información de ususario en sessionstorage
    if (sessionStorage.getItem("data_user") != null) {
        //convierto los datos a objeto
        //llamo a la funcion mostrar datos
        objeto = JSON.parse(sessionStorage.getItem("data_user"));
        showProfileData(objeto);

    } else {
        //si no existen datos de imagen de perfil

        //muestro una  por defecto
        document.getElementById("profile_img").src = "img/avatar7.png";
    }

});
