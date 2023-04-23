package com.musicweb.musicwebserver.controller;

import com.musicweb.musicwebserver.client.ArtistClient;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/artists")
@CrossOrigin
@RequiredArgsConstructor
public class ArtistController {

    private final ArtistClient artistClient;

    @GetMapping("/{artistId}")
    public String getArtistById(@PathVariable Long artistId) {
        return artistClient.getArtistById(artistId);
    }

}
