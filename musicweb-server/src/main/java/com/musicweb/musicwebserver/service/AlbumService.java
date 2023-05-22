package com.musicweb.musicwebserver.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.musicweb.musicwebserver.client.AlbumClient;
import com.musicweb.musicwebserver.dto.DetailSearchDto;
import com.musicweb.musicwebserver.dto.deezer.response.album.AlbumSearchResponseDto;
import com.musicweb.musicwebserver.dto.deezer.response.album.DeezerAlbumDto;
import com.musicweb.musicwebserver.dto.deezer.response.track.DeezerTrackDto;
import com.musicweb.musicwebserver.model.entity.Album;
import com.musicweb.musicwebserver.model.entity.Track;
import com.musicweb.musicwebserver.model.entity.User;
import com.musicweb.musicwebserver.repository.AlbumRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumRepository albumRepository;
    private final UserService userService;
    private final AlbumClient albumClient;

    public void saveNewAlbum(Album album) {
        albumRepository.save(album);
    }

    public Album getAlbumById(Long id) {
        return albumRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Album with ID " + id + " not found"));
    }

    public Album updateAlbum(Album album) {
        return albumRepository.save(album);
    }

    public void addAlbumToFavourites(Long albumId) {
        Album album = getAlbumById(albumId);
        User user = userService.getCurrentUser();
        user.addFavouriteAlbum(album);
        userService.updateUser(user);
    }

    public void removeAlbumFromFavourites(Long albumId) {
        Album album = getAlbumById(albumId);
        User user = userService.getCurrentUser();
        user.removeFavouriteAlbum(album);
        userService.updateUser(user);
    }

    public List<Album> getAlbumRanking() {
        return albumRepository.findAll(Sort.by(Sort.Direction.DESC, "ranking"));
    }

    public String retrieveAlbumById(String albumId) {
        String res = albumClient.getAlbumById(albumId);

        DeezerAlbumDto deezerTrackDto = parseToDeezerAlbum(res);
        Album album;
        try {
            getAlbumById(deezerTrackDto.getId());
        } catch(EntityNotFoundException e) {
            album = Album.builder()
                    .id(deezerTrackDto.getId())
                    .ranking(BigDecimal.ZERO)
                    .reviews(new ArrayList<>())
                    .build();
            saveNewAlbum(album);
        }
        return res;
    }

    private DeezerAlbumDto parseToDeezerAlbum(String res) {
        DeezerAlbumDto track;
        try {
            track = new ObjectMapper().readValue(res, DeezerAlbumDto.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return track;
    }

}
