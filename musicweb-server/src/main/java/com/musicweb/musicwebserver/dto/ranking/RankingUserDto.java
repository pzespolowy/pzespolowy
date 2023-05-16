package com.musicweb.musicwebserver.dto.ranking;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RankingUserDto {

    private Long id;
    private String nickname;
    private String name;
    private String surname;
    private String email;
    private String password;
}
