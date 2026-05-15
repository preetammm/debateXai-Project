package com.debatex.backend.controllers;

import com.debatex.backend.dto.DebateRequest;
import com.debatex.backend.dto.DebateResponse;
import com.debatex.backend.services.GeminiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/debate")
@RequiredArgsConstructor
@Slf4j
public class DebateController {

    private final GeminiService geminiService;

    @PostMapping("/send")
    public ResponseEntity<DebateResponse> sendMessage(@RequestBody DebateRequest request) {
        log.info("Debate message received — persona: {}, topic: {}", request.getPersona(), request.getTopic());

        DebateResponse response = geminiService.generateDebateResponse(
                request.getPersona(),
                request.getMessage(),
                request.getTopic()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("DebateX AI Engine Online");
    }
}
