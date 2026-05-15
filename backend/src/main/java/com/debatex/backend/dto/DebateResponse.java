package com.debatex.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DebateResponse {
    private String aiResponse;
    private int logicScore;
    private int persuasionScore;
    private int emotionScore;
    private List<String> fallacies;
    private String strongestPoint;
    private String weakestPoint;
    private String rebuttalSuggestion;
}
