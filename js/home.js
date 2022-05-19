const operationsCard = document.querySelector("#operationImage");
const checkBalanceBtn = document.querySelector("#checkBalanceBtn");
const addMoneyBtn = document.getElementById("addMoneyBtn");
const takeMoneyBtn = document.getElementById("takeMoneyBtn");
const addMoneyForm = document.querySelector("#addMoneyForm");
let currentUser = [];
let moneyAdded = "";
let currentBalance;

// Cuando termine de cargar el contenido de la página llama a esa función con el parametro transformers
document.addEventListener("DOMContentLoaded", () => {
  currentUser = JSON.parse(window.localStorage.getItem("isUserOnDb"));
  currentBalance = parseInt(currentUser[0].saldo);

  const userName = document.createElement("div");
  userName.innerHTML = `<h2 class="text-center mb-3 text-primary">
  ¡Que gusto verte de nuevo ${currentUser[0].name}!
</h2>`;

  //Publicar debajo de operationsCard
  //operationsCard.parentElement.appendChild(userName);
  operationsCard.parentNode.insertBefore(userName, operationsCard.nextSibling);
});

// Vamos a escuchar el evento click en el botón de checkBalanceBtn, para eso llamamos a la función showBalance
checkBalanceBtn.addEventListener("click", () => {
  balanceDialog("home.html", 500, "Tu saldo es:");
});

addMoneyBtn.addEventListener("click", () => {
  addMoneyDialog("home.html", 500);
});

takeMoneyBtn.addEventListener("click", () => {
  takeMoneyDialog("home.html", 500);
});

// Es la función que va a crear el dialog  para el balance
function balanceDialog(url, width, title) {
  let blackDiv = document.createElement("div");
  blackDiv.className = "black__div";
  blackDiv.setAttribute("id", "blackDiv");

  let modalBalance = document.createElement("div");
  modalBalance.className = "modal__div";
  modalBalance.setAttribute("id", "modalBalance");
  modalBalance.style.width = width + "px";
  modalBalance.innerHTML = `<div class="text-center my-3"><img
  id="operationImage"
  src="img/money-icon.png"
  alt="Money icon"
  class="lock__icon mb-3"
/>
<h4 class="text-primary">${title} </h4>
<div>
<p class="balance">$ ${currentBalance}</p>
<button class="btn btn-primary w-50 mt-2" onclick="closeDialog(blackDiv)">Ok</button>
</div>
</div>`;
  document.body.appendChild(blackDiv);
  blackDiv.appendChild(modalBalance);
}

//Es la función que va a crear el dialog para ingresar un monto
function addMoneyDialog(url, width) {
  let blackDiv = document.createElement("div");
  blackDiv.className = "black__div";
  blackDiv.setAttribute("id", "addMoneyDiv");

  let modalBalance = document.createElement("div");
  modalBalance.className = "modal__div";
  modalBalance.setAttribute("id", "modalBalance");
  modalBalance.style.width = width + "px";
  modalBalance.innerHTML = `<div class="text-center my-3"><img
  id="operationImage"
  src="img/money-icon.png"
  alt="Money icon"
  class="lock__icon mb-3"
/>
<h4 class="text-primary">Tu saldo actual es: </h4>
<div>
<p class="balance">$ ${currentBalance}</p>
</div>
<h4 class="text-primary">Ingresa el monto que deseas añadir</h4>
<input
  type="number"
  id="inpuMoney"
  class="form-control my-4 add__money__input w-80"
/>
<button class="btn btn-primary w-50 mt-2" onclick="addMoney(addMoneyDiv)">Añadir</button>

</div>

</div>`;

  document.body.appendChild(blackDiv);
  blackDiv.appendChild(modalBalance);
}

//Función para retirar cierta cantidad (Ingresar monto)
function addMoney() {
  moneyAdded = parseInt(document.getElementById("inpuMoney").value);
  closeDialog(addMoneyDiv);
  if (
    (moneyAdded + currentBalance < 990) &
    (moneyAdded + currentBalance > 10)
  ) {
    currentBalance = moneyAdded + currentBalance;
    balanceDialog(
      "home.html",
      500,
      "El monto ha sido añadido. Tu nuevo saldo es:"
    );
  } else {
    errorDialog(
      "home.html",
      500,
      "¡Error al ingresar la cantidad!",
      "No puedes ingresar un monto que suma una cantidad total mayor a $990. Por favor intenta de nuevo"
    );
  }
}

//Es la función que va a crear el dialog para retirar una cantidad
function takeMoneyDialog(url, width) {
  let blackDiv = document.createElement("div");
  blackDiv.className = "black__div";
  blackDiv.setAttribute("id", "takeMoneyDiv");

  let modalBalance = document.createElement("div");
  modalBalance.className = "modal__div";
  modalBalance.setAttribute("id", "modalBalance");
  modalBalance.style.width = width + "px";
  modalBalance.innerHTML = `<div class="text-center my-3"><img
  id="operationImage"
  src="img/money-icon.png"
  alt="Money icon"
  class="lock__icon mb-3"
/>
<h4 class="text-primary">Tu saldo actual es: </h4>
<div>
<p class="balance">$ ${currentBalance}</p>
</div>
<h4 class="text-primary">Ingresa el monto que deseas retirar</h4>
<input
  type="number"
  id="takeMoney"
  class="form-control my-4 add__money__input w-80"
/>
<button class="btn btn-primary w-50 mt-2" onclick="takeMoney()">Retirar</button>

</div>

</div>`;

  document.body.appendChild(blackDiv);
  blackDiv.appendChild(modalBalance);
}

//Función para retirar cierta cantidad (Ingresar monto)
function takeMoney() {
  moneyTaken = parseInt(document.getElementById("takeMoney").value);
  closeDialog(takeMoneyDiv);
  if (
    (currentBalance - moneyTaken < 990) &
    (currentBalance - moneyTaken > 10)
  ) {
    currentBalance = currentBalance - moneyTaken;
    balanceDialog(
      "home.html",
      500,
      "El monto ha sido retirado. Tu nuevo saldo es:"
    );
  } else {
    errorDialog(
      "home.html",
      500,
      "¡Error al ingresar la cantidad!",
      "No puedes retirar un monto que deje una cantidad total menor a $10. Por favor intenta de nuevo"
    );
  }
}

// Funcion para cerrar cualquier dialogo
function closeDialog(id) {
  const dialogID = id.id;
  let element = document.getElementById(dialogID);
  document.body.removeChild(element);
}

// Función que abre el dialog que muestra el mensaje de error
function errorDialog(url, width, title, message) {
  let blackDiv = document.createElement("div");
  blackDiv.className = "black__div";
  blackDiv.setAttribute("id", "errorDiv");

  let modalBalance = document.createElement("div");
  modalBalance.className = "modal__div";
  modalBalance.setAttribute("id", "modalBalance");
  modalBalance.style.width = width + "px";
  modalBalance.innerHTML = `<div class="text-center my-3"><img
  id="operationImage"
  src="img/money-icon.png"
  alt="Money icon"
  class="lock__icon mb-3"
/>
<h4 class="text-primary">${title} </h4>
<div>
<p>${message}</p>
<button class="btn btn-primary w-50 mt-2" onclick="closeDialog(errorDiv)">Ok</button>
</div>
</div>`;
  document.body.appendChild(blackDiv);
  blackDiv.appendChild(modalBalance);
}
