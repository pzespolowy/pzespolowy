package com.musicweb.musicwebserver.dto;

import com.musicweb.musicwebserver.model.ReviewType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReviewWithUserDto {

    private String description;
    private int grade;
    private UserDto user;
    private LocalDateTime postedAt;
    private ReviewType reviewType;
    private Long reviewSubjectId;

}
