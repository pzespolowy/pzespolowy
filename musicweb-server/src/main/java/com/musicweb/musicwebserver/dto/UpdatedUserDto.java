package com.musicweb.musicwebserver.dto;


import lombok.Data;

@Data
public class UpdatedUserDto {
    private String nickname;
    private String name;
    private String surname;
    private String password;
}
