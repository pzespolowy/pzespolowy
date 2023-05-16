package com.musicweb.musicwebserver.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.musicweb.musicwebserver.client.ChartClient;
import com.musicweb.musicwebserver.client.TrackClient;
import com.musicweb.musicwebserver.dto.deezer.request.TrackSearchRequestDto;
import com.musicweb.musicwebserver.dto.deezer.response.track.DeezerTrackDto;
import com.musicweb.musicwebserver.dto.deezer.response.track.TrackSearchResponseDto;
import com.musicweb.musicwebserver.model.entity.Track;
import com.musicweb.musicwebserver.repository.TrackRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TrackService {

    private final TrackRepository trackRepository;
    private final ChartClient chartClient;
    private final TrackClient trackClient;
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

    public TrackSearchResponseDto getTopTracks() {
        String res = chartClient.getTopTracks();
        TrackSearchResponseDto tracks = parseDeezerTrackResponse(res);
        saveTracksNotExistingInDB(tracks);

        return tracks;
    }

    private TrackSearchResponseDto parseDeezerTrackResponse(String res) {
        TrackSearchResponseDto tracks;
        try {
            tracks = new ObjectMapper().readValue(res, TrackSearchResponseDto.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return tracks;
    }

    private void saveTracksNotExistingInDB(TrackSearchResponseDto tracks) {
        tracks.getData().forEach(deezerTrackDto -> {
            Track track;
            try {
                getTrackById(deezerTrackDto.getId());
            } catch(EntityNotFoundException e) {
                track = Track.builder()
                        .id(deezerTrackDto.getId())
                        .ranking(BigDecimal.ZERO)
                        .reviews(new ArrayList<>())
                        .build();
                saveNewTrack(track);
            }
        });
    }

    public String retrieveTrackById(String trackId) {
        String res = trackClient.getTrackById(trackId);

        DeezerTrackDto deezerTrackDto = parseToDeezerTrack(res);
        Track track;
        try {
            getTrackById(deezerTrackDto.getId());
        } catch(EntityNotFoundException e) {
            track = Track.builder()
                    .id(deezerTrackDto.getId())
                    .ranking(BigDecimal.ZERO)
                    .reviews(new ArrayList<>())
                    .build();
            saveNewTrack(track);
        }
        return res;
    }

    private DeezerTrackDto parseToDeezerTrack(String res) {
        DeezerTrackDto track;
        try {
            track = new ObjectMapper().readValue(res, DeezerTrackDto.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return track;
    }
}
