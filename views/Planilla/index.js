const submitBtn = document.querySelector("#submitBtn");
const dataBtn = document.querySelector("#btnData");
const bgBlack = document.querySelector("#bgBlack");
const xIcon = document.querySelector("#xIcon");

function showMessage(message) {
  const container = document.querySelector("#message");
  container.innerHTML = `<span>${message}</span>`;
  container.classList.add("message-animation");
  setTimeout(() => {
    container.classList.remove("message-animation");
  }, 2500);
}

function showSpinner(show) {
  const spinner = document.querySelector("#spinner");
  if (show) {
    spinner.classList.add("loader");
    bgBlack.classList.add("bg-black");
  } else {
    bgBlack.classList.remove("bg-black");
    spinner.classList.remove("loader");
  }
}

function showModal(show) {
  const modal = document.querySelector("#modal");
  if (show) {
    modal.classList.add("show");
    bgBlack.classList.add("bg-black");
  } else {
    modal.classList.remove("show");
    bgBlack.classList.remove("bg-black");
  }
}

dataBtn.addEventListener("click", (e) => {
  e.preventDefault();
  showModal(true);
});

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  validateInputs();
});

xIcon.addEventListener("click", () => {
  showModal(false);
});

async function validateInputs() {
  showSpinner(true);
  const infoObj = {};
  let vacio = false;
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value !== "") {
      infoObj[input.id] = input.value;
    } else if (input.value === "") {
      vacio = true;
    }
  });
  if (vacio === true) {
    showSpinner(false);
    return showMessage("Ha dejado algún campo vacío");
  }
  const date = infoObj.inputDate;
  const listDate = date.split("-");
  const year = listDate[0];
  const validateAge = Number(new Date().getFullYear()) - Number(year);
  const edad = Number(infoObj.inputAge);
  if (edad !== validateAge && edad !== validateAge - 1) {
    showSpinner(false);
    return showMessage("Edad inválida");
  }
  const inputFranela = infoObj.inputFranela;
  if (inputFranela.length > 3 || inputFranela.length < 1) {
    showSpinner(false);
    return showMessage("Tamaño inválido");
  }
  try {
    const post = await axios.post("/api/user/createUser", infoObj);
    const get = await axios.post("/api/email/sendEmail", infoObj);
    showSpinner(false);
    showMessage(get.data.message);
    form.reset();
  } catch (error) {
    showSpinner(false);
    showMessage("Hubo un error al procesar su solicitud");
  }
}
