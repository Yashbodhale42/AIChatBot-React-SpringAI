![image](https://github.com/user-attachments/assets/5ee0fb89-2874-497c-ad2d-88a4386f859b)

# AIChatBot-React-SpringAI

A full-stack AI chatbot application powered by [Ollama](https://ollama.com/)/ OpenAI API), built using:

- 🔙 **Spring Boot** (Backend) with Spring AI & Ollama/OpenAI API
- 🔛 **WebClient Streaming** integration
- 🌐 **ReactJS + Tailwind CSS** (Frontend)
- 🐳 **Dockerized** services with `docker-compose`

---

## 📁 Project Structure

AIChatBot-React-SpringAI/
├── AI-ChatBot-BackEnd/ # Spring Boot backend
├── AI-ChatBot-FrontEnd/ # React frontend
├── docker-compose.yml # For fullstack container orchestration
├── README.md
└── .gitignore



---

## 🚀 Features

- 🔄 Real-time chat with LLMs like Mistral via Ollama
- 🌐 Exposed streaming REST endpoint: `/ask/stream`
- 🐳 Easily containerized with Docker & `docker-compose`
- ⚡ Fast & reactive with `WebClient` and Spring WebFlux

---

## 🛠️ Getting Started

### 🧾 Prerequisites

- Java 17+
- Docker & Docker Compose
- Ollama running locally:
  ```bash
  ollama run mistral


🐳 Run with Docker Compose
docker-compose up --build


🧪 Tech Stack
Java 17
Spring Boot with SpringAI
WebFlux + WebClient
Ollama LLM / OpenAI
Docker
SSE (Server-Sent Events)


👤 Author
Yash Bodhale
[GitHub](https://github.com/Yashbodhale42)
