<!DOCTYPE html>
<html>
<head>
    <title>Ollama Chat</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

<div class="container">

    <div class="header">
        <h2>Ollama Chat</h2>

        <button id="newChat">
            New Chat
        </button>
    </div>

    <div id="chatbox"></div>

    <div class="input-area">
        <textarea id="message"
            placeholder="Type your message..."></textarea>

        <button id="sendBtn">
            Send
        </button>
    </div>

</div>

<script src="js/app.js"></script>
</body>
</html>