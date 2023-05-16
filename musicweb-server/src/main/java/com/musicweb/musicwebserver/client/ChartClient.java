package com.musicweb.musicwebserver.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "chart", url = "https://api.deezer.com/chart")
public interface ChartClient {

    @GetMapping("/0/tracks")
    String getTopTracks();
}
