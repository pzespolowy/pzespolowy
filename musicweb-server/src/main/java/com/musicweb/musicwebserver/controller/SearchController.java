package com.musicweb.musicwebserver.controller;

import com.musicweb.musicwebserver.client.SearchClient;
import com.musicweb.musicwebserver.dto.SearchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
@RequiredArgsConstructor
public class SearchController {

    private final SearchClient searchClient;
    private final String prefix = "track:";

    @GetMapping("/search")
    public String getSearchResults(@RequestParam String query) {
        return searchClient.getSearchResults(SearchDto.builder()
                .q(prefix + query)
                .limit(20)
                .build());
    }

}
