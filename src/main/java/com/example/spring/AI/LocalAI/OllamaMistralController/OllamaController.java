package com.example.spring.AI.LocalAI.OllamaMistralController;

import com.example.spring.AI.LocalAI.Services.OllamaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ollama")
@CrossOrigin(origins = "*")
public class OllamaController {

    private final OllamaService ollamaService;

    public OllamaController(OllamaService ollamaService) {
        this.ollamaService = ollamaService;
    }

    @GetMapping("/ask")
    public ResponseEntity<Map<String, String>> askModel(@RequestParam String prompt) {
        System.out.println("--askModel() receives request with prompt: "+prompt);
        long start = System.nanoTime();
        Map<String, String> response = new HashMap<>();
        String reply = ollamaService.getResponse(prompt);
        long end = System.nanoTime();

        long durationMs = (end - start) / 1_000_000;

        System.out.println("askModel() took " + durationMs + " ms");
        response.put("message",reply);

        return ResponseEntity.ok(response);
    }

}
