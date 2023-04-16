package com.musicweb.musicwebserver.controller;

import com.musicweb.musicwebserver.client.SearchClient;
import com.musicweb.musicwebserver.client.TrackClient;
import com.musicweb.musicwebserver.dto.ArtistSearchRequestDto;
import com.musicweb.musicwebserver.dto.DetailSearchDto;
import com.musicweb.musicwebserver.dto.SearchRequestDto;
import com.musicweb.musicwebserver.dto.deezer.request.TrackSearchRequestDto;
import com.musicweb.musicwebserver.model.entity.Album;
import com.musicweb.musicwebserver.service.AlbumService;
import com.musicweb.musicwebserver.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
@RequiredArgsConstructor
public class SearchController {

    private final SearchClient searchClient;
    private final AlbumService albumService;
    private final SearchService searchService;

    @GetMapping("/homepage/search/tracks")
    public String getHomepageSearchResults(@RequestParam String query) {
        return searchClient.getHomepageSearchResults(SearchRequestDto.builder()
                .q(query)
                .limit(20)
                .build());
    }

    @GetMapping("/search/tracks")
    public String searchTracks(@RequestBody DetailSearchDto detailSearchDto) {
        searchService.searchTracks(detailSearchDto);
        return null;
    }

    @GetMapping("/search/albums")
    public String searchAlbums(@RequestBody DetailSearchDto detailSearchDto) {
        List<Album> albums = albumService.findAlbums(detailSearchDto);

        return null;
    }

    @GetMapping("/search/artists")
    public String searchArtists(@RequestBody ArtistSearchRequestDto artistSearchRequestDto) {
        return searchClient.getArtists(artistSearchRequestDto);
    }

}
