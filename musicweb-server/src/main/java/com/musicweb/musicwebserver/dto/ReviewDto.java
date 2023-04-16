package com.musicweb.musicwebserver.dto;

import com.musicweb.musicwebserver.model.ReviewType;
import lombok.Data;

@Data
public class ReviewDto {
    private Long reviewSubjectId;
    private String description;
    private int grade;
    private ReviewType reviewType;
}
