const http = require('http');
const port = 2673;

const server = http.createServer(function (rq,rs) {
    rs.write('hello wide world');
    rs.end();
});

server.listen(port, function (err) {
    if (err) {
        alert('something went wrong with the server. please try again later');
        console.log(err);
    } else {
        console.log('server is listening. localhost:' + port)
    }
})

///////////////////////

const inputField = document.getElementById("msgInput");
const sendButton = document.getElementById("send-button");
const username = document.getElementById("nickInput");
const msgContainer = document.getElementById("messages");

function doSubmitMsg(msg,name) {
    const text = msg.trim();
    if (!text) return;

    const newMsg = document.createElement('div');
    newMsg.className = "message hbox";
    newMsg.innerHTML = `
        <img src="gfx/img/default.png"/>
        <div class="vbox">
            <p class="bold">${name}</p>
            <p>${text}</p>
        </div>
    `;

    msgContainer.appendChild(newMsg);
}

function submitCurrentMessage() {
    const nm = username.value.trim()
    if (!nm) {
        alert("u must have a valid username first");
        return
    }
    doSubmitMsg(inputField.value,nm);
    inputField.value = "";
}

inputField.addEventListener('keydown', function (e) {
    if (e.code === "Enter") {
        e.preventDefault();
        submitCurrentMessage();
    }
});

if (sendButton) {
    sendButton.addEventListener('click', submitCurrentMessage);
}
