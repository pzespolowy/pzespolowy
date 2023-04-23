package com.musicweb.musicwebserver.dto.deezer.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TrackSearchRequestDto {

    private String q;
    private int limit = 100;

}
