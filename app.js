const inputField = document.getElementById("msgInput");
const sendButton = document.getElementById("send-button");
const username = document.getElementById("nickInput");
const msgContainer = document.getElementById("messages");

const socket = new WebSocket(
    `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}`
);

function appendMessage(name, text) {
    const textValue = text.trim();
    if (!textValue) return;

    const newMsg = document.createElement("div");
    newMsg.className = "message hbox";

    const sender = document.createElement("p");
    sender.className = "bold";
    sender.textContent = name;

    const body = document.createElement("p");
    body.textContent = textValue;

    const image = document.createElement("img");
    image.src = "gfx/img/default.png";

    const textBlock = document.createElement("div");
    textBlock.className = "vbox";
    textBlock.append(sender, body);

    newMsg.append(image, textBlock);
    msgContainer.appendChild(newMsg);
    msgContainer.scrollTop = msgContainer.scrollHeight;
}

function submitCurrentMessage() {
    const nm = username.value.trim();
    const messageText = inputField.value.trim();

    if (!nm) {
        alert("u must have a valid username first");
        return;
    }

    if (!messageText) {
        return;
    }

    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
            type: "message",
            name: nm,
            text: messageText
        }));
    } else {
        appendMessage("server", "the chat server is not connected yet.");
    }

    inputField.value = "";
}

socket.addEventListener("message", (event) => {
    try {
        const payload = JSON.parse(event.data);
        if (payload && payload.type === "message") {
            appendMessage(payload.name, payload.text);
        }
    } catch (error) {
        console.error("invalid message payload", error);
    }
});

socket.addEventListener("error", () => {
    appendMessage("server", "unable to connect to the chat server.");
});

inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        e.preventDefault();
        submitCurrentMessage();
    }
});

if (sendButton) {
    sendButton.addEventListener("click", submitCurrentMessage);
}
