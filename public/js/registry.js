import { Customer } from "./customer.js";
import { Track, Events } from "./track.js";

if (!Customer.isLogged()) {
    document.getElementById("registry").addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        Customer.save({
            name: name,
            email: email,
            phone: phone
        }, () => {
            Track.log(Events.Registry, name);
            location.reload();
        });

    });
} else {
    
    document.getElementById("registry").remove();

    new QRCode(document.getElementById("qrcode"), {
        text: Customer.getData(),
        width: 240,
        height: 240,
        colorDark: "#2b2d42",
        colorLight: "#edf2f4",
        correctLevel: QRCode.CorrectLevel.H
    });
}

