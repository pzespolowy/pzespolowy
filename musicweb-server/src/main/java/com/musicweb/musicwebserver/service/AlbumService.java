package com.musicweb.musicwebserver.service;

import com.musicweb.musicwebserver.dto.DetailSearchDto;
import com.musicweb.musicwebserver.model.entity.Album;
import com.musicweb.musicwebserver.model.entity.Track;
import com.musicweb.musicwebserver.repository.AlbumRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumRepository albumRepository;
    private final UserService userService;

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
        userService.getCurrentUser().addFavouriteAlbum(album);
    }

    public void removeAlbumFromFavourites(Long albumId) {
        Album album = getAlbumById(albumId);
        userService.getCurrentUser().removeFavouriteAlbum(album);
    }

    public List<Album> getAlbumRanking() {
        return albumRepository.findAll(Sort.by(Sort.Direction.DESC, "ranking"));
    }
}
