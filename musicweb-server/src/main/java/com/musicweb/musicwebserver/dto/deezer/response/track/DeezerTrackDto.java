package com.musicweb.musicwebserver.dto.deezer.response.track;

import com.musicweb.musicwebserver.dto.deezer.response.DeezerArtistShortDto;
import lombok.Data;

@Data
public class DeezerTrackDto {

    private long id;
    private boolean readable;
    private String title;
    private String title_short;
    private String title_version;
    private String link;
    private int duration;
    private int rank;
    private boolean explicit_lyrics;
    private int explicit_content_lyrics;
    private int explicit_content_cover;
    private String preview;
    private String md5_image;
    private DeezerArtistShortDto artist;
    private DeezerAlbumShortDto album;
    private String type;

}
