import { analytics, logEvent } from "./firebase.js";

const Events = Object.freeze({
    Login: String("login"),
    Start: String("start"),
    Send: String("send")
});

class Track {
    static log(event, name) {
        logEvent(analytics, event, {
            user: name
        });
        console.log(event, name);
    }
}

export { Track, Events };