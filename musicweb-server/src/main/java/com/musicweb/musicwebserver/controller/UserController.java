package com.musicweb.musicwebserver.controller;


import com.musicweb.musicwebserver.dto.UserDto;
import com.musicweb.musicwebserver.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
