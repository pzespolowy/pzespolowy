package com.musicweb.musicwebserver.dto.deezer.response.album;

import com.musicweb.musicwebserver.dto.deezer.response.DeezerArtistShortDto;
import lombok.Data;

@Data
public class DeezerAlbumDto {
    public long id;
    public String title;
    public String link;
    public String cover;
    public String cover_small;
    public String cover_medium;
    public String cover_big;
    public String cover_xl;
    public String md5_image;
    public int genre_id;
    public int nb_tracks;
    public String record_type;
    public String tracklist;
    public boolean explicit_lyrics;
    public DeezerArtistShortDto artist;
    public String type;
}
