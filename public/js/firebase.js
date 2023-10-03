import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getDatabase, ref, set, push, onChildAdded, query, orderByChild } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const config = {
  apiKey: "AIzaSyAJP0ZrgXDQh-8_VFPSLFSt9GjXNBmbOWM",
  authDomain: "cicd-362f1.firebaseapp.com",
  projectId: "cicd-362f1",
  storageBucket: "cicd-362f1.appspot.com",
  messagingSenderId: "557844345074",
  appId: "1:557844345074:web:dc0d215055efb6339d606b",
  measurementId: "G-Y0GGMRK2PR",
  databaseURL: "https://cicd-362f1-default-rtdb.firebaseio.com",
};

const firebase = initializeApp(config);
const analytics = getAnalytics(firebase);
const database = getDatabase(firebase);

export { database, ref, set, push, onChildAdded, query, orderByChild };
