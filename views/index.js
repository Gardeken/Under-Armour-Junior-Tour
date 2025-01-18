const form = document.querySelector("#form");

function showMessage(message) {
  const container = document.querySelector("#message");
  container.innerHTML = `<span>${message}</span>`;
  container.classList.add("message-animation");
  setTimeout(() => {
    container.classList.remove("message-animation");
  }, 2500);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const infoObj = {};
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value !== "") {
      infoObj[input.id] = input.value;
    }
  });
  const date = infoObj.inputDate;
  const listDate = date.split("-");
  const year = listDate[0];
  const validateAge = Number(new Date().getFullYear()) - Number(year);
  const edad = Number(infoObj.inputAge);
  if (edad !== validateAge && edad !== validateAge - 1) {
    showMessage("Edad inválida");
  }
  if (edad < 5 || edad > 15) {
    showMessage("Edad inválida");
  }
  const inputFranela = infoObj.inputFranela;
  if (inputFranela.length > 3 || inputFranela.length < 1) {
    showMessage("Tamaño inválido");
  }

  try {
    const get = await axios.post("/api/email/sendEmail", infoObj);
    showMessage(get.data.message);
  } catch (error) {
    showMessage("Hubo un error al procesar su solicitud");
  }
});
