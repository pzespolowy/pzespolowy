package com.musicweb.musicwebserver.controller;


import com.musicweb.musicwebserver.dto.UpdatedUserDto;
import com.musicweb.musicwebserver.dto.UserDto;
import com.musicweb.musicwebserver.model.entity.Album;
import com.musicweb.musicwebserver.model.entity.ReviewSubject;
import com.musicweb.musicwebserver.model.entity.Track;
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
    public List<Track> getFavoriteTracks() {
        return userService.getFavoriteTracks();
    }

    @GetMapping("/favorites/albums")
    public List<Album> getFavoriteAlbums() {
        return userService.getFavoriteAlbums();
    }

}
