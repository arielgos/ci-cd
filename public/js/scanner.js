import { Customer } from './customer.js';
import QrScanner from './qrscanner.js';

if (!Customer.isLogged()) {
    location.href = "registry.html";
}

const video = document.getElementById("video");

const qrScanner = new QrScanner(
    video,
    result => {
        console.log('decoded qr code:', result);
        qrScanner.stop();
        video.style.display = "none";
        Customer.addContact(result);
    },
);

document.getElementById("scan").addEventListener("submit", (event) => {
    event.preventDefault();
    video.style.display = "block";
    video.style.opacity = "100";
    video.style.width = "100%";
    video.style.height = "auto";
    video.style.minHeight = "200px";
    qrScanner.start();
});

Customer.getLiveData()
    .then((data) => {
        document.getElementById("name").textContent = data.name;
    });

let capturedCustomer = new Object();

Customer.getLiveUpdates((contacts) => {
    contacts.forEach(element => {
        if (capturedCustomer[element.email] == undefined) {
            capturedCustomer[element.email] = element.name;
            console.log(element);
            const text = document.createElement("p");
            text.appendChild(document.createTextNode(element.name));
            document.getElementById("captured").appendChild(text);
        }
    });
});