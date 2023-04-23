package com.musicweb.musicwebserver.dto.deezer.response.album;

import lombok.Data;

import java.util.List;

@Data
public class AlbumSearchResponseDto {
    private List<DeezerAlbumDto> data;
    private int total;
    private String next;
}
