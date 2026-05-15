package com.debatex.backend.controllers;

import com.debatex.backend.dto.ChatRequest;
import com.debatex.backend.entities.DebateMessage;
import com.debatex.backend.entities.DebateRoom;
import com.debatex.backend.repositories.DebateMessageRepository;
import com.debatex.backend.repositories.DebateRoomRepository;
import com.debatex.backend.services.AiAnalysisService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class WebSocketController {

    private final SimpMessagingTemplate messagingTemplate;
    private final DebateMessageRepository messageRepository;
    private final DebateRoomRepository roomRepository;
    private final AiAnalysisService aiAnalysisService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ChatRequest chatRequest) {
        try {
            log.info("Received message for room: {}", chatRequest.getRoomId());
            
            // Save User Message
            DebateMessage userMsg = DebateMessage.builder()
                    .roomId(chatRequest.getRoomId())
                    .senderId(chatRequest.getSenderId())
                    .isAi(false)
                    .content(chatRequest.getContent())
                    .build();
            messageRepository.save(userMsg);

            // Broadcast User Message
            messagingTemplate.convertAndSend("/topic/room/" + chatRequest.getRoomId(), userMsg);

            // Trigger AI Response if room has AI Persona
            DebateRoom room = roomRepository.findById(chatRequest.getRoomId()).orElse(null);
            if (room != null && room.getAiPersona() != null) {
                
                Map<String, Object> aiResult = aiAnalysisService.generateAiResponse(
                        room.getAiPersona(), chatRequest.getContent(), room.getTopic());
                
                String analysisJson = objectMapper.writeValueAsString(aiResult.get("analysis"));
                
                DebateMessage aiMsg = DebateMessage.builder()
                        .roomId(room.getId())
                        .isAi(true)
                        .content((String) aiResult.get("responseContent"))
                        .analysisReport(analysisJson)
                        .build();
                
                messageRepository.save(aiMsg);
                
                // Broadcast AI Message
                messagingTemplate.convertAndSend("/topic/room/" + room.getId(), aiMsg);
            }

        } catch (Exception e) {
            log.error("Error processing websocket message", e);
        }
    }
}
