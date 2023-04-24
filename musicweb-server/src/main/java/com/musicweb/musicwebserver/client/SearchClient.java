package com.musicweb.musicwebserver.client;

import com.musicweb.musicwebserver.dto.ArtistSearchRequestDto;
import com.musicweb.musicwebserver.dto.SearchRequestDto;
import com.musicweb.musicwebserver.dto.deezer.request.AlbumSearchRequestDto;
import com.musicweb.musicwebserver.dto.deezer.request.TrackSearchRequestDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "search", url = "https://api.deezer.com/search")
public interface SearchClient {

    @GetMapping
    String getHomepageSearchResults(@SpringQueryMap SearchRequestDto searchRequestDto);

    @GetMapping("/track")
    String getTracks(@SpringQueryMap TrackSearchRequestDto trackSearchRequestDto);

    @GetMapping("/album")
    String getAlbums(@SpringQueryMap AlbumSearchRequestDto albumSearchRequestDto);

    @GetMapping("/artist")
    String getArtists(@SpringQueryMap ArtistSearchRequestDto artistSearchRequestDto);


}
