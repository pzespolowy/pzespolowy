package com.musicweb.musicwebserver.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.musicweb.musicwebserver.client.SearchClient;
import com.musicweb.musicwebserver.dto.DetailSearchDto;
import com.musicweb.musicwebserver.dto.deezer.request.AlbumSearchRequestDto;
import com.musicweb.musicwebserver.dto.deezer.request.TrackSearchRequestDto;
import com.musicweb.musicwebserver.dto.deezer.response.album.AlbumSearchResponseDto;
import com.musicweb.musicwebserver.dto.deezer.response.track.TrackSearchResponseDto;
import com.musicweb.musicwebserver.model.entity.Album;
import com.musicweb.musicwebserver.model.entity.Track;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final SearchClient searchClient;
    private final TrackService trackService;
    private final AlbumService albumService;

    public TrackSearchResponseDto searchTracks(DetailSearchDto detailSearchDto) {
        String res = searchClient.getTracks(TrackSearchRequestDto.builder()
                .q(detailSearchDto.getQuery())
                .limit(detailSearchDto.getLimit())
                .build());

        TrackSearchResponseDto tracks = parseDeezerTrackResponse(res);

        saveTracksNotExistingInDB(tracks);

        return tracks;
    }

    public AlbumSearchResponseDto searchAlbums(DetailSearchDto detailSearchDto) {
        String res = searchClient.getAlbums(AlbumSearchRequestDto.builder()
                .q(detailSearchDto.getQuery())
                .build());

        AlbumSearchResponseDto albums = parseDeezerAlbumResponse(res);

        saveAlbumsNotExistingInDB(albums);

        return albums;
    }

    private void saveTracksNotExistingInDB(TrackSearchResponseDto tracks) {
        tracks.getData().forEach(deezerTrackDto -> {
            Track track;
            try {
                trackService.getTrackById(deezerTrackDto.getId());
            } catch(EntityNotFoundException e) {
                track = Track.builder()
                        .id(deezerTrackDto.getId())
                        .ranking(BigDecimal.ZERO)
                        .reviews(new ArrayList<>())
                        .build();
                trackService.saveNewTrack(track);
            }
        });
    }

    private void saveAlbumsNotExistingInDB(AlbumSearchResponseDto albums) {
        albums.getData().forEach(deezerAlbumDto -> {
            Album album;
            try {
                albumService.getAlbumById(deezerAlbumDto.getId());
            } catch(EntityNotFoundException e) {
                album = Album.builder()
                        .id(deezerAlbumDto.getId())
                        .ranking(BigDecimal.ZERO)
                        .reviews(new ArrayList<>())
                        .build();
                albumService.saveNewAlbum(album);
            }
        });
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

    private AlbumSearchResponseDto parseDeezerAlbumResponse(String res) {
        AlbumSearchResponseDto albums;
        try{
            albums = new ObjectMapper().readValue(res, AlbumSearchResponseDto.class);
        } catch(JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return albums;
    }

}
