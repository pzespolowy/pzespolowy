package com.musicweb.musicwebserver.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "album", url = "https://api.deezer.com/album")
public interface AlbumClient {

    @GetMapping("/{albumId}")
    String getAlbumById(@PathVariable Long albumId);

}
