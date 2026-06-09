const chatbox = document.getElementById("chatbox");
const sendBtn = document.getElementById("sendBtn");
const messageBox = document.getElementById("message");
const newChatBtn = document.getElementById("newChat");

let chatId = localStorage.getItem("chatId");

if (!chatId) {
    chatId = Date.now().toString();
    localStorage.setItem("chatId", chatId);
}

function addMessage(type, text) {

    const div = document.createElement("div");

    div.className = type;

    div.textContent = text;

    chatbox.appendChild(div);

    chatbox.scrollTop = chatbox.scrollHeight;

    return div;
}

function typeText(element, text, speed = 5) {

    element.textContent = "";

    let index = 0;

    function typing() {

        if (index < text.length) {

            element.textContent += text.charAt(index);

            index++;

            chatbox.scrollTop = chatbox.scrollHeight;

            setTimeout(typing, speed);
        }
    }

    typing();
}

function saveConversation() {

    fetch("save_chat.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chat_id: chatId,
            content: chatbox.innerText
        })
    }).catch(error => {
        console.error("Save Error:", error);
    });
}

async function sendMessage() {

    const msg = messageBox.value.trim();

    if (!msg) return;

    addMessage("user", msg);

    messageBox.value = "";

    const assistantDiv = addMessage(
        "assistant",
        ""
    );

    try {

        const response = await fetch(
            "chat.php",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    message: msg
                })
            }
        );

        const reader =
            response.body.getReader();

        const decoder =
            new TextDecoder();

        while (true) {

            const {
                done,
                value
            } = await reader.read();

            if (done) break;

            assistantDiv.textContent +=
                decoder.decode(value);

            chatbox.scrollTop =
                chatbox.scrollHeight;
        }

        saveConversation();

    } catch (error) {

        console.error(error);

        assistantDiv.textContent =
            "Connection failed.";
    }
}
sendBtn.addEventListener(
    "click",
    sendMessage
);

messageBox.addEventListener(
    "keydown",
    function (e) {

        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {

            e.preventDefault();

            sendMessage();
        }
    }
);

newChatBtn.addEventListener(
    "click",
    function () {

        if (
            !confirm(
                "Start a new chat?"
            )
        ) {
            return;
        }

        chatId = Date.now().toString();

        localStorage.setItem(
            "chatId",
            chatId
        );

        chatbox.innerHTML = "";
    }
);

window.addEventListener(
    "beforeunload",
    saveConversation
);