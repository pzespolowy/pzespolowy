package com.musicweb.musicwebserver.controller;

import com.musicweb.musicwebserver.client.AlbumClient;
import com.musicweb.musicwebserver.dto.deezer.response.album.DeezerAlbumDto;
import com.musicweb.musicwebserver.dto.deezer.response.track.DeezerTrackDto;
import com.musicweb.musicwebserver.dto.ranking.RankingAlbumDto;
import com.musicweb.musicwebserver.mapper.RankingMapper;
import com.musicweb.musicwebserver.model.entity.Album;
import com.musicweb.musicwebserver.model.entity.Track;
import com.musicweb.musicwebserver.model.entity.User;
import com.musicweb.musicwebserver.service.AlbumService;
import com.musicweb.musicwebserver.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/albums")
@CrossOrigin
@RequiredArgsConstructor
public class AlbumController {

    private final AlbumClient albumClient;
    private final AlbumService albumService;
    private final RankingMapper rankingMapper;
    private final UserService userService;

    @GetMapping("/{albumId}")
    public List<String> getAlbumById(@PathVariable String albumId) {
        List<String> res = new ArrayList<>();
        res.add(albumService.retrieveAlbumById(albumId));
        User user = userService.getCurrentUser();
        if(user == null) {
            res.add("isFavorite: null");
        } else {
            res.add("isFavorite: " + user.getFavouriteTracks().stream()
                            .anyMatch(track -> track.getId().equals(Long.valueOf(albumId))));
        }

        return res;
    }

    @PostMapping("/favourites")
    public void addAlbumToFavourites(@RequestParam Long albumId) {
        albumService.addAlbumToFavourites(albumId);
    }

    @DeleteMapping("/favourites")
    public void removeTrackFromFavourites(@RequestParam Long trackId) {
        albumService.removeAlbumFromFavourites(trackId);
    }

    @GetMapping("/ranking")
    public List<RankingAlbumDto> getAlbumRanking() {
        return albumService.getAlbumRanking().stream()
                .map(rankingMapper::mapToAlbumRankingDto)
                .toList();
    }

}
