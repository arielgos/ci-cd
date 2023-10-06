import { firestore, collection, addDoc, doc, getDoc, getDocs, updateDoc, arrayUnion, onSnapshot } from "./firebase.js";


const CUSTOMER = "customer";
const CUSTOMERS = "customers";
const CONTACTS = "contacts";

class Customer {
  static isLogged() {
    return localStorage.getItem(CUSTOMER);
  }
  static async save(obj, callBack) {
    const docRef = await addDoc(collection(firestore, CUSTOMERS), obj);
    console.log("Document written with ID: ", docRef.id);
    if (docRef.id != '') {
      localStorage.setItem(CUSTOMER, docRef.id);
      callBack();
    }
  }
  static getData() {
    return localStorage.getItem(CUSTOMER);
  }

  static async getLiveData() {
    const reference = doc(firestore, CUSTOMERS, Customer.getData());
    const snapshot = await getDoc(reference);
    return snapshot.data();
  }

  static async getLiveUpdates(callBack) {
    const reference = doc(firestore, CUSTOMERS, Customer.getData());
    onSnapshot(reference, (doc) => {
      callBack(doc.data().contacts);
    });
  }

  static async addContact(customerId) {
    //getting data
    const reference = doc(firestore, CUSTOMERS, customerId);
    const snapshot = await getDoc(reference);
    const customer = snapshot.data();

    //updating data
    const customerReference = doc(firestore, CUSTOMERS, Customer.getData());
    await updateDoc(customerReference, {
      contacts: arrayUnion({
        name: customer.name,
        email: customer.email
      })
    });
  }

  static clear() {
    localStorage.removeItem(CUSTOMER);
  }
}

export { Customer };
