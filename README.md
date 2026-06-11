# 🧠 Local IT Support AI Agent (Ollama Powered)

A lightweight self-hosted AI assistant designed for IT support and troubleshooting tasks such as network issues, server diagnostics, IP configuration, and general technical support.
 
This project runs fully offline using **Ollama** and local LLMs like **Phi-3** or **Qwen2.5 Coder**.

---

## 🚀 Features

- 🖥️ Local AI chatbot using Ollama
- ⚡ Fast response with streaming output 
- 🧠 IT Support specialized prompting
- 📋 Structured troubleshooting format:
  - Problem Summary
  - Possible Cause
  - Step-by-step Fix
  - Final Result
- 💬 Chat UI (HTML + CSS + JavaScript)
- 💾 Conversation saving (text-based logs)
- 🔄 New chat session support
- 📡 Fully offline after setup

---

## 🏗️ Tech Stack

- PHP (Backend API bridge to Ollama)
- JavaScript (Frontend logic + streaming UI)
- HTML/CSS (Chat interface)
- Ollama (Local LLM runtime)
- Models:
  - phi3:latest
  - qwen2.5-coder:latest

---

## 📦 Requirements

Install Ollama:

https://ollama.com

Then pull models:

```bash
ollama pull phi3
ollama pull qwen2.5-coder
````

Start Ollama:

```bash
ollama serve
```

---

## 📁 Project Structure

```
/project
│
├── index.php
├── chat.php
├── save_chat.php
│
├── /css
│   └── style.css
│
├── /js
│   └── app.js
│
└── /chats
    └── saved conversations (.txt)
```

---

## ⚙️ Installation

1. Clone repository

```
git clone https://github.com/yourname/it-ai-agent
```

2. Move to server directory

```
htdocs/ (XAMPP) or www/ (WAMP)
```

3. Start Apache

4. Open browser:

```
http://localhost/it-ai-agent
```

---

## 🧠 How It Works

1. User sends a message via UI
2. PHP sends request to Ollama API:

   ```
   http://127.0.0.1:11434/api/generate
   ```
3. Ollama processes prompt using local model
4. Response streams back to frontend
5. JavaScript displays formatted output in real-time

---

## 🧾 Example Output

```
1. Problem Summary
• Device cannot access internet

2. Possible Cause
• Incorrect IP configuration
• DHCP failure

3. Step-by-step Fix
1. Check IP settings
2. Run ipconfig /renew
3. Restart router

4. Final Result
• Internet connection restored
```

---

## 🔧 Future Improvements

* Add database storage (MySQL / SQLite)
* Add login system
* Add ticketing system
* Add network scanner integration
* Add PowerShell automation
* Add real AI agent tool execution

---

## 🧑‍💻 Author

IDT

---

## ⚠️ Disclaimer

This project runs locally and requires Ollama.
No cloud API is used. All data stays on your machine.
