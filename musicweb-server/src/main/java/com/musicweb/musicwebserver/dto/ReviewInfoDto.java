package com.musicweb.musicwebserver.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class ReviewInfoDto {

    //    private int placeInRanking;
    private Integer currentUserGrade;
    private BigDecimal averageRanking;
    private List<ReviewWithUserDto> reviews;

}
