package com.musicweb.musicwebserver.controller;

import com.musicweb.musicwebserver.client.AlbumClient;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/albums")
@CrossOrigin
@RequiredArgsConstructor
public class AlbumController {

    private final AlbumClient albumClient;

    @GetMapping("/{albumId}")
    public String getAlbumById(@PathVariable Long albumId) {
        return albumClient.getAlbumById(albumId);
    }

}
