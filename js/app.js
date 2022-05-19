const loginForm = document.querySelector("#login");
const loginTitle = document.querySelector("#loginTitle");
const loginData = {
  account: "",
  password: "",
};

/*  Escuchar el evento del formulario para que cuando el usuario le de click, busque si hay un usuario
que coincida con los parámetros ingresados */

loginForm.addEventListener("submit", (e) => {
  //Prevenir que se recargue la página
  e.preventDefault();

  //Hay que asignar los datos que se ingresan en el form al objeto que declaramos
  loginData.account = accountNumber.value;
  loginData.password = password.value;

  // Validamos que antes de entrar a la función que filtra los datos no vengan vacíos
  if (loginData.account && loginData.password) {
    // Llamar a función que busca si hay coincidencias de los datos guardados enel objeto loginData en la base de datos
    findUser();
  } else {
    screenAlert("Tienes que ingresar un usuario y contraseña");
  }

  //Limpiar los campos del form
  loginForm.reset();
});

// Crear un alerta para que diga que no se han ingresado datos
function screenAlert(message) {
  //Asignar contenido HTML
  const scalert = document.createElement("div");
  scalert.setAttribute("id", "closeAlert");
  scalert.classList.add(
    "alert",
    "alert-primary",
    "d-flex",
    "align-items-center",
    "mt-3"
  );
  scalert.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg>
<div class="alert__font">
  ${message}
  <button type="button" class="close btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="closeButtton()"></button>
</div>

`;

  //Mostrar los datos
  loginTitle.appendChild(scalert);
}

// Cerrar alert
function closeButtton() {
  // Asignar una propiedad a un elemento que estamos seleccionando (propiedad, valor, prioridad)
  let element = document.getElementById("closeAlert");
  element.remove();
}

function findUser() {
  // Hay que almacenar la respuesta que vamos a obtener al ir filtrando los datos
  const isUserOnDb = accounts.filter(filterAccount).filter(filterPassword);

  // Validar que los datos se hayan
  if (isUserOnDb.length) {
    // Asignar a la variable user el resultado de almacenar el objeto isUserOnDb on local Storage
    const user = window.localStorage.setItem(
      "isUserOnDb",
      JSON.stringify(isUserOnDb)
    );
    screenAlert("¡Bienvanido a tu cuenta!");
    // Enviar el usuuario a una nueva ventana en la que pueda consultar sus operaciones
    window.location = "home.html";
  } else {
    screenAlert(
      "No existe un usario en la base de datos con los datos ingresados. Por favor comprueba la cuenta y contraseña."
    );
  }
}

/* 
 Esta función recibe los datos de la cuenta, deestructura el objeto userData para obtener la varible account y
verificar si la variable account obtenida de loginData es igual a la de los datos de la base. */
function filterAccount(userData) {
  const { account } = loginData;
  if (account) {
    return userData.accountNumber == account;
  }
  return userData;
}

/* 
 Esta función recibe los datos de la cuenta, deestructura el objeto userData para obtener la varible password y
verificar si la variable password obtenida de loginData es igual a la de los datos de la base. */
function filterPassword(userData) {
  const { password } = loginData;
  if (password) {
    return userData.password == password;
  }
  return userData;
}
