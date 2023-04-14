package com.musicweb.musicwebserver.controller;

import com.musicweb.musicwebserver.client.SearchClient;
import com.musicweb.musicwebserver.dto.SearchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
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
