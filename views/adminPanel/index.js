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

//Frontend

function filterUsers(listUsers) {
  const selectCat = document.querySelector("#selectCat");
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
}

function showUsers(listUsers) {
  const containerIns = document.querySelector("#containerIns");
  containerIns.innerHTML = "";
  listUsers.forEach((user) => {
    const { age, categoria, club, name, payM, payN } = user;
    const div = document.createElement("div");
    div.classList.add("insc");
    div.innerHTML = `
    <span>${name}</span>
            <span>${categoria}</span>
            <span>${age}</span>
            <span>${club}</span>
            <div class="pay">
            <span>${payM}</span>
            <span>${payN}</span>
            </div>
    `;
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
