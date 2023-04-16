package com.musicweb.musicwebserver.controller;

import com.musicweb.musicwebserver.client.TrackClient;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/track")
@CrossOrigin
@RequiredArgsConstructor
public class TrackController {

    private final TrackClient trackClient;

    @GetMapping("/{trackId}")
    public String getTrackById(@PathVariable String trackId) {
        return trackClient.getTrackById(trackId);
    }


}
