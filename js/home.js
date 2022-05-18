// Cuando termine de cargar el contenido de la página llama a esa función con el parametro transformers
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = window.localStorage.getItem("isUserOnDb");
  console.log(currentUser);
});
