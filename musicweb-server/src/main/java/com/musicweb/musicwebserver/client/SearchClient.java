package com.musicweb.musicwebserver.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "demo", url = "https://api.deezer.com/search")
public interface SearchClient {

    @GetMapping
    String getSearchResults(@RequestParam String queryString);

}
