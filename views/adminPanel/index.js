const hamIcon = document.querySelector(".ham-icon");
const xIcon = document.querySelector(".x-icon");

document.addEventListener("DOMContentLoaded", () => {
  validateAdmin();
});

// Backend

async function getUsers() {
  try {
    const get = await axios.get("/api/user/getUsers");
    showUsers(get.data);
    filterUsers(get.data);
  } catch (error) {
    console.log(error);
    showMessage("Hubo un error al cargar los usuarios");
  }
}

async function validateAdmin() {
  if (localStorage.getItem("user")) {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    try {
      const get = await axios.get("/api/admin/getAdmin", {
        params: {
          username: user.inputUsername,
          password: user.inputPass,
        },
      });
      getUsers();
    } catch (error) {
      window.location.href = "/login";
    }
  } else {
    window.location.href = "/login";
  }
}

async function activateUser(idUser) {
  try {
    const put = await axios.put("/api/user/activateUser", { idUser });
    showMessage(put.data.message);
    getUsers();
  } catch (error) {
    showMessage("Hubo un error al activar el usuario");
  }
}

async function deleteUser(idUser) {
  try {
    const eliminar = await axios.delete("/api/user/deleteUser", {
      params: {
        idUser,
      },
    });
    showMessage(eliminar.data.message);
    getUsers();
  } catch (error) {
    showMessage("Hubo un error al activar el usuario");
  }
}

//Frontend

function filterUsers(listUsers) {
  const selectCat = document.querySelector("#selectCat");
  const inputNum = document.querySelector("#inputNum");
  let newList;
  selectCat.addEventListener("change", () => {
    switch (selectCat.value) {
      case "6-8 Age":
        newList = listUsers.filter((user) => user.age >= 6 && user.age <= 8);
        showUsers(newList);
        break;
      case "9-10 Age":
        newList = listUsers.filter((user) => user.age >= 9 && user.age <= 10);
        showUsers(newList);
        break;
      case "11-12 Age":
        newList = listUsers.filter((user) => user.age >= 11 && user.age <= 12);
        showUsers(newList);
        break;
      case "13-14 Age":
        newList = listUsers.filter((user) => user.age >= 13 && user.age <= 14);
        showUsers(newList);
        break;
      case "15-18 Age":
        newList = listUsers.filter((user) => user.age >= 15 && user.age <= 18);
        showUsers(newList);
        break;
      default:
        newList = listUsers;
        showUsers(newList);
        break;
    }
  });

  inputNum.addEventListener("input", () => {
    if (!inputNum.value) {
      newList = listUsers;
      return showUsers(newList);
    }
    newList = listUsers.filter((user) => user.payN === inputNum.value);
    showUsers(newList);
  });
}

function showUsers(listUsers) {
  const containerIns = document.querySelector("#containerIns");
  containerIns.innerHTML = "";
  listUsers.forEach((user) => {
    const { age, categoria, club, name, payM, payN, amount, id, active } = user;
    const div = document.createElement("div");
    div.classList.add("insc");
    div.innerHTML = `
    <span>${name}</span>
            <span>${
              categoria === undefined && age < 6
                ? "Under 6"
                : categoria === undefined && age > 18
                ? "Over 18"
                : `${categoria}`
            }</span>
            <span>${age}</span>
            <span class="club">${club}</span>
            <div class="pay">
            <span>${payM}</span>
            <span>${payN}</span>
            </div>
            <span>${payM === "Zelle" ? `$ ${amount}` : `${amount} Bs`}</span>
    `;

    const activarBtn = document.createElement("button");
    activarBtn.innerHTML = "Activar";
    activarBtn.setAttribute("userId", id);

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("userId", id);
    deleteBtn.innerHTML = "Eliminar";
    deleteBtn.classList.add("deleteBtn");

    const containerBtns = document.createElement("div");
    containerBtns.classList.add("btns");
    if (!active) {
      containerBtns.appendChild(activarBtn);
    }
    containerBtns.appendChild(deleteBtn);

    div.appendChild(containerBtns);

    activarBtn.addEventListener("click", (e) => {
      const idUser = e.target.getAttribute("userId");
      activateUser(idUser);
    });
    deleteBtn.addEventListener("click", (e) => {
      const idUser = e.target.getAttribute("userId");
      deleteUser(idUser);
    });

    containerIns.appendChild(div);
  });
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
