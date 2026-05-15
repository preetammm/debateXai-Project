package com.debatex.backend.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class ChatRequest {
    private UUID roomId;
    private UUID senderId;
    private String content;
}
