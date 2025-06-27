# 🧠 Spring AI Ollama Chat Backend

A simple REST API for interacting with local Ollama models using streaming and non-streaming endpoints.

## 🚀 Features
- Supports streaming responses from local LLMs (like Mistral/OpenAI)
- Simple WebClient-based integration
- Docker & .env ready

## 🛠️ Technologies
- Java 17
- Spring Boot
- WebClient (Reactor)
- Docker (Optional)
- Ollama (Local AI)

## 📦 Endpoints
- `GET /api/ollama/ask?prompt=...`
- `GET /api/ollama/ask/stream?prompt=...`

## 📦 Features
- `/api/ollama/ask`: Sync response endpoint.
- `/api/ollama/ask/stream`: Streamed response with Server-Sent Events (SSE).

## ⚙️ Running the Project

### Start Ollama
Make sure Ollama is running locally:
ref : https://ollama.com/


./mvnw spring-boot:run

## ⚙️ Running with Docker
docker build -t SpringAIOllamaBE .
docker run -p 9090:9090 SpringAIOllamaBE


## 🧪 Sample CURL
curl "http://localhost:9090/api/ollama/ask?prompt=Hello"

