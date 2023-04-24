package com.musicweb.musicwebserver.controller;

import com.musicweb.musicwebserver.client.TrackClient;
import com.musicweb.musicwebserver.model.entity.Track;
import com.musicweb.musicwebserver.service.TrackService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/track")
@CrossOrigin
@RequiredArgsConstructor
public class TrackController {

    private final TrackClient trackClient;

    private final TrackService trackService;

    @GetMapping("/{trackId}")
    public Track getTrackById(@PathVariable String trackId) {
        return trackService.getTrackById(Long.valueOf(trackId));
    }


}
