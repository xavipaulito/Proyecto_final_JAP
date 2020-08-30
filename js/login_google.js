function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    
    sessionStorage.setItem("Nombre", profile.getName());
    sessionStorage.setItem("userImage", profile.getImageUrl());
    
    
    window.location.href="mainpage.html";
    
}

function signOut() {
        
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    alert( "Cierre de sesión exitoso. Gracias por visitarnos!!!");
    sessionStorage.clear();
    window.location.href="index.html";
  });
}

function onLoad() {
    gapi.load('auth2', function() {
      gapi.auth2.init();
    });
  }