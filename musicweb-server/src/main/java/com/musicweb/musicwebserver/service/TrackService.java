package com.musicweb.musicwebserver.service;

import com.musicweb.musicwebserver.model.entity.Track;
import com.musicweb.musicwebserver.repository.TrackRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrackService {

    private final TrackRepository trackRepository;
    private final UserService userService;

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

    public void addTrackToFavourites(Long trackId) {
        Track track = getTrackById(trackId);
        userService.getCurrentUser().addFavouriteTrack(track);
    }

    public void removeTrackFromFavourites(Long trackId) {
        Track track = getTrackById(trackId);
        userService.getCurrentUser().removeFavouriteTrack(track);
    }

    public List<Track> getTrackRanking() {
        return trackRepository.findAll(Sort.by(Sort.Direction.DESC, "ranking"));
    }
}
