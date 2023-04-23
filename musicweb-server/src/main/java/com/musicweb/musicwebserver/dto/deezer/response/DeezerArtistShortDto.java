package com.musicweb.musicwebserver.dto.deezer.response;

import lombok.Data;

@Data
public class DeezerArtistShortDto {
    private int id;
    private String name;
    private String link;
    private String picture;
    private String picture_small;
    private String picture_medium;
    private String picture_big;
    private String picture_xl;
    private String tracklist;
    private String type;
}
