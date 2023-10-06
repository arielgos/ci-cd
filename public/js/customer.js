import { firestore, collection, addDoc } from "./firebase.js";

const CUSTOMER = "customer";
const CUSTOMERS = "customers";

class Customer {
  static isLogged() {
    return sessionStorage.getItem(CUSTOMER);
  }
  static async save(obj, callBack) {
    const docRef = await addDoc(collection(firestore, CUSTOMERS), obj);
    console.log("Document written with ID: ", docRef.id);
    if (docRef.id != '') {
      sessionStorage.setItem(CUSTOMER, docRef.id);
      callBack();
    }
  }
  static getData() {
    return sessionStorage.getItem(CUSTOMER);
  }

  static clear() {
    sessionStorage.removeItem(CUSTOMER);
  }
}

export { Customer };
