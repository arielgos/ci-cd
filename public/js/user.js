import { database, push, ref } from "./firebase.js";

const USER = "user";
const USERS = "users/";

class User {
  static isLogged() {
    return localStorage.getItem(USER);
  }
  static login(name, onSuccess, onFail = null) {
    push(ref(database, USERS), {
      name: name
    }).then(() => {
      localStorage.setItem(USER, name);
      onSuccess();
    }).catch((error) => {
      if (onFail != null) {
        onFail(error);
      }
    });
  }
  static clear() {
    localStorage.removeItem(USER);
  }
}

export { User };
