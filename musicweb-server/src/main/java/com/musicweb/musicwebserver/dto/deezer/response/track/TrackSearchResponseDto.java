package com.musicweb.musicwebserver.dto.deezer.response.track;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class TrackSearchResponseDto {

    private List<DeezerTrackDto> data;
    private int total;

}
