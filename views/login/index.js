const form = document.querySelector("#form");
//Backend

async function validateInputs() {
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
    return showMessage("Ha dejado algún campo vacío");
  }
  try {
    const get = await axios.get("/api/admin/getAdmin", {
      params: {
        username: infoObj.inputUsername,
        password: infoObj.inputPass,
      },
    });
    localStorage.setItem("user", JSON.stringify(infoObj));
    window.location.href = get.data.route;
  } catch (error) {
    showMessage(error.response.data.message);
  }
}

//Frontend

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
});

function showMessage(message) {
  const container = document.querySelector("#message");
  container.innerHTML = `<span>${message}</span>`;
  container.classList.add("message-animation");
  setTimeout(() => {
    container.classList.remove("message-animation");
  }, 2500);
}
