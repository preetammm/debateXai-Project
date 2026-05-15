package com.debatex.backend.dto;

import lombok.Data;

@Data
public class DebateRequest {
    private String message;
    private String persona;
    private String topic;
}
