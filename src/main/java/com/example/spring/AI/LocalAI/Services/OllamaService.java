package com.example.spring.AI.LocalAI.Services;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class OllamaService {
    private final ChatClient chatClient;

    public OllamaService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }


    public String getResponse(String prompt) {

        String response = chatClient.prompt().user(prompt).call().content();

        System.out.println("Response for prompt : " + prompt + "is :" + response.trim());

        return response;            // Extract the response content
    }
}

