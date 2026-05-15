package com.debatex.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "debate_rooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DebateRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String topic;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String difficulty;

    @Column(name = "ai_persona", nullable = false)
    private String aiPersona;

    @Column(nullable = false)
    private String status; // ACTIVE, FINISHED

    @Column(name = "creator_id")
    private UUID creatorId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = "ACTIVE";
        }
    }
}
