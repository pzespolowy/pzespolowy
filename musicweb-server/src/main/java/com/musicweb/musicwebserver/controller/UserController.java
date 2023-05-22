package com.musicweb.musicwebserver.controller;


import com.musicweb.musicwebserver.dto.AlbumDto;
import com.musicweb.musicwebserver.dto.TrackDto;
import com.musicweb.musicwebserver.dto.UpdatedUserDto;
import com.musicweb.musicwebserver.dto.UserDto;
import com.musicweb.musicwebserver.mapper.AlbumMapper;
import com.musicweb.musicwebserver.mapper.TrackMapper;
import com.musicweb.musicwebserver.model.entity.User;
import com.musicweb.musicwebserver.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

    private final ModelMapper modelMapper;
    private final UserService userService;
    private final TrackMapper trackMapper;
    private final AlbumMapper albumMapper;
    @GetMapping("/currentuser")
    public UserDto getCurrentUser() {
        return modelMapper.map(userService.getCurrentUser(), UserDto.class);
    }

    @PutMapping("/currentuser")
    public void updateCurrentUserInfo(@RequestBody UpdatedUserDto updatedUserDto) {
        userService.updateCurrentUserInfo(modelMapper.map(updatedUserDto, User.class));
    }

    @DeleteMapping("/currentuser")
    public void deleteCurrentUser() {
        userService.deleteCurrentUser();
    }

    @GetMapping("/favorites/tracks")
    public List<TrackDto> getFavoriteTracks() {
        return userService.getFavoriteTracks().stream()
                .map(trackMapper::mapToTrackDto)
                .toList();
    }

    @GetMapping("/favorites/albums")
    public List<AlbumDto> getFavoriteAlbums() {
        return userService.getFavoriteAlbums()
                .stream()
                .map(albumMapper::mapToAlbumDto)
                .toList();
    }

}
