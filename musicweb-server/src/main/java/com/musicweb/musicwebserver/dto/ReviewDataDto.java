package com.musicweb.musicwebserver.dto;

import lombok.Data;

import java.util.List;

@Data
public class ReviewDataDto {

    private long numberOfReviews;
    private List<ReviewDto> reviews;

}
