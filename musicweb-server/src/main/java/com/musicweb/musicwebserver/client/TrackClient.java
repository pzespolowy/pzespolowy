package com.musicweb.musicwebserver.client;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "demo", url = "https://api.deezer.com/track")
public interface TrackClient {

    @GetMapping("/{trackId}")
    String getTrackById(@PathVariable Integer trackId);

}
