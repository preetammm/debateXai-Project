package com.debatex.backend.services;

import com.debatex.backend.dto.DebateResponse;
import com.debatex.backend.entities.DebateMessage;
import com.debatex.backend.entities.DebateRoom;
import com.debatex.backend.repositories.DebateMessageRepository;
import com.debatex.backend.repositories.DebateRoomRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class AiAnalysisService {

    private final GeminiService geminiService;

    public Map<String, Object> generateAiResponse(String persona, String userMessage, String topic) {
        log.info("Generating AI response via Gemini for persona: {}, topic: {}", persona, topic);

        DebateResponse debateResponse = geminiService.generateDebateResponse(persona, userMessage, topic);

        Map<String, Object> analysis = new HashMap<>();
        analysis.put("logicScore", debateResponse.getLogicScore());
        analysis.put("emotionalManipulationScore", debateResponse.getEmotionScore());
        analysis.put("persuasionScore", debateResponse.getPersuasionScore());
        analysis.put("detectedFallacies", debateResponse.getFallacies());
        analysis.put("strongestPoint", debateResponse.getStrongestPoint());
        analysis.put("weakestPoint", debateResponse.getWeakestPoint());

        Map<String, Object> result = new HashMap<>();
        result.put("responseContent", debateResponse.getAiResponse());
        result.put("analysis", analysis);

        return result;
    }
}
