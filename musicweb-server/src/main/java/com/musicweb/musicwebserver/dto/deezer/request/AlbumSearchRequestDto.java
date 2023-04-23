package com.musicweb.musicwebserver.dto.deezer.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AlbumSearchRequestDto {
    private String q;
}
