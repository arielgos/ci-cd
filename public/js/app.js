import { Message } from "./message.js";
import { Events, Track } from "./track.js";
import { User } from "./user.js";

if (!User.isLogged()) {
  console.log("Not Logged");
  //Login process
  document.getElementById("login").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    User.login(name, () => {
      Track.log(Events.Login, name);
      document.getElementById("name").value = "";
      location.reload();
    }, (error) => {
      console.error(error);
    });
  });
} else {
  console.log("Logged");
  //Removing Login
  document.getElementById("loginForm").remove();
  Track.log(Events.Start, User.getName());
  //Messages process
  document.getElementById("text").placeholder = "Escribiendo como... " + User.getName();
  document.getElementById("message").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = User.getName();
    const message = document.getElementById("text").value;
    Message.post(name, message, () => {
      Track.log(Events.Send, name);
      document.getElementById("text").value = "";
    }, (error) => {
      console.error(error);
    });
  });
}

Message.listener((data) => {
  const value = data.val();
  const messages = document.getElementById("messages");
  const message = document.createElement("div");
  const text = document.createElement("p");
  const span = document.createElement("span");
  text.appendChild(document.createTextNode(value.message));
  span.appendChild(document.createTextNode(value.name));
  message.appendChild(text);
  message.appendChild(span);
  if (value.name == User.getName()) {
    message.classList.add("myself");
  }
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
});


