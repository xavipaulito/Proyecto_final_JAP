

var form=document.getElementById("form");
var user_none=document.getElementById("error-1");
var password_none=document.getElementById("error-2");

form.addEventListener("submit", validate);
 
//valida que no estèn los campos vacìos y despliega aviso en el html si lo estàn
//redirige a mainpage si se ingresa usuario y contraseña
function validate(evt){
    evt.preventDefault();
    var user= document.getElementById("user");
    var password= document.getElementById("password");

    if(user.value.trim() == "") {
        user_none.innerHTML=`<span>Se necesita tu usuario</span>`;
        user.focus();
        
        
    }else if(password.value.trim() == ""){
        user_none.innerHTML=``;
        password_none.innerHTML=`<span>Se necesita una contraseña</span>`;
        password.focus();

    }else{
        password_none.innerHTML=``;
        var username=user.value
        sessionStorage.setItem("Nombre", username);
        
        window.location.href="mainpage.html";
        
        
    }
}


//Función que escribe el usuario en la barra de navegación
//Se ejecuta una vez cargada la pagina con los datos almacenados en sessionStorage

function showUserName(){
    var bienvenida="";
    var username=sessionStorage.getItem("Nombre");
    bienvenida=`<h6 class="mb-1" style="color:#FFFFFF;">Bienvenido/a: `+ `<b>`+username+`</b></h6>`
    document.getElementById("user-welcome").innerHTML=bienvenida;
    
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    user.focus();

});

