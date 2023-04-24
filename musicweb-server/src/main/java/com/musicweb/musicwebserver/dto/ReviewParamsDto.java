package com.musicweb.musicwebserver.dto;

import com.musicweb.musicwebserver.model.ReviewType;
import lombok.Data;

@Data
public class ReviewParamsDto {

    private String reviewSubjectId;
    private ReviewType reviewType;
}
