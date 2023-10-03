import { database, push, ref, onChildAdded, query, orderByChild } from "./firebase.js";

const MESSAGES = "messages/";

class Message {
    static post(name, message, onSuccess, onFail = null) {
        push(ref(database, MESSAGES), {
            name: name,
            message: message,
            time: new Date().getTime()
        }).then(() => {
            onSuccess();
        }).catch((error) => {
            if (onFail != null) {
                onFail(error);
            }
        });
    }

    static listener(callback) {
        //const reference = ref(database, MESSAGES);
        const reference = query(ref(database, MESSAGES), orderByChild('time'));
        onChildAdded(reference, (data) => {
            callback(data);
        });
    }
}

export { Message };