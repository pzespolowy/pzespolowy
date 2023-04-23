package com.musicweb.musicwebserver.controller;

import com.musicweb.musicwebserver.client.SearchClient;
import com.musicweb.musicwebserver.dto.ArtistSearchRequestDto;
import com.musicweb.musicwebserver.dto.DetailSearchDto;
import com.musicweb.musicwebserver.dto.SearchRequestDto;
import com.musicweb.musicwebserver.dto.deezer.response.album.AlbumSearchResponseDto;
import com.musicweb.musicwebserver.dto.deezer.response.track.TrackSearchResponseDto;
import com.musicweb.musicwebserver.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
@RequiredArgsConstructor
public class SearchController {

    private final SearchClient searchClient;
    private final SearchService searchService;

    //deprecated
//    @GetMapping("/homepage/search/tracks")
//    public String getHomepageSearchResults(@RequestParam String query) {
//        return searchClient.getHomepageSearchResults(SearchRequestDto.builder()
//                .q(query)
//                .limit(20)
//                .build());
//    }

    @GetMapping("/search/tracks")
    public TrackSearchResponseDto searchTracks(@RequestBody DetailSearchDto detailSearchDto) {
        return searchService.searchTracks(detailSearchDto);
    }

    @GetMapping("/search/albums")
    public AlbumSearchResponseDto searchAlbums(@RequestBody DetailSearchDto detailSearchDto) {
        return searchService.searchAlbums(detailSearchDto);
    }

    @GetMapping("/search/artists")
    public String searchArtists(@RequestBody ArtistSearchRequestDto artistSearchRequestDto) {
        return searchClient.getArtists(artistSearchRequestDto);
    }

}
