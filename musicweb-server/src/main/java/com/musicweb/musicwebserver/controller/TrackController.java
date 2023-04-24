package com.musicweb.musicwebserver.controller;

import com.musicweb.musicwebserver.client.TrackClient;
import com.musicweb.musicwebserver.service.TrackService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tracks")
@CrossOrigin
@RequiredArgsConstructor
public class TrackController {

    private final TrackClient trackClient;

    private final TrackService trackService;

    @GetMapping("/{trackId}")
    public String getTrackById(@PathVariable String trackId) {
        return trackClient.getTrackById(trackId);
    }

    @PostMapping("/favourites")
    public void addTrackToFavourites(@RequestParam Long trackId) {
        trackService.addTrackToFavourites(trackId);
    }

    @DeleteMapping("/favourites")
    public void removeTrackFromFavourites(@RequestParam Long trackId) {
        trackService.removeTrackFromFavourites(trackId);
    }

    @GetMapping("/ranking")
    public List<Track> getTrackRanking() {
        return trackService.getTrackRanking();
    }
}
