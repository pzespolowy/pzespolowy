package com.musicweb.musicwebserver.client;

import com.musicweb.musicwebserver.dto.SearchDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "search", url = "https://api.deezer.com/search")
public interface SearchClient {

    @GetMapping
    String getSearchResults(@SpringQueryMap SearchDto searchDto);

}
