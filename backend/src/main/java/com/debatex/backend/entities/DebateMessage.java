package com.debatex.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "debate_messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DebateMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "room_id", nullable = false)
    private UUID roomId;

    @Column(name = "sender_id")
    private UUID senderId;

    @Column(name = "is_ai", nullable = false)
    private boolean isAi;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;
    
    // JSON field storing logic score, fallacies, etc.
    @Column(columnDefinition = "TEXT")
    private String analysisReport; 

    private LocalDateTime timestamp;

    @PrePersist
    protected void onCreate() {
        this.timestamp = LocalDateTime.now();
    }
}
