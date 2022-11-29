const btnregistro = document.getElementById("registro");
const formRegistro = document.getElementById("formRegistro");
const condicion =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;

/* CUANDO LE DA A REGISTRARSE COMPRUEBA SI LA CONTRASEÑA ENTRA DENTRO DE LA EXPRESION REGULAR */
btnregistro.addEventListener("click", function () {
  const usuarioRegistro = "U-" + formRegistro.usuarioRegistro.value;
  const contraseñaRegistro = formRegistro.contraRegistro.value;
  console.log(usuarioRegistro);

  if (
    (usuarioRegistro == "" && contraseñaRegistro == "") ||
    contraseñaRegistro == "" ||
    usuarioRegistro == ""
  ) {
    swal("Oops!", "Rellena los campos", "error");
  } else {
    for (let i = 0; i <= localStorage.length; i++) {
      let usuarioLocal = localStorage.key(i);

      if (usuarioLocal == usuarioRegistro) {
        swal("Oops!", "Este usuario ya esta registrado", "error");
        break;
      } else {
        if (condicion.test(contraseñaRegistro)) {
          let timeout = setTimeout(redireccion, 2000);
          localStorage.setItem(usuarioRegistro, contraseñaRegistro);
          swal("Registrado", "Tu usuario ha sido registrado", "success");
          break;
        } else {
          swal(
            "Oops!",
            "Contraseña no valida. Debe tener al menos una letra mayúscula, un número, y algún símbolo (+^-:;...)",
            "error"
          );
        }
      }
    }
  }
});

/* TE REDIRECCIONA AL LOGIN */
function redireccion() {
  location.href = "index.html";
}
