package com.musicweb.musicwebserver.dto.deezer.response.track;

import lombok.Data;

@Data
public class DeezerAlbumShortDto {
    private int id;
    private String title;
    private String cover;
    private String cover_small;
    private String cover_medium;
    private String cover_big;
    private String cover_xl;
    private String md5_image;
    private String tracklist;
    private String type;
}
