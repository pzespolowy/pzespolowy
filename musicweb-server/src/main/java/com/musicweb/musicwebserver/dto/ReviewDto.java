package com.musicweb.musicwebserver.dto;

import com.musicweb.musicwebserver.model.ReviewType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReviewDto {

    private String description;
    private int grade;
    private LocalDateTime postedAt;
    private ReviewType reviewType;
    private Long reviewSubjectId;

}
