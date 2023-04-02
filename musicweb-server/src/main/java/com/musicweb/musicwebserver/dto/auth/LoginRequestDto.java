package com.musicweb.musicwebserver.dto.auth;

import lombok.Data;

@Data
public class LoginRequestDto {

    private String email;
    private String password;

}
