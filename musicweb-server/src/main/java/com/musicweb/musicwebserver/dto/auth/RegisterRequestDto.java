package com.musicweb.musicwebserver.dto.auth;

import lombok.Data;

@Data
public class RegisterRequestDto {

    private final String nickname;
    private final String name;
    private final String surname;
    private final String email;
    private final String password;

}
