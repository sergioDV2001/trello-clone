const btnlogin = document.getElementById("login");
const form = document.getElementById("formulario");
const condicion = /^U-.{0,100}/;

btnlogin.addEventListener("click", function () {
  const usuario = "U-" + form.usuario.value;
  const contraseña = form.contraseña.value;

  for (let i = 0; i < localStorage.length; i++) { /* recorre localstorage */
    if (condicion.test(usuario)) { /* si se cumple la condicion de la expresion regular sigue */
      let usuarioLocal = usuario;
      let contraseñaLocal = localStorage.getItem(usuarioLocal);
      if (contraseñaLocal == contraseña){ 

      location.href="trelloSergio.html"; /* si usuario y contraseña es igual te redirige */

    } else {/* SI NO SON CORRECTOS MUESTRA EL MENSAJE */
      swal("Oops!", "Usuario o contraseña incorrectos", "error");
    }


  }
}
});
