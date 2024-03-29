package com.musicweb.musicwebserver.controller;

import com.musicweb.musicwebserver.client.TrackClient;
import com.musicweb.musicwebserver.dto.deezer.response.track.DeezerTrackDto;
import com.musicweb.musicwebserver.dto.deezer.response.track.TrackSearchResponseDto;
import com.musicweb.musicwebserver.dto.ranking.RankingTrackDto;
import com.musicweb.musicwebserver.mapper.RankingMapper;
import com.musicweb.musicwebserver.model.entity.User;
import com.musicweb.musicwebserver.service.TrackService;
import com.musicweb.musicwebserver.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/tracks")
@CrossOrigin
@RequiredArgsConstructor
public class TrackController {

    private final TrackClient trackClient;
    private final TrackService trackService;
    private final RankingMapper rankingMapper;
    private final UserService userService;

    @GetMapping("/{trackId}")
    public List<String> getTrackById(@PathVariable String trackId) {
        List<String> res = new ArrayList<>();
        res.add(trackService.retrieveTrackById(trackId));
        User user = userService.getCurrentUser();
        if(user == null) {
            res.add("{\"isFavourite\": null}");
        } else {
            res.add("{\"isFavourite\": " + user.getFavouriteTracks().stream()
                    .anyMatch(track -> track.getId().equals(Long.valueOf(trackId))) + '}');
        }

        return res;
    }

    @PostMapping("/favourites")
    public void addTrackToFavourites(@RequestParam Long trackId) {
        trackService.addTrackToFavourites(trackId);
    }

    @DeleteMapping("/favourites")
    public void removeTrackFromFavourites(@RequestParam Long trackId) {
        trackService.removeTrackFromFavourites(trackId);
    }

    @GetMapping("/ranking")
    public List<RankingTrackDto> getTrackRanking() {
        return trackService.getTrackRanking().stream()
                .map(rankingMapper::mapToRankingTrackDto)
                .toList();
    }

    @GetMapping("/top")
    public TrackSearchResponseDto getTopTracks() {
        return trackService.getTopTracks();
    }
}
