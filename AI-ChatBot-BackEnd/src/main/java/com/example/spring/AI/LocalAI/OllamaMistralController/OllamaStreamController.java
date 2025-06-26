package com.example.spring.AI.LocalAI.OllamaMistralController;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ollama")
@CrossOrigin(origins = "*")
public class OllamaStreamController {

    private final WebClient webClient;
    private final ObjectMapper mapper = new ObjectMapper();

    @Value("${ollama.api-path}")
    private String ollamaApiPath;

    @Value("${ollama.model}")
    private String ollamaModel;

    public OllamaStreamController(@Value("${ollama.base-url}") String baseUrl) {
        this.webClient = WebClient.builder()
                .baseUrl(baseUrl)
                .build();
    }

    @GetMapping(value = "/ask/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> streamResponse(@RequestParam String prompt) {
        System.out.println("--OllamaStreamController streamResponse() receives request with prompt: " + prompt);

        Map<String, Object> requestBody = Map.of(
                "model", ollamaModel,
                "stream", true,
                "messages", List.of(Map.of("role", "user", "content", prompt))
        );

        StringBuilder fullResponse = new StringBuilder();

        return webClient.post()
                .uri(ollamaApiPath)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToFlux(String.class)
                .map(line -> {
                    try {
                        String clean = line.trim().replaceFirst("^data:\\s*", "");
                        if (clean.isEmpty()) return "";

                        JsonNode json = mapper.readTree(clean);
                        String content = json.path("message").path("content").asText();

                        if (!content.isEmpty()) {
                            fullResponse.append(content);
                            return content;
                        }
                    } catch (Exception e) {
                        System.err.println("Parsing error: " + e.getMessage());
                    }
                    return "";
                })
                .filter(chunk -> !chunk.isEmpty());
    }
}