package com.musicweb.musicwebserver.controller;

import com.musicweb.musicwebserver.client.SearchClient;
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

    @GetMapping("/search")
    public String getSearchResults(@RequestParam String queryString) {
        return searchClient.getSearchResults(queryString);
    }

}
