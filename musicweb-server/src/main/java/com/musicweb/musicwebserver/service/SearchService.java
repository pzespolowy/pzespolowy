package com.musicweb.musicwebserver.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.musicweb.musicwebserver.client.SearchClient;
import com.musicweb.musicwebserver.dto.DetailSearchDto;
import com.musicweb.musicwebserver.dto.deezer.request.TrackSearchRequestDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final SearchClient searchClient;

    public String searchTracks(DetailSearchDto detailSearchDto) {
        String res = searchClient.getTracks(TrackSearchRequestDto.builder()
                .q(detailSearchDto.getQuery())
                .build());
        try {
            TrackSearchRequestDto tracks = new ObjectMapper().readValue(res, TrackSearchRequestDto.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        System.out.println(res);



        return null;
    }

}
