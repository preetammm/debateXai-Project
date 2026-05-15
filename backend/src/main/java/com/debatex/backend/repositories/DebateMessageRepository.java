package com.debatex.backend.repositories;

import com.debatex.backend.entities.DebateMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DebateMessageRepository extends JpaRepository<DebateMessage, UUID> {
    List<DebateMessage> findByRoomIdOrderByTimestampAsc(UUID roomId);
}
