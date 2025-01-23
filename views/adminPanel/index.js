const hamIcon = document.querySelector(".ham-icon");
const xIcon = document.querySelector(".x-icon");

document.addEventListener("DOMContentLoaded", () => {
  getUsers();
});

async function getUsers() {
  try {
    const get = await axios.get("/api/user/getUser");
    console.log(get.data);
  } catch (error) {
    console.log(error);
    showMessage("Hubo un error al cargar los usuarios");
  }
}

hamIcon.addEventListener("click", () => {
  lateralAnimation();
});

xIcon.addEventListener("click", () => {
  lateralAnimation();
});

function lateralAnimation() {
  const lateral = document.querySelector(".lateral-bar");
  lateral.classList.toggle("lateral-animation");
}

function showMessage(message) {
  const container = document.querySelector("#message");
  container.innerHTML = `<span>${message}</span>`;
  container.classList.add("message-animation");
  setTimeout(() => {
    container.classList.remove("message-animation");
  }, 2500);
}
