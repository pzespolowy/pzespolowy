package com.musicweb.musicwebserver.service;

import com.musicweb.musicwebserver.model.entity.Track;
import com.musicweb.musicwebserver.repository.TrackRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TrackService {

    private final TrackRepository trackRepository;

    public void saveNewTrack(Track track) {
        trackRepository.save(track);
    }

    public Track getTrackById(Long id) {
        return trackRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Track with ID " + id + " not found"));
   }

   public Track updateTrack(Track track) {
        return trackRepository.save(track);
   }
}
