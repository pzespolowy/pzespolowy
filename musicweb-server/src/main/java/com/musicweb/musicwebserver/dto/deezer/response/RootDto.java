package com.musicweb.musicwebserver.dto.deezer.response;

import lombok.Data;

import java.util.List;

@Data
public class RootDto {

    private List<DeezerTrackDto> tracks;

}
