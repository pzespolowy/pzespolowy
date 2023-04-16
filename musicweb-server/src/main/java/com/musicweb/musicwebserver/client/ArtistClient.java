package com.musicweb.musicwebserver.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "artist", url = "https://api.deezer.com/artist")
public interface ArtistClient {

    @GetMapping("/{artistId}")
    String getArtistById(@PathVariable Long artistId);

}
