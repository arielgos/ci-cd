import { User } from "./user.js";

if (!User.isLogged()) {
  console.log("Not Logged");
  //Login process
  document.getElementById("login").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    console.log(name);
    User.login(name, () => {
      location.reload();
    }, (error) => {
      console.error(error);
    });
  });
} else {
  document.getElementById("loginForm").remove();
  console.log("Logged");
}

document.getElementById("loginForm").remove();

