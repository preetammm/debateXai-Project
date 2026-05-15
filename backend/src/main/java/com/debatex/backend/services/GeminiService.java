package com.debatex.backend.services;

import com.debatex.backend.dto.DebateResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@Service
@Slf4j
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public GeminiService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = new ObjectMapper();
    }

    public DebateResponse generateDebateResponse(String persona, String userMessage, String topic) {
        try {
            String prompt = buildPrompt(persona, userMessage, topic);

            Map<String, Object> requestBody = buildGeminiRequest(prompt);
            String requestJson = objectMapper.writeValueAsString(requestBody);

            log.info("Calling Gemini API for persona: {}, topic: {}", persona, topic);

            String responseJson = webClient.post()
                    .uri(apiUrl + "?key=" + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestJson)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return parseGeminiResponse(responseJson);

        } catch (Exception e) {
            log.error("Gemini API call failed, using fallback: {}", e.getMessage());
            return getFallbackResponse(persona, userMessage);
        }
    }

    private String buildPrompt(String persona, String userMessage, String topic) {
        String personaInstruction = switch (persona.toLowerCase()) {
            case "socrates ai" -> "You are Socrates, the ancient Greek philosopher. Use the Socratic method — ask probing questions, expose contradictions, and guide through dialectic reasoning. Be wise, measured, and deeply philosophical.";
            case "elon-style ai" -> "You are an Elon Musk-style visionary tech debater. Think in first principles, reference physics and engineering analogies, be bold and contrarian. Push boundaries of conventional thinking.";
            case "roast king ai" -> "You are a savage debate roast master. Use sharp wit, clever comebacks, and intellectual burns. Be ruthlessly entertaining while still making strong logical points.";
            case "lawyer ai" -> "You are a Harvard-trained litigation attorney. Use precise legal reasoning, cite precedents by analogy, identify logical gaps like cross-examination. Be methodical and devastating.";
            case "politician ai" -> "You are a seasoned political debater. Use rhetoric, emotional appeals balanced with policy data, pivot skillfully, and frame arguments for maximum persuasion.";
            case "guru ai" -> "You are a spiritual and motivational guru. Use wisdom, parables, and deep philosophical insight. Connect arguments to universal human truths and higher consciousness.";
            default -> "You are an elite intellectual debater. Respond with sharp logic, evidence-based reasoning, and sophisticated rhetoric.";
        };

        return String.format("""
                %s

                DEBATE TOPIC: "%s"
                
                THE USER'S ARGUMENT:
                "%s"
                
                INSTRUCTIONS:
                1. First, write a compelling counter-argument or response (2-4 sentences, direct and powerful).
                2. Then analyze the USER's argument (not yours).
                
                You MUST respond with ONLY valid JSON in this exact format, no other text:
                {
                  "aiResponse": "Your debate response here",
                  "logicScore": 75,
                  "persuasionScore": 70,
                  "emotionScore": 15,
                  "fallacies": ["fallacy name if any"],
                  "strongestPoint": "What was strongest about the user's argument",
                  "weakestPoint": "What was weakest about the user's argument",
                  "rebuttalSuggestion": "A suggestion for how the user could strengthen their next argument"
                }
                
                SCORING RULES:
                - logicScore: 0-100 (how logically sound is the user's argument)
                - persuasionScore: 0-100 (how persuasive is the user's argument)
                - emotionScore: 0-100 (how much emotional manipulation, lower is better)
                - fallacies: array of detected logical fallacies in the user's argument, empty array if none
                - All scores must be integers
                
                RESPOND WITH ONLY THE JSON OBJECT. NO MARKDOWN. NO CODE BLOCKS. NO EXPLANATION.
                """, personaInstruction, topic, userMessage);
    }

    private Map<String, Object> buildGeminiRequest(String prompt) {
        Map<String, Object> textPart = new HashMap<>();
        textPart.put("text", prompt);

        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(textPart));

        Map<String, Object> generationConfig = new HashMap<>();
        generationConfig.put("temperature", 0.8);
        generationConfig.put("maxOutputTokens", 1024);
        generationConfig.put("responseMimeType", "application/json");

        Map<String, Object> request = new HashMap<>();
        request.put("contents", List.of(content));
        request.put("generationConfig", generationConfig);

        return request;
    }

    private DebateResponse parseGeminiResponse(String responseJson) {
        try {
            JsonNode root = objectMapper.readTree(responseJson);
            JsonNode candidates = root.path("candidates");

            if (candidates.isEmpty() || candidates.isMissingNode()) {
                log.warn("No candidates in Gemini response");
                return getFallbackResponse("default", "");
            }

            String text = candidates.get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

            // Clean the text — remove markdown code fences if present
            text = text.trim();
            if (text.startsWith("```json")) {
                text = text.substring(7);
            }
            if (text.startsWith("```")) {
                text = text.substring(3);
            }
            if (text.endsWith("```")) {
                text = text.substring(0, text.length() - 3);
            }
            text = text.trim();

            JsonNode parsed = objectMapper.readTree(text);

            List<String> fallacies = new ArrayList<>();
            if (parsed.has("fallacies") && parsed.get("fallacies").isArray()) {
                for (JsonNode f : parsed.get("fallacies")) {
                    fallacies.add(f.asText());
                }
            }

            return DebateResponse.builder()
                    .aiResponse(parsed.path("aiResponse").asText("I need to think about this further."))
                    .logicScore(parsed.path("logicScore").asInt(70))
                    .persuasionScore(parsed.path("persuasionScore").asInt(65))
                    .emotionScore(parsed.path("emotionScore").asInt(20))
                    .fallacies(fallacies)
                    .strongestPoint(parsed.path("strongestPoint").asText("Good use of reasoning."))
                    .weakestPoint(parsed.path("weakestPoint").asText("Could use more evidence."))
                    .rebuttalSuggestion(parsed.path("rebuttalSuggestion").asText("Consider providing empirical data."))
                    .build();

        } catch (Exception e) {
            log.error("Failed to parse Gemini response: {}", e.getMessage());
            return getFallbackResponse("default", "");
        }
    }

    private DebateResponse getFallbackResponse(String persona, String userMessage) {
        return DebateResponse.builder()
                .aiResponse("That's a thought-provoking argument. However, I believe there are fundamental assumptions in your reasoning that deserve closer examination. The evidence suggests a more nuanced picture than what you've presented.")
                .logicScore(72)
                .persuasionScore(68)
                .emotionScore(15)
                .fallacies(List.of())
                .strongestPoint("Clear articulation of your core thesis.")
                .weakestPoint("Reliance on assumptions without sufficient empirical backing.")
                .rebuttalSuggestion("Try grounding your argument with specific data points or case studies.")
                .build();
    }
}
