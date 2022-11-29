/* VARIABLES */
const addForm = document.getElementById("addForm");
const enviar = document.getElementById("enviar");
const form = document.getElementById("formulario");
const fondoSelect = document.getElementById("cambiarFondo");
const textoF = form.nombreTarjeta;
const condicion = /^U-.{0,100}/;

/* ESCONDO UN FORM CON HIDDEN */
document.getElementById("formulario").style.visibility = "hidden";
document.getElementById("enviar").style.visibility = "hidden";

/* HAGO QUE APAREZCA EL FORM CUANDO PULSA EL BOTON */
addForm.addEventListener("click", function () {
  document.getElementById("formulario").style.visibility = "visible";
  document.getElementById("addForm").style.visibility = "hidden";
  document.getElementById("enviar").style.visibility = "visible";
});


/* CUANDO LE DE A ENVIAR COMPRUEBA LO NECESARIO Y GUARDA LA TARJETA CON VALORES VACIOS */
enviar.addEventListener("click", function () {
  var arrayTarjetas = []; /* ARRAY VACIO PARA GUARDAR */
  var error = false;
  var contador = localStorage.length;

  if (textoF.value == "") { /* SI NO INTRODUCE NADA SE LLAMARA TARJETA */
    textoF.value = "Tarjeta";
  }

  for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);

    if (textoF.value == clave) { /* SI YA EXISTE ESA TARJETA SALE ERROR */
      swal("Oops!", "Esa tarjeta ya existe", "error");
      error = true;
      break;
    }
    if (textoF.value == "Tarjeta") { /* SI YA EXISTE OTRA QUE SE LLAMA TARJETA LE PONE UN NUMERO ALEATORIO */
      textoF.value = "Tarjeta" + contador;
      break;
    }
  }

  if (error == false) { /* SI NO DA ERROR LO GUARDA */
    localStorage.setItem(textoF.value, JSON.stringify(arrayTarjetas));

    document.getElementById("formulario").style.visibility = "hidden";
    document.getElementById("enviar").style.visibility = "hidden";
    document.getElementById("addForm").style.visibility = "visible";
    añadirTarjeta(textoF.value);
    textoF.value = "";
  }
});

function añadirTarjeta(nombreT) {/* PINTO LA TARJETA GRANDE DENTRO DEL CONTENEDOR */
  let contenedor = document.getElementById("contenedor");
  let tarjetadiv = document.createElement("div");
  tarjetadiv.id = nombreT;
  tarjetadiv.className = "tarjetadiv";
  contenedor.appendChild(tarjetadiv);

  let tarjetaActual = document.getElementById(nombreT);
  let subtit = document.createElement("h2");
  subtit.id = "subtit";
  subtit.className = "subtit";
  subtit.textContent = nombreT;
  tarjetaActual.appendChild(subtit);

  let botonadd = document.createElement("button");
  botonadd.id = "addPeque" + nombreT;
  botonadd.className = "botonadd";
  botonadd.textContent = "+Add new";
  botonadd.onclick = addPeque;
  tarjetaActual.appendChild(botonadd);
}

/* CUANDO PULSA EL BOTON PARA AÑADIR UNA TARJETA PEQUEÑA HACE LA FUNCION Y SACA UN TEXTAREA PARA INTRODUCIR EL VALOR*/
function addPeque() {
  let botonPulsado = event.target;
  botonPulsado.disabled = true;
  let padrebtn = document.getElementById(botonPulsado.id).parentNode;
  var tarjetaPeque = document.createElement("textarea");
  tarjetaPeque.className = "textarea";
  tarjetaPeque.id = "textarea";
  document.getElementById(padrebtn.id).appendChild(tarjetaPeque);
  tarjetaPeque.focus();

  var botonTxt = document.createElement("button");
  botonTxt.type = "submit";
  botonTxt.id = "botonTextarea";
  botonTxt.textContent = "Añadir";
  botonTxt.className = "enviarTextarea";
  botonTxt.onclick = añadirTextarea;
  document.getElementById(padrebtn.id).appendChild(botonTxt);
}

/* RECOGE EL TEXTAREA LO GUARDA Y RECARGA LA PAGINA */
function añadirTextarea() {
  let texto = document.getElementById("textarea");
  let botonTextarea = document.getElementById("botonTextarea");
  let padre = document.getElementById("textarea").parentNode;
  let arrayTarjeta = localStorage.getItem(padre.id);
  arrayTarjeta = JSON.parse(arrayTarjeta);
  arrayTarjeta.push(texto.value);
  localStorage.setItem(padre.id, JSON.stringify(arrayTarjeta));
  botonTextarea.remove();
  texto.remove();
  location.reload();
}

/* FUNCION QUE BORRA LAS TARJETAS PEQUEÑAS */
function borrarMini() {
  let botonPulsado = event.target;
  let idPulsado = botonPulsado.id;
  let idPadre = botonPulsado.parentNode.id;
  let arrayTarjeta = localStorage.getItem(idPadre);
  arrayTarjeta = JSON.parse(arrayTarjeta);

  swal({
    title: "¿Estas seguro?",
    text: "¿Quieres borrar la minitarjeta?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {

      localStorage.removeItem(idPadre);
      arrayTarjeta.splice(idPulsado, 1);
      localStorage.setItem(idPadre, JSON.stringify(arrayTarjeta));
      location.reload();
    }
  });
}

/* BORRA LAS TARJETAS GRANDES */
function borrarTarjeta() {
  let pulsado = event.target;
  let idPadre = pulsado.parentNode.id;

  swal({
    title: "¿Estas seguro?",
    text: "¿Quieres borrar la tarjeta entera?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {

      localStorage.removeItem(idPadre);
      location.reload();
      
    }
  });
}

/* CAMBIA EL FONDO DE PANTALLA */
fondoSelect.addEventListener("click", function () {

  let select = document.getElementById("fondoSelect").value;
  console.log(select);
  document.body.style.backgroundImage = "url("+select+")";
  localStorage.setItem("U-fondopantalla", select);


});

/* CUANDO SE CARGA LA PAGINA PINTA TODO LAS TARJETAS CON SUS RESPECTIVAS TARJETAS DENTRO Y ELEMENTOS */
window.onload = function () {

  let fondoPantalla = localStorage.getItem("U-fondopantalla");
  document.body.style.backgroundImage = "url("+fondoPantalla+")";

  for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);

    if (!condicion.test(clave)) {
      let arrayTarjeta = localStorage.getItem(clave);
      arrayTarjeta = JSON.parse(arrayTarjeta);

      let tarjetaGrande = document.createElement("div");
      tarjetaGrande.id = clave;
      tarjetaGrande.className = "tarjetadiv";
      contenedor.appendChild(tarjetaGrande);

      let subtit = document.createElement("h2");
      subtit.id = "subtit";
      subtit.className = "subtit";
      subtit.onclick = borrarTarjeta;
      subtit.textContent = clave;
      tarjetaGrande.appendChild(subtit);

      let botonadd = document.createElement("button");
      botonadd.id = "addPeque" + clave;
      botonadd.className = "botonadd";
      botonadd.textContent = "+Add new";
      botonadd.onclick = addPeque;
      tarjetaGrande.appendChild(botonadd);

      for (let x = 0; x < arrayTarjeta.length; x++) {
        var divtxt = document.createElement("div");
        divtxt.id = x;
        divtxt.textContent = arrayTarjeta[x];
        divtxt.className = "tarjetaPeque";
        divtxt.onclick = borrarMini;
        document.getElementById(clave).appendChild(divtxt);
      }
    }
  }
};