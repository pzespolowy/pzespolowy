package com.musicweb.musicwebserver.dto.deezer.response.album;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AlbumSearchResponseDto {
    private List<DeezerAlbumDto> data;
    private int total;
    private String next;
}
