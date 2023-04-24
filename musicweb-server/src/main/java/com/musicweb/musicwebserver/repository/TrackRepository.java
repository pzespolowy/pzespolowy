package com.musicweb.musicwebserver.repository;

import com.musicweb.musicwebserver.model.entity.Track;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackRepository extends JpaRepository<Track, Long> {
}
