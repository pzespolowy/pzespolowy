package com.musicweb.musicwebserver.dto.auth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationResponseDto {

    private String token;

}
