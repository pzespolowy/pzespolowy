package com.musicweb.musicwebserver.controller;

import com.musicweb.musicwebserver.client.AlbumClient;
import com.musicweb.musicwebserver.model.entity.Album;
import com.musicweb.musicwebserver.model.entity.Track;
import com.musicweb.musicwebserver.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/albums")
@CrossOrigin
@RequiredArgsConstructor
public class AlbumController {

    private final AlbumClient albumClient;
    private final AlbumService albumService;

    @GetMapping("/{albumId}")
    public String getAlbumById(@PathVariable Long albumId) {
        return albumClient.getAlbumById(albumId);
    }

    @PostMapping("/favourites")
    public void addAlbumToFavourites(@RequestParam Long albumId) {
        albumService.addAlbumToFavourites(albumId);
    }

    @DeleteMapping("/favourites")
    public void removeTrackFromFavourites(@RequestParam Long trackId) {
        albumService.removeAlbumFromFavourites(trackId);
    }

    @GetMapping("/ranking")
    public List<Album> getAlbumRanking() {
        return albumService.getAlbumRanking();
    }

}
