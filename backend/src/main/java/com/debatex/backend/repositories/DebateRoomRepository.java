package com.debatex.backend.repositories;

import com.debatex.backend.entities.DebateRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DebateRoomRepository extends JpaRepository<DebateRoom, UUID> {
    List<DebateRoom> findByStatus(String status);
}
